import logo from './logo.svg';
import './App.css';
import TextEditor from './TextEditor';
import ContentManager from './ContentManager';
import { useState, useEffect } from 'react';
import { config } from 'shared-remote-utils';
import LoginPage from './Login';
import { init } from "shared-remote-utils";
import { DraftProvider } from './context/DraftStorage';

const TEXT_EDITOR = "TEXT_EDITOR";
const CONTENT_MANAGER = "CONTENT_MANAGER";
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

  // useEffect(() => {
  //   if (isLoggedIn) {

  //   }
  // }, [isLoggedIn])

  function clickText() {
    if (isLoggedIn) setCurrScreen(TEXT_EDITOR);
  }
  function clickContent() {
    if (isLoggedIn) setCurrScreen(CONTENT_MANAGER);
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
      <DraftProvider>

        {
          {
            TEXT_EDITOR: <TextEditor activeTab={currScreen} />,
            LOGIN_SCREEN: <LoginPage onLogin={setIsLoggedIn} />,
            CONTENT_MANAGER: <ContentManager />
          }[currScreen]
        }
      </DraftProvider>

    </div >
  );
}

export default App;
