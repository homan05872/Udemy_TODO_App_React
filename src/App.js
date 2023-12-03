import logo from './logo.svg';
import './static/App.css';
import DrfApiFetch from './components/DrfApiFetch';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='header-title'>
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className='title-text'>TODOリスト</h3>
        </div>
      </header>
      <main>
      <DrfApiFetch/>
      </main>
        
    </div>
  );
}

export default App;
