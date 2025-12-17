import {Link, useNavigate} from "react-router-dom";
import {GiMagicLamp} from "react-icons/gi";
import {isLogin, isStudent, isTeacher} from "../service/AuthService.ts";
import {FaShoppingCart} from "react-icons/fa";
import {useContext} from "react";
import {CartContext} from "../context/CartContext.ts";

export default function NavbarComponent() {

    const beTeacher = isTeacher();
    const beLoginnedIn = isLogin();
    const beStudent = isStudent();
    const navigate = useNavigate();
    const {cartItems} = useContext(CartContext);

    const logoutHanlder = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("roleName");
        navigate("/login");
        window.location.reload();
    }
    return (
        <>
           <div className="navbar bg-primary shadow-sm text-primary-content">
               <div className="flex-1">
                   <Link to="/" className="normal-case text-xl flex items-center gap-2">
                       <GiMagicLamp size={40}/>
                       Nova Learn
                   </Link>
               </div>
               <div className="flex-none">
                   <ul className="menu menu-horizontal px-1">
                       {beTeacher && (
                           <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                       )}
                       {
                           !beTeacher && (
                               <li><Link to="/cart-view">
                                   <FaShoppingCart size={20}/>
                                       <span className="badge ms-1">{cartItems.length}</span>
                               </Link></li>
                           )
                       }

                       <li><Link to="/">Home</Link></li>
                       {
                           !beLoginnedIn && (
                               <li><Link to="/login"
                              >Login</Link></li>
                           )
                       }

                       {
                           beLoginnedIn && (
                               <li><Link to="/logout"  onClick={logoutHanlder}>Logout</Link></li>
                           )
                       }
                       {
                           beLoginnedIn && beStudent &&(
                               <li><Link to="/own-property" >Own Property</Link></li>
                           )
                       }
                       {
                           !beLoginnedIn && (
                               <li><Link to="/register"
                                         >Register</Link></li>
                           )
                       }
                   </ul>
               </div>
           </div>
        </>
    );
}
