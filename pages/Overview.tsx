import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Scan, Users, QrCode as QRIcon } from 'lucide-react';
import { dailyScansData, qrTypeData, mockQRCodes } from '../services/mockData';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

const KpiCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={20} />
      </div>
      <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {change}%
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

export const Overview = () => {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total de Scans" value="142,392" change={12.5} icon={Scan} trend="up" />
        <KpiCard title="QR Codes Ativos" value="2,450" change={4.2} icon={QRIcon} trend="up" />
        <KpiCard title="Novos Usuários" value="384" change={-2.1} icon={Users} trend="down" />
        <KpiCard title="Taxa de Conversão" value="3.2%" change={0.8} icon={BarChart} trend="up" />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Desempenho de Scans (7 dias)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyScansData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Tipos de QR</h3>
          <div className="h-60 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qrTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {qrTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <span className="block text-2xl font-bold text-slate-800">45%</span>
                    <span className="text-xs text-slate-500">Links</span>
                </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {qrTypeData.slice(0, 3).map((item, index) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                        <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900">{item.value}%</span>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top QRs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Top QR Codes (Performance)</h3>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-800">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">QR Name/Target</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Scans</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockQRCodes.map((qr) => (
                <tr key={qr.qr_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center border border-slate-200">
                         <QRIcon size={16} className="text-slate-500" />
                      </div>
                      <div className="max-w-[200px] truncate">
                        <p className="font-medium text-slate-900 truncate">{qr.destino_encurtado || qr.destino_original}</p>
                        <p className="text-xs text-slate-500">ID: {qr.qr_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {qr.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{qr.data_criacao}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800">{qr.scans.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
