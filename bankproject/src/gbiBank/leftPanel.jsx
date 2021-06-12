import React from "react";
import http from "../services/httpService.js"
export default class LeftPanel extends React.Component{
    state={
        banks:[],
        amounts:["<10000",">=10000"],
    };
    async componentDidMount(){
        let response = await http.get("/getBanks");
        let{data}=response;
        console.log(response);
        this.setState({banks:data});
    }
    makeRadio=(arr,value,name,label)=>(
        <React.Fragment>
            <div className="lebel1">
            <label className="font-weight-bold label">{label}</label>
            </div>
            {arr.map(v=><div className="form-check"key={v}>
                <input type="radio" className="form-check-input" name={name} value={v}
                checked={value==v} onChange={this.handleChange}/>
                <label className="form-check-label radio">{v}</label>
            </div>)}
        </React.Fragment>
    );
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let opt = {...this.props.option};
        opt[input.name]=input.value;
        this.props.onOptionChange(opt);
    }
    render(){
        const{banks=[],amounts}=this.state;
        const{bank,amount}=this.props.option;
       
       return  <div className="row border">
           <div className="col-12 border">
               {this.makeRadio(banks,bank,"bank","Bank")}
               <hr/>
               {this.makeRadio(amounts,amount,"amount","Amount")}
           </div>
       </div> 
    
    }
}