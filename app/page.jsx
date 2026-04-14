'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        setFriends(data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    if (s === 'overdue') return 'bg-[#ffebee] text-[#ef5350]';
    if (s === 'almost due') return 'bg-[#fff3e0] text-[#ff9800]';
    return 'bg-[#205041] text-white'; 
  };

  if (loading) return <div className="text-center py-32 text-[#205041] text-2xl font-black animate-pulse">Loading Your Friends...</div>;

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24 w-full">
      
      {/* Banner Section */}
      <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-black text-[#1a202c] mb-5 tracking-tight leading-[1.1]">
          Friends to keep close in your life
        </h1>
        
        <p className="text-gray-400 text-base sm:text-[17px] mb-10 leading-relaxed max-w-[480px] font-medium px-4">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="bg-[#1a3a32] text-white px-8 py-3.5 rounded-md text-sm sm:text-base font-bold shadow-sm hover:bg-[#142d27] transition flex items-center gap-2">
          <span className="text-xl leading-none">+</span> Add a Friend
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24">
        {[
          { label: "Total Friends", val: "10" },
          { label: "On Track", val: "3" },
          { label: "Need Attention", val: "6" },
          { label: "Interactions This Month", val: "12" }
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 sm:p-10 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center border border-gray-50 flex flex-col justify-center min-h-[140px]">
            <h3 className="text-[32px] sm:text-[40px] font-bold text-[#1a3a32] leading-none mb-3">{card.val}</h3>
            <p className="text-[11px] sm:text-[12px] text-gray-400 font-medium tracking-normal">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Friends Grid */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Friends</h2>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {friends.map(friend => (
          <Link href={`/friends/${friend.id}`} key={friend.id}>
            <div className="group bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex flex-col items-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all cursor-pointer h-full">
              
              <div className="relative w-[70px] h-[70px] mb-5">
                <Image 
                  src={friend.picture || `https://i.pravatar.cc/150?u=${friend.id}`} 
                  alt={friend.name} 
                  fill
                  className="rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
                />
              </div>

              <h3 className="font-black text-gray-900 text-lg mb-1 tracking-tight text-center">{friend.name}</h3>
              <p className="text-[12px] text-gray-400 mb-5 font-semibold">{friend.days_since_contact || '62'}d ago</p>
              
              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {(friend.tags || ['WORK']).map(tag => (
                  <span key={tag} className="text-[9px] font-black tracking-widest px-3 py-1 bg-[#e0f8f1] text-[#2ebd85] rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto w-full flex justify-center">
                <span className={`text-[11px] font-black px-6 py-2 rounded-full capitalize tracking-wide shadow-sm ${getStatusColor(friend.status)}`}>
                  {friend.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}