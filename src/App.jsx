import { useEffect, useState } from "react";
import "./App.css";
import { Money } from "./staticData/moneyData";
import { QuizData } from "./staticData/QuizData";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [queNum, setQueNum] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("Rs 0");
  const [username, setUsername] = useState(null);

  useEffect(() => {
    queNum > 1 && setEarned(Money.find((m) => m.id === queNum - 1).amount);
  }, [Money, queNum]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned:{earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} queNum={queNum} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={QuizData}
                    setStop={setStop}
                    setQueNum={setQueNum}
                    queNum={queNum}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {Money.map((item) => (
                <li
                  key={item.id}
                  className={
                    queNum === item.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{item.id}</span>
                  <span className="moneyListItemAmount">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
