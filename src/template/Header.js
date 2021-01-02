import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

function Header(){
    return(
        <div className="header">
            <header>
                <h1>Website Kasir</h1>
            </header>
            <Navbar className="justify-content-end" bg="dark">
                <Link to="/logout"><Button variant="outline-light">Logout</Button></Link>
            </Navbar>
        </div>
    );
}

export default Header;