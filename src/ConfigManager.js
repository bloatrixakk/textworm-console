import { useEffect, useState } from "react";
import OptionsElement from "./components/OptionElement";
import { getFilters, setFilters } from "shared-remote-utils";
import { addElement as addStateArrElement, handleStateArrChange, removeStateArrElement } from "./utils/ArrayStateHelpers";
import AddBtn from "./components/AddBtn";
import { getAndSetFilters } from "./utils/usefulFunctions";

export default function ContentManager() {

  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    let called = false;
    if (!called) {
      called = true;
      (async () => {
        getAndSetFilters(setLanguages, setLevels, setTopics);
      })();
    }
  }, []);


  // TODO: refactor options element
  return (
    <div className='Tab-content'>
      <button onClick={async () => {
        const res = await setFilters({
          languages,
          levels,
          topics
        })
        if (res.status === 200) {
          alert("updated filters successfuly");
        } else {
          alert("error while updating filters");
        }
      }}>submit</button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FilterOption placeholder="new language" arr={languages} setArr={setLanguages} />
        <FilterOption placeholder="new level" arr={levels} setArr={setLevels} />
        <FilterOption placeholder="new topic" arr={topics} setArr={setTopics} />
      </div>
    </div>
  );
}

function FilterOption({ placeholder, arr, setArr }) {
  return (
    <div>
      <AddBtn onClick={() => {
        addStateArrElement("", arr, setArr)
      }} />
      {arr.map((_, i) => (
        <OptionsElement
          key={i}
          placeholder={placeholder}
          value={arr[i]}
          removeCb={() => removeStateArrElement(i, arr, setArr)}
          onChange={(e) => handleStateArrChange(i, e, arr, setArr)} />
      ))}

    </div>
  );
}