import { useEffect, useState } from "react";
import { handleStateArrChange, removeStateArrElement } from "../../utils/ArrayStateHelpers";
import OptionsElement from "../OptionElement";
import AddBtn from "../AddBtn";
import Dropdown from "../Dropdown";

export default function OddOneOutForm({ value, index, onChange }) {
  const [options, setOptions] = useState(["", "", ""]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    onChange(
      {
        options: options,
        answer: answer,
      }
    );
  }, [options, answer])

  useEffect(() => {
    if (Array.isArray(value?.options)) {
      setOptions(value.options);
    }
    setAnswer(value.answer);
  }, [])

  function addBtnClick() {
    setOptions(prev => [...prev, ""])
  }

  return (
    <div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "15%"
      }}>
        <text className="Text">{index}</text>
          <Dropdown options={options} selected={answer} onSelect={setAnswer}/>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "15%"
      }}>
        {options.map((_, i) => (
          <OptionsElement placeholder="option" key={i} value={options[i]} removeCb={() => { if (options.length > 3) removeStateArrElement(i, options, setOptions) }} onChange={(e) => handleStateArrChange(i, e, options, setOptions)} />
        ))}
        <AddBtn onClick={addBtnClick} />
      </div>
    </div>
  );
}

