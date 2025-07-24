import { useEffect, useState } from "react";
import MultipleChoiceForm from "./components/exercise-forms/multipleChoiceForm";
import RemoveBtn from "./components/RemoveBtn";
import SentenceQuestionForm from "./components/exercise-forms/SentenceQuestionForm";
import RearrangeSentenceForm from "./components/exercise-forms/RearrangeSentenceForm";
import OddOneOutForm from "./components/exercise-forms/OddOneOutForm";
import Dropdown from "./components/Dropdown";
import Tickbox from "./components/Tickbox";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function ExerciseWrapper({ children, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "10px",
        border: "1px solid #444",
        borderRadius: "8px",
        width: "fit-content",
        background: "#2b2b2b",
        marginTop: "20px"
      }}
    >
      <div>{children}</div>
      <div style={{ marginLeft: "50px" }}>
        <RemoveBtn onClick={onRemove} />
      </div>
    </div>
  );
}

export default function TextEditor({ activeTab }) {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isFree, setIsFree] = useState(false);

  const [mltChoices, setMltChoices] = useState([]);
  const [sntQuestions, setSntQuestions] = useState([]);
  const [rearSentences, setRearSentences] = useState([]);
  const [oddOuts, setOddOuts] = useState([]);
  const [fillGaps, setFillGaps] = useState([]);

  useEffect(() => {
    saveDraft();
  }, [activeTab])

  useEffect(() => {
    loadDraft();
  }, [])

  const saveDraft = () => {
    // TODO: implement
    console.log("saving draft...")
  }

  const loadDraft = () => {
    // TODO: implement
    console.log("loading draft...")
  }

  const addExercise = (setter, template) => {
    setter(prev => [...prev, { ...template, id: generateId() }]);
  };

  const updateExercise = (id, updated, setter) => {
    setter(prev => prev.map(item => (item.id === id ? { ...updated, id } : item)));
  };

  const removeExercise = (id, setter) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div id="text-editor">
      <AddPanel

        buttonArr={
          [
            {
              icon: "icons/exercises/mlt-choice.png",
              text: "MultiChoice",
              cb: () => addExercise(setMltChoices, { question: "", options: ["", ""] }),
            },
            {
              icon: "icons/exercises/mlt-choice.png",
              text: "SentenceQuestion",
              cb: () => addExercise(setSntQuestions, { question: "", answer: "" }),
            },
            {
              icon: "icons/exercises/mlt-choice.png",
              text: "RearrangeSentence",
              cb: () => addExercise(setRearSentences, { sentence: "" }),
            },
            {
              icon: "icons/exercises/mlt-choice.png",
              text: "OddOneOut",
              cb: () => addExercise(setOddOuts, { options: "" }),
            },
            {
              icon: "icons/exercises/mlt-choice.png",
              text: "FillInTheGaps",
              cb: () => addExercise(setFillGaps, { options: "" }),
            },
          ]}
      />

      <h2 className="Text">ADD TEXT</h2>

      <div id="dropdown-panel">
        <input
          id="title-box"
          className="title-input"
          placeholder="title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Dropdown
          // TODO: fetch from cloud
          options={['English', 'German', 'Russian']}
          selected={selectedLanguage}
          onSelect={setSelectedLanguage}
        />
        <Dropdown
          // TODO: fetch from cloud
          options={['Basic', 'Elementary', 'Intermediate']}
          selected={selectedLevel}
          onSelect={setSelectedLevel}
        />
        <Dropdown
          // TODO: fetch from cloud
          options={['Animals', 'Biography', 'Sports']}
          selected={selectedTopic}
          onSelect={setSelectedTopic}
        />
        <Tickbox
          label="Is free?"
          checked={isFree}
          onChange={setIsFree}
        />
      </div>

      <div id="text-content" className="Content">
        <textarea
          id="main-text"
          className="main-textarea"
          placeholder="Your text here"
          value={mainText}
          onChange={(e) => setMainText(e.target.value)}
        />
      </div>

      <div id="exercise-content" className="Content">
        <text className="Text">MULTIPLE CHOICES</text>
        {mltChoices.map((item, i) => (
          <ExerciseWrapper key={item.id} onRemove={() => removeExercise(item.id, setMltChoices)}>
            <MultipleChoiceForm
              index={i + 1}
              data={item}
              onChange={(updated) => updateExercise(item.id, updated, setMltChoices)}
            />
          </ExerciseWrapper>
        ))}
        <text className="Text">SENTENCE QUESTIONS</text>
        {sntQuestions.map((item, i) => (
          <ExerciseWrapper key={item.id} onRemove={() => removeExercise(item.id, setSntQuestions)}>
            <SentenceQuestionForm index={i + 1} onChange={(updated) => updateExercise(item.id, updated, setSntQuestions)} />
          </ExerciseWrapper>
        ))}
        <text className="Text">REARRANGE SENTENCES</text>
        {rearSentences.map((item, i) => (
          <ExerciseWrapper key={item.id} onRemove={() => removeExercise(item.id, setRearSentences)}>
            <RearrangeSentenceForm index={i + 1} onChange={(updated) => updateExercise(item.id, updated, setRearSentences)} />
          </ExerciseWrapper>
        ))}
        <text className="Text">ODD ONE OUT</text>
        {oddOuts.map((item, i) => (
          <ExerciseWrapper key={item.id} onRemove={() => removeExercise(item.id, setOddOuts)}>
            <OddOneOutForm index={i + 1} onChange={(updated) => updateExercise(item.id, updated, setOddOuts)} />
          </ExerciseWrapper>
        ))}
        <text className="Text">FILL IN THE GAPS</text>
        {fillGaps.map((item, i) => (
          <ExerciseWrapper key={item.id} onRemove={() => removeExercise(item.id, setFillGaps)}>
            {/* reuse one form here */}
            <RearrangeSentenceForm index={i + 1} onChange={(updated) => updateExercise(item.id, updated, setFillGaps)} />
          </ExerciseWrapper>
        ))}
      </div>

      <button onClick={() => {
        console.log(
          "MultiChoices: ", mltChoices,
          "SentenceQuestions: ", sntQuestions
        );
      }}>Submit</button>
    </div>
  );
}

function AddPanel({ buttonArr, saveCb }) {
  // a floating panel on the screen 
  return (
    <div className="Add-panel">
      <p className="Text">Add Exercises Here!</p>
      {buttonArr.map((obj, i) => (
        <IconAndButton
          key={i}
          onClick={obj.cb}
          iconPath={obj.icon}
          btnText={obj.text}
        />
      ))}
    </div>
  );
}

function IconAndButton({ onClick, iconPath, btnText }) {
  return (
    <div>
      <button onClick={onClick}>
        <img className="Small-icon" src={iconPath}></img>
        <text>{btnText}</text>
      </button>
    </div>
  )
}
