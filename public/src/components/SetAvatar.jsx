import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Buffer } from 'buffer'

import 'react-toastify/dist/ReactToastify.css'
import loading from '../assets/loader.gif'
import { setAvatarRoute } from '../utils/APIRoutes'

const SetAvatar = () => {

    const api = 'https://api.multiavatar.com/avatar'
    const navigate = useNavigate()

    const [avatars, setAvatars] = useState([])
    const [loader,setLoader] = useState(true)
    const [selectedAvatar,setSelectedAvatar] = useState()

    const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(()=> {
        if(!localStorage.getItem('chat-app-user-current'))
            navigate('/login')
    },[navigate])

    useEffect(()=> {
        async function fetchData() {
            const data = []
            for(let i = 0; i < 5; i++){
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString('base64'))
            }
            setAvatars(data)
            setLoader(false)
        }
        fetchData()
    },[])

    const setProfilePicture = async () => {
        console.log(selectedAvatar);
        if(selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions)
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user-current'))
            console.log('aaa',user);
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })

            console.log(data);
            if(data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem('chat-app-user-current', JSON.stringify(user))
                navigate('/')
            } else {
                toast.error('Error setting avatar. Please try again', toastOptions)
            }
        }
    }

    return (
        <>
            {loader ? (
                <Container>
                    <img src={loading} alt="loading" className='loading'/>
                </Container>
            ) : (
            
            <Container>
                <div className='title-container'>
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className='avatars'>
                    {
                        avatars.map((avatar,index)=> {
                            return (
                                <div key={index}  className={`avatar ${selectedAvatar === index ? 'selected' :''}`}>
                                    <img  
                                        src={`data:image/svg+xml;base64,${avatar}`} 
                                        alt='avatar'
                                        onClick={()=>setSelectedAvatar(index)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={setProfilePicture} className='submit-btn'>
                    Set as Profile Picture
                </button>
                <ToastContainer/>
            </Container>
            )}
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
                transition: 0.5s ease-in-out;
                cursor: pointer;
            }
        }

        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }

    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: .4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #997af0;
        }
    }

    .loading {
        max-inline-size: 20%;
    }
`

export default SetAvatar