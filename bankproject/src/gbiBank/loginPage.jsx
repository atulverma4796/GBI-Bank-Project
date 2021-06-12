import React from "react";
import auth from "../services/authService";
import http from "../services/httpService";
import loginimage from "./login.jpg";
export default class Login extends React.Component{
    state={
        detail:{name:"",password:""},
        error:{}
    };
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1 = {...this.state};
        s1.detail[input.name]=input.value;
        this.handleValidate(e);
        this.setState(s1);
    }
   async postData(url,obj){
    try{
        let response = await http.post(url,obj);
        let{data}=response;
        auth.login(data);
        if(data.role=="manager"){
            window.location="/admin"
        }else{
            window.location="/emp"
        }
    }catch(ex){
        if(ex.response && ex.response.status===500){
            let errors={};
            errors.email=ex.response.data;
            this.setState({errors:errors})
        }
    }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let errors=this.validateForm();
        if(this.isValid(errors)){
        this.postData("/login",this.state.detail);
        }else{
            let s1 = {...this.state};
            s1.error=errors;
            this.setState(s1);
        }
    }
    isValid=(errors)=>{
        let keys = Object.keys(errors);
        let count = keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0);
        return count==0
    }
    handleValidate=(e)=>{
        let s1 = {...this.state};
        const{currentTarget:input}=e;
        switch(input.name){
            case "password":s1.error.password = this.validatePassword(input.value);break;
            default : break;
        }
        this.setState(s1);
    }
    validateForm=()=>{
        const{password}=this.state.detail;
        let errors={};
        errors.password = this.validatePassword(password);
        return errors;
    }
    validatePassword=(val)=>
    !val?"Please Enter Password":val.length<7?"Password must be 7 characters":""
    render(){
        const{name,password}=this.state.detail;
        const{errors=null,error}=this.state;
        return <div className="container text-center">
            <h1 className="display-3"><b>Welcome to GBI Bank</b></h1>
            <img className="img-fluid my-3" width="130px" src={loginimage}/>
            <div className="row marginrow">
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="login border">
                        {errors?<span className="text-danger">{errors.email}</span>:""}
            <div className="form-group">
                <label className="text-center text-success" >Username</label>
                <input type="text" className="form-control" name="name" value={name} 
                onChange={this.handleChange}placeholder="Enter User Name"/>
                <small><b>We'll never share your username with any one else.!</b></small>
            </div>
            <div className="form-group ">
                <label className="text-center text-success" >Password</label>
                <input type="password" className="form-control" name="password" value={password} 
                onChange={this.handleChange} placeholder="Enter Password"/>
                {error?<span className="text-danger font-weight-bold">{error.password}</span>:""}
            </div>
            <div className="text-center">
            <button className="btn btn-primary my-3" onBlur={this.handleValidate} onClick={this.handleSubmit}>Login</button> 
            </div>
            </div>
            <h4 className="bg-dark text-white">For testing Purpose Username and Password given below Acc. to Role(<b>Manager/Customer</b>)!</h4>
            <h4 className="text-danger">As Manager :-</h4>
            <h4><b><i>Username:-</i></b> Daniel, <b><i>Password:-</i></b>dan1234</h4>
            <h4 className="text-danger">As Customer :-</h4>
            <h4><b><i>Username:-</i></b> Apoorv, <b><i>Password:-</i></b>apoorv123</h4>
            </div>
          
            </div>
                

        </div>
    }
}