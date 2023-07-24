import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../components/TableUserData';
import Graph from '../components/Graph';
import UserInfo from '../components/UserInfo';

const UserPage = () => {
    let [data , setData] = useState([]);
    let [graphData , setGraphData] = useState([]);
    let [user , loading] = useAuthState(auth);
    let [dataLoading , setDataLoading] = useState(true);
    let navigate = useNavigate();

    let fetchUserData = ()=> {
        let resultsRef = db.collection('Results');
        let {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];

        resultsRef.where("userId","==",uid).orderBy('timeStamp','desc')
        .get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0] , doc.data().wpm]);
            });
            setData(tempData);
            setGraphData(tempGraphData.reverse());
            setDataLoading(false);
        })
    }

    useEffect(()=> {
        if(!loading) {
            fetchUserData();
        }
        if(!loading && !user) {
            navigate('/');
        }
    },[loading]);

    if(loading || dataLoading) {
        return (<div className='centerOfScreen'>
                <CircularProgress size={200}/>
                </div>
            )
    }


  return (
    <div className="home">
        <UserInfo totalTestsTaken={data.length}/>
        <div className="graphUserPage" style={{margin:"auto",width:"60vw"}}>
            <Graph graphData={graphData}/>
        </div>
        <TableUserData data={data}/>
    </div>
  )
}

export default UserPage;