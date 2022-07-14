import React, {createContext, useContext, useState, useEffect} from 'react'
import {deleteUserReq, getAllUsers, getUserByIdReq, registerReq, updateUserReq, getUserByEmailReq} from '../api/user'


const userContext = createContext();


export const useUsers = () => {
    const context = useContext(userContext)
    return context
};



export default function UserProvider({children}) {

  const [users, setUser] = useState([]);

    const newStateUsers = async () => {
      const res = await getAllUsers()
      await setUser(res)
      return res
    };

    const getUserById = async (id) => {
      const res = await getUserByIdReq(id)
      return res 
    }

    const getUserByEmail = async (email) => {
      const res = await getUserByEmailReq(email)
      return res 
    }

    const register = async (body) => {
      try {
        const res = await registerReq(body)
        await newStateUsers()
        return res
      } catch (error) {
        console.log(error);
      }

    }

    const deleteUser = async (id) => {
      const res = await deleteUserReq(id)
      await newStateUsers()
      return res
    }

    const updateUser = async (id, body) => {
      const res = await updateUserReq(id, body)
      await newStateUsers()
      return res
    }

    useEffect(() => {
      (async()=>{
       await newStateUsers()
      })()
    }, []);


  return (
    <userContext.Provider value={{users, setUser, getUserById, register, deleteUser, updateUser, getUserByEmail}}>
        { children }
    </userContext.Provider>
  )
};




