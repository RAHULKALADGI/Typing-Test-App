import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../context/ThemeContext';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    let {setTheme , theme} = useTheme();

    let handleChange = (e)=> {
        setTheme(e.value);
        localStorage.setItem("theme",JSON.stringify(e.value));
    }

  return (
    <div className="footer">
        <div className="links" style={{ color: theme.textColor, display: "flex", gap: "50px" }}>
            <a href="https://www.linkedin.com/in/rahul-kaladgi-254185251" style={{ color: 'inherit' }} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon style={{ fontSize: '2rem', cursor: 'pointer' }} />
            </a>
            <a href="https://github.com/RAHULKALADGI" style={{ color: 'inherit' }} target="_blank" rel="noopener noreferrer">
            <GitHubIcon sx={{ fontSize: "2rem", cursor: "pointer" }} />
            </a>
        </div>
        <div className="themeButton" style={{backgroundColor : theme.background , color : theme.textColor}}>
            <Select
                onChange={handleChange}
                options={themeOptions}
                menuPlacement='top'
                defaultValue={themeOptions[0]}
                styles={{
                    control : (basestyles) => ({...basestyles , backgroundColor : theme.background , color : theme.textColor}),
                    menu : styles => ({...styles , backgroundColor : theme.backgroundColor}),
                    option : (styles , {isFocused}) => {
                        return {
                            ...styles , 
                            backgroundColor : (isFocused) ? theme.textColor : theme.background,
                            color : (isFocused) ?theme.background : theme.textColor,
                            cursor : "pointer"
                        }
                    },
                    singleValue : (provided)=>({
                        ...provided , 
                        color : theme.textColor,
                    })
                }}
            />
        </div>
    </div>
  )
}

export default Footer;