import React, { useEffect } from 'react';
import Graph from './Graph';
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const Stats = (
    {wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extrachars,
    graphData
    }
) => {

  let timeSet = new Set();
  let newGraph = graphData.filter(i=>{
    if(!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

let pushDataToDB = ()=> {
    if(isNaN(accuracy)) {
      toast.error('Invalid test', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
    return;
    }
    

    let resultsRef = db.collection('Results');
    let {uid} = auth.currentUser;
    resultsRef.add({
      wpm : wpm,
      accuracy : accuracy,
      timeStamp : new Date(),
      characters : `${correctChars}/${incorrectChars}/${missedChars}/${extrachars}`,
      userId : uid,
    }).then((res)=> {
      toast.success('Data saved to DB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }).catch((err)=>{
      toast.error(errorMapping[err.code] || "Not able to save result", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    });
}

useEffect(()=> {
  if(auth.currentUser) {
    pushDataToDB();
  }
  else {
    toast.warning('Login to save results', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
  }
} , [])

  return (
    <div className="statsBox">
        <div className="leftStats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            <div className="title">Characters</div>
            <div className="subtitle"
            style={{
              display : "flex",
              flexDirection : "column",
              width : "70%",
              margin : "auto",
              height : "50%"
            }}
            >
            <span>Correct :{correctChars}</span>
            <span>Incorrect :{incorrectChars}</span>
            <span>Missed :{missedChars}</span>
            <span>Extra :{extrachars}</span>
            </div>
        </div>
        <div className="rightStats">
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats;