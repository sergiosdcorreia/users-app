import React from 'react'
import { BrowserRouter } from "react-router-dom"
import MainRouter from "./MainRouter"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainRouter />    
      </div>
    </BrowserRouter>
  )
}

export default App
