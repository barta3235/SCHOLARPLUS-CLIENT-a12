import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import HeadSubHead from "../components/HeadSubHead";
import Top6_Scholarship from '../components/Top6_Scholarship/Top6_Scholarship'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HeadSubHead heading1="Top" heading2="Scholarships" subHeading="Premier Opportunities for Advanced Study and Research"></HeadSubHead>
            <Top6_Scholarship></Top6_Scholarship>
            <div className="mx-[5px] md:mx-[50px] mb-[100px] flex justify-end">
                <Link className="w-[120px] text-center text-[18px]" to='/allScholarships'><h1 className="border-b-yellow-300 border-b-4 pb-2 tracking-wider font-medium">Explore more</h1></Link>
            </div>
        </div>
    );
};

export default Home;