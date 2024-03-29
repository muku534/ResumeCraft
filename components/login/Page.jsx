import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
// import MailIcon from "../MailIcon"; // Assuming MailIcon is exported from "../MailIcon.jsx"
// import LockIcon from "../LockIcon";
import Image from "next/image";

export default function Login({ isOpen, onOpenChange }) {
    const signInWithGitHub = () => {
        signIn('github'); // Specify the provider ('github') you want to sign in with
    };
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                // endContent={
                                //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                // }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                            />
                            <Input
                                // endContent={
                                //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                // }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="bordered"
                            />
                            <div className="flex py-2 px-1 justify-between">
                                <Checkbox
                                    classNames={{
                                        label: "text-small",
                                    }}
                                >
                                    Remember me
                                </Checkbox>
                                <Link color="primary" href="#" size="sm">
                                    Forgot password?
                                </Link>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="primary"  >
                                Sign in
                            </Button>
                        </ModalFooter>
                        <Button color="dark" onClick={signInWithGitHub} className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400 mx-10 my-2">
                            <div className="mr-2">
                                <Image src="/assets/GitHub.png" alt="GitHub Logo" width={24} height={24} className="filter invert" />
                            </div>
                            Sign in with GitHub
                        </Button>

                    </>
                )}
            </ModalContent>
        </Modal >
    );
}