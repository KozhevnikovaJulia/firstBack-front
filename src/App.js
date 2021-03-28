import React, { useEffect, useState } from "react"
import './App.css';
import Axios from 'axios'

function App() {
  const userNameRef = React.createRef()
  const [users, setUsers] = useState([])
  const getUsers = () => {
    Axios.get("http://localhost:7777/users" + window.location.search).then(res => {
      setUsers(res.data)
    })
  }
  
  const createUser = () => {
    Axios.post("http://localhost:7777/users", {name: userNameRef.current.value}).then(res => {
      getUsers()
    })
  }

  const updateUser = (id, name) => {
    Axios.put("http://localhost:7777/users", {id, name}).then(res => {
      getUsers()
    })
  }

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:7777/users/${id}` ).then(res => {
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
{users.map(user => <div><input defaultValue={user.name} onBlur={(e)=>{updateUser(user._id, e.currentTarget.value)}}/><button onClick ={()=>{deleteUser(user._id)}}>X</button></div>)}
    </>
  );
}

export default App;
