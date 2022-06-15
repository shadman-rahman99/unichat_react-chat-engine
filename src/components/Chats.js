import React, { useRef, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import ChatHeader from './ChatHeader'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

function Chats() {
    var date = new Date()
    console.log("date: ",date);
    const navigate = useNavigate()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    // console.log(user);
    const handleLogout = async()=>{
        await auth.signOut()
        navigate('/')
    }

    const getFile = async(url)=>{
        const response = await fetch(url)
        .then(()=>console.log("fetch successful"))
        .catch((error)=>console.log("fetch error: ",error));
        const data = await response?.blob()
        // returning files with an array where each object inside are specified
        //  as data. Setting the file name as userphoto.jpg and lastly type of the 
        // image is set to jpeg.
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
    }
    useEffect(() => {
        if(!user){
            navigate('/')
            // returning nothing 
            return
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user?.email,
                "user-secret": user?.uid
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch((error)=>{
            // creating user if there is no existing user
            console.log("Axios get error :",error, "\n",error.response.data)
            let formdata = new FormData()
            formdata.append('email',user?.email);
            formdata.append('username', user?.email);
            formdata.append('secret', user?.uid);
     
            getFile(user.photoURL).then((avatar)=>{
                // formdata.append('avatar', avatar, avatar?.name)
                // formdata = {...formdata, "avatar": avatar }
                console.log(avatar,"\n",avatar.name);
                console.log('Formdata: ',formdata);
                axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
                ).then(()=> setLoading(false))
                .catch((error)=> console.log("Axios post error :",error, "\n",error.response.data))
            })
        })
    }, [user,navigate])
    
    // If there is no user or loading is true then we just print loading.
    // if(!user || loading )return "loading..."
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
            </div>
        </div>
		<ChatEngine
			projectID= {process.env.REACT_APP_CHAT_ENGINE_ID}
			userName=  {user?.email}
			userSecret= {user?.uid}
			height='90vh'	
			renderChatHeader={(chat) => {
                // console.log("chat: ",chat)
                return <ChatHeader chat={chat} />
            }}
		/>

            </div>
    )
}

export default Chats
