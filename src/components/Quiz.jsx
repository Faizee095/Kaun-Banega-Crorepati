import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assests/play.mp3";
import correct from "../assests/correct.mp3";
import wrong from "../assests/wrong.mp3";

const Quiz = ({ data, setStop, setQueNum, queNum }) => {
  const [que, setQue] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    setQue(data[queNum - 1]);
  }, [data, queNum]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (ans) => {
    setSelectedAnswer(ans);
    setClassName("answer active");
    // setTimeout(()=>{
    //       setClassName(ans.correct ? "answer correct" : "answer wrong");

    // },3000);
    delay(3000, () =>
      setClassName(ans.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (ans.correct) {
        correctAnswer();
        delay(1000, () => {
          setQueNum((prev) => prev + 1);
          setSelectedAnswer(null);
        });
        // setTimeout(() => {
        //   setQueNum((prev) => prev + 1);
        //   setSelectedAnswer(null);
        // }, 1000);
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
        // setTimeout(() => {
        //   setStop(true);
        // }, 1000);
      }
      // }, 5000);
    });
  };

  return (
    <div className="trivia">
      <div className="question">{que?.question}</div>
      <div className="answers">
        {que?.answers?.map((ans) => (
          <div
            key={ans.id}
            className={selectedAnswer === ans ? className : "answer"}
            onClick={() => handleClick(ans)}
          >
            {ans.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
