import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Bus, MapPin, Phone, CheckCircle2, Download } from 'lucide-react';

const StudentTransport = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 dark:border-surface-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 uppercase font-mono">
            CAMPUS TRANSPORT & BUS PASS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fleet tracking, assigned route schedule, and digital bus pass
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => alert('Downloading official stamped Digital Transport ID Pass...')}>
          <Download className="w-3.5 h-3.5" /> Download Digital Bus Pass
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Allocated Bus Route Information" subtitle="Route 42 - South Campus Express">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-slate-500">Route Number</span>
              <span className="font-mono font-bold text-slate-900">ROUTE-42</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-slate-500">Boarding Point / Stop</span>
              <span className="font-bold text-slate-900">City Center Metro Station (Gate 3)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-slate-500">Morning Pickup Time</span>
              <span className="font-mono font-bold text-emerald-700">07:45 AM</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-slate-500">Evening Departure Time</span>
              <span className="font-mono font-bold text-slate-900">04:45 PM (Main Gate Bay 4)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-slate-500">Driver In-Charge</span>
              <span className="font-bold text-slate-900">Mr. R. Sundaram (+91-98401-22910)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Transport Pass Status</span>
              <Badge variant="success" size="xs">ACTIVE & VERIFIED</Badge>
            </div>
          </div>
        </Card>

        <Card title="Transport Fee Statement" subtitle="Academic Year 2026-2027">
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border space-y-2">
              <div className="flex justify-between">
                <span>Annual Transport Subscription:</span>
                <span className="font-bold">₹35,000</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Amount Paid:</span>
                <span>₹35,000 (PAID)</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-mono">
                <span>Pass Expiry Date:</span>
                <span>31-May-2027</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Students must display this digital QR pass when boarding the university vehicle.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentTransport;

