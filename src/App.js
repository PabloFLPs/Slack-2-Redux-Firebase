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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Header />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
