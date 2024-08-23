// import { RecurringMeeting } from "../pages/RecurringMeeting"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"

export default function GlobalComponent(){

  return(
    <>
      <div className={"h-screen w-full grid grid-cols-gridColmn"}>
          <SideBar/>
          <Outlet/>
      </div>
    </>
  )
}