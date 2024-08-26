// import { RecurringMeeting } from "../pages/RecurringMeeting"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"

export default function GlobalComponent(){

  return(
    <>
      <div className={"h-screen w-full grid grid-cols-gridColmn"}>
          <SideBar/>
          <div className="w-full h-full overflow-auto bg-[#f4f1f8] p-5">
            <Outlet/>
          </div>
          
      </div>
    </>
  )
}