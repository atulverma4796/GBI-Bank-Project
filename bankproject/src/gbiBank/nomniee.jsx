import React from "react";
import http from "../services/httpService";
import auth from "../services/authService";
export default class Nominee extends React.Component{
    state={
        detail:{name:"",nomineeName:"",gender:"",date:"",month:"",year:"",relationship:"",jointsignatory:false},
       
        months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
        dates:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        showBtn:false,
        error:{},
    };
    async componentDidMount(){
        let user = auth.getItem();
        let response = await http.get(`/getNominee/${user.name}`);
        let {data}=response;
        let s1 = {...this.state};
        console.log(data);
        if(data.nomineeName==undefined){
         let detail1={name:user.name,nomineeName:"",gender:"",date:"",month:"",year:"",relationship:"",jointsignatory:false};
         s1.detail = detail1;
         s1.showBtn=true;
          this.setState(s1);
        }else{
            let index1 = data.dob.indexOf('-');
            s1.detail.date = data.dob.substring(0,index1);
            let index2 = data.dob.lastIndexOf('-');
            s1.detail.month = data.dob.substring(index1+1,index2);
            s1.detail.year = data.dob.substring(index2+1);
            s1.detail.name = user.name;
            s1.detail.nomineeName = data.nomineeName;
            s1.detail.relationship = data.relationship;
            s1.detail.gender = data.gender;
            s1.detail.jointsignatory = data.jointsignatory;
            console.log(data.jointsignatory);
            console.log(s1.detail.jointsignatory);
            s1.showBtn=false;
            this.setState(s1);
      }
    }
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1 = {...this.state};
        input.type=="checkbox"?s1.detail[input.name]=input.checked:s1.detail[input.name]=input.value;
        this.setState(s1);
    }
    
    async postData(url,obj){
        let response = await http.post(url,obj);
        alert("Nominee Detail has been Updated");
        this.props.history.push("/");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let s1 = {...this.state};
        let errors = this.validateForm();
        if(this.isValid(errors)){
            let data={};
            let dob  =s1.detail.date+"-"+s1.detail.month+"-"+s1.detail.year;
            console.log(s1.detail,"gg");
            data={...data,name:s1.detail.name,nomineeName:s1.detail.nomineeName,relationship:s1.detail.relationship,gender:s1.detail.gender,jointsignatory:s1.detail.jointsignatory?true:false,dob:dob}
            this.postData("/nomineeDetails",data);
        }else{
            s1.error=  errors;
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
            case "relationship": s1.error.relationship = this.validateRelation(input.value);break;
            case "nomineeName": s1.error.nomineeName = this.validateNominee(input.value);break;
            default:break;
        }
        this.setState(s1);
    }
    validateForm=()=>{
        const{nomineeName,relationship,date,month,year,gender}=this.state.detail; 
        let errors={};
        errors.date=this.validateDate(date);
        errors.month = this.validateMonth(month);
        errors.year = this.validateYear(year);
        errors.relationship  =this.validateRelation(relationship);
        errors.nomineeName = this.validateNominee(nomineeName);
        errors.gender= this.validateGen(gender);
        return errors;
    }
    validateDate=(val)=>
    !val?"Please Select Date":"";
    validateMonth=(val)=>
    !val?"Please Select Month":"";
    validateYear=(val)=>
    !val?"Please Select Year":"";
    validateGen=(val)=>
    !val?"Please Select Gender":""
    validateNominee=(val)=>
    !val?"Please Enter Nominee Name":"";
    validateRelation=(val)=>
    !val?"Please Enter Relation to Nominee":"";

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
        const{name,nomineeName,relationship,date,month,year,jointsignatory,gender}=this.state.detail;
       console.log(jointsignatory,this.state.detail);
        const{months,dates,showBtn,error}=this.state;
        
        let arr=(month=='Apr' || month=="Jun" || month=="Sep" || month=="Nov")?this.makeDate(30):month=="Feb"?this.makeDate(28):dates;
        let years = this.makeYear();
       return <div className="container bg-light">
            <h2 className="text-center bg-danger">Nominee Details</h2>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="nominee border">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Name</label>
                            <div className="col-10">
                                <input type="text" name="nomineeName" value={nomineeName} className="form-control bg-light text-info"onBlur={this.handleValidte} onChange={this.handleChange}/>
                                {error.nomineeName?<span className="text-white">{error.nomineeName}</span>:""} 
                            </div>
                        </div><hr/>
                        <div className="form-group row">
                    <label className="col-sm-2 col-form-label ">Gender<span className="text-danger">*</span>:-</label>
                    <div className="col-10">
                        <div className="form-check">
                            <input type="radio" className="form-check-inline mx-4 my-3" name="gender" value="Male"checked={gender=="Male"} onChange={this.handleChange}/>
                            <label className="form-check-label">Male</label>
                            <input type="radio" className="form-check-inline mx-4 my-3" name="gender" value="Female" checked={gender=="Female"}  onChange={this.handleChange}/>
                            <label className="form-check-label">Female</label>
                        </div>
                        {error.gender?<span className="text-white">{error.gender}</span>:""} 
                    </div>
                     </div>
                     <hr/>
                     <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Date of Birth<span className="text-danger">*</span>:-</label>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-4">
                            <div className="form-group dd">
                                <select className="form-control bg-light text-primary"onBlur={this.handleValidte} name="year" value={year} onChange={this.handleChange}>
                               <option value="">Select Year</option>
                                {years.map(v=><option key={v}>{v}</option>)}
                                </select>
                                {error.year?<span className="text-white">{error.year}</span>:""} 
                            </div>
                            </div>
                            <div className="col-4">
                            <div className="form-group dd">
                                <select className="form-control bg-light text-primary " onBlur={this.handleValidte} name="month" value={month} onChange={this.handleChange}>
                               <option value="">Select Month</option>
                                {year?months.map(v=><option  key={v}>{v}</option>):""}
                                </select>
                                {error.month?<span className="text-white">{error.month}</span>:""} 
                            </div>
                             </div>
                            <div className="col-4">
                            <div className="form-group dd">
                                <select className="form-control bg-light text-primary " onBlur={this.handleValidte} name="date" value={date} onChange={this.handleChange}>
                               <option value="">Select Date</option>
                                {month?arr.map(v=><option  key={v}>{v}</option>):""}
                                </select>
                                {error.date?<span className="text-white">{error.date}</span>:""} 
                            </div>
                            </div>
                        </div>
                     </div>
                    </div>
                    <hr/>
                    <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-weight-bold">Relationship:-</label>
                    <div className="col-10">
                        <input type="text" name="relationship" onBlur={this.handleValidte} value={relationship} className="form-control bg-light text-info" onChange={this.handleChange}/>
                        {error.relationship?<span className="text-white">{error.relationship}</span>:""} 
                    </div>
                    </div>
                    <div className="form-check">
                        <label className="col-3"></label>
                        <div className="col-10">
                            <input type="checkbox" className="form-check-input" name="jointsignatory"  checked={jointsignatory==true} onChange={this.handleChange}/>
                            <label className="form-check-label mx-4">Joint Signatory</label>
                        </div>
                    </div>
                    <div className="text-center">
                        {showBtn?<button className="btn btn-primary" onClick={this.handleSubmit}>Add Nominee</button>:""}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    }
}