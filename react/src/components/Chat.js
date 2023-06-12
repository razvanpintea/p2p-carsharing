import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "@firebase/firestore";
import { db } from "./firebase-config";
import { hover } from '@testing-library/user-event/dist/hover';
import './Chat.css';

function Chat(props) {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [hovered, setHovered] = useState(false);
    const room = props.room;
    const reversedRoom = room.split(':').reverse().join(':');
    const messagesRef = collection(db, "messages");
    const messageEndRef = useRef(null);
    const user1 = props.user1;
    const user2 = props.user2;
    const roomParts = room.split(':');
    const firstUser = roomParts[0];
    const secondUser = roomParts[1];


    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "in", [room, reversedRoom]), orderBy("createdAt"))

        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages);
        })
        return () => unsuscribe();
    }, [room])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [messages])

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        if (newMessage === "") return;
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        const formData = new FormData();
        formData.append('updated_at', formattedDate);
        formData.append('user1', user1);
        formData.append('user2', user2);


        fetch("https://p2pcarsharingproject.com/api/updateChatRoom",
            {
                method: 'POST',
                body: formData
            })
            .then(
                (response) => response.text()
            )
            .then(
                (json) => {
                    console.log(json);

                })
            .catch(
                (e) => {
                    console.log(e.message)
                })

        if (firstUser === localStorage.getItem('username')) {
            formData.append('updateUser1', firstUser);
            formData.append('updateUser2', secondUser);
            formData.append('updateMessage', 'yes');
            fetch("https://p2pcarsharingproject.com/api/updateChatRoomNewMessageReceiver",
                {
                    method: 'POST',
                    body: formData
                })
                .then(
                    (response) => response.text()
                )
                .then(
                    (json) => {
                        console.log(json);

                    })
                .catch(
                    (e) => {
                        console.log(e.message)
                    })
        }
        else {
            formData.append('updateUser1', firstUser);
            formData.append('updateUser2', secondUser);
            formData.append('updateMessage', 'yes');
            fetch("https://p2pcarsharingproject.com/api/updateChatRoomNewMessageSender",
                {
                    method: 'POST',
                    body: formData
                })
                .then(
                    (response) => response.text()
                )
                .then(
                    (json) => {
                        console.log(json);

                    })
                .catch(
                    (e) => {
                        console.log(e.message)
                    })
        }

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: localStorage.getItem('username'),
            room: room,
        })
        setNewMessage('');
    }
    const convertDate = (date) => {
        if (!date) {
            return '';
        }
        const timestamp = date.toDate();
        const formattedDate = timestamp.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour24: true });
        return formattedDate;
    }

    let lastUser = '';

    const displayMessages = messages.map((message, index) => {
        const displayUser = message.user !== lastUser || index === 0;
        lastUser = message.user;

        return (
            <div className='messages' key={message.id}>
                {message.user === localStorage.getItem('username') &&
                    <div>
                        <div style={{ fontWeight: 'bold', textAlign: 'right', marginRight: '30px' }}>
                            {displayUser && <span className='usser' >You<br /></span>}
                        </div>
                        <div
                            style={{
                                marginLeft: 'auto', marginRight: '20px', marginTop: '15px', backgroundColor: '#5692F5', maxWidth: '270px', wordWrap: 'break-word'
                                , borderRadius: '10px', textAlign: 'right'
                            }}>
                            <div style={{ marginRight:'10px', minHeight:'55px', paddingTop:'5px', paddingBottom:'10px' }}>
                                <p>{message.text}</p>
                                <span style={{ fontSize: '12px' }}>{convertDate(message.createdAt)}</span><br />
                            </div>
                        </div>
                    </div>
                }
                {message.user !== localStorage.getItem('username') &&
                    <div>
                       <div style={{ fontWeight: 'bold', textAlign: 'left', marginLeft: '30px' }}>
                            {displayUser && <span className='usser' >{props.user}<br /></span>}
                        </div>

                        <div style={{
                            textAlign: 'left', marginLeft: '20px', maxWidth: '270px', backgroundColor: '#D3D3D3', wordWrap: 'break-word',
                            marginTop: '20px', borderRadius: '10px'
                        }}>
                            <div style={{ marginLeft:'10px', minHeight:'55px', paddingTop:'5px', paddingBottom:'10px' }}>
                            <p>{message.text}</p>
                            <span style={{ fontSize: '12px',marginTop:'20px' }}>{convertDate(message.createdAt)}</span><br />

                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    })


    return (
        <div>
            <div className='chat-app'>
                <div className='messages-container' style={{ flex: 1, overflowY: 'auto', paddingTop: '30px' }}>
                    {displayMessages}
                    <div ref={messageEndRef} />
                </div>

            </div>
            <form onSubmit={handleSubmitForm} 
            style={{ backgroundColor: 'white', maxWidth: '1100px', marginTop:'20px', border:'2px solid #5692F5', borderRadius:'20px', height:'60px' }}>
                <input className='new-message' style={{marginRight:'auto', marginLeft:"20px", width:'660px', border:'none '
                , outline:'none', fontSize:"15px"}}
                    placeholder='type your message here'
                    onChange={(event) => setNewMessage(event.target.value)}
                    value={newMessage} />
                <button type='submit' className='send-message-button' 
                style={{marginRight:"0px", marginTop:"14px", border:'none', height:"59px", borderTopRightRadius:'20px',borderBottomRightRadius:'20px'}}>Send</button>
            </form>
        </div>

    );
}

export default Chat;
