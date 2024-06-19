// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import '../../src/index.css'
// import required modules
import { EffectCreative } from 'swiper/modules';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const Banner = () => {

    return (
        <div className="flex md:flex-row flex-col items-center mx-[5px] md:mx-[50px]">
            <div className='h-[500px] w-full md:w-1/2 bg-slate-100 rounded-md bannerModel flex flex-col justify-center items-center'>
                <div className='bg-black bg-opacity-35 w-full h-full flex flex-col justify-center pl-[5px] md:pl-5 text-white tracking-wide'>
                    <h1 className='text-3xl md:text-5xl font-medium'>Empowering Dreams</h1>
                    <h1 className='text-[20px] mt-5 justify-start font-medium'>Unlock Your Potential with Our Scholarships</h1>
                </div>
            </div>

            <div className='h-[300px] mt-[10px] md:h-[580px] w-full md:w-1/2 bh tracking-wide'>
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    modules={[EffectCreative]}
                    className="mySwiper"
                >
                    <SwiperSlide className='slideBanner1'><h1 className='flex justify-center items-center h-full bg-black bg-opacity-50 flex-col'><h1>Harvard</h1><GoArrowRight className='text-white text-4xl'/></h1></SwiperSlide>
                    <SwiperSlide className='slideBanner2'><h1 className='flex justify-center items-center h-full bg-black bg-opacity-50 flex-col'><h1>Caltech</h1><GoArrowRight className='text-white text-4xl'/></h1></SwiperSlide>
                    <SwiperSlide className='slideBanner3'><h1 className='flex justify-center items-center h-full bg-black bg-opacity-50 flex-col'><h1>Tokyo University</h1><GoArrowRight className='text-white text-4xl'/></h1></SwiperSlide>
                    <SwiperSlide className='slideBanner4'><h1 className='flex justify-center items-center h-full bg-black bg-opacity-50 flex-col'><h1>University of Toronto</h1><GoArrowLeft className='text-white text-4xl'/></h1></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;