import { createContext, useContext, useState, useCallback } from "react";

const DraftContext = createContext();

export const EDITOR_MODE = "EDITOR_MODE";
export const UPDATE_MODE = "UPDATE_MODE";

export function DraftProvider({ children }) {
  const [draft, setDraft] = useState({});
  const [id, setId] = useState("");

  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isFree, setIsFree] = useState(false);

  const [mltChoices, setMltChoices] = useState([]);
  const [sntQuestions, setSntQuestions] = useState([]);
  const [rearSentences, setRearSentences] = useState([]);
  const [oddOuts, setOddOuts] = useState([]);
  const [fillGaps, setFillGaps] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);

  const [textArr, setTextArr] = useState([]);
  const [textEditorMode, setTextEditorMode] = useState(EDITOR_MODE);

  const setUpdateMode = useCallback(() => setTextEditorMode(UPDATE_MODE), []);
  const setEditorMode = useCallback(() => setTextEditorMode(EDITOR_MODE), []);

  const resetVals = useCallback(() => {
    setTitle("");
    setMainText("");
    setSelectedTopic("");
    setSelectedLevel("");
    setSelectedLanguage("");
    setIsFree(false);
    setId("");

    setMltChoices([]);
    setSntQuestions([]);
    setRearSentences([]);
    setOddOuts([]);
    setFillGaps([]);

    setTextEditorMode(EDITOR_MODE);
  }, []);

  return (
    <DraftContext.Provider
      value={{
        draft, setDraft,
        id, setId,
        title, setTitle,
        mainText, setMainText,
        selectedTopic, setSelectedTopic,
        selectedLevel, setSelectedLevel,
        selectedLanguage, setSelectedLanguage,
        isFree, setIsFree,

        mltChoices, setMltChoices,
        sntQuestions, setSntQuestions,
        rearSentences, setRearSentences,
        oddOuts, setOddOuts,
        fillGaps, setFillGaps,

        languages, setLanguages,
        levels, setLevels,
        topics, setTopics,

        textArr, setTextArr,

        textEditorMode,
        setUpdateMode,
        setEditorMode,

        resetVals,
        EDITOR_MODE,
        UPDATE_MODE
      }}
    >
      {children}
    </DraftContext.Provider>
  );
}

export function useDraft() {
  return useContext(DraftContext);
}
