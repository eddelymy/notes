import { NavLink} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket,faWrench,faFeather,faList,faBookOpen,faHouse, faCircleUser,faGear} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

export default function SideBar(){

  const navigate = useNavigate()
  const [user,setUser] = useState({})

  function logOut(){
    localStorage.removeItem('tkn_notes')
    navigate('/login')
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user_notes'))) 
  }, [])

  return( 
    <>
        <div
            className="flex text-white relative flex-col justify-between h-full  bg-[#020617] pt-6 pb-8 border border-[#020617] w-80" 
        >
            <div>
                <div className="flex flex-row items-center font-semibold tracking-wide mb-6 px-6">
                  <FontAwesomeIcon icon={faBookOpen} className="text-xl mr-2 text-[#e11d48]" />
                  <span className="text-xl font-bold" style={{fontFamily:"PlayfairDisplay-VariableFont_wght"}}>Notes bloc</span> 
                </div>
                <div className="px-6">
                    <hr />
                </div>
                <div className="mt-4 px-5 flex flex-row items-center ">
                    <FontAwesomeIcon icon={faCircleUser} className=" text-gray-300 text-xl"/>
                    <div className="ml-3 flex flex-col">
                        <span className="font-bold"> {user?.username || "Utilisateur"}</span>
                        <span className=" text-gray-400">{user?.email || "email"}</span>
                    </div>
                </div>
                <div className="h-10 my-4 flex items-center font-semibold px-6 hover:text-[#e11d48] hover:border-r-2 hover:border-r-[#e11d48] ">
                    <button type="button" onClick={()=>logOut()}>
                        <span className="flex items-center w-full">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-sm" />
                            <span className="ml-3">Se deconnecter</span>
                        </span>
                    </button>
                </div>
                <div className="px-6">
                    <hr />
                </div>
                
                <div className="mt-10">
                    <NavLink to="/" className="item">
                        <span className="flex items-center w-full ">
                            <FontAwesomeIcon icon={faHouse} className="text-sm" />
                            <span className="ml-3">
                                Home
                            </span>
                        </span>
                    </NavLink>
                    <NavLink to="/notes" className="mt-4 item">
                        <span>
                            <FontAwesomeIcon icon={faList} className="text-sm" />
                            <span className="ml-3">
                                Liste de notes
                            </span>
                        </span>
                    </NavLink>
                    <NavLink to="/creer_note" className="mt-4 item">
                        <span className="flex items-center w-full ">
                            <FontAwesomeIcon icon={ faFeather} className="text-sm" />
                            <span className="ml-3">
                                Creation de notes
                            </span>
                        </span>
                    </NavLink>
                    <NavLink to="/gestion_categories" className="mt-4 item">
                        <span className="flex items-center w-full ">
                            <FontAwesomeIcon icon={ faWrench} className="text-sm" />
                            <span className="ml-3">
                               Gestion des categories
                            </span>
                        </span>
                    </NavLink>
                    <NavLink to="/parametrages" className="mt-4 item">
                        <span className="flex items-center w-full ">
                            <FontAwesomeIcon icon={ faGear} className="text-sm" />
                            <span className="ml-3">
                                Parametrages
                            </span>
                        </span>
                    </NavLink>
                </div>
            </div>
      </div>
    </>
  )
}