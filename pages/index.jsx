import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

const HomePage = () => {
    const router = useRouter();
    useEffect(() => {
        Router.push({ pathname: "/search" });
    });
    return <></>;
};

export default HomePage;
