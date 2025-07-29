import { useState, useEffect } from "react";

export default function SentenceQuestionForm({ value, index, onChange }) {
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

  useEffect(() => {
    setQuestion(value.question);
    setAnswer(value.answer);
  }, [])

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