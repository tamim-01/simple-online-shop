import React from 'react';
import Header from './components/Header.tsx';

import { UserProgressContextProvider } from './store/userDetailContext.tsx';
import UserDetailModal from './components/UserDetail.tsx';

const App: React.FC = () => {
  return (
    <>
    <UserProgressContextProvider> 
      <Header />
     <UserDetailModal />
     </UserProgressContextProvider>
  
    </>
  );
}

export default App;
