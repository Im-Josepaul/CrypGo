import React from "react";
import Hero from "../components/Home/Hero";
import TimeLine from "../components/Home/timeline";
import Platform from "../components/Home/platform";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CrypGo",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TimeLine />
      <Platform />
    </main>
  );
}
