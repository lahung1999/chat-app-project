import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

const Welcome = () => {

    const [username, setUsername] = useState('')
    useEffect(() => {
        const getUsername = JSON.parse(localStorage.getItem('chat-app-user-current'))
        console.log(getUsername);
        setUsername(getUsername.username)
    },[])

    return (
        <>
            <Container>
                <img src={Robot} alt='Robot'/>
                <h1>
                    Welcome, <span>{username}</span>
                </h1>
                <h3>Please select a chat to Start Messaging</h3>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`

export default Welcome