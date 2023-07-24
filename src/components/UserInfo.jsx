import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const UserInfo = ({totalTestsTaken}) => {
    let [user] = useAuthState(auth);

  return (
    <div className="userProfile">
        <div className="user">
            <div className="picture">
                <AccountCircleIcon style={{display : "block" , margin : "auto" , marginTop : "3.5rem", transform : "scale(6)"}}/>
            </div>
            <div className="info">
                <div className="email">
                    {user.email}
                </div>
                <div className="joinedAt">
                    {user.metadata.creationTime}
                </div>
            </div>
        </div>
        <div className="totalTests">
            <span>Total Tests Taken - {totalTestsTaken}</span>
        </div>
    </div>
  )
}

export default UserInfo;