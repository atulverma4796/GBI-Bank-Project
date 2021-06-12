import React from "react";
import http from "../services/httpService.js"
import queryString from "query-string";
import LeftPanel from "./leftPanel";
export default class AllCheque extends React.Component{
    state={detail:{}};
    async fetchData(){
        const queryParam  = queryString.parse(this.props.location.search);
        let  searchStr=this.makeSearchString(queryParam);
        let response = await http.get(`/getAllCheques?${searchStr}`);
        let {data}=response;
        console.log(response);
        let s1 = {...this.state};
       s1.detail = data;
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
        this.callURL("/allCheque",queryParam);
    }
    callURL=(url,option)=>{
        let searchStr = this.makeSearchString(option);
        this.props.history.push({
            pathname:url,
            search:searchStr,
        });
    }
    handleChange=(option)=>{
        option.page="1";
        this.callURL("/allCheque",option);
    }
    makeSearchString=(option)=>{
        const{page,bank,amount}=option;
        let searchStr ="";
        searchStr = this.addToQuery(searchStr,"page",page);
        searchStr = this.addToQuery(searchStr,"bank",bank);
        searchStr = this.addToQuery(searchStr,"amount",amount);
        return searchStr;
    }
    addToQuery=(str,name,val)=>
    val?str?`${str}&${name}=${val}`:`${name}=${val}`:str;

    render(){
        const{items=[],page,totalItems,totalNum}=this.state.detail;
        const queryParam = queryString.parse(this.props.location.search);
        return <div className="container my-4 bg-light">
         <h2 className="display text-center text-success">All Cheque Transactions</h2>
            <div className="row">
            <div className="col-3">
            <LeftPanel option={queryParam} onOptionChange={this.handleChange}/>
            </div>
            <div className="col-9">
            <div className="row border font1">
                <div className="col-2 border text-center"><b>Name</b></div>
                <div className="col-3 border text-center"><b>Cheque No.</b></div>
                <div className="col-2 border text-center"><b>Bank Name</b></div>
                <div className="col-3 border text-center"><b>Branch</b></div>
                <div className="col-2 border text-center"><b>Amount</b></div>
            </div>
            {items.map((v,index)=><div className="row list1" key={index}>
                <div className="col-2 border text-center">{v.name}</div>
                <div className="col-3 border text-center">{v.chequeNumber}</div>
                <div className="col-2 border text-center">{v.bankName}</div>
                <div className="col-3 border text-center">{v.branch}</div>
                <div className="col-2 border text-center">{v.amount}</div>
            </div>)}
            <div className="row">
                <div className="col-2">
                {page>1?<button className="btn btn-success" onClick={()=>this.handlePage(-1,-totalItems)}>Previous</button>:""}
                </div>
                <div className="col-8"></div>
                <div className="col-2">
                {totalItems<5?"":<button className="btn btn-success"onClick={()=>this.handlePage(1,totalItems)}>Next</button>}
                </div>
            </div>

            </div>
            </div>
        </div>
    }
}