import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";

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
                            {/* Your input fields */}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" onPress={() => onOpenChange(false)}>
                                Close
                            </Button>
                            <Button color="primary" onPress={signInWithGitHub}>
                                Sign in with GitHub
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    );
}
