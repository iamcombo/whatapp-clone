import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { useCollection } from 'react-firebase-hooks/firestore'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase'
import { useState } from 'react'
import getRecipientEmail from '../utils/getRecipientEmail'
import Message from '../components/Message'
import TimeAgo from 'timeago-react'
import SendIcon from '@material-ui/icons/Send';
import { useRef } from 'react'

export default function ChatScreen({chat, messages}) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [input, setInput] = useState('')
  const endOfMessagesRef = useRef(null)
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))
  )
  const showMessages = () => {
    if(messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message 
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    } 
    else {
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const ScrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();

    // update last seen
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      }, 
      { merge: true }
    )

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    })

    setInput('');
    ScrollToBottom();
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL}/>
          ):(
            <Avatar>{recipientEmail[0]}</Avatar>
          )
        }
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {
            recipientSnapshot ? (
              <p>Last active: {' '}
                {
                  recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datatime={recipient?.lastSeen?.toDate()} />
                  ) : (
                    "Unavailable"
                  )
                }
              </p> 
            ) : (
              <p>loading last active...</p>
            )
          }
        </HeaderInformation>
        <HeaderIcon>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcon>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef}/>
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <IconButton disabled={!input} type='submit' onClick={sendMessage}>
          <SendIcon />
        </IconButton>
        <MicIcon />
      </InputContainer>
    </Container>
  )
}

const Container = styled.div`

`
const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 1;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: grey;
  }
`

const HeaderIcon = styled.div``

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`

const EndOfMessage = styled.div``

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  z-index: 100;
`