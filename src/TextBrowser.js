import { Colors, deleteTextItem, FILTER_ANY, getTextItem, getTextItems, LA_ENGLISH } from "shared-remote-utils";
import Dropdown from "./components/Dropdown";
import { useDraft } from "./context/DraftStorage";
import { getAndSetFilters } from "./utils/usefulFunctions";
import { useState, useEffect } from "react";
import RemoveBtn from "./components/RemoveBtn";

export default function TextBrowser({ editText }) {
  const {
    textArr,
    setTextArr,
    setUpdateMode,

    setTitle,
    setMainText,
    setSelectedTopic,
    setSelectedLevel,
    setSelectedLanguage,
    setIsFree,
    setId,

    setMltChoices,
    setSntQuestions,
    setRearSentences,
    setOddOuts,
    setFillGaps,
  } = useDraft();

  const [searchTopic, setSearchTopic] = useState(FILTER_ANY);
  const [searchLevel, setSearchLevel] = useState(FILTER_ANY);
  const [searchLanguage, setSearchLanguage] = useState(LA_ENGLISH);

  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);

  async function refresh(level, language, topic) {
    const res = await getTextItems(level, language, topic);
    console.log("language:", language, "level:", level, "topic:", topic);
    console.log(res);

    if (res.status === 200) {
      setTextArr(res.body);
    } else {
      alert("error fetching texts");
    }
  }

  function updateText(
    id,
    title,
    topic,
    language,
    level,
    textContent,
    isFree,
    mltChoices,
    sntQuestions,
    rearSentences,
    oddOuts,
    fillGaps
  ) {
    setId(id);
    setTitle(title);
    setSelectedTopic(topic);
    setSelectedLanguage(language);
    setSelectedLevel(level);
    setMainText(textContent);
    setIsFree(isFree);

    setMltChoices(mltChoices || []);
    setSntQuestions(sntQuestions || []);
    setRearSentences(rearSentences || []);
    setOddOuts(oddOuts || []);
    setFillGaps(fillGaps || []);

    setTimeout(() => {
      setUpdateMode();
      editText();
    }, 0);
  }

  useEffect(() => {
    (async () => {
      getAndSetFilters(setLanguages, setLevels, setTopics);
      if (textArr == []) {
        refresh(() => { }, "");
      }
    })();
  }, []);

  return (
    <div>
      <div className="Tab-content" style={{ display: "flex", flexDirection: "row" }}>
        <Dropdown
          options={languages}
          selected={searchLanguage}
          onSelect={(val) => {
            setSearchLanguage(val);
            refresh(searchLevel, val, searchTopic);
          }}
        />

        <Dropdown
          options={[FILTER_ANY, ...levels]}
          selected={searchLevel}
          onSelect={(val) => {
            setSearchLevel(val);
            refresh(val, searchLanguage, searchTopic);
          }}
        />

        <Dropdown
          options={[FILTER_ANY, ...topics]}
          selected={searchTopic}
          onSelect={(val) => {
            setSearchTopic(val);
            refresh(searchLevel, searchLanguage, val);
          }}
        />
        <button onClick={() => { refresh(searchLevel, searchLanguage, searchTopic) }}>Refresh</button>
      </div>
      <div style={{ overflowY: "scroll", height: "400px", display: "flex", flexDirection: "column", alignItems: "center" }} className="Tab-content">
        {textArr.map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "80%", marginBottom: "10px" }}>
            <TextItem title={item.title} topic={item.topic} language={item.language} level={item.level} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <RemoveBtn onClick={async () => {
                const res = await deleteTextItem(item.id);
                if (res.status === 200) {
                  refresh(searchLevel, searchLanguage, searchTopic);
                  alert("deleted item successfully!");

                } else {
                  alert("error deleting item");
                }
              }} />
              <button onClick={async () => {
                const res = await getTextItem(item.id);
                console.log(res);
                if (res.status == 200) {

                  const body = res.body
                  updateText(
                    body.item.id,
                    body.item.title,
                    body.item.topic,
                    body.item.language,
                    body.item.level,
                    body.text || "",
                    body.isFree || false,
                    body.exercises?.find(e => e.type === "MULTIPLE_CHOICE")?.tasks || [],
                    body.exercises?.find(e => e.type === "SENTENCE_QUESTION")?.tasks || [],
                    body.exercises?.find(e => e.type === "REARRANGE_SENTENCE")?.tasks || [],
                    body.exercises?.find(e => e.type === "ODD_ONE_OUT")?.tasks || [],
                    body.exercises?.find(e => e.type === "FILL_GAPS")?.tasks || []
                  );
                } else {
                  alert("error fetching text ", item.id);
                }
              }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextItem({ title, topic, language, level }) {
  const color = Colors.dark.element;
  return (
    <div style={{ backgroundColor: color, display: "flex", flexDirection: "column", flex: 1, padding: "10px", borderRadius: "8px" }}>
      <h2>{title}</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{topic}</h3>
        <h3>{language}</h3>
        <h3>{level}</h3>
      </div>
    </div>
  );
}

