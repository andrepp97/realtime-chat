import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { ChatProvider } from './context/ChatProvider';
import { ContactProvider } from './context/ContactProvider';

// PAGES
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { SocketProvider } from './context/SocketProvider';

const App = () => {
  // STATE
  const [userId, setUserId] = useLocalStorage('id')

  // RENDER
  return (
    <div className="main-wrapper">
      {
        userId
        ? <SocketProvider id={userId}>
            <ContactProvider>
              <ChatProvider id={userId}>
                <Dashboard id={userId} />
              </ChatProvider>
            </ContactProvider>
          </SocketProvider>
        : <Login userLogin={setUserId} />}
    </div>
  )
};

export default App;