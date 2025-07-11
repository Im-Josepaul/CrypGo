import React from "react";
import Image from "next/image";
import { getImagePrefix } from "../../utils/utils";

const NotFound = ({ error }: { error: string }) => {
  return (
    <section className="bg-white pt-8 pb-20 loading-body loading">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-5/12 lg:w-6/12">
            <div className="relative mx-auto aspect-[129/138] max-w-[357px] text-center">
              <Image
                src= {`${getImagePrefix()}images/404.svg`}
                alt="image"
                width={0}
                height={0}
                layout="responsive"
                quality={100}
                className="mx-auto max-w-full"
              />
            </div>
          </div>
          <div className="w-full px-4 md:w-7/12 lg:w-6/12 xl:w-5/12">
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-dark text">
                We Can&#39;t Seem to Find The Page You&#39;re Looking For.
              </h3>
              <p className="mb-8 text-base text-body-color text">
                The following error may have occured: <br />
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;