import React from "react";
import "./App.css";
import logo from "./walden-logo.png";
import { Lottery } from "./Lottery";

function App() {
  const [goAgain, setGoAgain] = React.useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Walden School Logo" />
        <h1>Walden School of Liberal Arts</h1>
        {goAgain ? <h2>Thank you for submitting an application to the lottery.</h2> : <h2>Admission Lottery Application</h2>}
        {!goAgain && 
          <p>
            Please submit one application per student, per year you wish to be
            in the lottery.
          </p>
        }
        <a href={`#lottery-application`} onClick={(e: any) => {goAgain && window.location.reload()}}>
          {goAgain ? 'Submit another' : 'Begin'}
        </a>
      </header>
      <Lottery onSubmitted={() => setGoAgain(true)} />
    </div>
  );
}

export default App;
