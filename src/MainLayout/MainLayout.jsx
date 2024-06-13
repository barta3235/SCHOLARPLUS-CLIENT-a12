import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='h-[100px]'>

            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;