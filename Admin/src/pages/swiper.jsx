import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import { RxArrowTopRight } from "react-icons/rx";
// import { ServiceData } from "../constants";
import {
  FreeMode,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import Card1 from "./cards";

export default function Slider() {
  return (
    <div className="flex items-center justify-center flex-col h-full w-full">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
        }}
        coverflowEffect={{
            rotate:15,
            depth:100,
            scale:0.9,
            modifier:1.7,
            slideShadows:true,
        }}
        effect="coverflow"
        loop={true}
        freeMode={false}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination,EffectCoverflow]}
        className="swiper-container max-w-[80%] lg:max-w-[95%]"
      >
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <Card1/>
          </div>
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}
