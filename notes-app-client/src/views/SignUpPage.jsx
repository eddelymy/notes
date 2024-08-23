import { useNavigate } from "react-router-dom"

export default function SignUpPage(){

  const navigate = useNavigate()

  const submit = (e)=>{
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)

    const fullName = formData.get('fullName')
    const username = formData.get('username')
    const password = formData.get('password')
    const passwordConfirm = formData.get('passwordConfirm')

    console.log({username:username,password:password})
    
    localStorage.setItem('user', {username:username,password:password})
    form.reset()
    navigate('/login')
    
  }

  return(
    <div className="login flex items-center justify-center">
      <div className="w-[350px] p-6 flex flex-col rounded-md bg-black bg-opacity-50 text-white">
        <div className="flex flex-col items-center w-full">
          <span className="text-2xl">Inscription</span>
        </div>
        <form onSubmit={submit} className="mt-10">
        <div className="flex flex-col">
            <label>
              Nom et Prenom
            </label>
            <input 
              name="fullName"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
          </div>
          <div className="flex flex-col mt-4">
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
          <div className="flex flex-col mt-4">
            <label>
              Confirmer mot de passe
            </label>
            <input 
              name="passwordConfirm"
              className="px-3 bg-white bg-opacity-20 mt-1 rounded-md h-8 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"/>
          </div>
          <button className="mt-6 h-8 bg-[#e11d48] w-full rounded-md">S'inscrire</button>
        </form>
      </div>
      
    </div>
  )
}