import { Link } from "react-router-dom";
import webLogo from '../../src/assets/Website Logo/pngtree-toga-cap-logo-design-scholarship-brand-vector-png-image_12528833.png'
import { IoIosLogOut } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {

    const navItems = <>
        <li className="flex items-center px-4 -mb-1 border-b-2 dark:border-"><Link to='/'>Home</Link></li>
        <li className="flex items-center px-4 -mb-1 border-b-2 dark:border-"><Link to='/allscholarships'>Scholarships</Link></li>
        <li className="flex items-center px-4 -mb-1 border-b-2 dark:border-"><Link to='/dashboard/user'>Dashboard</Link></li>
        <li className="flex items-center px-4 -mb-1 border-b-2 dark:border-"><Link to='/dashboard/admin'>Dashboard</Link></li>
        <li className="flex items-center px-4 -mb-1 border-b-2 dark:border-"><Link to='/login'>Login</Link></li>
        <li className="flex items-center px-4 -mb-1 border-b-2 dark:border- text-2xl"><Link to='/logout'><IoIosLogOut></IoIosLogOut></Link></li>
    </>
    return (
        <div>
            <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
                <div className="flex justify-between h-16 mx-auto">
                    <Link to='/' className="flex items-center gap-3">
                        <img className="w-[60px]" src={webLogo} alt="" />
                        <h1 className="text-3xl font-semibold md:flex hidden gap-2 items-center justify-center">Scholar<span className="text-[36px] font-bold text-yellow-400"><FaPlus /></span></h1>
                    </Link>
                    <div>
                    <ul className="items-stretch hidden space-x-3 md:flex">
                        {navItems}
                        <div className="flex items-center justify-center -mb-1 border-b-2 dark:border-">
                            <h1 className="font-medium px-4 ">Ahnaf</h1>
                        </div>
                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </ul>
                    </div>
                    <button className="flex justify-end md:hidden items-center">
                        <label htmlFor="my_modal_7" className="btn"><CiMenuFries></CiMenuFries></label>
                    </button>
                </div>
            </header>
            {/* MODAL */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col items-center space-y-4 font-medium text-[20px]">
                    <Link className="pb-2 border-b-2">Home</Link>
                    <Link className="pb-2 border-b-2" to='/allscholarships'>Scholarships</Link>
                    <Link className="pb-2 border-b-2" to='/dashboard/user'>Dashboard</Link>
                    <Link className="pb-2 border-b-2" to='/dashboard/admin'>Dashboard</Link>
                    <Link className="pb-2 border-b-2" to='/login'>Login</Link>
                    <Link><IoIosLogOut></IoIosLogOut></Link>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default Navbar;