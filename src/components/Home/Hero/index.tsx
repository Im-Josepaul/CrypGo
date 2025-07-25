"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import BuyCrypto from "../../../components/Home/Hero/buy-form";
import CardSlider from "../../../components/Home/Hero/slider";
import { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Hero = () => {
  const [isBuying, setIsBuyingOpen] = useState(false);
  const BuyRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (BuyRef.current && !BuyRef.current.contains(event.target as Node)) {
        setIsBuyingOpen(false);
      }
    },
    [BuyRef]
  );

  const navbarChanger = () => {
    document.getElementById("header")?.classList.replace("z-51", "z-50");
    setIsBuyingOpen(false);
  }

  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    document.body.style.overflow = isBuying ? "hidden" : "";
  }, [isBuying]);

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12">
          <motion.div {...leftAnimation} className="lg:col-span-5 col-span-12">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24">
              <Image
                src= {"../../../../images/icons/icon-bag.svg"}
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-white sm:text-28 text-18 mb-0">
                Crypto On The <span className="text-primary">Go</span>
              </p>
            </div>
            <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-white mb-10">
              Buy <span className="text-primary">Crypto</span> of your{" "}
              <span className="text-primary">choice</span>!
            </h1>
            <div className="flex items-center md:justify-start justify-center gap-8">
              <button
                className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-darkmode py-2 px-7 z-50"
                onClick={() => setIsBuyingOpen(true)}
              >
                Buy Crypto
              </button>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
            <div className="ml-20 -mr-64">
              <Image
                src= {`../../../../images/hero/banner-image.png`}
                alt="Banner"
                width={1150}
                height={1150}
              />
            </div>
          </motion.div>
        </div>
        <CardSlider />
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>

      {/* Modals for Buy*/}
      {isBuying && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={BuyRef}
            className="relative w-full max-w-md overflow-hidden rounded-lg px-5 pt-14 pb-7 z-999 text-center bg-dark_grey bg-opacity-90 backdrop-blur-md"
          >
            <button
              onClick={() => navbarChanger()}
              className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
              aria-label="Close Buy Modal"
            >
              <Icon
                icon="tabler:currency-xrp"
                className="text-white hover:text-primary text-24 inline-block me-2"
              />
            </button>
            <BuyCrypto />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
