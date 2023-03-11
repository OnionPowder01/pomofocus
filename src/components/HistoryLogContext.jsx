import React, { createContext, useState } from 'react';

export const HistoryLogContext = createContext();

const HistoryLogProvider = ({ children }) => {
  const [historyLog, setHistoryLog] = useState([]);

  const addToHistory = (session) => {
    setHistoryLog((prevLog) => [...prevLog, session]);
  };

  return (
    <HistoryLogContext.Provider value={{ historyLog, addToHistory }}>
      {children}
    </HistoryLogContext.Provider>
  );
};

export default HistoryLogProvider;