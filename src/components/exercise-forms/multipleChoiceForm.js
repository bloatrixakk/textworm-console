import { useEffect, useState } from "react";
import { handleStateArrChange, removeStateArrElement } from "../../utils/ArrayStateHelpers";
import OptionsElement from "../OptionElement";
import AddBtn from "../AddBtn";

export default function MultipleChoiceForm({ index, onChange }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  useEffect(() => {
    onChange(
      {
        question: question,
        options: options
      }
    );
  }, [options, question])

  function addBtnClick() {
    // setOptions(prev => [...prev, `Answer${options.length + 1}`])
    setOptions(prev => [...prev, ""])
  }

  return (
    <div>
      <div>
        {/* TODO: import colors and change here */}
        <text className="Text">{index}</text>
        <input type="text" placeholder="question..." value={question} onChange={(e) => setQuestion(e.target.value)}></input>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "15%"
      }}>
        {options.map((_, i) => (
          <OptionsElement key={i} value={options[i]} removeCb={() => { if (options.length > 2) removeStateArrElement(i, options, setOptions) }} onChange={(e) => handleStateArrChange(i, e, options, setOptions)} />
        ))}
        <AddBtn onClick={addBtnClick} />
      </div>
    </div>
  );
}

