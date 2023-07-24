import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import TypingBox from "../components/TypingBox.jsx";

const HomePage = () => {
  return (
    <div className="home">
            <Header/>
            <TypingBox/>
            <Footer/>
        </div>
  )
}

export default HomePage;