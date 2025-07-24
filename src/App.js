import logo from './logo.svg';
import './App.css';
import TextEditor from './TextEditor';
import ContentManager from './ContentManager';
import { useState } from 'react';

const TEXT_EDITOR = "TEXT_EDITOR";
const CONTENT_MANAGER = "CONTENT_MANAGER";

function App() {
  const [currScreen, setCurrScreen] = useState(TEXT_EDITOR)

  function clickText() {
    setCurrScreen(TEXT_EDITOR);
  }
  function clickContent() {
    setCurrScreen(CONTENT_MANAGER);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Creator console</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <button className='Tab' onClick={clickText}>Text Editor</button>
        <button className='Tab' onClick={clickContent}>Content Editor</button>
    </div>
      </header >
    { currScreen === TEXT_EDITOR ? (
    <TextEditor activeTab={currScreen} />
  ) : (
    <ContentManager />
  )
}
    </div >
  );
}

export default App;
