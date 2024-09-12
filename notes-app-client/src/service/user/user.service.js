import axios from "../axios"
import routes from "./routes"
import validateData from '../../helpers/validateForm'
import {string,object,ref} from 'yup'

let loginSchema = object({
  username: string().label('username').required('L\'utilisateur est requis'),
  password: string().label('password').min(8,'Mot de passe faible')
})
let signUpSchema = object({
  username: string().label('username').required('L\'utilisateur est requis'),
  password: string().label('password').min(8,'Mot de passe faible').required('Le mot de passe est requis'),
  passwordConfirm: string().label('passwordConfirm').min(8,'Mot de passe faible').oneOf([ref('password'), null], 'Les mots de passe doivent correspondre').required('ce champ est requis'),
  email: string().email('Email invalide').label('email').required('L\'email est requis'),
})
let resetPasswordSchema = object({
  email:string().email('Email invalide').label('email').required('L\'email est requis')
})
export default{

  async login(user){
    await validateData(loginSchema,user)
    return await axios().post(routes.user.login.url, user)
  },
  async signUp({username,email,password,passwordConfirm}){
    await validateData(signUpSchema,{username,email,password,passwordConfirm})
    return await axios().post(routes.user.signUp.url, {username:username,email:email,password:password})
  },
  async sendResetPasswordEmail(email){
    await validateData(resetPasswordSchema,{email})
    return await axios().post(routes.user.resetPassword.url, {email})
  }
}