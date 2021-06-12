import React from "react";
import http from "../services/httpService.js"
import queryString from "query-string";
import auth from "../services/authService";
export default class ViewCheque extends React.Component{
    state={detail:{}};
    async fetchData(){
        const queryParam  = queryString.parse(this.props.location.search);
        let user=auth.getItem();
        let  searchStr=this.makeSearchString(queryParam);
        let response = await http.get(`/getChequeByName/${user.name}?${searchStr}`);
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
        this.callURL("/viewCheque",queryParam);
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
    val?str?`${str}&${name}=${val}`:`${name}=${val}`:str;

    render(){
        const{items=[],page,totalItems,totalNum}=this.state.detail;
        return <div className="container my-4 bg-light">
              {items.length==0?<h2 className="text-danger text-center">No Detail Found of Cheque Transaction</h2>:(<React.Fragment>
         <h2 className="display text-center text-success">All Cheque Transactions</h2>
            <div className="row border font1">
                <div className="col-3 border text-center"><b>Cheque No.</b></div>
                <div className="col-3 border text-center"><b>Bank Name</b></div>
                <div className="col-3 border text-center"><b>Branch</b></div>
                <div className="col-3 border text-center"><b>Amount</b></div>
            </div>
            {items.map((v,index)=><div className="row list1" key={index}>
                <div className="col-3 border text-center">{v.chequeNumber}</div>
                <div className="col-3 border text-center">{v.bankName}</div>
                <div className="col-3 border text-center">{v.branch}</div>
                <div className="col-3 border text-center">{v.amount}</div>
            </div>)}
            <div className="row">
                <div className="col-2">
                {page>1?<button className="btn btn-success" onClick={()=>this.handlePage(-1,-totalItems)}>Previous</button>:""}
                </div>
                <div className="col-8"></div>
                <div className="col-2">
                {totalItems<5?"":<button className="btn btn-success"onClick={()=>this.handlePage(1,totalItems)}>Next</button>}
                </div>
            </div></React.Fragment>)}
        </div>
    }
}