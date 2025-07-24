import { useState, useEffect } from "react";

export default function RearrangeSentenceForm({ index, onChange }) {
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    onChange(
      {
        sentence,
      }
    );
  }, [sentence])

  return (
    <div>
      <div>
        <text className="Text">{index}</text>
        <input type="text" placeholder="sentence..." value={sentence} onChange={(e) => setSentence(e.target.value)}></input>
      </div>
    </div>
  );
}