import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import '../../components/Navbar/styles/style.css'
import { Link, useLocation } from "react-router-dom";

function Index() {
    const [isOpen, setIsOpen] = useState(false);
    const path = useLocation().pathname;

    return (
        <div className="flex items-center justify-center">
            <nav className="navbar w-11/12 mt-5">
                <div className="px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto rounded-xl">
                    <div className="flex items-center justify-between w-full h-16 ">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex-shrink-0">
                                <a href="/">
                                    <p className="logo text-[40px]">VIBRANCE'23</p>
                                </a>
                            </div>
                            <div className="hidden lg:block">
                                <div className="navs ml-10 flex items-baseline space-x-4 justify-between ">
                                    <Link
                                        to="/events"
                                        className={"hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base" + (path === '/events' ? ' font-bold' : ' font-medium text-gray-300')}
                                    >
                                        events
                                    </Link>

                                    <Link
                                        to="/pro-shows"
                                        className={"hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base" + (path === '/pro-shows' ? ' font-bold' : ' font-medium text-gray-300')}
                                    >
                                        pro shows
                                    </Link>

                                    <Link
                                        to="/merchandise"
                                        className={"hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base" + (path === '/merchandise' ? ' font-bold' : ' font-medium text-gray-300')}
                                    >
                                        merchandise
                                    </Link>

                                    <Link
                                        to="/gallery"
                                        className={"hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base" + (path === '/gallery' ? ' font-bold' : ' font-medium text-gray-300')}
                                    >
                                        gallery
                                    </Link>

                                    <Link
                                        to="/sponsors"
                                        className={"hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base" + (path === '/sponsors' ? ' font-bold' : ' font-medium text-gray-300')}
                                    >
                                        sponsors
                                    </Link>

                                    <Link
                                        to="/team"
                                        className={"hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base" + (path === '/team' ? ' font-bold' : ' font-medium text-gray-300')}
                                    >
                                        team
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="lg:hidden" id="mobile-menu">
                            <div ref={ref} className="navs px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    to="/events"
                                    className={"hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base" + (path === '/events' ? ' font-bold' : ' font-medium text-gray-300')}
                                >
                                    events
                                </Link>

                                <Link
                                    to="/pro-shows"
                                    className={"hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base" + (path === '/pro-shows' ? ' font-bold' : ' font-medium text-gray-300')}
                                >
                                    pro shows
                                </Link>

                                <Link
                                    to="/merchandise"
                                    className={"hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base" + (path === '/merchandise' ? ' font-bold' : ' font-medium text-gray-300')}
                                >
                                    merchandise
                                </Link>

                                <Link
                                    to="/gallery"
                                    className={"hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base" + (path === '/gallery' ? ' font-bold' : ' font-medium text-gray-300')}
                                >
                                    gallery
                                </Link>

                                <Link
                                    to="/sponsors"
                                    className={"hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base" + (path === '/sponsors' ? ' font-bold' : ' font-medium text-gray-300')}
                                >
                                    sponsors
                                </Link>

                                <Link
                                    to="/team"
                                    className={"hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base" + (path === '/team' ? ' font-bold' : ' font-medium text-gray-300')}
                                >
                                    team
                                </Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>

            


        </div>
    );
}

export default Index;

