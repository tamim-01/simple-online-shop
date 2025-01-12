import React, { useMemo, useState, createContext, useCallback } from "react";

//type for user data
interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

interface UserData {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
}

//context type
type UserProgressContextType = {
  showUserDetails: boolean;
  userData: UserData | null; 
  showUser: () => void;
  hideUser: () => void;
  setUserData: (data: UserData) => void; 

};

// Create the context
const UserProgressContext = createContext<UserProgressContextType>({
  showUserDetails: false,
  userData: null,
  showUser: () => {},
  hideUser: () => {},
  setUserData: () => {}
});

//provider
export function UserProgressContextProvider({ children }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); 

  const showUser = useCallback(() => {
    setShowUserDetails(true);
  }, []);

  const hideUser = useCallback(() => {
    setShowUserDetails(false);
  }, []);

  const handleSetUserData = useCallback((data: UserData) => {
    setUserData(data);
  }, []);

  

  
  const UserProgressCtx = useMemo(
    () => ({
      showUserDetails,
      userData,
      showUser,
      hideUser,
      setUserData: handleSetUserData,
     
    }),
    [showUserDetails, userData, showUser, hideUser, handleSetUserData]
  );

  return (
    <UserProgressContext.Provider value={UserProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;