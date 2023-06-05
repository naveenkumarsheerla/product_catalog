import React from 'react';
import { Search } from '../components/Search';




export const Navbar = () => {


    return (

        <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
            <div className="container-fluid container">
                {/* <a className="navbar-brand" href="/">Products</a> */}
                <form className='search' >
                    <Search  />
                  
                </form>

            </div>
        </nav>


    );
};




