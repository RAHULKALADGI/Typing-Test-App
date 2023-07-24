import React from 'react';
import AccountCircle from './AccountCircle';
import image from '../Logo.jpg';

const Header = () => {

  return (
    <div className="header">
        <div className="logo">
            <img src={image} alt="key" style={{width : "5rem"}}/>
        </div>
        <div style={{fontSize : "1.8rem"}}>
          Typing Test
        </div>
        <div className="userIcon" style={{cursor:"pointer"}}>
            <AccountCircle/>
        </div>
    </div>
  )
}
 
export default Header;