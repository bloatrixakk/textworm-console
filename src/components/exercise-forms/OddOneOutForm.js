import { useEffect, useState } from "react";
import { handleStateArrChange, removeStateArrElement } from "../../utils/ArrayStateHelpers";
import OptionsElement from "../OptionElement";
import AddBtn from "../AddBtn";

export default function OddOneOutForm({ index, onChange }) {
  const [options, setOptions] = useState(["", "", ""]);

  useEffect(() => {
    onChange(
      {
        options: options
      }
    );
  }, [options])

  function addBtnClick() {
    // setOptions(prev => [...prev, `Answer${options.length + 1}`])
    setOptions(prev => [...prev, ""])
  }

  return (
    <div>
      <div>
        <text className="Text">{index}</text>
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

