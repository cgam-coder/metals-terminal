#!/usr/bin/env python3
"""Read-only SEC feasibility probe for extending GLD/SLV quarters to 2016.
No output datasets, no predictions. Strictly inspect official SEC public responses.
"""
import html
import json
import re
import urllib.request

HEADERS={"User-Agent":"MetalsTerminal/4.5 (+https://github.com/cgam-coder/metals-terminal)",
         "Accept":"application/json,text/html,application/xhtml+xml"}
FILES=[
("GLD2016","https://www.sec.gov/Archives/edgar/data/1222333/000119312516778088/d257825d10k.htm"),
("GLD2016Q2","https://www.sec.gov/Archives/edgar/data/1222333/000119312516668301/d182244d10q.htm"),
("SLV2016","https://www.sec.gov/Archives/edgar/data/1330568/000143774916041251/slv20160823_10q.htm"),
("SLV2020","https://www.sec.gov/Archives/edgar/data/1330568/000143774920016632/slv20200630_10q.htm"),
("GLDsub","https://data.sec.gov/submissions/CIK0001222333.json"),
("SLVsub","https://data.sec.gov/submissions/CIK0001330568.json")
]
def get(url):
    req=urllib.request.Request(url,headers=HEADERS)
    with urllib.request.urlopen(req,timeout=18) as r:
        return r.read(6_000_000).decode("utf-8",errors="replace")
for name,url in FILES:
    try:
        raw=get(url)
        print("OK",name,len(raw))
        if name.endswith("sub"):
            data=json.loads(raw)
            filings=data.get("filings",{}).get("recent",{})
            rows=list(zip(filings.get("form",[]),filings.get("filingDate",[]),filings.get("reportDate",[]),filings.get("accessionNumber",[]),filings.get("primaryDocument",[])))
            print("SUBMISSIONS",name,"annual/quarterly",[(f,d,period,access,primary) for f,d,period,access,primary in rows if f in ("10-K","10-Q") and "2016"<=d[:4]<="2017"][:12])
        else:
            text=html.unescape(re.sub(r"<[^>]+>"," ",re.sub(r"<(script|style).*?</\1>"," ",raw,flags=re.I|re.S)))
            text=" ".join(text.split())
            phrases=["amount of gold owned by the Trust","Investment in Gold","Silver bullion","Silver Bullion","ounces of silver","Ounces of gold"]
            for term in phrases:
                hit=re.search(re.escape(term),text,flags=re.I)
                if hit:print("EXCERPT",name,term,text[max(0,hit.start()-160):hit.start()+350])
    except Exception as e:
        print("UNAVAILABLE",name,type(e).__name__,str(e)[:270])
