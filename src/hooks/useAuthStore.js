// Realizar cualquier interaccion con auth en la app

import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarAPI";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";

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
    }
  }

  
  return {
    //Propiedades
    status,
    user,
    errorMessage,


    //Metodos
    startLogin
  }
}