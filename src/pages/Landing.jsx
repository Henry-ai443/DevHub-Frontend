import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import AudienceSection from "../components/AudienceSection";
import CallToAction from "../components/callToAction";
import Footer from "../components/Footer";
const LandingPage = () =>{
return(
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <AudienceSection/>
    <CallToAction/>
    <Footer/>
    </>
)
}
export default LandingPage