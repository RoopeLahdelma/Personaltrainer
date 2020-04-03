import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

const Navigator = () => {
    return (
<div>        
    <nav className="navbar navbar-expand-lg navbar-light bg -light">
        <Link className="navbar-brand" to ="/" >Personal Trainer</Link>
        <Link className="nav-link"to="/training">Training</Link>
        <Link className="nav-link"to="/">Customers</Link>
        <Link className="nav-link"to="/calendar">Calendar</Link>
    </nav>
</div>
)
}
export default Navigator;