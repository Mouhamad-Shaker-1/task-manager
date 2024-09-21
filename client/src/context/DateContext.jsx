
import React, { createContext, useState } from "react";

export const DateContext = createContext();

// this context make sure the api call for task done by data
export const DateProvider = ({ children }) => {
  const [globleDateToAddingTask, setGlobleDateToAddingTask] = useState(
    new Date()
  );

  return (
    <DateContext.Provider
      value={{ globleDateToAddingTask, setGlobleDateToAddingTask }}
    >
      {children}
    </DateContext.Provider>
  );
};
