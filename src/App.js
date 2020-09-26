import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { ChatProvider } from './context/ChatProvider';
import { ContactProvider } from './context/ContactProvider';

// PAGES
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  // STATE
  const [userId, setUserId] = useLocalStorage('id')

  // RENDER
  return (
    <div className="main-wrapper">
      {
        userId
        ? <ContactProvider>
            <ChatProvider>
              <Dashboard id={userId} />
            </ChatProvider>
          </ContactProvider>
        : <Login userLogin={setUserId} />}
    </div>
  )
};

export default App;