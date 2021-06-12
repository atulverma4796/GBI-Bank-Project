import React from "react";
import http from "../services/httpService";
import queryString from "query-string";
export default class AllCustomers extends React.Component{
    state={data:{},count:1,next:5};
    async fetchData(){
        const queryParam = queryString.parse(this.props.location.search);
        let  searchStr=this.makeSearchString(queryParam);
        let response = await http.get(`/getCustomers?${searchStr}`);
        let {data}=response;
        let s1 = {...this.state};
       s1.data = data;
       if(data.page==1){
           s1.count=1;
           s1.next=5;
       }
       this.setState(s1);
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props){
            this.fetchData();
        }
    }
    handlePage=(incr,val)=>{
        const queryParam = queryString.parse(this.props.location.search);
        let {page="1"}=queryParam;
        let newPage = +page+incr;
        queryParam.page=newPage;
        let s1 = {...this.state};
        console.log(val);
        s1.count = s1.count+val;
        s1.next = s1.next+val
        this.callURL("/allCustomers",queryParam);
        this.setState(s1);
    }
    callURL=(url,option)=>{
        let searchStr = this.makeSearchString(option);
        this.props.history.push({
            pathname:url,
            search:searchStr,
        });
    }
    makeSearchString=(option)=>{
        const{page}=option;
        let searchStr ="";
        searchStr = this.addToQuery(searchStr,"page",page);
        return searchStr;
    }
    addToQuery=(str,name,val)=>
    val?`${name}=${val}`:"";
   
    render(){
        const{items=[],page,totalItems,totalNum}=this.state.data;
        const{count,next}=this.state;
        return<div className="container">
     <h2 className="display text-center text-success">All Customer</h2>
     {page==1?<h4>{page} - {totalItems} of {totalNum}</h4>:<h4>{count} - {next} of {totalNum}</h4>}
            <div className="row border bg-danger font">
                <div className="col-2 border text-center">Name</div>
                <div className="col-3 border text-center">State</div>
                <div className="col-2 border text-center">City</div>
                <div className="col-3 border text-center">Pan</div>
                <div className="col-2 border text-center">DOB</div>
            </div>
            {items.map((v,index)=><div className="row list" key={index}>
                <div className="col-2 border text-center">{v.name}</div>
                <div className="col-3 border text-center">{v.state}</div>
                <div className="col-2 border text-center">{v.city}</div>
                <div className="col-3 border text-center">{v.PAN}</div>
                <div className="col-2 border text-center">{v.dob}</div>
            </div>)}
            <div className="row">
                <div className="col-2">
                {count>1 || page>1?<button className="btn btn-success" onClick={()=>this.handlePage(-1,-totalItems)}>Previous</button>:""}
                </div>
                <div className="col-8"></div>
                <div className="col-2">
                {(next==totalNum)||totalItems<5?"":<button className="btn btn-success"onClick={()=>this.handlePage(1,totalItems)}>Next</button>}
                </div>
            </div>

        </div>
    }
}