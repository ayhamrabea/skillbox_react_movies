import { Outlet } from 'react-router-dom';
import { Navbar } from "../navbar/Navbar";

export const Layout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                
            </footer>
        </>
    );
};