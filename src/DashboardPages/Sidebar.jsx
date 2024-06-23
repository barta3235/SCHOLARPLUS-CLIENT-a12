import { Link } from "react-router-dom";
import webLogo from '../assets/Website Logo/pngtree-toga-cap-logo-design-scholarship-brand-vector-png-image_12528833.png'
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdLibraryAdd, MdOutlineRateReview, MdRotate90DegreesCcw } from "react-icons/md";
import { PiNewspaper } from "react-icons/pi";
import useAuth from "../hooks/useAuth";
import useModerator from "../hooks/useModerator";
import { IoLibraryOutline } from "react-icons/io5";

const Sidebar = () => {

    const { user } = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();

    return (
        <aside className="w-full p-2 md:p-4 dark:bg-gray-50 dark:text-gray-800 bg-yellow-200 min-h-screen h-full">
            <Link to='/' className="flex gap-2 items-center mb-5 justify-center">
                <img className="w-[35px] h-[35px] rounded-lg mb-2" src={webLogo} alt="" />
                <h1 className="text-[20px] font-semibold md:flex hidden gap-2 items-center justify-center tracking-wider">Scholar<span className="text-[24px] font-bold text-yellow-400"><FaPlus /></span></h1>
            </Link>

            {
                user && !isModerator 
                    ?
                    <nav className="space-y-8">
                        <div className="space-y-2 flex flex-col justify-center md:justify-normal items-center">
                            <h2 className="text-[20px] font-semibold tracking-widest uppercase dark:text-gray-600 mb-[20px] flex gap-2 items-center"><MdDashboard className="text-[22px]" /><span className="hidden md:flex">Dashboard</span></h2>
                            <div className="flex flex-col text-[18px] space-y-5 tracking-wider justify-center md:justify-end">
                                <Link to='/dashboard/myProfile' className="flex gap-2 items-center"><CgProfile className="text-[21px]" /><h1 className="hidden md:flex">My Profile</h1></Link>
                                <Link to='/dashboard/myApplication' className="flex gap-2 items-center"><PiNewspaper className="text-[21px]" /><h1 className="hidden md:flex">My Application</h1></Link>
                                <Link to='/dashboard/myReviews' className="flex gap-2 items-center"><MdOutlineRateReview className="text-[21px]" /><h1 className="hidden md:flex">My Reviews</h1></Link>
                            </div>
                        </div>
                    </nav>
                    :
                    ''
            }

            {
                user && isModerator
                ?
                <nav className="space-y-8">
                        <div className="space-y-2 flex flex-col justify-center md:justify-normal items-center">
                            <h2 className="text-[20px] font-semibold tracking-widest uppercase dark:text-gray-600 mb-[20px] flex gap-2 items-center"><MdDashboard className="text-[22px]" /><span className="hidden md:flex">Dashboard</span></h2>
                            <div className="flex flex-col text-[18px] space-y-5 tracking-wider justify-center md:justify-end">
                                <Link to='/dashboard/myProfile' className="flex gap-2 items-center"><CgProfile className="text-[21px]" /><h1 className="hidden md:flex">My Profile</h1></Link>
                                <Link to='/dashboard/moderator/manageScholarships' className="flex gap-2 items-center"><MdRotate90DegreesCcw className="text-[21px]" /><h1 className="hidden md:flex">Manage Scholarships</h1></Link>
                                <Link to='/dashboard/moderator/reviews' className="flex gap-2 items-center"><MdOutlineRateReview className="text-[21px]" /><h1 className="hidden md:flex">Reviews</h1></Link>
                                <Link to='/dashboard/moderator/appliedScholarships' className="flex gap-2 items-center"><IoLibraryOutline className="text-[21px]" /><h1 className="hidden md:flex">Applied Scholarships</h1></Link>
                                <Link to='/dashboard/moderator/addScholarships' className="flex gap-2 items-center"><MdLibraryAdd className="text-[21px]" /><h1 className="hidden md:flex">Add Scholarships</h1></Link>

                            </div>
                        </div>
                    </nav>
                    :
                    ''
                
            }

            
        </aside>
    );
};

export default Sidebar;