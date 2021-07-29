import React from 'react';
import { SocketProvider } from './context/SocketContext';
import { HomePage } from './HomePage';

const App = () => {
  return (
    <AppState>
      <HomePage />
    </AppState>
  );
}

const AppState: React.FC = ({ children }) => {
  return (
    <SocketProvider>
      { children }
    </SocketProvider>
  );
}

export default App;