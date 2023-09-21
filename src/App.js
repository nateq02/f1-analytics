import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
/*function App() {
  return (
    <div>
      <h1 className = "text-3xl fond-bold underline bg-slate-600">
        Hello world!
      </h1>
    </div>
  );
}*/

function Logo() {
  return (
    <img src={require("./logo.jpg")} className="w-80" alt="logo" />
  );
}

function Box() {
  return (
    <div className="border rounded-lg border-red-500 w-[30%] h-[45%]"></div>
  )
}

export { Logo, Box };