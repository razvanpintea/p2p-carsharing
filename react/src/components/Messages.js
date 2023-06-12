import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import profile from './profile2.png';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Messages() {
  const [chats, setChats] = useState([]);
  const { user1Params, user2Params, paramsUser } = useParams();
  const [room, setRoom] = useState('');
  const [currentChat, setCurrentChat] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [selectedChat, setSelectedChat] = useState('');
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
      .then((response) => response.json())
      .then((json) => {
        const filteredChats = json.data.filter(chat =>
          chat.sender_email === localStorage.getItem('username') ||
          chat.receiver_email === localStorage.getItem('username')
        );
        const uniqueChats = filteredChats.reduce((acc, chat) => {
          const room = chat.sender_email < chat.receiver_email
            ? `${chat.sender_email}:${chat.receiver_email}`
            : `${chat.receiver_email}:${chat.sender_email}`;

          if (!acc.has(room)) {
            acc.set(room, chat);
          }

          return acc;
        }, new Map()).values();

        setChats(Array.from(uniqueChats));
        setLoading(false);
        if (!paramsUser) {
          setRoom(filteredChats[0].sender_email + ":" + filteredChats[0].receiver_email);
          setSelectedChat(room);

          if (filteredChats[0].sender_email === localStorage.getItem('username')) {
            setCurrentChat(<Chat user1={filteredChats[0].receiver_email} user2={filteredChats[0].sender_email} room={room} user={filteredChats[0].receiver_name} />)
          }
          else {
            setCurrentChat(<Chat user1={filteredChats[0].sender_email} user2={filteredChats[0].receiver_email} room={room} user={filteredChats[0].sender_name} />)
          }
        }
        else {
          setCurrentChat(<Chat user1={user1Params} user2={user2Params} room={user1Params + ':' + user2Params} user={paramsUser} />)
          setSelectedChat(user1Params + ':' + user2Params)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading]);

  useEffect(() => {
    fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
      .then((response) => response.json())
      .then((json) => {
        const filteredChats = json.data.filter(chat =>
          chat.sender_email === localStorage.getItem('username') ||
          chat.receiver_email === localStorage.getItem('username')
        );
        setChats(filteredChats);
      })
      .catch((err) => {
        console.log(err.message);
      });
  // }, [clickCount, chats]);
}, [clickCount]);

  const displayChats = chats.map((chat, index) => {
    const room = `${chat.sender_email}:${chat.receiver_email}`;
    const other = chat.sender_email === localStorage.getItem('username')
      ? chat.receiver_name
      : chat.sender_name;

    const profilePictureMessages = chat.sender_email === localStorage.getItem('username')
      ? chat.receiver_profile
      : chat.sender_profile;

    const handleClickChat = (sender, receiver) => {
      const formData = new FormData();
      setClickCount(clickCount + 1);
      setSelectedChat(sender + ":" + receiver);
      setCurrentChat(<Chat user1={chat.sender_email} user2={chat.receiver_email} room={room} user={other} />)
      if (sender === localStorage.getItem('username')) {
        formData.append('updateUser1', sender);
        formData.append('updateUser2', receiver);
        formData.append('updateMessage', 'no');
        fetch("https://razwebdev.com/p2pcarsharing/api/updateChatRoomNewMessageSender",
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
        formData.append('updateUser1', sender);
        formData.append('updateUser2', receiver);
        formData.append('updateMessage', 'no');
        fetch("https://razwebdev.com/p2pcarsharing/api/updateChatRoomNewMessageReceiver",
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
    };


    if (profilePictureMessages !== 'nothing' && chat.sender_email !=='' && chat.receiver_email !== '') {
      return (
        <div key={index} onClick={() => handleClickChat(chat.sender_email, chat.receiver_email)}
          style={{
            borderBottom: "1px solid grey", width: '400px', display: 'flex', flexDirection: 'row', marginBottom: '5px', cursor: 'pointer',
            backgroundColor:
              (selectedChat ===
                chat.receiver_email + ":" + chat.sender_email) ||
                (selectedChat === chat.sender_email + ":" + chat.receiver_email)
                ? '#D3D3D3'
                : '', borderRadius: '9px'
          }}>
          <img
            src={profilePictureMessages}
            alt="mesage profilepic"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', display: 'flex', flexDirection: 'row' }}
          />
          
          {other}
          {chat.sender_email === localStorage.getItem('username') && chat.sender_newmsg === 'yes'
            && <p>New Messages</p>}
          {chat.receiver_email === localStorage.getItem('username') && chat.receiver_newmsg === 'yes'
            && <p>New Messages</p>}

        </div>
      );
    }
    else if (profilePictureMessages === 'nothing' && chat.sender_email !=='' && chat.receiver_email !== '') {
      return (
        <div key={index} onClick={() => handleClickChat(chat.sender_email, chat.receiver_email)}
          style={{
            borderBottom: "1px solid grey", width: '400px', display: 'flex', flexDirection: 'row', marginBottom: '5px', cursor: 'pointer',
            backgroundColor:
              (selectedChat ===
                chat.receiver_email + ":" + chat.sender_email) ||
                (selectedChat === chat.sender_email + ":" + chat.receiver_email)
                ? '#D3D3D3'
                : '', borderRadius: '9px'
          }}>        <img
            src={profile}
            alt="mesage profilepic"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <p>{other}</p>
          {chat.sender_email === localStorage.getItem('username') && chat.sender_newmsg === 'yes'
            && <p>New Messages</p>}
          {chat.receiver_email === localStorage.getItem('username') && chat.receiver_newmsg === 'yes'
            && <p>New Messages</p>}

        </div>
      );
    }
  });




  return (
    <div>
      {loading && <FontAwesomeIcon icon={faSpinner}
          spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '150px', height:'75vh' }}>

        {!loading && displayChats.length !== 0 &&
          <div style={{ borderBottom: '1px solid black', overflowX: 'auto'
        }}>
            {displayChats}
          </div>}
        {!loading && displayChats.length === 0 &&
          <h2 style={{ margin: '0 auto' }}>You don't have any conversations yet</h2>
        }
        <div>

          {currentChat}
        </div>
      </div>
    </div>

  );
}

export default Messages;
