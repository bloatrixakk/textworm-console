import logo from './logo.svg';
import './App.css';
import TextEditor from './TextEditor';
import ContentManager from './ConfigManager';
import { useState, useEffect } from 'react';
import { config } from 'shared-remote-utils';
import LoginPage from './Login';
import { init } from "shared-remote-utils";
import { DraftProvider } from './context/DraftStorage';
import TextBrowser from './TextBrowser';
const pjson = require('../package.json');

const TEXT_EDITOR = "TEXT_EDITOR";
const CONFIG_MANAGER = "CONFIG_MANAGER";
const TEXT_BROWSER = "TEXT_BROWSER";
const LOGIN_SCREEN = "LOGIN_SCREEN";

function App() {
  const [currScreen, setCurrScreen] = useState(TEXT_EDITOR)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      init(
        window.electronAPI.saveToken,
        window.electronAPI.getToken,
        window.electronAPI.deleteToken,
        () => setCurrScreen(LOGIN_SCREEN),
        "app"
      );

      async function checkToken() {
        const tokenValue = await config.getToken();
        if (tokenValue) {
          setIsLoggedIn(true);
        } else {
          setCurrScreen(LOGIN_SCREEN);
        }
        console.log(tokenValue);
      }
      checkToken();
    } else {
      console.error("electronAPI not loaded!");
    }
  }, []);

  function clickText() {
    if (isLoggedIn) setCurrScreen(TEXT_EDITOR);
  }
  function clickContent() {
    if (isLoggedIn) setCurrScreen(CONFIG_MANAGER);
  }
  function clickBrowser() {
    if (isLoggedIn) setCurrScreen(TEXT_BROWSER);
  }

  return (
    <div className="App">
      <header className="App-header">

        <h2>Creator console</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <button className='Tab' onClick={clickText}>Text Editor</button>
          <button className='Tab' onClick={clickContent}>Config Manager</button>
          <button className='Tab' onClick={clickBrowser}>Text Browser</button>
        </div>
      </header >
      <DraftProvider>
        {
          {
            TEXT_EDITOR: <TextEditor activeTab={currScreen} />,
            LOGIN_SCREEN: <LoginPage onLogin={setIsLoggedIn} />,
            CONFIG_MANAGER: <ContentManager />,
            TEXT_BROWSER: <TextBrowser editText={() => {
              clickText();
            }} />
          }[currScreen]
        }
      </DraftProvider>
      <div style={{ position: "fixed", right: "30px", bottom: "10px", fontSize: "12px", fontWeight: "bold" }}>
        <p className='Text'>Warning! drafts aren't saved between app reloads!</p>
        <p className='Text'>Development build {pjson.version}</p>
      </div>
    </div >
  );
}

export default App;
