import Banner from "../components/Banner";
import HeadSubHead from "../components/HeadSubHead";
import Top6_Scholarship from '../components/Top6_Scholarship/Top6_Scholarship'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HeadSubHead heading1="Top" heading2="Scholarships" subHeading="Premier Opportunities for Advanced Study and Research"></HeadSubHead>
            <Top6_Scholarship></Top6_Scholarship>
        </div>
    );
};

export default Home;