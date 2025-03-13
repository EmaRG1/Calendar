// Realizar cualquier interaccion con auth en la app

import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarAPI";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(state => state.auth)
  
  const startLogin = async ({ email, password }) => {
    
    try {
      const { data } = await calendarAPI.post('/auth', { email, password })
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({name: data.name, uid: data.uid}))
      
    } catch (error) {
      console.log(error)
      dispatch(onLogout('Invalid email or password'));
      setTimeout(() => {
        dispatch(clearErrorMessage())
      },100)
    }
  }

  const startRegister = async ({registerName: name, email, password }) => {
    const { data } = await calendarAPI.post('/auth/new', {name, email, password })
    try {
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({name: data.name, uid: data.uid}))
    } catch (error) {
      console.log(error);
      console.log(data.msg)
      dispatch(onLogout(data.msg));
    }
  }

  
  return {
    //Propiedades
    status,
    user,
    errorMessage,


    //Metodos
    startLogin,
    startRegister
  }
}