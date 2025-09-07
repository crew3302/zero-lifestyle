// src/components/ImageCarousel.tsx
import React from 'react';
import Slider from 'react-slick';

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  caption?: string; // Optional caption
}

const images: CarouselImage[] = [
  { id: 1, src: 'https://images.pexels.com/photos/3855622/pexels-photo-3855622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Minimalist Lifestyle Setup', caption: 'Embrace Simplicity' },
  { id: 2, src: 'https://images.pexels.com/photos/163036/auto-start-starter-startup-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Focused Work Environment', caption: 'Achieve Your Goals' },
  { id: 3, src: 'https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Tech and Nature Harmony', caption: 'Live Intentionally' },
  { id: 4, src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Community Connection', caption: 'Grow Together' },
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    customPaging: (i: number) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.5)", // Semi-transparent white for inactive
          // Active dot styling will be handled by slick-theme.css or custom CSS if needed
        }}
      ></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          padding: "10px"
        }}
      >
        <ul style={{ margin: "0px", paddingLeft: "0px", textAlign: "center" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <section className="py-16 bg-gray-100"> {/* Or any background you prefer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Moments with Zero
        </h2>
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id} className="relative aspect-video focus:outline-none"> {/* aspect-video for 16:9 */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center rounded-b-lg">
                  <p className="text-lg font-semibold">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ImageCarousel;