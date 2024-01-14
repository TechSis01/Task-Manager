import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useSelector,useDispatch } from "react-redux";
import { logOutUser } from "../GlobalRedux/user";
import { useNavigate } from "react-router";
const Layout = ({children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = async()=>{
        try{
            await signOut(auth)
            dispatch(logOutUser())
            navigate('/login')
        }
        catch(error){
          console.log(error)
        }
      }

  return (
    <main>
        <button className="bg-red-400 text-white p-3 mt-5" onClick={logOut}>Logout</button>
        {children}
        <p className="text-center">Made with <span>&#x2665;</span> by Queendoline</p>
    </main>
  )
}

export default Layout