import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { deviceData, geoData } from '../services/mockData';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Scan Analytics</h2>
          <p className="text-slate-500">Dados detalhados dos últimos 30 dias.</p>
        </div>
        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Últimos 30 Dias</option>
          <option>Últimos 7 Dias</option>
          <option>Este Ano</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Dispositivos</h3>
          <p className="text-sm text-slate-500 mb-6">Qual hardware seus usuários estão usando?</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
             {deviceData.map((entry, index) => (
               <div key={entry.name} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}} />
                 <span className="text-sm text-slate-600 font-medium">{entry.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Geo Distribution (Simulated Map List) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Geolocalização</h3>
          <p className="text-sm text-slate-500 mb-6">Top 5 países por volume de scans.</p>
          
          <div className="space-y-4">
            {geoData.map((item, idx) => (
              <div key={item.country} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <span className="text-slate-400 font-mono text-sm">0{idx + 1}</span>
                   <span className="font-medium text-slate-800">{item.country}</span>
                 </div>
                 <div className="flex items-center gap-4 flex-1 justify-end">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.scans / 1200) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700 min-w-[50px] text-right">{item.scans}</span>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 text-center">
             <p className="text-xs text-slate-500">Os dados de localização são baseados no IP anonimizado.</p>
          </div>
        </div>
      </div>

       {/* Time Hourly Distribution */}
       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Scans por Hora do Dia</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                  {hour: '00', scans: 20}, {hour: '04', scans: 5}, {hour: '08', scans: 120}, 
                  {hour: '12', scans: 450}, {hour: '16', scans: 380}, {hour: '20', scans: 200}, {hour: '23', scans: 80}
               ]}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                 <Tooltip cursor={{fill: '#f1f5f9'}} />
                 <Bar dataKey="scans" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
               </BarChart>
            </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
};
