import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WelcomeSegment from "../components/HomeSegments/WelcomeSegment";

const HomePage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <main>
        <Header />
        <WelcomeSegment />
        {/* <div>
          <p>Information provided by the Lahman Baseball Database</p>

        </div> */}
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
