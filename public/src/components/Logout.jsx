import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi'
import axios from 'axios'
import { logoutRoute } from '../utils/APIRoutes'

const Logout = () => {

    const navigate = useNavigate()
    const handleClick = async () => {
        const getId = await JSON.parse(localStorage.getItem('chat-app-user-current'))
        const id = getId._id
        const data = await axios.get(`${logoutRoute}/${id}`)

        if(data.status === 200) {
            navigate('/login')
        }
        localStorage.clear()
        navigate('/login')
    }

    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`

export default Logout