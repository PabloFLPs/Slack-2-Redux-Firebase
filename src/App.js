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

// Styled-components:
import styled from "styled-components"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <AppBody>
          <SideBar />
          <Chat />
          <Routes>
            <Route path="/" exact element={<></>}/>
          </Routes>
        </AppBody>
      </Router>
    </div>
  );
}

export default App

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`
