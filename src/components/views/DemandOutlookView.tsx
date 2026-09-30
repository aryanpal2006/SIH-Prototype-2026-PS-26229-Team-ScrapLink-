import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  BarChart3, 
  MapPin, 
  Calendar, 
  Navigation
} from 'lucide-react';

export const DemandOutlookView: React.FC = () => {
  const { materials, zones, facility } = useDashboard();

  const totalForecast = materials.reduce((acc, m) => acc + m.demand_forecast_kg, 0);
  const totalActual = materials.reduce((acc, m) => acc + m.actual_received_kg, 0);
  const totalZonesKg = zones.reduce((acc, z) => acc + z.total_kg, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Incoming Demand & Volume Outlook
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive collection volume modeling based on historical waste generation patterns across service clusters.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          <span>Forecast Horizon: Current Week</span>
        </div>
      </div>

      {/* Top Volume KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-slate-500 block mb-1">Predicted Weekly Intake</span>
          <div className="text-2xl font-black font-mono text-indigo-600">
            {totalForecast.toFixed(1)} kg
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Based on collector activity indices</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-slate-500 block mb-1">Actual Inward Volume</span>
          <div className="text-2xl font-black font-mono text-emerald-600">
            {totalActual.toFixed(1)} kg
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block font-medium">
            {((totalActual / totalForecast) * 100).toFixed(0)}% fulfillment rate
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-slate-500 block mb-1">Facility Intake Capacity</span>
          <div className="text-2xl font-black font-mono text-violet-600">
            {facility.daily_intake_capacity_kg * 7} kg / wk
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {facility.daily_intake_capacity_kg} kg/day licensed capacity
          </span>
        </div>
      </div>

      {/* Grid: Forecast vs Actual Bars (Left) & Zone / Distance Band (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Forecast vs Actual Volume by Category */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              Incoming Demand by Material Category
            </h3>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded bg-slate-300" /> Forecast
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Actual
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {materials.map((mat) => {
              const maxVal = Math.max(mat.demand_forecast_kg, mat.actual_received_kg, 40);
              const forecastPct = Math.round((mat.demand_forecast_kg / maxVal) * 100);
              const actualPct = Math.round((mat.actual_received_kg / maxVal) * 100);

              return (
                <div key={mat.id} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-semibold text-slate-700">{mat.name}</span>
                    <div className="font-mono text-[11px] space-x-2">
                      <span className="text-slate-400">{mat.demand_forecast_kg} kg est.</span>
                      <span className="text-emerald-600 font-bold">{mat.actual_received_kg} kg act.</span>
                    </div>
                  </div>

                  {/* Dual Bar Representation */}
                  <div className="space-y-1">
                    {/* Forecast bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-300 rounded-full"
                        style={{ width: `${forecastPct}%` }}
                      />
                    </div>
                    {/* Actual bar */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${actualPct}%`,
                          background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Breakdown by Service Zone & Distance Band */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" />
              Volume by Service Zone & Distance Band
            </h3>
            <span className="text-[11px] text-indigo-600 font-mono font-bold">
              {totalZonesKg} kg total
            </span>
          </div>

          <div className="space-y-3">
            {zones.map((z, idx) => {
              const zonePct = Math.round((z.total_kg / totalZonesKg) * 100);
              return (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-700 block">{z.zone_name}</span>
                      <span className="text-[11px] font-mono text-indigo-500 flex items-center gap-1 mt-0.5">
                        <Navigation className="w-3 h-3" />
                        {z.distance_band} • ~{z.avg_transit_hours}h transit
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-sm font-bold text-slate-700">{z.total_kg} kg</span>
                      <span className="text-[10px] text-slate-400 block">{z.lots_count} lots</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${zonePct}%`,
                        background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Planning Tip */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-slate-600">
            <span className="text-emerald-700 font-bold block mb-1">🚚 Fleet Dispatch Insight:</span>
            64% of volume originates within 0–5 km. Scheduling a dedicated electric 3-wheeler pickup loop in Kharagpur West reduces average transit time by 40 minutes.
          </div>
        </div>
      </div>
    </div>
  );
};
