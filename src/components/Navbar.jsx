import { Link } from "react-router-dom";
import webLogo from '../../src/assets/Website Logo/pngtree-toga-cap-logo-design-scholarship-brand-vector-png-image_12528833.png'
import { IoIosLogOut } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
            .then((result) => {
                console.log('navbar page', result.user)
            })
            .catch((error) => {
                console.log('navbar error page', error.message)
            })
    }

    const navItems = <>
        <li className="flex items-center px-4 -mb-1 border-b-2 font-medium dark:border-"><Link to='/'>Home</Link></li>
        <li className="flex items-center px-4 -mb-1 border-b-2 font-medium dark:border-"><Link to='/allscholarships'>Scholarships</Link></li>
        {user ? <li className="flex items-center px-4 -mb-1 font-medium border-b-2 dark:border-"><Link to='/dashboard/user'>Dashboard</Link></li> : ''}
        {user?.role === 'admin' ? <li className="flex items-center font-medium px-4 -mb-1 border-b-2 dark:border-"><Link to='/dashboard/admin'>Dashboard</Link></li> : ''}
        {user ? '' : <li className="flex items-center px-4 -mb-1 border-b-2 font-medium dark:border-"><Link to='/login'>Login</Link></li>}
        {user ? <li onClick={handleLogout} className="flex items-center font-medium px-4 -mb-1 border-b-2 dark:border- text-2xl"><Link><IoIosLogOut></IoIosLogOut></Link></li> : ''}
    </>
    return (
        <div>
            <header className="p-4 dark:bg-gray-100 dark:text-gray-800 fixed w-full z-20">
                <div className="flex justify-between h-16 mx-auto">
                    <div className="flex gap-5 items-center">
                        <div>
                            <Link to='/' className="flex items-center gap-3">
                                <img className="w-[60px] rounded-lg" src={webLogo} alt="" />
                                <h1 className="text-3xl font-semibold md:flex hidden gap-2 items-center justify-center">Scholar<span className="text-[36px] font-bold text-yellow-400"><FaPlus /></span></h1>
                            </Link>
                        </div>
                        <ul className="flex items-center gap-2 md:hidden">

                            <div className="avatar border-4 rounded-full border-yellow-300">
                                <div className="w-10 h-10 rounded-full">
                                    <img src={user?.photoURL ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div>
                        <ul className="items-stretch hidden space-x-3 md:flex">
                            {navItems}
                            {user ? <div className="flex items-center justify-center -mb-1 border-b-2 dark:border-">
                                <h1 className="font-medium px-4 ">{user?.displayName}</h1>
                            </div> : ''}
                            <div className="avatar">
                                <div className="w-14 rounded-full">
                                    <img src={user?.photoURL ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                </div>
                            </div>
                        </ul>
                    </div>
                    <button className="flex justify-end md:hidden items-center">
                        <label htmlFor="my_modal_7" className="btn bg-yellow-200 hover:bg-yellow-300 border-none"><CiMenuFries className="text-[20px]"></CiMenuFries></label>
                    </button>
                </div>
            </header>
            {/* MODAL */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col items-center space-y-4 font-medium text-[20px]">
                    <Link className="pb-2 font-medium border-b-2">Home</Link>
                    <Link className="pb-2 border-b-2" to='/allscholarships'>Scholarships</Link>
                    {user ? <Link className="pb-2 font-medium border-b-2" to='/dashboard/user'>Dashboard</Link> : ''}
                    {user?.role === 'admin' ? <Link className="pb-2 font-medium border-b-2" to='/dashboard/admin'>Dashboard</Link> : ''}
                    {user ? '' : <Link className="pb-2 font-medium border-b-2" to='/login'>Login</Link>}
                    {user ? <Link onClick={handleLogout}><IoIosLogOut></IoIosLogOut></Link> : ''}
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default Navbar;