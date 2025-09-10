"use client";
import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProcessingPage() {
  const [batchId, setBatchId] = useState('batch-1');
  const [stepType, setStepType] = useState('drying');
  const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());
  const [apiKey, setApiKey] = useState<string>('admin-key');
  const [status, setStatus] = useState<string>('');

  async function submit() {
    try {
      setStatus('Submitting...');
      const payload = { batchId, stepType, metadata: {}, timestamp };
      const res = await apiPost('/api/v1/processing-steps', payload, apiKey);
      setStatus(`Created event ${res.id}`);
    } catch (e: any) {
      setStatus(e.message || 'Error');
    }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Processing Step</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Batch ID</label>
              <Input value={batchId} onChange={(e) => setBatchId(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Step Type</label>
              <Input value={stepType} onChange={(e) => setStepType(e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Timestamp</label>
              <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
            </div>
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



