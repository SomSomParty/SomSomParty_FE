import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userName, setUserName] = useState("");
  const [fcmToken, setFcmToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userName,
        setUserName,
        fcmToken,
        setFcmToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};