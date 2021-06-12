import React from "react";
import http from "../services/httpService";
import auth from "../services/authService";
export default class CustumerDetail extends React.Component{
    state={
        detail:{name:"",date:"",month:"",year:"",city:"",addressLine1:"",addressLine2:"",state:"",gender:"",PAN:""},
        states:[],
        months:["January","Febuary","March","April","May","June","July","August","September","October","November","December"],
        dates:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        showBtn:false,
        error:{}
    }
    async componentDidMount(){
        let user = auth.getItem();
        let response = await http.get(`/getCustomer/${user.name}`);
        let res1 = await http.get("/statecity");
        let {data}=response;
        if(data.dob==undefined){
            let detail1 = {name:user.name,date:"",month:"",year:"",addressLine2:"",city:"",addressLine1:"",state:"",gender:"",PAN:""};
            this.setState({detail:detail1,states:res1.data,showBtn:true});
        }else{
            let s1 = {...this.state};
    let index1 = data.dob.indexOf('-');
            s1.detail.date = data.dob.substring(0,index1);
    let index2 = data.dob.lastIndexOf('-');
            s1.detail.month = data.dob.substring(index1+1,index2);
            s1.detail.year = data.dob.substring(index2+1);
            s1.detail.name = user.name;
            s1.detail.state = data.state;
            s1.detail.city=data.city;
            s1.detail.PAN = data.PAN;
            s1.detail.gender = data.gender;
            s1.detail.addressLine1 = data.addressLine1;
            s1.detail.addressLine2 = data.addressLine2;
            s1.states = res1.data;
            s1.showBtn=false
            this.setState(s1);
        }
    }
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1={...this.state};
        s1.detail[input.name]=input.value;
        this.handleValidte(e);
        this.setState(s1);
    }
    async postData(url,obj){
        let response = await http.post(url,obj);
        console.log(obj);
        alert("Detail has been Updated");
        this.props.history.push("/");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let s1 = {...this.state}
        let errors = this.validateForm();
        if(this.isValid(errors)){
            let data={};
            let dob  = s1.detail.date+"-"+s1.detail.month+"-"+s1.detail.year;
            data={...data,name:s1.detail.name,city:s1.detail.city,state:s1.detail.state,addressLine1:s1.detail.addressLine1,addressLine2:s1.detail.addressLine2,gender:s1.detail.gender,PAN:s1.detail.PAN,dob:dob}
            this.postData("/customerDetails",data);
        }else{
            s1.error= errors;
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
            case "date": s1.error.date = this.validateDate(input.value);break;
            case "month":s1.error.month = this.validateMonth(input.value);break;
            case "year": s1.error.year = this.validateYear(input.value);break;
            case "state": s1.error.state = this.validateState(input.value);break;
            case "city": s1.error.city = this.validateCity(input.value);break;
            case "gender": s1.error.gender = this.validateGen(input.value);break;
            case "PAN": s1.error.PAN = this.validatePan(input.value);break;

            default:break;
        }
        this.setState(s1);
    }
    validateForm=()=>{
        const{date,month,year,city,addressLine1,state,gender,PAN,addressLine2}=this.state.detail;
        let errors={};
        errors.date=this.validateDate(date);
        errors.month = this.validateMonth(month);
        errors.year = this.validateYear(year);
        errors.state = this.validateState(state);
        errors.city= this.validateCity(city);
        errors.PAN = this.validatePan(PAN);
        return errors;
    }
    validateDate=(val)=>
    !val?"Please Select Date":"";
    validateMonth=(val)=>
    !val?"Please Select Month":"";
    validateYear=(val)=>
    !val?"Please Select Year":"";
    validatePan=(val)=>
    !val?"Please Enter PAN":"";
    validateGen=(val)=>
    !val?"Please Select Gender":""
    validateState=(val)=>
    !val?"Please Select State":""
    validateCity=(val)=>
    !val?"Please Select City":""
    makeYear=()=>{
        let arr=[];
        for(let i = 2020; i>=1980;i--){
            arr.push(i);
        }
        return arr;
    }
    makeDate=(val)=>{
        let arr=[];
        for(let i=1;i<=val;i++){
            arr.push(i);
        }
        return arr;
    }
    render(){
        const{date,month,year,city,addressLine1,state,gender,PAN,addressLine2}=this.state.detail;
        const{states=[],months,dates,showBtn,error}=this.state;
        let years = this.makeYear();
        let cities = state!=undefined?states.find(v=>v.stateName===state):[];
        console.log(city);
        let arr1=cities?cities.cityArr:[]
        let arr=(month=='April' || month=="June" || month=="September" || month=="November")?this.makeDate(30):month=="Febuary"?this.makeDate(28):dates;
        return <div className="container-fluid bg-light">
            <h2 className="text-center bg-danger">Customer Details</h2>
            
        <div className="row">
            <div className="col-3"></div>
                <div className="col-6">
                   <div className=" border customer">
                    <div className="form-group row">
                    <label className="col-sm-2 col-form-label ">Gender<span className="text-danger">*</span>:-</label>
                    <div className="col-10">
                        <div className="form-check">
                            <input type="radio" className="form-check-inline mx-4 my-3" name="gender" value="Male"checked={gender=="Male"} onChange={this.handleChange}/>
                            <label className="form-check-label">Male</label>
                            <input type="radio" className="form-check-inline mx-4 my-3" name="gender" value="Female" checked={gender=="Female"}  onChange={this.handleChange}/>
                            <label className="form-check-label">Female</label>
                            {error.gender?<span className="text-danger">{error.gender}</span>:""}
                        </div>
                    </div>
                     </div>
                    <hr/>
                    <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Date of Birth<span className="text-danger">*</span>:-</label>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-4">
                            <div className="form-group dd">
                                <select className="form-control bg-light text-primary" onBlur={this.handleValidte} name="year" value={year} onChange={this.handleChange}>
                               <option value="">Select Year</option>
                                {years.map(v=><option key={v}>{v}</option>)}
                                </select>
                                {error.year?<span className="text-danger">{error.year}</span>:""}
                            </div>
                            </div>
                            <div className="col-4">
                            <div className="form-group dd">
                                <select className="form-control bg-light text-primary " onBlur={this.handleValidte} name="month" value={month} onChange={this.handleChange}>
                               <option value="">Select Month</option>
                                {year?months.map(v=><option  key={v}>{v}</option>):""}
                                </select>
                                {error.month?<span className="text-danger">{error.month}</span>:""} 
                            </div>
                             </div>
                            <div className="col-4">
                            <div className="form-group dd">
                                <select className="form-control bg-light text-primary " onBlur={this.handleValidte} name="date" value={date} onChange={this.handleChange}>
                               <option value="">Select Date</option>
                                {month?arr.map(v=><option  key={v}>{v}</option>):""}
                                </select>
                                {error.date?<span className="text-danger">{error.date}</span>:""}
                            </div>
                            </div>
                        </div>
                     </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Pan<span className="text-danger">*</span>:-</label>
                        <div className="col-10">
                            <input type="text" name="PAN" value={PAN} placeholder="Enter PAN " className="form-control bg-light text-primary" onBlur={this.handleValidte} onChange={this.handleChange}/>
                            {error.PAN?<span className="text-danger">{error.PAN}</span>:""}
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Address:-</label>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" className="form-control text-primary bg-light" placeholder="Line 1" name="addressLine1" value={addressLine1} onChange={this.handleChange}/>
                                </div>
                                <div className="col-6">
                                <input type="text" className="form-control  text-primary bg-light" name="addressLine2" placeholder="Line 2" value={addressLine2} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                        <div className="col-6">
                            <div className="form-group row">
                            <label className="col-sm-2 col-form-label">State<span className="text-danger">*</span>:-</label>
                            <div className="col-10">
                            <select className="form-control bg-light text-primary" onBlur={this.handleValidte} name="state" value={state} onChange={this.handleChange}>
                                <option value="">Select State</option>
                                {states.map((v,index)=><option key={index}>{v.stateName}</option>)}
                            </select>
                            {error.state?<span className="text-danger">{error.state}</span>:""}
                            </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group row">
                            <label className="col-sm-2 col-form-label">City<span className="text-danger">*</span>:-</label>
                            <div className="col-10">
                            <select className="form-control bg-light text-primary" onBlur={this.handleValidte} name="city" value={city} onChange={this.handleChange}>
                                <option value="">Select City</option>
                                {arr1.map((v,index)=><option key={v}>{v}</option>)}
                            </select>
                            {error.city?<span className="text-danger">{error.city}</span>:""}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        {showBtn?
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Add Detail</button>:""}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    }
}