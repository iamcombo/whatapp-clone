import { Button } from '@material-ui/core'
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from '../firebase'

export default function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo 
          src='https://i.pinimg.com/originals/33/b6/53/33b6530c47f744f110e5070ba9b893d2.png'
        />
        <Button onClick={signIn} variant='outlined'>Sign In with Google</Button>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 100px;
  align-items: center;
  background-color: #fff;
`
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`