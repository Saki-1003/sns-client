import React, { ReactNode, useContext, useEffect, useState } from "react"
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null)
  
  useEffect(() => {
    //tokenをapiClientのヘッダーに追加して、backendからもアクセスできるようにする
    const token = localStorage.getItem("auth_token") // clientサイドなのでlocal storageにアクセスしてtokenを取ってこれる。
    if(token) {
      apiClient.defaults.headers["authorization"] = `Bearer ${token}`//apiClientのheadersに"Authorization": `Bearer ${token}が追加される
      
      apiClient.get("/users/find")
        .then((res) => {
        setUser(res.data.user)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [])

  //local storageにtokenをセットする
  const login = async(token: string) => {
    localStorage.setItem("auth_token", token)
    apiClient.defaults.headers["authorization"] = `Bearer ${token}`

    try {
      apiClient.get("/users/find")
      .then((res) => {
      setUser(res.data.user)
    })} catch(error) {
      console.log(error)
    }
  }

  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("auth_token")
    delete apiClient.defaults.headers["authorization"]//これがないとmiddlewareが正しいtokenを取ってこれない
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}