import React, { useEffect, useState } from "react"
import './App.css';
import Axios from 'axios'

function App() {
  const userNameRef = React.createRef()
  const [users, setUsers] = useState([])
  const getUsers = () => {
    Axios.get("http://localhost:7777/users").then(res => {
      setUsers(res.data)
    })
  }
  
  const createUser = () => {
    Axios.post("http://localhost:7777/users", {name: userNameRef.current.value}).then(res => {
      getUsers()
    })
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
    <input ref={userNameRef}/>
    <div><button onClick={createUser}>Create user</button></div>
{users.map(user => <div>{user.name}</div>)}
    </>
  );
}

export default App;
