import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Globe, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';
import type { Language } from '../../types/dashboard';

export const Header: React.FC = () => {
  const { 
    lang, 
    setLang, 
    isOffline, 
    setIsOffline, 
    pendingSyncCount, 
    syncOfflineData,
    facility,
    setActiveFormulaModal
  } = useDashboard();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇮🇳' },
    { code: 'or', label: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  ];


  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between shadow-sm">
      {/* Left: Facility Title & CPCB Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-black text-xl shadow-lg shadow-indigo-200">
          ♻
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
              {facility.name}
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 mr-1" />
                CPCB Authorized
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono hidden md:block">
            {facility.cpcb_id} • {facility.location.split(',')[1]}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">


        {/* Offline Simulator Switch */}
        <div className="flex items-center">
          <button
            onClick={() => {
              if (isOffline && pendingSyncCount > 0) {
                syncOfflineData();
              }
              setIsOffline(!isOffline);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isOffline
                ? 'bg-amber-50 border-amber-300 text-amber-700 animate-pulse'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Offline Mode</span>
                {pendingSyncCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                    {pendingSyncCount} cached
                  </span>
                )}
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Online</span>
              </>
            )}
          </button>
        </div>

        {/* Sync trigger if pending */}
        {isOffline && pendingSyncCount > 0 && (
          <button
            onClick={syncOfflineData}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            title="Sync offline records to server"
          >
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span className="hidden lg:inline">Sync ({pendingSyncCount})</span>
          </button>
        )}

        {/* Vernacular Language Selector */}
        <div className="relative flex items-center">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-600">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-xs font-medium text-slate-700 outline-none cursor-pointer pr-1"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-slate-800">
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
