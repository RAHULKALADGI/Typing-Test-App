import React, { useState } from 'react';
import { Box , Button , TextField } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const Login = ({handleClose}) => {

    let [email , setEmail] = useState('');
    let [password , setPassword] = useState('');
    let {theme} = useTheme();

    let handleSubmit = ()=> {
        if(!email || !password) {
            toast.warning('Fill all details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        auth.signInWithEmailAndPassword(email,password).then((res)=> {
            toast.success('Logged In', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleClose();
        }).catch((err)=> {
            toast.error(errorMapping[err.code] || "something went wrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

  return (
    <Box
        p={3}
        style={{
            display : "flex",
            flexDirection : "column",
            gap : "1.2rem"
        }}
    >
        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            style={{
                border : "2px solid"
            }}
            InputLabelProps={{
                style : {
                color : theme.textColor
                }
            }}
            InputProps={{
                style : {
                    color : theme.textColor
                }
            }}
        />
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
            style={{
                border : "2px solid"
            }}
            InputLabelProps={{
                style : {
                color : theme.textColor
                }
            }}
            InputProps={{
                style : {
                color : theme.textColor
                }
            }}
        />
        <Button
            variant='contained'
            size='large'
            style={{
                backgroundColor : theme.textColor,
                color : theme.background

            }}
            onClick={handleSubmit}
        >Login</Button>
    </Box>
  )
}

export default Login;