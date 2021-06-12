import React from "react";
import {Route,Switch,Redirect} from "react-router-dom";
import Navbar from "./navbar";
import auth from "../services/authService";
import Login from "./loginPage";
import Admin from "./admin";
import Logout from "./logout";
import AddCustomer from "./addCustomer";
import AllCustomers from "./showAllCustomers";
import AllCheque from "./allCheque";
import AllNet from "./allNet";
import ViewCheque from "./viewCheque";
import ViewNet from "./viewNet";
import CustumerDetail from "./customerDetails";
import Nominee from "./nomniee";
import Cheque from "./addCheque";
import NetBanking from "./addNetBanking";
import AddPayee from "./addPayee";
import Emp from "./emp";
import NotAllowed from "./notAllowed";
export default class MainComponent extends React.Component{

    render(){
        let user = auth.getItem();
        return <div className="container-fluid">
            <Navbar user={user}/>
            <Route>
                <Switch>
                <Route path="/notallowed" component={NotAllowed}/>
                <Route path="/netBanking" 
                 render={(props)=>user?user.role=="customer"?<NetBanking {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                  <Route path="/addPayee" 
                   render={(props)=>user?user.role=="customer"?<AddPayee {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                   <Route path="/cheque" 
                    render={(props)=>user?user.role=="customer"?<Cheque {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/allCheque"
                     render={(props)=>user?user.role=="manager"?<AllCheque {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/> 
                    <Route path="/allNet"
                    render={(props)=>user?user.role=="manager"?<AllNet {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/customerDetails"
                    render={(props)=>user?user.role=="customer"?<CustumerDetail {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/nominee"
                    render={(props)=>user?user.role=="customer"?<Nominee {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/viewCheque" 
                     render={(props)=>user?user.role=="customer"?<ViewCheque {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/viewNet"
                       render={(props)=>user?user.role=="customer"?<ViewNet {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin"
                     render={(props)=>user?user.role=="manager"?<Admin {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/emp"
                    render={(props)=>user?user.role=="customer"?<Emp {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/addCustomer"
                    render={(props)=>user?user.role=="manager"?<AddCustomer {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/> 
                    <Route path="/:page"
                     render={(props)=>user?user.role=="manager"?<AllCustomers {...props}/>:<Redirect to="/notallowed"/>:<Redirect to="/login"/>}/>
                    <Route path="/" component={Admin}/>
                    <Redirect from="" to="/"/>
                </Switch>
            </Route>
        </div>
    }
}