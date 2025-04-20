// import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ currentPage }: { currentPage: string }) => {
    const navigate = useNavigate();

    function redirectPage(currentPage: string) {
        if (currentPage === "dashboard") {
            navigate("/form");
        } else {
            navigate("/");
        }
    }

    return (
        <header className='bg-blue-500 sticky top-0 py-4 px-10 flex flex-row justify-between items-center'>
            <h1 className='text-xl text-white font-semibold'>We Do Good</h1>

            <button
                onClick={() => redirectPage(currentPage)}
                className="bg-white rounded-xl px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                {currentPage === "dashboard" ? "Add New Report" : "Show Dashboard"}
            </button>
        </header>
    );
};

export default NavBar;
