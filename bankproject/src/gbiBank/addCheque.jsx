import React from "react";
import http from "../services/httpService";
import auth from "../services/authService";
export default class Cheque extends React.Component{
    state={
        detail:{name:"",chequeNumber:"",bankName:"",branch:"",amount:""},
        banks:[],
        error:{}
    }
    async componentDidMount(){
        let response = await http.get("/getBanks");
        let{data}=response;
        this.setState({banks:data});
    }
    handlechange=(e)=>{
        const{currentTarget:input}=e;
        let s1={...this.state};
        s1.detail[input.name]=input.value;
        this.handleValidte(e);
        this.setState(s1);
    }
    async postData(url,obj){
        let response = await http.post(url,obj);
        alert("Cheque Detail Added Successfully");
        this.props.history.push("/");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let errors = this.validateForm();
        let s1 ={...this.state};
        if(this.isValid(errors)){
            s1.detail.name=auth.getItem().name;
            this.postData("/postCheque",s1.detail);
        }else{
            s1.error = errors;
            this.setState(s1);
        }
    }
    isValid=(errors)=>{
        let keys= Object.keys(errors);
        let count = keys.reduce((acc,curr)=>errors[curr]?acc+1:acc,0);
        return  count==0;
    }
    handleValidte=(e)=>{
        let s1= {...this.state};
        const{currentTarget:input}=e;
        switch(input.name){
            case "chequeNumber": s1.error.chequeNumber = this.validateCheque(input.value);break;
            case "amount":s1.error.amount = this.validateAmt(input.value);break;
            case "branch": s1.error.branch = this.validateBranch(input.value);break;
            default:break;
        }
        this.setState(s1);
    }
    validateForm=()=>{
        const{chequeNumber,branch,amount}=this.state.detail;
        let errors={};
        errors.chequeNumber = this.validateCheque(chequeNumber);
        errors.branch = this.validateBranch(branch);
        errors.amount = this.validateAmt(amount);
        return errors;
    }
    validateCheque=(val)=>
    !val?"Please Enter Cheque Number":val.length<11?"Cheque No. must be 11 Digit":"";
    validateBranch=(val)=>
    !val?"Please Enter Branch Name":val.length<4?"Branch Name must be 4 char":"";
    validateAmt=(val)=>
    !val?"Please Enter Amount":"";
    render(){
        const{chequeNumber,bankName,branch,amount}=this.state.detail;
        const{banks=[],error}=this.state;

        return<div className="container bg-light">
            <h2 className="text-success text-center">Add Cheque Detail</h2>
            <div className="row">
                <div className="col-3"></div>
                    <div className="col-6">
                    <div className="cheque border">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Cheque No.<span className="text-danger">*</span>:-</label>
                            <div className="col-10">
                                <input type="text" name="chequeNumber" placeholder="Enter Cheque Number" value={chequeNumber} className="form-control bg-light my-3" onChange={this.handlechange} onBlur={this.handleValidte}/>
                                {error.chequeNumber?<span className="text-dark">{error.chequeNumber}</span>:""}
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Bank Name<span className="text-danger">*</span>:-</label>
                            <div className="col-10">
                                <select className="form-control bg-light my-3" name="bankName" value={bankName} onChange={this.handlechange}>
                                    <option value="">Select Bank</option>
                                    {banks.map(v=><option key={v}>{v}</option>)}
                                </select>
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Branch<span className="text-danger">*</span>:-</label>
                            <div className="col-10">
                                <input type="text" name="branch" placeholder="Enter Branch" value={branch} className="form-control bg-light my-3" onChange={this.handlechange} onBlur={this.handleValidte}/>
                                {error.branch?<span className="text-dark">{error.branch}</span>:""}
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Amount<span className="text-danger">*</span>:-</label>
                            <div className="col-10">
                                <input type="text" name="amount"placeholder="Enter Amount" value={amount} className="form-control bg-light my-3" onChange={this.handlechange}/>
                                {error.amount?<span className="text-dark">{error.amount}</span>:""}
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success m-2"onClick={this.handleSubmit}>Add Cheque</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}