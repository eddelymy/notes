import { Navigate,useLocation } from "react-router-dom"

export default function AuthRequired({children}){

  const location = useLocation()
  const auth = localStorage.getItem('user')

  if(!auth){
    return <Navigate to='/login' state={{path: location.pathname}}></Navigate>
  }

  return(
    children
  )
}