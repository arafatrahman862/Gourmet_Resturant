import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin()

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'User LogOut.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/menu">Our Menu</NavLink></li>
        <li><NavLink to="/order/salad">Order Food</NavLink></li>
{
    isAdmin ? <li><NavLink to="/dashboard/adminhome">DashBoard</NavLink></li> : <li><NavLink to="/dashboard/userhome">DashBoard</NavLink></li>
}
        <li>
            <Link to="/dashboard/mycart">
                <button className="btn gap-2 duration-300 hover:-translate-y-2 hover:bg-neutral-300">
                    <FaShoppingCart></FaShoppingCart>
                    <div className="badge badge-secondary">+{cart?.length || 0}</div>
                </button>
            </Link>
        </li>

        <>
            {
                user ? <>
                    <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
                </> : <>
                    <li><Link to="/login">Login</Link></li>
                </>
            }

        </>
    </>


    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a> */}
                    <img src="https://templates.framework-y.com/gourmet/images/logo.png" alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
               
            </div>
        </div>
    );
};

export default Navbar;