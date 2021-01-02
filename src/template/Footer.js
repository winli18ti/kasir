import React from "react";

function Footer(){
    return(
        <div className="content">
            <footer>
                Copyright &copy; {new Date().getFullYear()} Kasir
            </footer>
        </div>
    );
}

export default Footer;

