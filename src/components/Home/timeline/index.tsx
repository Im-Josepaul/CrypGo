"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "../../../utils/utils";

const TimeLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };
  return (
    <section className="md:pt-40 pt-9" id="development">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-16 px-4">
        <div className="text-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted sm:text-28 text-18 mb-9">
              How it <span className="text-primary">works?</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 font-medium lg:w-80% mx-auto mb-20">
              The one of a kind P2P crypto exchange website where you can pay through 
              UPI for the crypto of your choice.
            </h2>
          </motion.div>
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Desktop layout */}
            <div className="hidden md:block relative">
              <div>
                <Image
                  src={`${getImagePrefix()}images/timeline/img-timeline.png`}
                  alt="image"
                  width={1220}
                  height={1000}
                  className="w-[80%] mx-auto"
                />
              </div>

              {/* Desktop Timeline Items */}
              <div className="absolute lg:top-40 top-36 lg:left-0 -left-20 w-72 flex items-center gap-6">
                <div className="text-right">
                  <h5 className="text-muted text-28 mb-3">Selection</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Select the crypto of your choice and your budget.
                  </p>
                </div>
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-3 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-mobileapp.svg`}
                    alt="Planning"
                    width={44}
                    height={44}
                    className="w-10 h-10 max-w-none"
                  />
                </div>
              </div>
              <div className="absolute lg:top-40 top-36 lg:right-0 -right-20 w-72 flex items-center gap-6">
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-3 p-6 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-refinement.svg`}
                    alt="Refinement"
                    width={44}
                    height={44}
                    className="w-10 h-10 max-w-none"
                  />
                </div>
                <div className="text-left">
                  <h5 className="text-muted text-28 mb-3">Specify Details</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Add the required chain in your wallet and provide the wallet address.
                  </p>
                </div>
              </div>
              <div className="absolute lg:bottom-48 bottom-36 lg:left-0 -left-20 w-72 flex items-center gap-6">
                <div className="text-right">
                  <h5 className="text-muted text-28 mb-3">Pay using UPI</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Pay the current market price and exchage rates using UPI.
                  </p>
                </div>
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-3 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-prototype.svg`}
                    alt="Prototype"
                    width={44}
                    height={44}
                    className="w-10 h-10 max-w-none"
                  />
                </div>
              </div>
              <div className="absolute lg:bottom-48 bottom-36 lg:right-0 -right-20 w-72 flex items-center gap-6">
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-3 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-wallet.svg`}
                    alt="Scale and support"
                    width={66}
                    height={44}
                    className="w-10 h-10 max-w-none"
                  />
                </div>
                <div className="text-left">
                  <h5 className="text-muted text-nowrap text-28 mb-3">Recieve in wallet</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Your crypto will be credited soon in the provided wallet.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="block md:hidden space-y-10">
              <Image
                src={`${getImagePrefix()}images/timeline/img-timeline.png`}
                alt="image"
                width={1220}
                height={1000}
                className="w-full"
              />
              <div className="text-center space-y-4">
                <Image src={`${getImagePrefix()}images/timeline/icon-mobileapp.svg`} alt="" width={44} height={44} className="mx-auto" />
                <h5 className="text-muted text-24">Selection</h5>
                <p className="text-muted text-opacity-60 text-16">Select the crypto of your choice and your budget.</p>
              </div>
              <div className="text-center space-y-4">
                <Image src={`${getImagePrefix()}images/timeline/icon-refinement.svg`} alt="" width={44} height={44} className="mx-auto" />
                <h5 className="text-muted text-24">Specify Details</h5>
                <p className="text-muted text-opacity-60 text-16">Add the required chain in your wallet and provide the wallet address.</p>
              </div>
              <div className="text-center space-y-4">
                <Image src={`${getImagePrefix()}images/timeline/icon-prototype.svg`} alt="" width={44} height={44} className="mx-auto" />
                <h5 className="text-muted text-24">Pay using UPI</h5>
                <p className="text-muted text-opacity-60 text-16">Pay the current market price and exchage rates using UPI.</p>
              </div>
              <div className="text-center space-y-4">
                <Image src={`${getImagePrefix()}images/timeline/icon-wallet.svg`} alt="" width={66} height={44} className="mx-auto" />
                <h5 className="text-muted text-nowrap text-24">Recieve in wallet</h5>
                <p className="text-muted text-opacity-60 text-16">Your crypto will be credited soon in the provided wallet.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
