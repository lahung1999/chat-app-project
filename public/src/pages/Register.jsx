import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/logo.svg'
import { registerRoute } from '../utils/APIRoutes'

const Register = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value})
    }

    const handleValidation = () => {
        const {username, email, password, confirmPassword} = values;
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(password !== confirmPassword) {
            toast.error('Password and confirm password should be same',toastOptions)
            return false
        }else if(username.length < 5) {
            toast.error('Username must be more than 5 characters',toastOptions)
            return false
        }else if(!email.match(validRegex)){
            toast.error('Invalid email address!', toastOptions)
        }else if(password.length < 8) {
            toast.error('Username must be more than 8 characters',toastOptions)
        }else 

        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()){
            const {username, email, password } = values;
            const { data }  = await axios.post(registerRoute,{
                username, password, email
            })
            
            if(data.status === false) {
                toast.error(data.msg, toastOptions)
            } else {
                localStorage.setItem('chat-app-user-current', JSON.stringify(data.user))
                navigate('/setAvatar')
            }
        }
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className='brand'>
                        <img src={logo} alt='Logo'/>
                        <h1>snappy</h1>
                    </div>
                    <input type='text' name='username' placeholder='Username' onChange={(e)=>{handleChange(e)}}/>
                    <input type='text' name='email' placeholder='Email' onChange={(e)=>{handleChange(e)}}/>
                    <input type='password' name='password' placeholder='Password' onChange={(e)=>{handleChange(e)}}/>
                    <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={(e)=>{handleChange(e)}}/>
                    <button type='submit'>Create User</button>
                    <span>Already have an account ? <Link to='/login'>Login</Link></span>
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

export default Register