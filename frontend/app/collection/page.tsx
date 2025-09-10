"use client";
import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CollectionPage() {
  const [collectorId, setCollectorId] = useState('collector-1');
  const [species, setSpecies] = useState('Ashwagandha');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>(new Date().toISOString());
  const [apiKey, setApiKey] = useState<string>('collector-key');
  const [status, setStatus] = useState<string>('');

  async function submit() {
    try {
      setStatus('Submitting...');
      const payload = { collectorId, species, latitude: Number(latitude), longitude: Number(longitude), timestamp };
      const res = await apiPost('/api/v1/collection-events', payload, apiKey);
      setStatus(`Created event ${res.id}`);
    } catch (e: any) {
      setStatus(e.message || 'Error');
    }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>New Collection Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Collector ID</label>
              <Input value={collectorId} onChange={(e) => setCollectorId(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Species</label>
              <Input value={species} onChange={(e) => setSpecies(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">Latitude</label>
              <Input type="number" value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm">Longitude</label>
              <Input type="number" value={longitude} onChange={(e) => setLongitude(Number(e.target.value))} />
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



