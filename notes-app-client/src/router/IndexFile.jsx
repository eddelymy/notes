import { Route, Routes } from "react-router-dom";
import  Home  from "../views/HomePage";
import SignUpPage from "../views/SignUpPage";
import LoginPage from "../views/LoginPage";
import  NotFound  from "../views/NotFound";
import  AuthRequired  from "../components/common/AuthRequired";
import  GlobalComponent  from "../components/common/GlobalComponent";
import ParametragePage from '../views/ParametragePage'
import NotesPage from "../views/NotesPage"
import GestionCategoriesPage from "../views/GestionCategoriesPage"
import CreateNotePage from "../views/CreateNotePage"
import EditNote from "../components/pages/note/EditNote"

export default function Index(){

  return(
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/inscription' element={<SignUpPage/>}/>
      <Route path="/" element={<GlobalComponent />}>
        <Route index element={<AuthRequired><Home/></AuthRequired>}/>
        <Route path="notes" element={<AuthRequired><NotesPage/></AuthRequired>}/>
        <Route path="edit_note/:id" element={<AuthRequired><EditNote/></AuthRequired>}/>
        <Route path="creer_note" element={<AuthRequired><CreateNotePage/></AuthRequired>}/>
        <Route path="gestion_categories" element={<AuthRequired><GestionCategoriesPage/></AuthRequired>}/>
        <Route path="parametrages" element={<AuthRequired><ParametragePage/></AuthRequired>}/>
        <Route path='*' element={<AuthRequired><NotFound/></AuthRequired>}/>
      </Route>
    </Routes>
  )
}