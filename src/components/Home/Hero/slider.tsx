import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { pricedeta } from "../../../app/api/data";
import Image from "next/image";
import { getImagePrefix } from "../../../utils/utils";

const CardSlider = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1500,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  };
  let priceData: any = sessionStorage.getItem('cachedPriceData');
  priceData = JSON.parse(priceData);
  return (
    <div className="lg:-mt-16 mt-16 w-full overflow-hidden">
      <Slider {...settings}>
        {pricedeta.map((item, index) => (
          <div key={index} className="pr-6">
            <div className="px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl">
              <div className="flex items-center gap-5">
                <div
                  className={`${item.background} ${item.padding} rounded-full px-2 max-w-full`}
                >
                  <Image
                    src= {`${getImagePrefix()}${item.icon}`}
                    alt="icon"
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <p className="text-white text-xs font-normal ">
                  <span className="text-16 font-bold mr-2">{item.title}</span>
                  {item.short}
                </p>
              </div>
              <div className="flex justify-between mt-7">
                <div className="">
                  <p className="text-16 font-bold text-white mb-0 leading-none">
                    {priceData[item.short].value}
                  </p>
                </div>
                <div className="">
                  <span className="text-error text-xs">{item.mark}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
