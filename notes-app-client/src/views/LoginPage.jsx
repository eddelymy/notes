import { useNavigate,useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBook,faBookOpen} from '@fortawesome/free-solid-svg-icons'
import { auth, provider, signInWithPopup } from '../firebase'

export default function Login(){

  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'

  const submit = (e)=>{
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)

    const username = formData.get('username')
    const password = formData.get('password')

    console.log({username:username,password:password})
    
    localStorage.setItem('user', {username:username,password:password})
    form.reset()
    navigate(redirectPath)
    
  }
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate(redirectPath);
      })
      .catch((error) => {
        console.error("Erreur de connexion avec Google:", error);
      });
  };

  return(
    <div className="login flex items-center justify-center">
      <div className="w-[350px] p-6 flex flex-col rounded-md bg-black bg-opacity-50 text-white">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faBookOpen} className="text-2xl mr-2 text-[#e11d48]" />
            <span className="text-2xl">Notes bloc</span>
          </div>
          <span className="mt-6">Pas encore de compte ? 
            <a href="/inscription" className="font-bold"> Inscrivez-vous </a> 
          </span>
        </div>
        <form onSubmit={submit} className="mt-10">
          <div className="flex flex-col">
            <label>
              Email
            </label>
            <input 
              name="username"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
          </div>
          <div className="flex flex-col mt-4">
            <label>
              Mot de passe
            </label>
            <input 
              name="password"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
          </div>
          <button className="mt-6 h-8 bg-[#e11d48] w-full rounded-md">Se connecter</button>
          <div className="flex mt-8">
            <hr className="w-full mt-3"/>
            <span className="mx-3">Ou</span>
            <hr className="w-full mt-3"/>
          </div>
          <button 
            type="button"
            onClick={signInWithGoogle}
            className="mt-4 h-8 bg-white bg-opacity-20 w-full rounded-md">
            Se connecter avec Google
          </button>
        </form>
      </div>
      
    </div>
  )
}