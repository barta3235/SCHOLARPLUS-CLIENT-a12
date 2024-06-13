// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';
import './styles.css'
const SmallBanner = () => {
    return (
        <div className="flex md:hidden mb-[10px]">
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper swiper1"
            >
                <SwiperSlide className='swiper-slide1'>Slide 1</SwiperSlide>
                <SwiperSlide className='swiper-slide1'>Slide 2</SwiperSlide>
                <SwiperSlide className='swiper-slide1'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-slide1'>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SmallBanner;