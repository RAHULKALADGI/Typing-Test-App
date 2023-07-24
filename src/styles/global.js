import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
   box-sizing : border-box; 
}

body{
    background : ${({theme})=>theme.background};
    color : ${({theme})=>theme.textColor};
    margin : 0;
    padding : 0;
    transition : all 0.30s linear;
}

.home{
    display : grid;
    height : 100vh;
    width : 100vw;
    grid-auto-flow : row;
    grid-template-row : auto 1fr auto;
    text-align : center;
    align-items : center;
    gap : 0.5rem;
    padding : 2rem;
}

.typeBox{
    display : block;
    max-width : 60vw;
    height : 40vh;
    margin-left : auto;
    margin-right : auto;
    overflow : hidden;
}

.words{
    display : flex;
    flex-wrap : wrap;
    font-size : 2rem;
    color : ${({theme})=>theme.typeBoxText};
}

.word{
    margin : 5px;
    padding-right : 2px;
}

.hiddenInput{
    opacity : 0;
}

.current{
    border-left : 1px solid;
    animation : blinkit 1s infinite ease;
    @keyframes blinkit{
        0% {border-left-color : white;}
        50%{border-left-color : black;}
        100%{border-left-color : white;}
    }
}

.current-right{
    border-right : 1px solid;
    animation : blinkitRight 1s infinite ease;
    @keyframes blinkitRight{
        0% {border-right-color : white;}
        50%{border-right-color : black;}
        100%{border-right-color : white;}
    }
}

.correct{
    color : ${({theme})=>theme.textColor};
}
.incorrect{
    color : red;
}

.upperMenu{
    display : flex;
    width : 60vw;
    margin-left : auto;
    margin-right : auto;
    font-size : 1.35rem;
    justify-content : space-between;
    padding : 0.5rem;
}
.modes{
    display : flex;
    gap : 0.4rem;
}
.timeMode:hover{
    color : green;
    cursor : pointer;
}

.footer{
    width : 60vw;
    display : flex;
    justify-content : space-between;
    align-items : center;
    margin-left : auto;
    margin-right : auto;
    padding : 1rem;
    background : ${({theme})=>theme.background};
    color : ${({theme})=>theme.textColor};
}

.statsBox{
    display : flex;
    width : 60vw;
    height : auto;
    margin-left : auto;
    margin-right : auto;
}
.leftStats{
    width : 30%;
    padding : 30px;
}
.rightStats{
    width : 70%
}
.title{
    font-size : 1.2rem;
    color : ${({theme})=>theme.typeBoxText}; 
}
.subtitle{
    font-size : 1.5rem;
}


.header{
    width : 60vw;
    display : flex;
    justify-content : space-between;
    margin-left : auto;
    margin-right : auto;
    padding : 1.5rem;
    background : ${({theme})=>theme.background};
    color : ${({theme})=>theme.textColor};
}

.userProfile{
    width : 60vw;
    margin : auto;
    display : flex;
    height : 15rem;
    background : ${({theme})=>theme.background};
    border : 2px solid ${({theme})=>theme.textColor};
}
.user{
    width : 50%;
    display : flex;
    margin-top : 2rem;
    margin-bottom : 2rem;
    font-size : 1.5rem;
    padding : 1rem;
    border-right : 2px solid;
}
.info{
    width : 60%;
    padding : 1rem;
    margin-top : 1rem;
}
.picture{
    width : 40%;
}
.totalTests{
    width : 50%;
    font-size : 3rem;
    display : flex;
    align-items : center;
    justify-content : center;
}

.table,graphUserPage{
    margin : auto;
    width : 60vw;
}

.centerOfScreen{
    display : flex;
    min-height : 100vh;
    justify-content : center;
    align-items : center;
}

`