import React from "react";
import http from "../services/httpService";
import auth from "../services/authService";
export default class NetBanking extends React.Component{
    state={
        detail:{name:"",payeeName:"",bankName:"",comment:"",amount:""},
        payees:[],
        
    }
    async componentDidMount(){
        let user = auth.getItem();
        let response = await http.get(`/getPayees/${user.name}`);
        let{data}=response;
        this.setState({payees:data});
    }
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1={...this.state};
        s1.detail[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj){
        let response = await http.post(url,obj);
        alert("Detail Added Successfully");
        this.props.history.push("/");
    }
    handleSubmit=(e)=>{
        e.preventDefault(); 
        let s1 = {...this.state};
        s1.detail.name=auth.getItem().name;
        let fnd = s1.payees.find(v=>v.payeeName==s1.detail.payeeName);
        s1.detail.bankName = fnd.bankName;
         this.postData("/postNet",s1.detail);
    }
  
   
   
   
    render(){
        const{payeeName,amount,comment}=this.state.detail;
        const{payees=[]}=this.state;

        return<div className="container bg-light">
            <h2 className="text-success text-center">Add Net Banking Transaction</h2>
            <div className="row">
                <div className="col-3"></div>
                    <div className="col-6">
                    <div className="net border">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Payee Name<span className="text-danger">*</span>:-</label>
                        <div className="col-10">
                            <select className="form-control bg-light my-3" name="payeeName" value={payeeName} onChange={this.handleChange}>
                                <option value="">Select Payee</option>
                                {payees.map(v=><option key={v.payeeName}>{v.payeeName}</option>)}
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Amount<span className="text-danger">*</span>:-</label>
                        <div className="col-10">
                         <input type="text" name="amount" value={amount} placeholder="Enter Amount" className="form-control my-3 bg-light" onChange={this.handleChange}/>  
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Comment<span className="text-danger">*</span>:-</label>
                        <div className="col-10">
                         <input type="text" name="comment"placeholder="comment" value={comment} className="form-control my-3 bg-light" onChange={this.handleChange}/>  
                        </div>
                    </div>
                 <div className="text-center">
                     <button className="btn btn-success"onClick={this.handleSubmit}>Add Transaction</button>
                 </div>

                    </div>
                </div>
            </div>
        </div>
    }
}