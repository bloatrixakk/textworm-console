import { useEffect, useState } from "react";
import { handleStateArrChange, removeStateArrElement } from "../../utils/ArrayStateHelpers";
import OptionsElement from "../OptionElement";
import AddBtn from "../AddBtn";
import Dropdown from "../Dropdown";

export default function MultipleChoiceForm({ value, index, onChange }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    onChange(
      {
        question: question,
        options: options,
        answer: answer,
      }
    );
  }, [options, question, answer])

  useEffect(() => {
    setQuestion(value.question);
    setOptions(value.options);
    setAnswer(value.answer);
  }, [])

  function addBtnClick() {
    // setOptions(prev => [...prev, `Answer${options.length + 1}`])
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
        <div style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "15%"
        }}>
          <input type="text" placeholder="question..." value={question} onChange={(e) => setQuestion(e.target.value)}></input>
          {/* <input type="text" placeholder="answer..." value={answer} onChange={(e) => setAnswer(e.target.value)}></input> */}
          <Dropdown options={options} selected={answer} onSelect={setAnswer}/>
        </div>
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

