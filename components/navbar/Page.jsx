"use client";

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import Image from "next/image";

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
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            HOME
                        </Link>
                    </NavbarItem>
                    <NavbarItem >
                        <Link color="foreground" href="#" >
                            ABOUT US
                        </Link>
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
                    <NavbarItem className="hidden lg:flex ">
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
