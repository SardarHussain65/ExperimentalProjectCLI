import React, { createContext, useState } from 'react';

interface ModalContextType {
    visible: boolean;
    title: string;
    description: string;
    closeModal: () => void;
    openModal: (title: string, description: string) => void;
}

export const ModalContext = createContext<ModalContextType>({
    visible: false,
    title: '',
    description: '',
    closeModal: () => { },
    openModal: () => { },
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const closeModal = () => {
        setVisible(false);
        setTitle('');
        setDescription('');
    };

    const openModal = (title: string, description: string) => {
        setVisible(true);
        setTitle(title);
        setDescription(description);
    };

    return (
        <ModalContext.Provider value={{ visible, title, description, closeModal, openModal }}>
            {children}
        </ModalContext.Provider>
    );
};
