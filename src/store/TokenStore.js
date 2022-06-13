import React, { useState, createContext } from 'react';

export const TokenContext = createContext();

const TokenStore = ({ children }) => {
  const [userToken, setUserToken] = useState('');

  return (
    <TokenContext.Provider value={(userToken, setUserToken)}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenStore;
