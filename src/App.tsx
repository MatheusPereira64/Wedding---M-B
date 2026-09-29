import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Countdown } from "./components/sections/Countdown";
import { Story } from "./components/sections/Story";
import { Couple } from "./components/sections/Couple";
import { Gallery } from "./components/sections/Gallery";
import { Venue } from "./components/sections/Venue";
import { Schedule } from "./components/sections/Schedule";
import { RSVP } from "./components/sections/RSVP";
import { Gifts } from "./components/sections/Gifts";
import { DressCode } from "./components/sections/DressCode";
import { FAQ } from "./components/sections/FAQ";
import { Closing } from "./components/sections/Closing";
import { Seo } from "./seo";

export default function App() {
  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Venue />
        <Schedule />
        <RSVP />
        <Gifts />
        <DressCode />
        <Story />
        <Gallery />
        <Couple />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
