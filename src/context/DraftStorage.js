import { createContext, useContext, useState } from "react";

const DraftContext = createContext();

export function DraftProvider({ children }) {
  const [draft, setDraft] = useState({});

  return (
    <DraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDraft() {
  return useContext(DraftContext);
}
