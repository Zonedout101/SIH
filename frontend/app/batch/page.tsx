"use client";
import { useState } from 'react';
import { apiGet, apiPost } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BatchPage() {
  const [batchId, setBatchId] = useState('batch-1');
  const [apiKey, setApiKey] = useState<string>('admin-key');
  const [qr, setQr] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  async function createBatch() {
    try {
      setStatus('Creating batch...');
      await apiPost('/api/v1/batches', { id: batchId }, apiKey);
      setStatus('Batch created');
    } catch (e: any) { setStatus(e.message || 'Error'); }
  }

  async function getQr() {
    try {
      setStatus('Generating QR...');
      const resp = await apiGet<{ id: string, qr: string }>(`/api/v1/batches/${batchId}/qr`);
      setQr(resp.qr);
      setStatus('QR ready');
    } catch (e: any) { setStatus(e.message || 'Error'); }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Batch & QR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Batch ID</label>
              <Input value={batchId} onChange={(e) => setBatchId(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm">API Key</label>
            <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button onClick={createBatch}>Create Batch</Button>
            <Button onClick={getQr} variant="secondary">Get QR</Button>
          </div>
          {qr && <img src={qr} alt="QR" className="mt-2 w-48 h-48" />}
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}



