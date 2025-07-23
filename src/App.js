import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Creator console</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div className='Text-editor'>
        <h2>ADD TEXT</h2>
        <div id='dropdown-panel'>
          <input id='title-box' placeholder='title here'></input>
        </div>
        <div id='text-content' className='Content'>
          <textarea type='text' placeholder='Your text here' id='main-text'></textarea>
        </div>
        <div id='exercise-content' className='Content'>
          {/* TODO: exercise form here */}
        </div>
      </div>
    </div>
  );
}

export default App;
