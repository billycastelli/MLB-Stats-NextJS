import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WelcomeSegment from "../components/WelcomeSegment/WelcomeSegment";
import AboutInfo from "../components/AboutInfo/AboutInfo";

const About = () => {
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
          <div className="container section">
            <h1>About this application</h1>
            <br />
            <p>
              "QuickStats" is a Next.js application that allows the user to
              search, download, and graphically view decades of Major League
              Baseball statistics. Initial data dump provided by{" "}
              <a href="http://www.seanlahman.com/baseball-archive/statistics/">
                Lahman's Baseball Database
              </a>
              .
            </p>
            <p style={{ marginTop: "8px" }}>
              This project began as an experimental foray into storing baseball
              statistics in a JSON structure. Elasticsearch was the NoSQL
              database chosen to store all statistics, allowing the application
              to take advantage of its awesome text search capabilities. This
              Elasticsearch node exists on a Digital Ocean droplet, and an API
              was built to query this Elasticseach node. Lastly, this web
              application was written using Next.js (my personal favorite
              React.js framework).
            </p>
            <h3
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                fontSize: "20px",
              }}
            >
              Architecture Diagram
            </h3>
            <img
              src="/images/architecture.png"
              style={{
                border: "1px solid black",
                padding: "20px",
                marginTop: "12px",
              }}
            />
            <h3
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                fontSize: "20px",
              }}
            >
              The Code
            </h3>
            <p style={{ marginTop: "8px" }}>
              All the code written for this application is open source. Repos
              are documented with more specific information. Feel free to take a
              look!
            </p>
            <ul style={{ listStyle: "inside" }}>
              <li>
                <a href="https://github.com/billycastelli/Lahman-to-Elasticsearch">
                  Python utilities
                </a>{" "}
                to clean and send data to Elasticsearch
              </li>
              <li>
                <a href="https://github.com/billycastelli/MLB-Stats-CDK-backend">
                  Backend API
                </a>{" "}
                written using the AWS CDK
              </li>
              <li>
                <a href="https://github.com/billycastelli/MLB-Stats-NextJS">
                  Frontend web application
                </a>{" "}
                written using Next.js
              </li>
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
