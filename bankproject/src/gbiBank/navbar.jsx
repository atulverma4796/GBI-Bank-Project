import React from "react";
//import auth from "../services/authService";
import {Link} from "react-router-dom";
export default class Navbar extends React.Component{
    render(){
        const {user}=this.props;
        return <nav className="navbar navbar-expand-md navbar-warning bg-warning">
             <Link to="/" className="navbar-brand font-weight-bold">
       Home
        </Link>
        <div className="">
            <ul className="navbar-nav mr-auto">
            {!user && (
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>)}
             {user && user.role==="manager" &&(
            <li className="nav-item dropdown">
        <h5 className="nav-link dropdown-toggle"  id="navbarDropdown"
         role="button" data-toggle="dropdown" aria-haspopup="true">
          Customers
        </h5>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/addCustomer">add Customers</Link>
          <Link className="dropdown-item" to="/allCustomers?page=1">View All Customers</Link>
        </div>
      </li>)}
      {user && user.role==="manager" && (
      <li className="nav-item dropdown">
        <h5 className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Transaction
        </h5>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/allCheque?page=1">Cheques</Link>
          <Link className="dropdown-item" to="/allNet?page=1">Net Banking</Link>
        </div>
      </li>)}
      {user && user.role==="customer" && (
      <li className="nav-item dropdown">
        <h5 className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          View
        </h5>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/viewCheque?page=1">Cheques</Link>
          <Link className="dropdown-item" to="/viewNet?page=1">Net Banking</Link>
        </div>
      </li>)}
      {user && user.role==="customer" && (
      <li className="nav-item dropdown">
        <h5 className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Details
        </h5>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/customerDetails">Customer</Link>
          <Link className="dropdown-item" to="/nominee">Nominee</Link>
        </div>
      </li>)}
      {user && user.role==="customer" && (
      <li className="nav-item dropdown">
        <h5 className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Transaction
        </h5>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/addPayee">Add Payee</Link>
          <Link className="dropdown-item" to="/cheque">Cheque</Link>
          <Link className="dropdown-item" to="/netBanking">Net Banking</Link>
        </div>
      </li>)}
            </ul>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
                {user && (
            <li className="nav-item">
                    <h5 className="nav-link">Welcome {user.name}  <b>||</b></h5>
                </li>)}
                {user && (
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>)}
            </ul>
        </div>
        </nav>
    }
}