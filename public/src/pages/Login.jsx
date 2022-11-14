import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/logo.svg'
import { loginRoute } from '../utils/APIRoutes'

const Login = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        username: '',
        password: '',
    })

    const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user-current')){
            navigate('/')
        }
    },[navigate])

    const handleValidation = () => {
        const {username, password} = values;

        if(password === '') {
            toast.error('Username and password is required',toastOptions)
            return false
        }else if(username.length === '') {
            toast.error('Username and password is required',toastOptions)
            return false
        }else 

        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()){
            console.log('data', loginRoute);
            const {username, password, } = values;
            const { data } = await axios.post(loginRoute,{
                username,password
            })
            
            if(data.status === false) {
                toast.error(data.msg, toastOptions)
            }

            if(data.status === true) {
                localStorage.setItem('chat-app-user-current', JSON.stringify(data.user))
                navigate('/')
            }
        }
    }

    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value})
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className='brand'>
                        <img src={logo} alt='Logo'/>
                        <h1>snappy</h1>
                    </div>
                    <input type='text' name='username' placeholder='Username' min='3' onChange={(e)=>{handleChange(e)}}/>
                    <input type='password' name='password' placeholder='Password' onChange={(e)=>{handleChange(e)}}/>
                    <button type='submit'>Log in</button>
                    <span>Don't have an account ? <Link to='/register'>Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            text-transform: uppercase;
            color: white;
            letter-spacing: 2px;
        }
    } 

    form {
        display: flex;
        gap: 2rem;
        flex-direction: column;
        border-radius: 2rem;
        background-color: #00000076;
        padding: 3rem 6rem;

        input {
            background-color: transparent;
            font-size: 1rem;
            padding: 1rem;
            border: 0.1px solid #4e0eff;
            color: white;
            border-radius: 0.4rem;
            width: 100%;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            &:hover {
                background-color: #4e0eff;
            }
        }

        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`

export default Login