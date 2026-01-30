import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-canvas-area">
                {children}
            </main>
        </div>
    );
};
