#!/usr/bin/env python3
"""Refresh official FRED public graph CSV observations without keys or external packages.
Usage: python scripts/update_data.py
A failed series is preserved from previous snapshot; no synthetic data are created.
"""
import csv
import datetime as dt
import io
import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / 'data' / 'series.json'
SERIES = ('DGS2','DGS10','DGS30','DFII10','DFEDTARU','ECBDFR')
FRED = 'https://fred.stlouisfed.org/graph/fredgraph.csv'

def fetch_series(key, start):
    query = urllib.parse.urlencode({'id':key, 'cosd':start})
    req = urllib.request.Request(
        FRED + '?' + query,
        headers={'User-Agent':'MetalsTerminal/1.0 (personal static site; daily update)',
                 'Accept':'text/csv,text/plain;q=0.9,*/*;q=0.5'})
    with urllib.request.urlopen(req, timeout=28) as r:
        if r.status != 200:
            raise RuntimeError(f'{key}: HTTP {r.status}')
        text = r.read(2_000_000).decode('utf-8-sig')
    rows=[]
    for row in csv.DictReader(io.StringIO(text)):
        date=row.get('observation_date') or row.get('DATE') or row.get('date')
        raw=row.get(key)
        if not date or not raw or raw.strip() in ('.','', 'NaN'):
            continue
        d=dt.date.fromisoformat(date)
        val=float(raw)
        if not -15 <= val <= 50:
            raise ValueError(f'Out of range {key} {date}={val}')
        rows.append({'date':date,'value':val})
    if len(rows) < 2 or any(rows[i]['date'] >= rows[i+1]['date'] for i in range(len(rows)-1)):
        raise ValueError(f'{key}: insufficient or unsorted data')
    return rows

def main():
    obj=json.loads(TARGET.read_text(encoding='utf-8')) if TARGET.exists() else {'series':{}}
    # Keep more than five calendar years so all 5A charts have a true first observation.
    # The former 400-day window silently erased the 5Y historical archive.
    start=(dt.date.today()-dt.timedelta(days=5*366+45)).isoformat()
    good=[];bad=[]
    for key in SERIES:
        try:
            new=fetch_series(key,start)
            old=obj.get('series',{}).get(key,[])
            combined={r['date']:r for r in old}
            combined.update({r['date']:r for r in new})
            obj.setdefault('series',{})[key]=[combined[k] for k in sorted(combined) if k>=start]
            good.append(key)
        except Exception as ex:
            bad.append(f'{key}: {ex}')
    if not good:
        print('ERROR: no sources could be updated. Keeping previous file.',file=sys.stderr)
        for msg in bad:print(msg,file=sys.stderr)
        return 1
    obj['source']='U.S. Treasury & Fed/ECB via FRED; official public historical series'
    obj['updated']=max((r[-1]['date'] for r in obj['series'].values() if r),default=obj.get('updated'))
    obj['note']='Fechas por observación; la última publicación puede ser anterior a la fecha actual. Datos macro diarios, no en tiempo real.'
    TARGET.write_text(json.dumps(obj,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print('Updated:',', '.join(good),'date:',obj['updated'])
    for msg in bad:print('WARNING',msg,file=sys.stderr)
    return 0

if __name__=='__main__':raise SystemExit(main())
