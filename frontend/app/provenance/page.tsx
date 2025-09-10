"use client";
import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProvenancePage() {
  const [batchId, setBatchId] = useState('batch-1');
  const [events, setEvents] = useState<any[]>([]);
  const [status, setStatus] = useState('');

  async function load() {
    try {
      setStatus('Loading...');
      const data = await apiGet<{ batchId: string, events: any[] }>(`/api/v1/provenance/${batchId}`);
      setEvents(data.events || []);
      setStatus('');
    } catch (e: any) { setStatus(e.message || 'Error'); }
  }

  useEffect(() => { /* no auto-load */ }, []);

  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Provenance Viewer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Input value={batchId} onChange={(e) => setBatchId(e.target.value)} />
            <Button onClick={load}>Load</Button>
          </div>
          <div className="space-y-2">
            {events.map((e: any, idx: number) => (
              <div key={idx} className="border rounded p-3">
                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(e, null, 2)}</pre>
              </div>
            ))}
            {!events.length && <p className="text-sm text-muted-foreground">No events yet.</p>}
          </div>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}



