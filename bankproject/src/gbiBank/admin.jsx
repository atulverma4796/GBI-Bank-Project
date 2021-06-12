import React from "react";
import bankImage from "./bank.jpg"
export default class Admin extends React.Component{
    render(){
        return<div className="container text-center">
            <h2 className="display-2 text-danger">Welcome to GBI Bank</h2>
            <img className="img-fluid my-4 " width="400px" src={bankImage}/>
        </div>
    }
}