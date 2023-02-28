import { createContext, useContext, useEffect, useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  UserInfo,
} from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { User } from '../models/user'
import * as AuthService from '../services/authService'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)


const asActiveUserAcc = (AuthUser, dbUser:User) => {
  return {
    ...AuthUser,
    role: dbUser.role
  }
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fireUser) => {
      if (fireUser) {
        const user = await AuthService.getUser(fireUser.email, fireUser.uid)

        setUser(asActiveUserAcc(fireUser, user))
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
