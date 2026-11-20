#!/usr/bin/env python3
"""Extend GVZ and VIX Cboe historical close series via FRED with source citation.
For this free, non-commercial research terminal only. Zero invented observations.
FRED labels GVZCLS and VIXCLS 'Copyrighted: Citation Required'.
"""
import csv
import datetime as dt
import io
import json
import math
import urllib.parse
import urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/"data"
IDS={"vix":("VIXCLS",DATA/"vix-history.json"),
     "gvz":("GVZCLS",DATA/"v4-gvz-snapshot.json")}
URL="https://fred.stlouisfed.org/graph/fredgraph.csv"
HEADERS={"User-Agent":"MetalsTerminal/4.5 (noncommercial personal research; https://github.com/cgam-coder/metals-terminal)",
         "Accept":"text/csv,text/plain"}

def start_date():
    today=dt.date.today()
    try: ten=today.replace(year=today.year-10)
    except ValueError: ten=today.replace(year=today.year-10,day=28)
    return ten-dt.timedelta(days=45)

def pull(key,from_day):
    url=URL+"?"+urllib.parse.urlencode({"id":key,"cosd":from_day.isoformat()})
    req=urllib.request.Request(url,headers=HEADERS)
    with urllib.request.urlopen(req,timeout=40) as res:
        if res.status!=200:raise ValueError(f"{key} HTTP {res.status}")
        body=res.read(650_000).decode("utf-8-sig")
    rows=[]
    for rec in csv.DictReader(io.StringIO(body)):
        date=rec.get("observation_date") or rec.get("DATE")
        value=rec.get(key)
        if not date or not value or value in (".","NaN"):
            continue
        day=dt.date.fromisoformat(date)
        num=float(value)
        if not math.isfinite(num) or num<=0 or num>=150:
            raise ValueError(f"{key}: invalid {date} {value}")
        if from_day<=day<=dt.date.today()+dt.timedelta(days=1):
            rows.append([date,round(num,4)])
    if len(rows)<2200:raise ValueError(f"{key}: insufficient real dated observations {len(rows)}")
    if dt.date.fromisoformat(rows[0][0])>from_day+dt.timedelta(days=55):
        raise ValueError(f"{key}: no 2016 coverage")
    if len(set(r[0] for r in rows))!=len(rows) or any(a[0]>=b[0] for a,b in zip(rows,rows[1:])):
        raise ValueError(f"{key}: duplicate dates or ordering issue")
    return rows

def main():
    from_day=start_date()
    old_vix=json.loads(IDS["vix"][1].read_text(encoding="utf-8"))
    old_gvz=json.loads(IDS["gvz"][1].read_text(encoding="utf-8"))
    data={}
    for name,(series,_) in IDS.items():
        data[name]=pull(series,from_day)
        print(name,series,len(data[name]),data[name][0][0],data[name][-1][0],flush=True)
    for name,old in (("vix",old_vix),("gvz",old_gvz)):
        older=old["rows"]
        new_map={r[0]:r[1] for r in data[name]}
        for d,value in (older[0],older[len(older)//2],older[-1]):
            if d in new_map and abs(new_map[d]-float(value))>.12:
                raise ValueError(f"{name}: FRED/Cboe disagree with previous dated release at {d}")
        if data[name][-1][0] < older[-1][0]:
            raise ValueError(f"{name}: new FRED data older than archive")
    now=dt.date.today().isoformat()
    vix={
     "schema":"vix-daily-archive-v2","retrieved":now,
     "upstream":"Chicago Board Options Exchange via FRED",
     "source_id":"VIXCLS","source_url":"https://fred.stlouisfed.org/series/VIXCLS",
     "source_csv":"https://fred.stlouisfed.org/graph/fredgraph.csv?id=VIXCLS",
     "original_publisher":"Cboe Global Markets",
     "license_note":"Cboe copyright via FRED — Copyrighted: Citation Required. Source: Cboe VIXCLS via FRED, Federal Reserve Bank of St. Louis.",
     "source_last_date":data["vix"][-1][0],"fields":["date","close"],
     "rows":data["vix"]
    }
    gvz=dict(old_gvz)
    gvz.update({
      "schema":"metals-v4-gvz-fred-v1",
      "series":"GVZCLS",
      "source":"Federal Reserve Bank of St. Louis (FRED)",
      "source_id":"GVZCLS",
      "source_url":"https://fred.stlouisfed.org/series/GVZCLS",
      "source_csv":"https://fred.stlouisfed.org/graph/fredgraph.csv?id=GVZCLS",
      "original_publisher":"Cboe Global Markets",
      "copyright_notice":"Cboe copyright via FRED — Copyrighted: Citation Required. Source: Cboe GVZCLS via FRED, Federal Reserve Bank of St. Louis.",
      "snapshot_at":now,"rows":data["gvz"]
    })
    for name,payload in (("vix",vix),("gvz",gvz)):
        IDS[name][1].write_text(json.dumps(payload,ensure_ascii=False,separators=(",",":"))+"\n",encoding="utf-8")
    print("PASS: official Cboe VIXCLS/GVZCLS ten-year FRED close archives with required source attribution",flush=True)

if __name__=="__main__": main()
