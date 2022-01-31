import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import 'swiper/css';

function ProductSlide(){
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Swiper
    style={{
      "--swiper-navigation-color": "#fff",
      "--swiper-pagination-color": "#fff",
    }}
    spaceBetween={10}
    navigation={true}
    thumbs={{ swiper: thumbsSwiper }}
    modules={[FreeMode, Navigation, Thumbs]}
    className="mySwiper2"
  >
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
    </SwiperSlide>
  </Swiper>
  );
};

export default ProductSlide

{/* <Slider {...settings} className='product-page-slide'>
          <div className='slide'>
            <img src={images.product1} />
          </div>
          <div className='slide'>
            <img src={images.product4} />
          </div>
          <div className='slide'>
            <img src={images.product3} />
          </div>
          <div className='slide'>
            <img src={images.product2} />
          </div>
        </Slider> */}