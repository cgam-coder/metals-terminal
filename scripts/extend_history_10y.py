#!/usr/bin/env python3
"""One-time admission of ten-year official macro and CFTC data; no synthetic rows.

This script intentionally makes *no* GitHub writes. A separate workflow may
commit its checked artifacts only after this script exits successfully.
The comparison universe remains CFTC Disaggregated Futures Only GC/SI.
"""
import csv
import datetime as dt
import io
import json
import math
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MACRO = ROOT / "data/series.json"
COT = ROOT / "data/v4-cot-snapshot.json"
SERIES = ("DGS2", "DGS10", "DGS30", "DFII10", "DFEDTARU", "ECBDFR")
CFTC_FIELDS = ("report_date_as_yyyy_mm_dd", "cftc_contract_market_code",
               "cftc_market_code", "market_and_exchange_names", "open_interest_all",
               "m_money_positions_long_all", "m_money_positions_short_all")
IDENTITIES = {"088691": ("gold", "GOLD"), "084691": ("silver", "SILVER")}
HEADERS = {"User-Agent": "MetalsTerminalResearch/4.5 (read-only public sources; no secrets)",
           "Accept": "application/json,text/csv,text/plain;q=0.9,*/*;q=0.5"}

def downloaded(url, limit=3_000_000, timeout=45):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as res:
        if res.status != 200:
            raise RuntimeError("HTTP " + str(res.status))
        payload = res.read(limit + 1)
        if len(payload) > limit:
            raise ValueError("Payload unexpectedly large")
        return payload.decode("utf-8-sig")

def start_date():
    now = dt.date.today()
    try:
        dec = now.replace(year=now.year - 10)
    except ValueError:
        dec = now.replace(year=now.year - 10, day=28)
    return dec - dt.timedelta(days=45)

def valid_date(value):
    return dt.date.fromisoformat(value)

def fetch_fred(key, start, previous):
    query = urllib.parse.urlencode({"id": key, "cosd": start.isoformat()})
    text = downloaded("https://fred.stlouisfed.org/graph/fredgraph.csv?" + query, timeout=38)
    dates = {}
    for raw in csv.DictReader(io.StringIO(text)):
        day = raw.get("observation_date") or raw.get("DATE") or raw.get("date")
        txt = raw.get(key)
        if not day or not txt or txt.strip() in ("", ".", "NaN"):
            continue
        d = valid_date(day)
        value = float(txt)
        if not math.isfinite(value) or not -20 <= value <= 50:
            raise ValueError(f"{key}: invalid value {day} {txt}")
        if start <= d <= dt.date.today() + dt.timedelta(days=1):
            dates[day] = {"date": day, "value": value}
    rows = [dates[k] for k in sorted(dates)]
    if len(rows) < 2200:
        raise ValueError(f"{key}: fewer than 2200 real observations")
    if valid_date(rows[0]["date"]) > start + dt.timedelta(days=55):
        raise ValueError(f"{key}: missing start-of-history coverage")
    prior_end = previous[-1]["date"]
    if rows[-1]["date"] < prior_end:
        raise ValueError(f"{key}: provider older than previously checked archive")
    if not all(a["date"] < b["date"] for a,b in zip(rows, rows[1:])):
        raise ValueError(f"{key}: duplicate or out-of-order dates")
    return rows

def fetch_cot(start, previous):
    where = "cftc_contract_market_code in('088691','084691') and report_date_as_yyyy_mm_dd >= '" + start.isoformat() + "T00:00:00'"
    params = urllib.parse.urlencode({
        "$select": ",".join(CFTC_FIELDS), "$where": where,
        "$order": "report_date_as_yyyy_mm_dd DESC", "$limit": "1500"
    })
    url = "https://publicreporting.cftc.gov/resource/72hh-3qpy.json?" + params
    raw = json.loads(downloaded(url, limit=2_000_000, timeout=45))
    if not isinstance(raw, list):
        raise ValueError("Unexpected CFTC response")
    data = defaultdict(dict)
    for rec in raw:
        code = rec.get("cftc_contract_market_code")
        if code not in IDENTITIES:
            continue
        name, contract_name = IDENTITIES[code]
        if str(rec.get("cftc_market_code")).strip() != "CMX" or not str(rec.get("market_and_exchange_names", "")).startswith(contract_name + " -"):
            raise ValueError("CFTC contract or exchange mismatch")
        day = str(rec.get("report_date_as_yyyy_mm_dd", ""))[:10]
        date = valid_date(day)
        if date < start or date > dt.date.today() + dt.timedelta(days=1):
            raise ValueError("CFTC date out of range")
        oi = float(rec.get("open_interest_all"))
        long = float(rec.get("m_money_positions_long_all"))
        short = float(rec.get("m_money_positions_short_all"))
        if not all(math.isfinite(x) and x >= 0 and x.is_integer() for x in (oi,long,short)) or oi <= 0 or long > oi or short > oi:
            raise ValueError("CFTC invalid position record")
        if day in data[name]:
            raise ValueError("CFTC duplicate report date")
        data[name][day] = [day, int(long), int(short), int(oi)]
    result = {}
    for name in ("gold", "silver"):
        rows = [data[name][k] for k in sorted(data[name])]
        if len(rows) < 485:
            raise ValueError(f"CFTC {name}: insufficient weekly observations {len(rows)}")
        if valid_date(rows[0][0]) > start + dt.timedelta(days=65):
            raise ValueError(f"CFTC {name}: no early ten-year data")
        last_old = previous["series"][name][-1][0]
        if rows[-1][0] < last_old:
            raise ValueError(f"CFTC {name}: latest report older than old snapshot")
        result[name] = rows
    if set(x[0] for x in result["gold"]) != set(x[0] for x in result["silver"]):
        # CFTC may have occasional absent weeks per contract. Neither chart imputes them.
        print("INFO: GC/SI have some different reporting dates; matching dates only")
    return result

def main():
    old_macro = json.loads(MACRO.read_text(encoding="utf-8"))
    old_cot = json.loads(COT.read_text(encoding="utf-8"))
    first = start_date()
    print("Ten-year admission source start:", first.isoformat(), flush=True)
    # Validate all sources before writing either file.
    fred = {}
    for key in SERIES:
        fred[key] = fetch_fred(key, first, old_macro["series"][key])
        print("FRED", key, len(fred[key]), fred[key][0]["date"], fred[key][-1]["date"], flush=True)
    cot = fetch_cot(first, old_cot)
    for key in cot:
        print("CFTC", key, len(cot[key]), cot[key][0][0], cot[key][-1][0], flush=True)
    now = dt.date.today().isoformat()
    new_macro = dict(old_macro)
    new_macro["series"] = fred
    new_macro["source"] = "FRED official public CSV · 10-year dated observations"
    new_macro["updated"] = max(records[-1]["date"] for records in fred.values())
    new_macro["verified_on"] = now
    new_macro["note"] = "10 years plus boundary; no interpolation. FRED source dates differ by series. On-demand/manual update only."
    new_cot = dict(old_cot)
    new_cot["series"] = cot
    new_cot["snapshot_at"] = now
    new_cot["observation_date"] = "CFTC Tuesday position date. Exact public release date is not present in each record."
    for p, data in ((MACRO, new_macro), (COT, new_cot)):
        p.write_text(json.dumps(data, ensure_ascii=False, separators=(",",":"))+"\n", encoding="utf-8")
    print("PASS: FRED 6/6 and CFTC GC+SI 10Y; generated checked archives without gap fabrication.", flush=True)

if __name__ == "__main__":
    main()
