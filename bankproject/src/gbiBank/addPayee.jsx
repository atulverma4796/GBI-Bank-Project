import React from "react";
import http from "../services/httpService";
import auth from "../services/authService";
export default class AddPayee extends React.Component{
    state={
        detail:{name:"",payeeName:"",IFSC:"",accNumber:"",bankName:"",bank:"same"},
        banks:[],
    }
    async componentDidMount(){
        let response = await http.get("/getBanks");
        let {data}=response;
        this.setState({banks:data});
    }
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1 = {...this.state};
        s1.detail[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj){
        let response = await http.post(url,obj);
        alert('Payee Added to your list=>'+obj.payeeName);
        this.props.history.push("/");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let s1 = {...this.state};
        s1.detail.name=auth.getItem().name;
        let data={};
        data = {...data,payeeName:s1.detail.payeeName,name:s1.detail.name,accNumber:s1.detail.accNumber,bankName:s1.detail.bankName,IFSC:s1.detail.IFSC}
        this.postData("/addPayee",data)
    }
    render(){
        const{payeeName,IFSC,bank,accNumber,bankName}=this.state.detail;
        const{banks=[]}=this.state;

        return <div className="container bg-light">
            <h2 className="text-danger text-center">Add New Payee</h2>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="payee border">
                        <div className="form-group">
                        <label className="font-weight-bold">Payee Name<span className="text-danger">*</span></label>
                        <input type="text" name="payeeName" placeholder="Enter Payee Name" value={payeeName} className="form-control bg-light" onChange={this.handleChange}/>
                     </div>
                     <hr/>
                     <div className="form-group">
                        <label className="font-weight-bold">Account Number<span className="text-danger">*</span></label>
                        <input type="text" name="accNumber" placeholder="Enter Account Number" value={accNumber} className="form-control bg-light" onChange={this.handleChange}/>
                     </div>
                     <div className="form-check">
                     <input type="radio" name="bank" className="form-check-input" value="same" checked={bank=="same"} onChange={this.handleChange}/>
                     <label className="form-check-label font-weight-bold mx-4">Same</label>
                     </div>
                     <div className="form-check">
                     <input type="radio" name="bank" className="form-check-input" value="other" checked={bank=="other"} onChange={this.handleChange}/>
                     <label className="form-check-label font-weight-bold mx-4">Other Bank</label>
                     </div>
                     <hr/>
                     {bank=="other"?(
                         <React.Fragment>
                             <select className="form-control bg-light" name="bankName" value={bankName} onChange={this.handleChange}>
                                 <option value="">Select Bank</option>
                                 {banks.map(v=><option key={v}>{v}</option>)}
                             </select>
                             <hr/>
                             <div className="form-group">
                        <label className="font-weight-bold">IFSC Code<span className="text-danger">*</span></label>
                        <input type="text" name="IFSC" placeholder="Enter Ifsc Code" value={IFSC} className="form-control bg-light" onChange={this.handleChange}/>
                     </div>
                         </React.Fragment>
                     ):""}
                     <div className="text-center">
                         <buton className="btn btn-success"onClick={this.handleSubmit}>Add Payee</buton>
                    </div>
                </div>
                </div>
            </div>
        </div>
    }
}