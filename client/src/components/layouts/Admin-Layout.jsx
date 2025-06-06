import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser,FaHome } from "react-icons/fa";
import { FaMessage,FaTableList } from "react-icons/fa6";
// import './Admin.css';
    
import { useAuth } from "../../store/auth";

export const AdminLayout = () =>{

    const {user, isLoading} = useAuth();
    console.log("admin panel ",user);
    
    if(isLoading){
        // return <h1>Loading...</h1>
        return null;
    }

    if(!user.isAdmin)
    {
        return <Navigate to={"/"}></Navigate>
    }

    return <>
    
    <header>
        <div className="Container">
            <nav>
                <ul>       
                    <li> <NavLink to="/admin/users"><FaUser /> Users </NavLink> </li>
                    <li> <NavLink to="/admin/contacts"><FaMessage /> Contacts </NavLink> </li>
                    <li> <NavLink to="/admin/services"><FaTableList /> Services </NavLink> </li>
                    <li> <NavLink to="/"><FaHome /> Home </NavLink> </li>          
                </ul>
            </nav>
        </div>
    </header>

    <Outlet/>
    </>
};