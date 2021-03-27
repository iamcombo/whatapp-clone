import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as EmailValidator from 'email-validator'

export default function Sidebar() {
  const [user] = useAuthState(auth);

  const createChat = () => {
    const input = prompt('Please enter email address for the user you wish to chat with')
    if(!input) return;
    if(EmailValidator.validate(input) && input !== user.email) {
      db.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  const chatAlreadyExists = (recipientEmail) => {
    
  }

  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats'/>
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {/* list of chats */}

    </Container>
  )
} 

const Container = styled.div`

`

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  border: none;
  outline-width: 0;
  flex: 1;
`

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

const IconContainer = styled.div`

`