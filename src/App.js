import React from 'react'
import './App.css'

// React Router DOM:
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

// Components:
import Header from './components/Header';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import Login from './components/Login';

// Styled-components:
import styled from "styled-components"

// React Firebase Hooks:
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth"

// React Spin-kit:
import Spinner from "react-spinkit"

function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) return (
    <AppLoading>
      <AppLoadingContent>
        <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContent>
    </AppLoading>
  )

  return (
    <div className="App">
      <Router>
        {!user ? (<Login />) : (
          <>
            <AppBody>
              <Header />
              <SideBar />
              <Chat />
              <Routes>
                <Route path="/" exact element={<></>}/>
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`
