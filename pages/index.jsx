import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WelcomeSegment from "../components/WelcomeSegment/WelcomeSegment";
import AboutInfo from "../components/AboutInfo/AboutInfo";

const HomePage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
        <title>MLB Stats</title>
      </Head>
      <div className="flex-page">
        <Header />
        <main className="flex-content">
          <WelcomeSegment />
          <AboutInfo />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
