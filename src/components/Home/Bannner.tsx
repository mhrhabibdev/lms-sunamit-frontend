"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const courses = [
  {
    title: "Mastering Meta ADS",
    image: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
    bg: "bg-orange-500",
    
  },
  {
    title: "NEWS PRESENTATION",
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    bg: "bg-blue-700",
    
  },
  {
    title: "LinkedIn For Everyone",
    image: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
    bg: "bg-blue-600",
    
  },
  {
    title: "Video Editing",
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    bg: "bg-black",
    
  },
  {
    title: "Motion Graphics Bootcamp",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
    bg: "bg-gradient-to-br from-pink-200 to-purple-300",
    
  },
];

export default function Banner() {
  return (
    <section className="w-full py-6 sm:py-8 bg-gradient-to-b from-sky-100 to-blue-400 dark:from-[#111827] dark:to-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Two Columns: Swiper Slider */}
          <div className="lg:col-span-2 w-full">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ 
                delay: 2500, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              loop={true}
              pagination={{ 
                clickable: true,
                el: '.swiper-pagination',
                type: 'bullets',
                dynamicBullets: true
              }}
              breakpoints={{
                0: { slidesPerView: 1.1, spaceBetween: 10 },
                480: { slidesPerView: 1.4, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 2.2, spaceBetween: 12 },
                1024: { slidesPerView: 2.5, spaceBetween: 12 },
              }}
              className="!pb-10 cursor-pointer" // Added cursor-pointer here
            >
              {courses.map((course, index) => (
                <SwiperSlide key={index}>
                  <div className="px-0.5">
                    <Card
                      className={`overflow-hidden ${course.bg} h-[300px] w-full max-w-[320px] mx-auto transform transition duration-500 hover:scale-[1.03] hover:shadow-xl hover:brightness-110 cursor-pointer`}
                    >
                      <CardContent className="p-0 h-full relative group">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                          quality={100}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:bg-opacity-50">
                          <h3 className="text-white text-2xl font-bold text-center mb-4">
                            {course.title}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination !bottom-0 !relative mt-4" />
            </Swiper>     
          </div>

          {/* Right One Column: Discount Text */}
          <div className="flex flex-col items-center lg:items-end justify-center h-full w-full lg:pl-4">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl w-full max-w-md">
              <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-xl leading-tight">
                ৯০% পর্যন্ত <br />
                <span className="text-5xl sm:text-6xl text-yellow-300">ছাড়!</span>
              </h2>
              <Button className="mt-6 text-lg px-8 py-4 w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                এখনই ভর্তি হোন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}