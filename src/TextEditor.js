import { useEffect, useState } from "react";
import MultipleChoiceForm from "./components/exercise-forms/multipleChoiceForm";
import RemoveBtn from "./components/RemoveBtn";
import SentenceQuestionForm from "./components/exercise-forms/SentenceQuestionForm";
import RearrangeSentenceForm from "./components/exercise-forms/RearrangeSentenceForm";
import OddOneOutForm from "./components/exercise-forms/OddOneOutForm";
import Dropdown from "./components/Dropdown";
import Tickbox from "./components/Tickbox";
import { useDraft } from "./context/DraftStorage";
import { addTextItem } from "shared-remote-utils";

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
  const { draft, setDraft } = useDraft(); // Access global draft state

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
    loadDraft();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     saveDraft();
  //   };
  // }, []);
  useEffect(() => {
    saveDraft();
  }, [title, mainText, selectedTopic, selectedLevel, selectedLanguage, isFree, mltChoices, sntQuestions, rearSentences, oddOuts, fillGaps]);


  function createJSONSave() {
    let obj = {
      textDetails: {
        title,
        topic: selectedTopic,
        level: selectedLevel,
        language: selectedLanguage,
        content: mainText,
        isFree
      },
    }
    obj.exercises = [
      {
        type: "MULTIPLE_CHOICE",
        tasks: mltChoices
      },
      {
        type: "SENTENCE_QUESTION",
        tasks: sntQuestions
      },
      {
        type: "REARRANGE_SENTENCE",
        tasks: rearSentences
      },
      {
        type: "ODD_ONE_OUT",
        tasks: oddOuts
      },
      {
        type: "FILL_GAPS",
        tasks: fillGaps
      }
    ]
    return obj;
  }

  const saveDraft = () => {
    const newDraft = createJSONSave();
    setDraft(newDraft);
    console.log("saving draft...", newDraft);
  };

  // When loading:
  const loadDraft = () => {
    if (!draft || Object.keys(draft).length === 0) {
      console.log("No drafts saved");
      return;
    }
    console.log("Loading draft:", draft);

    const { textDetails, exercises } = draft;
    console.log("Loading draft:", textDetails);

    if (textDetails) {
      setTitle(textDetails.title);
      setMainText(textDetails.content);
      setSelectedTopic(textDetails.selectedTopic);
      setSelectedLevel(textDetails.selectedLevel);
      setSelectedLanguage(textDetails.selectedLanguage);
      setIsFree(textDetails.isFree || false);
    }

    if (Array.isArray(exercises)) {
      setMltChoices(exercises.find(e => e.type === "MULTIPLE_CHOICE")?.tasks);
      setSntQuestions(exercises.find(e => e.type === "SENTENCE_QUESTION")?.tasks);
      setRearSentences(exercises.find(e => e.type === "REARRANGE_SENTENCE")?.tasks);
      setOddOuts(exercises.find(e => e.type === "ODD_ONE_OUT")?.tasks);
      setFillGaps(exercises.find(e => e.type === "FILL_GAPS")?.tasks);
    }
  };


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

      <button onClick={async () => {
        const res = await addTextItem(createJSONSave());
        const status = res.status;
        if (status === 400) {
          alert("you havent done everyhting!");
        } else if (status === 200) {
          alert("text added successfuly!")
        }
      }}>Submit</button>
    </div>
  );
}

function AddPanel({ buttonArr }) {
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