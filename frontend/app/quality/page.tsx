"use client";
import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QualityPage() {
  const [batchId, setBatchId] = useState('batch-1');
  const [labId, setLabId] = useState('lab-1');
  const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());
  const [apiKey, setApiKey] = useState<string>('lab-key');
  const [moisture, setMoisture] = useState<number>(10);
  const [pesticide, setPesticide] = useState<number>(0);
  const [dnaAuthenticated, setDnaAuthenticated] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');

  async function submit() {
    try {
      setStatus('Submitting...');
      const payload = { batchId, labId, results: { moisture: Number(moisture), pesticide: Number(pesticide), dnaAuthenticated }, timestamp };
      const res = await apiPost('/api/v1/quality-tests', payload, apiKey);
      setStatus(`Created event ${res.id}`);
    } catch (e: any) {
      setStatus(e.message || 'Error');
    }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Quality Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Batch ID</label>
              <Input value={batchId} onChange={(e) => setBatchId(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Lab ID</label>
              <Input value={labId} onChange={(e) => setLabId(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Moisture</label>
              <Input type="number" value={moisture} onChange={(e) => setMoisture(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm">Pesticide</label>
              <Input type="number" value={pesticide} onChange={(e) => setPesticide(Number(e.target.value))} />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Timestamp</label>
              <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm">DNA Authenticated</label>
            <input type="checkbox" className="ml-2" checked={dnaAuthenticated} onChange={(e) => setDnaAuthenticated(e.target.checked)} />
          </div>
          <div>
            <label className="text-sm">API Key</label>
            <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>
          <Button onClick={submit}>Submit</Button>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}



