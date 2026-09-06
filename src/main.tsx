import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ArcadeErrorBoundary } from './components/ArcadeErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArcadeErrorBoundary>
      <App />
    </ArcadeErrorBoundary>
  </StrictMode>,
);

