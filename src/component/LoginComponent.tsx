import {type FormEvent, useContext, useState} from "react";
import type {LoginDto} from "../model/LoginDto.ts";
import {Link, useNavigate} from "react-router-dom";
import {login, setLoginUserName, setRoleName, setToken} from "../service/AuthService.ts";
import {CartContext} from "../context/CartContext.ts";


export default function LoginComponent() {
    const {cartItems} = useContext(CartContext);
    const [loginDto,setLoginDto] = useState<LoginDto>({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        login(loginDto)
           .then(res => {
               console.log(res.data);
               const {username, roleName} = res.data;
               const token = 'Basic ' + btoa(loginDto.username + ':' + loginDto.password);
               setToken(token);
               setLoginUserName(username);
               setRoleName(roleName);
               setLoginDto({...loginDto,username:"",password:""});
               if('ROLE_TEACHER' === roleName){
                   navigate('/admin-dashboard');
               }else if("ROLE_STUDENT" === roleName && cartItems.length > 0){
                   navigate('/enrolled-success');
               }
               window.location.reload();
           })
           .catch(err => {
               console.log(err);
           })
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-base-200">
                <form className="flex flex-col gap-4 p-6 bg-base-100 rounded-xl shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-semibold text-center">Login</h2>

                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Username" value={loginDto.username}
                        onChange={e => setLoginDto({...loginDto, username: e.target.value})}
                    />

                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Password" value={loginDto.password}
                        onChange={e => setLoginDto({...loginDto, password: e.target.value})}
                    />

                    <button type="button" onClick={handleSubmit} className="btn btn-primary w-full">
                        Login
                    </button>

                    <Link to="/register" type="button" className="btn btn-outline btn-secondary w-full"
                    >
                        Already have an account? Register!
                    </Link>
                </form>
            </div>

        </>
    );
}
