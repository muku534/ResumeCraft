"use client";

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const menuItems = [
        "HOME",
        "ABOUT US",
        "TEMPLATES",
        "CONTACT",
        "Log Out",
    ];

    const handleLoginButtonClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <Image src="/assets/logo (1).png" alt="Logo" width={50} height={50} />
                        <p className="font-bold text-inherit text-xl">ResumeCraft</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <ScrollLink
                            to="Home"
                            spy={true}
                            smooth={true}
                            duration={500}
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
                            className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-800 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            aria-current="page">
                            ABOUT US
                        </ScrollLink>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            TEMPLATES
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            CONTACT
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex pointer">
                        <Link onClick={handleLoginButtonClick}>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>

            <Modal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} placement="top-center">
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalBody>
                        <Input label="Email" placeholder="Enter your email" variant="bordered" />
                        <Input label="Password" placeholder="Enter your password" type="password" variant="bordered" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" onClick={handleCloseLoginModal}>Close</Button>
                        <Button color="primary">Sign in</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
