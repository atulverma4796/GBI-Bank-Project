import React from "react";
import http from "../services/httpService";
export default class AddCustomer extends React.Component{
    state={
        detail:{name:"",password:"",rePass:""},
        error:{}
    }
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1 = {...this.state};
        s1.detail[input.name]=input.value;
        this.handleValidate(e);
        this.setState(s1);
    }
  async postData(url,obj){
        let response = await http.post(url,obj);
        alert("Customer added Successfully!")
        this.props.history.push("/admin");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let s1 = {...this.state};
        let errors=this.validateForm();
        if(this.isValid(errors)){
            let data={name:s1.detail.name,password:s1.detail.password};
            this.postData("/register",data);
        }else{
            s1.error = errors;
            this.setState(s1);
        }
    }
    isValid=(errors)=>{
        let keys = Object.keys(errors);
        let count = keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0);
        console.log(keys,count);
        return count==0;
    }
    handleValidate=(e)=>{
        let s1 = {...this.state};
        const{currentTarget:input}=e;
        switch(input.name){
            case "password":s1.error.password = this.validatePassword(input.value);break;
            case "rePass":s1.error.rePass = this.validateRepass(input.value);break;
            case "name":s1.error.name=this.validateName(input.value);break;
            default: break;
        }
        this.setState(s1);
    }
    validateForm=(val)=>{
        const{password,rePass,name}=this.state.detail;
        let errors={};
        errors.password = this.validatePassword(password);
        errors.rePass = this.validateRepass(rePass,password);
        errors.name=this.validateName(name);
        return errors;
    }
    validatePassword=(val)=>
    !val?"Please Enter Password":val.length<7?"minimum length should be 7 Char":""
   validateRepass=(str1,str2)=>
   !str1?"Please Re-Enter the Password":"";
   validateName=(val)=>
   !val?"Please Enter Name":""


    render(){
        const{name,password,rePass}=this.state.detail;
        const{error}=this.state;
        return <div className="container">
            <h2 className="display text-center text-success">New Customer</h2>
            <div className="form1">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-5 border1">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label my-3"><h4>Name:-</h4></label>
                    <div className="col-9">
                    <input type="text" name="name" value={name} className="form-control text-primary bg-light my-4" placeholder="Enter Name" onChange={this.handleChange}/>
                    {error.name?<span className="text-white"><b>{error.name}</b></span>:""}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"><h4>Password:-</h4></label>
                    <div className="col-9">
                    <input type="text" name="password" value={password} className="form-control bg-light" 
                    placeholder="Enter Password" onBlur={this.handleValidate} onChange={this.handleChange}/>
                    {error.password?<span className="text-white"><b>{error.password}</b></span>:""}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"><h4>Confirm Password:-</h4></label>
                    <div className="col-9">
                    <input type="text" name="rePass" value={rePass} className="form-control  bg-light my-3"
                     placeholder="Re-Enter Password" onBlur={this.handleValidate} onChange={this.handleChange}/>
                     {error.rePass?<span className="text-white"><b>{error.rePass}</b></span>:""}
                    </div>
                </div>
                <div className="text-center">
                <button className="btn btn-success text-center" onClick={this.handleSubmit}>Create</button>
                </div>
            </div>

            </div>
            </div>
        </div>
    }
}