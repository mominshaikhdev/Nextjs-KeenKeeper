'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Phone, MessageSquare, Video, Bell, Archive, Trash2, Home, Clock3, BarChart3 } from 'lucide-react';

export default function FriendDetail() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [isSearching, setIsSearching] = useState(true);
  const { addInteraction } = useAppContext();

  useEffect(() => {
    if (!id) return;
    setIsSearching(true);
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(f => f.id.toString() === id);
        setFriend(found);
        setIsSearching(false);
      }).catch(() => setIsSearching(false));
  }, [id]);

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'overdue') return 'bg-red-500 text-white';
    if (s === 'almost due') return 'bg-orange-400 text-white';
    return 'bg-emerald-600 text-white';
  };

  if (isSearching) return <div className="text-center py-32 text-slate-600 text-2xl font-bold animate-pulse">Finding Friend...</div>;
  if (!friend) return <div className="text-center py-32 text-slate-400 text-xl font-bold">Friend not found.</div>;

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar */}
        <div className="col-span-12 md:col-span-4 space-y-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-4">
              <Image 
                src={friend.picture || `https://i.pravatar.cc/150?u=${friend.id}`} 
                alt={friend.name} 
                fill 
                className="rounded-full object-cover border-2 border-white shadow-sm" 
              />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{friend.name}</h2>
            
            <div className="flex flex-col items-center gap-1.5 mb-6">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusClass(friend.status)}`}>
                {friend.status}
              </span>
              {(friend.tags || ['FAMILY']).map(tag => (
                <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-600">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-500 italic mb-2">"{friend.bio || 'Former colleague, great mentor'}"</p>
            <p className="text-[11px] text-slate-400 font-medium">Preferred: {friend.preferred_contact || 'email'}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-50">
              <Bell size={18} className="text-slate-400"/> Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-50">
              <Archive size={18} className="text-slate-400"/> Archive
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-red-500 hover:bg-red-50">
              <Trash2 size={18}/> Delete
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Days Since Contact", val: friend.days_since_contact || '62' },
              { label: "Goal (Days)", val: friend.goal || '30' },
              { label: "Next Due", val: "Feb 27, 2026" }
            ].map((stat, i) => (
              <div key={i} className="bg-white py-10 px-4 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.val}</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Relationship Goal Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-bold text-slate-700">Relationship Goal</h3>
              <button className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-100">Edit</button>
            </div>
            <p className="text-slate-500 text-sm font-medium">Connect every <span className="font-bold text-slate-900">30 days</span></p>
          </div>

          {/* Quick Check-In Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-md font-bold text-slate-700 mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Call", icon: Phone },
                { label: "Text", icon: MessageSquare },
                { label: "Video", icon: Video }
              ].map((btn, i) => (
                <button 
                  key={i}
                  onClick={() => { addInteraction(btn.label, friend.name); toast.success(`${btn.label} logged!`); }}
                  className="flex flex-col items-center justify-center gap-3 py-8 bg-slate-50/50 rounded-xl hover:bg-emerald-50 transition-colors group border border-transparent hover:border-emerald-100"
                >
                  <btn.icon size={24} className="text-slate-600 group-hover:text-emerald-700"/> 
                  <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}