import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route  exact path='/chats' element={<Chats/>}/>
            {/* <Route exact path="/" component={Login} />
            <Route path="/chats" component={Chats} /> */}
          </Routes>
        </AuthProvider>
      </Router>
      // <Login/>
  );
}

export default App
