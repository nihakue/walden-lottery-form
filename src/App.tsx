import React from "react";
import "./App.css";
import logo from "./walden-logo.png";
import { LotteryForm } from "./LotteryForm";

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
        <a href={`#lottery-application`}>
          {goAgain ? 'Submit another' : 'Begin'}
        </a>
        {goAgain && <a href="/">Start over</a>}
      </header>
      <LotteryForm onSubmitted={() => setGoAgain(true)} />
    </div>
  );
}

export default App;
