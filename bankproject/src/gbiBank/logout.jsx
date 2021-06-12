import React from "react";
import auth from "../services/authService";
export default class Logout extends React.Component{

    componentDidMount(){
        auth.logout();
        window.location="/login";
    }
    render(){
        return "";
    }
}