import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || "");
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || "");
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || "");
  const [fcmToken, setFcmToken] = useState(() => localStorage.getItem('fcmToken') || "");
  const [idToken, setIdToken] = useState(() => localStorage.getItem('idToken') || "");

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }

    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }

    if (fcmToken) {
      localStorage.setItem('fcmToken', fcmToken);
    } else {
      localStorage.removeItem('fcmToken');
    }

    if (idToken) {
      localStorage.setItem('idToken', idToken);
    } else {
      localStorage.removeItem('idToken');
    }
  }, [accessToken, refreshToken, userName, fcmToken, idToken]);

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
        idToken,
        setIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
