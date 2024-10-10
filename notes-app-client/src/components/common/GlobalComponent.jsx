// import { RecurringMeeting } from "../pages/RecurringMeeting"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
import FlashComponent from './FlashComponent'

export default function GlobalComponent(){

  return(
    <>
      <div className={"h-screen w-full grid grid-cols-gridColmn"}>
        <SideBar/>
        <div className="w-full h-full overflow-auto relative bg-[#f4f1f8] p-5">
          <Outlet/>
        </div> 
        <div className="absolute right-0 bottom-8 z-50">
          <FlashComponent/>
        </div> 
      </div>
    </>
  )
}