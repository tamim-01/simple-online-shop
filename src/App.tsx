import React from 'react';
import Header from './components/Header.tsx';

import { UserDetailsContextProvider } from './store/userDetailContext.tsx';
import UserDetailModal from './components/UserDetail.tsx';
import ShowingCarts from './components/ShowingCarts.tsx';

const App: React.FC = () => {
  return (
    <>
    <UserDetailsContextProvider> 
      <Header />
     <UserDetailModal />
     <ShowingCarts/>
     </UserDetailsContextProvider>
  
    </>
  );
}

export default App;
