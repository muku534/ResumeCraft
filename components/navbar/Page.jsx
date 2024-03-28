"use client"

import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.jsx";
import Image from "next/image";
import Login from "@/components/login/Page";
import Signup from "@/components/signup/Page";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { getSession } from "next-auth/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const session = getSession();
    console.log("session", session)

    const menuItems = [
        { label: "HOME", target: "Home" },
        { label: "ABOUT US", target: "About" },
        { label: "TEMPLATES", target: "Templates" },
        { label: "CONTACT", target: "Contact" },
        { label: "Log Out", target: null } // Assuming this is a placeholder, not a scroll target
    ];

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };


    const handleLoginButtonClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleSignUpButtonClick = () => {
        setIsSignUpModalOpen(true);
    };

    const handleCloseSignUpModal = () => {
        setIsSignUpModalOpen(false);
    };


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <NavbarBrand>
                        <Image src="/assets/logo (1).png" alt="Logo" width={50} height={50} />
                        <p className="font-bold text-inherit text-xl">ResumeCraft</p>
                    </NavbarBrand>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <ScrollLink
                        to="Home"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-800 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        aria-current="page">
                        HOME
                    </ScrollLink>
                </NavbarItem>
                <NavbarItem >
                    <ScrollLink
                        to="About"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-800 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        aria-current="page">
                        ABOUT US
                    </ScrollLink>
                </NavbarItem>
                <NavbarItem>
                    <ScrollLink
                        to="Templates"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-800 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        aria-current="page">
                        TEMPLATES
                    </ScrollLink>
                </NavbarItem>
                <NavbarItem>
                    <ScrollLink
                        to="Contact"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-800 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        aria-current="page">
                        CONTACT
                    </ScrollLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex pointer">
                    <Link onClick={handleLoginButtonClick} className="cursor-pointer">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button onClick={handleSignUpButtonClick} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                        <ScrollLink
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to={item.target} // Use item.target instead of target
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-100}
                            aria-current="page"
                            onClick={handleMenuItemClick}
                        >
                            {item.label}
                        </ScrollLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>

            <Login isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
            <Signup isOpen={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen} />
        </Navbar>
    );
}