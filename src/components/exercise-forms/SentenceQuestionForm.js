import { useState, useEffect } from "react";

export default function SentenceQuestionForm({ index, onChange }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    onChange(
      {
        question,
        answer
      }
    );
  }, [answer, question])

  return (
    <div>
      <div>
        <text className="Text">{index}</text>
        <input type="text" placeholder="question..." value={question} onChange={(e) => setQuestion(e.target.value)}></input>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "15%"
      }}>
        <input type="text" placeholder="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
      </div>
    </div>
  );
}