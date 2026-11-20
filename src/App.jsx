import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import { LocationProvider, useLocationCtx } from './context/LocationContext';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';

// Dashboard needs a saved location; otherwise go to Setup.
function Guarded({ children }) {
  const { location } = useLocationCtx();
  return location ? children : <Navigate to="/setup" replace />;
}

export default function App() {
  return (
    <LangProvider>
      <LocationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/setup" element={<Setup />} />
            <Route path="/" element={<Guarded><Dashboard /></Guarded>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </LangProvider>
  );
}
