import { useState, useEffect } from "react";
import React from "react";
import { Link } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import "./mobile.css";

function StandardNav(props) {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleMobileToggle = () => {
            window.innerWidth >= 1024 || !isOpen
                ? (document.body.style.overflow = "")
                : (document.body.style.overflow = "hidden");
        };

        window.addEventListener("resize", handleMobileToggle);

        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    return (
        <div className="relative pb-20">
            {isOpen && (
                <div className="fixed inset-0 z-10 bg-opacity-50 bg-black backdrop-filter backdrop-blur-sm ">
                    <div className="lg:hidden border-t border-black absolute inset-x-0 bottom-0 dark:border-white animate-slide-down">
                        <div className="border-b text-sm text-slate-700 dark:text-slate-400">
                            <div className="flex justify-evenly text-white">
                                <Link to="/impressum" className="p-2 hover:text-gray-200">Impressum</Link>
                                <Link to="/privacy" className="p-2 hover:text-gray-200">Privacy</Link>
                                <Link to="/rechtliches" className="p-2 hover:text-gray-200">Rechtliches</Link>
                            </div>
                        </div>

                        <div className="text-sm text-white text-center">
                            <p>
                                IT-Sicherheit aus Berlin{" "}
                                <span className="dark:text-red-400">&hearts;</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <nav className="fixed z-30 top-0 w-full dark:text-black">
                <div className="">
                    <div className="p-2 lg:py-7 md:p-4 flex justify-between">
                        {/* Mobile Nav Button */}
                        <div class="lg:hidden ">
                            <button
                                onClick={openMenu}
                                className="stroke-black dark:hover:stroke-slate-500 dark:stroke-white dark:text-white dark:border-white border text-black border-black hover:text-slate-700 hover:border-slate-700"
                            >
                                <svg
                                    className={"ham hamRotate ham8 " + (isOpen && "active")}
                                    viewBox="0 0 100 100"
                                    width="40"
                                >
                                    <path
                                        class="line top "
                                        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                                    />
                                    <path class="line middle" d="m 30,50 h 40" />
                                    <path
                                        class="line bottom"
                                        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* --- Mobile Nav Button --- */}
                        <Link to="/">
                            <StaticImage src="../images/icon.png" height={30} width={30} alt="logo" />
                        </Link>
                    </div>

                    <div className="w-full block lg:absolute lg:top-[1.4rem]">
                        <div className={"lg:flex-grow lg:inline " + (!isOpen && "hidden")}>
                            <div className="lg:flex lg:justify-end lg:text-lg lg:font-normal lg:mt-0 lg:tracking-normal mt-8 text-3xl tracking-wide font-light flex justify-center content-center">
                                <ul className="text-white group-odd:">
                                    <li className="mb-10 mt-10 lg:float-left lg:pr-4 lg:mx-6 lg:my-2.5">
                                        <Link to="/consulting">/consulting</Link>
                                    </li>
                                    <li className="mb-10 lg:float-left lg:pr-4 lg:mx-6 lg:my-2.5">
                                        <Link to="/blog">/blog</Link>
                                    </li>
                                    <li className="mb-10 lg:float-left lg:pr-4 lg:mx-6 lg:my-2.5">
                                        <Link to="/tools">/tools</Link>
                                    </li>
                                    <li className="mb-3 lg:float-left lg:pr-4 lg:mx-6 lg:my-2.5">
                                        <Link to="/about">/about</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
            </nav >
        </div>
    );
}

export default StandardNav;
