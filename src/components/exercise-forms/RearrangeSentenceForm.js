import { useState, useEffect } from "react";

export default function RearrangeSentenceForm({ value, index, onChange }) {
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    onChange(
      {
        sentence,
      }
    );
  }, [sentence])

  useEffect(() => {
    setSentence(value.sentence);
  }, [])

  return (
    <div>
      <div>
        <text className="Text">{index}</text>
        <input type="text" placeholder="sentence..." value={sentence} onChange={(e) => setSentence(e.target.value)}></input>
      </div>
    </div>
  );
}