import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { resolveLocation } from '../data/locations';
import { load, save } from '../utils/storage';

const LocationContext = createContext(null);
const MAX_CARDS = 6;

export function LocationProvider({ children }) {
  const [ids, setIds] = useState(() => load('gs.location', null));
  const [cards, setCards] = useState(() => load('gs.cards', []));
  const [activeCard, setActiveCard] = useState(() => load('gs.activeCard', ''));

  const location = useMemo(() => (ids ? resolveLocation(ids) : null), [ids]);

  const saveLocation = useCallback((next) => {
    setIds(next);
    save('gs.location', next);
  }, []);

  const clearLocation = useCallback(() => {
    setIds(null);
    save('gs.location', null);
  }, []);

  const rememberCard = useCallback((id) => {
    setActiveCard(id);
    save('gs.activeCard', id);
    setCards((prev) => {
      const next = [id, ...prev.filter((c) => c !== id)].slice(0, MAX_CARDS);
      save('gs.cards', next);
      return next;
    });
  }, []);

  const removeCard = useCallback((id) => {
    setCards((prev) => {
      const next = prev.filter((c) => c !== id);
      save('gs.cards', next);
      return next;
    });
  }, []);

  const value = {
    location, saveLocation, clearLocation,
    cards, rememberCard, removeCard, activeCard,
  };
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export const useLocationCtx = () => useContext(LocationContext);
