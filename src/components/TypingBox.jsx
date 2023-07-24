import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate, count } from "random-words";
import UpperBox from "./UpperBox";
import { useTestMode } from "../context/TestModeContext";
import Stats from "./Stats";

const TypingBox = () => {
  let inputRef = useRef(null);
  let { testTime } = useTestMode();
  let [countDown, setCountDown] = useState(testTime);
  let [intervalId, setIntervalId] = useState(null);
  let [testStart, setTestStart] = useState(false);
  let [testEnd, setTestEnd] = useState(false);
  let [correctChars, setCorrectChars] = useState(0);
  let [incorrectChars, setIncorrectChars] = useState(0);
  let [missedChars, setMissedChars] = useState(0);
  let [extrachars, setExtraChars] = useState(0);
  let [correctWords, setCorrectWords] = useState(0);
  let [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });
  let [currentwordIndex, setCurrentwordIndex] = useState(0);
  let [currentcharIndex, setCurrentcharIndex] = useState(0);
  let [graphData , setGraphData] = useState([]);


  let wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);


  let startTimer = () => {
    let interval = setInterval(timer, 1000);
    setIntervalId(interval);
    function timer() {
      setCountDown((LatestCountDown) => {
        setCorrectChars((correctChars)=> {
          setGraphData((graphData)=> {
            return [...graphData , [
              testTime-LatestCountDown+1,
              (correctChars/5)/((testTime-LatestCountDown+1)/60)
            ]];
          })
          return correctChars;
        })

        if (LatestCountDown === 1) {
          setTestEnd(true);
          clearInterval(interval);
          return 0;
        }
        return LatestCountDown - 1;
      });
    }
  };

  let resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrentwordIndex(0);
    setCurrentcharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetwordSpanRef();
    focusInput();
  };

  let resetwordSpanRef = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  let handleInput = (event) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
    let allcurrentchars = wordsSpanRef[currentwordIndex].current.childNodes;
    let isLastChar = currentcharIndex === allcurrentchars.length - 1;

    if (event.keyCode === 32) {
      let correctCharsInWord =wordsSpanRef[currentwordIndex].current.querySelectorAll(".correct");
      if (correctCharsInWord.length === allcurrentchars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (currentcharIndex === allcurrentchars.length) {
        allcurrentchars[currentcharIndex - 1].classList.remove("current-right");
      } else {
        
        setMissedChars(
          missedChars + (allcurrentchars.length - currentcharIndex)
        );
        allcurrentchars[currentcharIndex].classList.remove("current");
      }
      wordsSpanRef[currentwordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrentwordIndex(currentwordIndex + 1);
      setCurrentcharIndex(0);
      return;
    }

    if (event.keyCode === 8) {
      if (currentcharIndex !== 0) {
        if (allcurrentchars.length === currentcharIndex) {
          if (
            allcurrentchars[currentcharIndex - 1].className.includes("extra")
          ) {
            allcurrentchars[currentcharIndex - 1].remove();
            allcurrentchars[currentcharIndex - 2].className += " current-right";
          } else {
            allcurrentchars[currentcharIndex - 1].className = "current";
          }
          setCurrentcharIndex(currentcharIndex - 1);
          return;
        }
        allcurrentchars[currentcharIndex].className = "";
        allcurrentchars[currentcharIndex - 1].className = "current";
        setCurrentcharIndex(currentcharIndex - 1);
      }

      return;
    }

    if (currentcharIndex === allcurrentchars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = event.key;
      newSpan.className = "incorrect extra current-right";
      allcurrentchars[currentcharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currentwordIndex].current.append(newSpan);
      setCurrentcharIndex(currentcharIndex + 1);
      setExtraChars(extrachars + 1);
      return;
    }

    const isLastCharacter = currentcharIndex === allcurrentchars.length - 1;

    if (event.key === allcurrentchars[currentcharIndex].innerText) {
      allcurrentchars[currentcharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allcurrentchars[currentcharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
    }

    if (currentcharIndex + 1 === allcurrentchars.length) {
      allcurrentchars[currentcharIndex].className += " current-right";
    } else {
      allcurrentchars[currentcharIndex + 1].className = "current";
    }
    setCurrentcharIndex(currentcharIndex + 1);
  };

  let calculateWpm = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  let calculateAcc = () => {
    return Math.round((correctWords / currentwordIndex) * 100);
  };

  let focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div>
      <UpperBox countDown={countDown}/>
      {(testEnd) ? (
        <Stats
          wpm={calculateWpm()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extrachars={extrachars}
          graphData={graphData}
        />
      ) : (
        <div className="typeBox" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span key={index} className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        onKeyDown={handleInput}
        className="hiddenInput"
        ref={inputRef}
      />
    </div>
  );
};

export default TypingBox;
