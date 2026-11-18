"""Offline regression checks; no API keys or network required."""
import datetime as dt
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import update_data

class FakeResponse:
    def __init__(self,data):
        self.status=200
        self.data=data
    def __enter__(self):return self
    def __exit__(self,*args):return False
    def read(self,limit):return self.data[:limit]

class UpdateTests(unittest.TestCase):
    def test_fetch_real_csv(self):
        csv=b'observation_date,DGS10\n2026-11-16,5.12\n2026-11-17,5.10\n'
        with patch.object(update_data.urllib.request,'urlopen',return_value=FakeResponse(csv)):
            rows=update_data.fetch_series('DGS10','2026-11-01')
        self.assertEqual(rows,[{'date':'2026-11-16','value':5.12},{'date':'2026-11-17','value':5.1}])
    def test_invalid_data_rejected(self):
        csv=b'observation_date,DGS10\n2026-11-16,5.12\n2026-11-17,510.0\n'
        with patch.object(update_data.urllib.request,'urlopen',return_value=FakeResponse(csv)):
            with self.assertRaises(ValueError):
                update_data.fetch_series('DGS10','2026-11-01')
    def test_partial_provider_outage_preserves_original_series(self):
        with tempfile.TemporaryDirectory() as tmp:
            target=Path(tmp)/'series.json'
            today=dt.date.today()
            two=(today-dt.timedelta(days=2)).isoformat()
            one=(today-dt.timedelta(days=1)).isoformat()
            target.write_text(json.dumps({'series':{'DGS2':[{'date':two,'value':4.7}], 'DGS10':[{'date':two,'value':5.0}]}}),encoding='utf-8')
            def substitute(key,start):
                if key!='DGS10':raise OSError('provider unavailable')
                return [{'date':two,'value':5.0},{'date':one,'value':5.1}]
            with patch.object(update_data,'TARGET',target),patch.object(update_data,'fetch_series',side_effect=substitute):
                result=update_data.main()
            payload=json.loads(target.read_text(encoding='utf-8'))
            self.assertEqual(result,0)
            self.assertEqual(payload['series']['DGS2'][0]['value'],4.7)
            self.assertEqual(payload['series']['DGS10'][-1],{'date':one,'value':5.1})

if __name__=='__main__':unittest.main()
