'use client';
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [timeline, setTimeline] = useState([
    { id: 1, type: 'Meetup', friend: 'Tom Baker', date: 'March 29, 2026' },
    { id: 2, type: 'Text', friend: 'Sarah Chen', date: 'March 28, 2026' },
    { id: 3, type: 'Video', friend: 'Aisha Patel', date: 'March 23, 2026' },
  ]);

  const addInteraction = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      type,
      friend: friendName,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setTimeline([newEntry, ...timeline]);
  };

  return (
    <AppContext.Provider value={{ timeline, addInteraction }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);