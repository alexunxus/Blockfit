import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';
import './index.css';
import ReactDOM from 'react-dom';

const profilepic = {
  SUAN: require("./person1.jpg"),
  Yu: require("./horse2.png")
}

const horsepic = {
  H1: require("./horse1.png"),  
  Yu: require("./horse2.png")  
}

function gethorse(id) {
  let x = Object.keys(horsepic)[id]
  return horsepic[x];
}


function genTimeline(size) {
  let timeline = [];
  for(let i=size; i>0; i--) {
    timeline.push((i-1)*2);
  }
  return (timeline);
}
const ticksize = 15;

const infoheight = 300;

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newBet = () => {
  return {
    bids: Math.random(),
    asks: Math.random(),
  };
};


function makeData(len = 6) {
  return range(len).map(d => {
    return {
      ...newBet(),//clone object
    };
  });
}


function clickbid(e, id) {
  console.log(id.replace("BID", "ASK"));
  document.getElementById(id.replace("BID", "ASK")).className.replace("active", "");
  let x = document.getElementById(id);
  if(x.className.indexOf("active") === -1){
    x.className += (" active");
  }
}

function clickask(e, id) {
  document.getElementById(id.replace("ASK", "BID")).className.replace("active", "");
  let x = document.getElementById(id)
  if(x.className.indexOf("active")===-1){
    x.className += (" active");
  }
}

class PricePanel extends Component { 
  constructor(props) {
    super(props);
    this.count = 0;
    this.value=100;
  }
  render() {
    this.count++;
    this.value += Math.sqrt(this.value);
    return(
      <div>
        <h1> Quantity: {this.count}</h1>
        The price one needs to pay: <br/>
        <h1> {this.value}</h1>
      </div>
    )
  }
};


class Person {
  constructor(id, name, usrname, password, succ, fail, nonexe, category, betprice) {
    let key = Object.keys(profilepic)[id-1];
    this.photo = profilepic[key];
    this.id = id;
    this.name = name;
    this.password = password;
    this.succ = succ;
    this.fail = fail;
    this.nonexe = nonexe;
    this.category = category;
    this.betprice = betprice;
    this.bid = [0, 10, 23, 44, 48, 50, 67, 80, 90];
    this.ask = [-0, -3, -24, -42, -51, -48, -70, -79, -91];
  }
  renderpanel() {
    return(
      <div id={this.id} className="panel">
        <div className="panel-img">
          <img src={this.photo} alt="" className="img-chopper"/> <br/>
          <h1>{this.name}</h1>
        </div>
        <hr className="double"/>
        <div className="panel-info">
          <h2>Registered ID: {this.id} </h2>
          <h2>Statistics:</h2>
          <ul>
            <li>Success count: {this.succ}</li>
            <li>Failed count: {this.fail} </li>
            <li>Non execution: {this.nonexe} </li>
          </ul>
          <h2> Latest habit category: {this.category}</h2>
        </div>
      </div>
    )
  }
  resetChallengelevel(){
    this.challengeLevel = 0;
    if(document.getElementById(this.id.toString()+"challenge")!=null){
      document.getElementById(this.id.toString()+"challenge").display="none";
      document.getElementById(this.id.toString()+"challenge").text=  "Your current goal hardness: "+this.challengeLevel;
      //document.getElementById(this.id.toString()+"challenge").display="block";
    }
  }
  resetTimespan() {
    this.timespan = 0;
  }
  rendercreate() {
    return(
      <div id={this.id} className="panel">
        <div className="panel-img" style={{minWidth:"300px"}}>
          <img src={this.photo} alt="" className="img-chopper"/> <br/>
          <h1>{this.name}</h1>
        </div>
        <hr className="double"/>
        <div className="panel-info">
          <div style={{display: "flex", displayDirectoin:"row", flexWrap:"wrap"}}>
            <div style={{flex: "0 0 40%", padding:"1em"}}>
              <h2>Registered ID: {this.id} </h2>
              <h2>Current reputation:</h2>
              <ul>
                <li>Success count: {this.succ}</li>
                <li>Failed count: {this.fail} </li>
                <li>Non execution: {this.nonexe} </li>
              </ul>
              <h2> Latest habit category: {this.category}</h2>
            </div>
            <div style={{flex: "1 1 40%", padding:"1em"}}>
              <h1>Your challeng: Monitoring your EKG!!!</h1>
              Select your goal:(times per weeks)<br/>
              <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", width:"100%"}}>
                {this.resetChallengelevel()}
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.challengeLevel=1}}>2(Easy)</button>
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.challengeLevel=2}}>4(OK)</button>
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.challengeLevel=3}}>6(Mod)</button>
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.challengeLevel=4}}>8(Hard)</button>
                <button className="challenge" style={{flex: "1 1 20%"}} onClick={(e)=>{this.challengeLevel=5}}>10 (Challenge)</button>
                <h2 id={this.id.toString()+"challenge"}> 
                  Your current goal hardness: {this.challengeLevel}
                </h2>
              </div>
              Select time span:(in weeks)
              <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", width:"100%"}}>
                {this.resetTimespan()}
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.timespan=1}}>1(Easy)</button>
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.timespan=2}}>2(OK)</button>
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.timespan=3}}>3(Mod)</button>
                <button className="challenge" style={{flex: "0 0 20%"}} onClick={(e)=>{this.timespan=4}}>4(Hard)</button>
                <button className="challenge" style={{flex: "1 1 20%"}} onClick={(e)=>{this.timespan=5}}>5 (Challenge)</button>
                <h2> 
                  Your current time span: {this.timespan}
                </h2>
              </div>
            </div>
            <div style={{flex: "1 1 90%", padding:"1em"}}>
              <button className="mytradebt">Submit </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderGraph() {
    return(
      <Plot
        data={[
          {
            x: genTimeline(this.betprice.length),
            y: this.betprice,
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
            line: {color:"white", width: 3},
          },
        ]}
        layout={ 
          {
            autosize: false,
            width: 450, 
            height: infoheight, 
            margin: {
              l:50,
              r:5,
              b:40,
              t:40,
              pad: 0,
            },
            title: " Evolution of bet price ", 
            titlefont: {
              //family: 'Courier New, monospace',
              size: ticksize,
              color: "white",
            },
            paper_bgcolor: "rgba(255, 255, 255, 0)", 
            plot_bgcolor:"rgba(255, 255, 255, 0)", 
            xaxis: {
              title: "weeks ago",
              titlefont: {
                //family: 'Courier New, monospace',
                size: ticksize,
                color: "white",
              },
              showgrid: false,
              autorange: "reversed",
              color: "white",

            },
            yaxis: {
              title: "Price",
              color: "white",
              titlefont: {
                //family: 'Courier New, monospace',
                size: ticksize,
                color: "white",
              },
            },
          }
        }
        config = {
          {
            displayModeBar: false,
          }
        }
      />
    )
  }
  rendervolume() {
    let framecol = 'black';
    return(
      <Plot
        data={[
          {
            x: genTimeline(this.bid.length),
            y: this.bid,
            name: 'Bid',
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
            line: {color:"red", width: 3},
          },
          {
            x: genTimeline(this.ask.length),
            y: this.ask,
            name: 'ask',
            type: 'scatter',
            mode: 'lines+points',
            marker: {color:'blue'},
            line: {color:"blue", width:3},
          },
        ]}
        layout={ 
          {
            autosize: false,
            width: 450, 
            height: infoheight, 
            margin: {
              l:50,
              r:5,
              b:40,
              t:40,
              pad: 0,
            },
            title: " volume ", 
            titlefont: {
              size: ticksize,
              color: framecol,
            },
            paper_bgcolor: "rgba(255, 255, 255, 0)", 
            plot_bgcolor:"rgba(255, 255, 255, 0)", 
            xaxis: {
              title: "weeks ago",
              titlefont: {
                size: ticksize,
                color: framecol,
              },
              showgrid: false,
              autorange: "reversed",
              color: framecol,

            },
            yaxis: {
              color: framecol,
              /*titlefont: {
                size: ticksize,
                color: "white",
              },*/
            },
            showlegend: true,
            legend: {
              x: 0,
              y: 1,
              traceorder: 'normal',
              font: {
                size: 12,
                color: '#000'
              },
              bgcolor: 'rgba(255, 255, 255, 0)',
              //bordercolor: 'black',
              //borderwidth: 2
            }
          }
        }
        config = {
          {
            displayModeBar: false,
          }
        }
      />
    )
  }
  rendertable() {
    let tabledata = makeData();
    return(
      <ReactTable
        data={tabledata} 
        columns={[
          {
            id:"bidnum",
            Header:'bid',
            accessor: d=>d.bids,
          },
          {
            id:"asknum",
            Header: 'ask',
            accessor: d=>d.asks,
          }
        ]}
        defaultPageSize={6}
        className="-striped -highlight"
        showPagination= {false}
      />
    )
  }
  display() {
    if(document.getElementById(this.id.toString()+"marketstat")!= null) {
      document.getElementById(this.id.toString()+"marketstat").style.display = "block";
      document.getElementById(this.id.toString()+"marketvolume").style.display = "block";
      document.getElementById(this.id.toString()+"markettable").style.display = "block";
      document.getElementById(this.id.toString()+"trade").style.display = "block";
    }
  }
  rendermarkhead (){
    return(
      <div className="panel">
        <div className="panel-img delmar">
          <img src={gethorse(this.id-1)} alt='' className="img-chopper" style={{width:"100%", maxWidth: "200px"}}/>
        </div>
        <div className="panel-info" style={{padding: "none"}}>
          <div className="panel panel-opa">
            <div className="panel-img panel-opa delmar" >
              <h3>Past average habit category: B</h3>
            </div>
            <div className="panel-img panel-opa delmar" >
               <h1 style={{fontSize:"2em"}}><i className="fas fa-arrow-circle-right"></i></h1>
            </div>
            <div className="panel-img panel-opa delmar" >
              <h3>Present habit category: {this.category}</h3>
            </div>
            <div className="panel-info panel-gray delmar" >
              <table className="tb">
                <tbody><tr>
                  <th>Success count:{this.succ}</th>
                  <th>Failed count:{this.fail}</th>
                  <th>Non-execution:{this.nonexe}</th>
                </tr></tbody>
              </table>
              <table className="tb">
                <tbody><tr>
                  <th>Bid:{this.bid.length}</th>
                  <th>Ask:{this.ask.length}</th>
                </tr></tbody>
              </table>
              <button className="mytradebt" onClick={(e)=>{this.display()}} id={this.id.toString()+"display"}> Show info </button>
            </div>
          </div>
        </div>
        <div className="panel-info panel-gray delmar" style={{display: "none"}} id={this.id.toString()+"trade"}>
          <h2>You want to?</h2>
          <div style={{display: "flex", displayDirectoin:"row", flexWrap:"wrap"}}>
            <div style={{flex: "0 0 40%", padding:"1em"}}> <button className="mytradebt" style={{float:"center", width:"80%"}} id={this.id.toString()+"BID"} 
                 onClick={(e)=>{clickbid(e, this.id.toString()+"BID"); ReactDOM.render(<PricePanel/>, document.getElementById(this.id+"xx"))}}> Bid </button></div>
            <div style={{flex: "0 0 40%", padding:"1em"}}> <button className="mytradebt" style={{float:"center", width:"80%"}} id={this.id.toString()+"ASK"} 
                 onClick={(e)=>{clickask(e, this.id.toString()+"ASK"); ReactDOM.render(<PricePanel/>, document.getElementById(this.id+"xx"))}}> Ask </button></div>
            <div style={{flex: "1 1 80%", fontSize:"1em", alignText:"center", padding: "1em"}}> 
              <div id={this.id+"xx"}></div>
            </div>
          </div>
          <br/>
          <button className="mytradebt" style={{display: "block",marginLeft: "auto", marginRight: "auto", width: "40%"}}> Comfirm trade </button>
        </div>
      </div>
    )
  }
  //Quantity: <br/><input placeholder="@" type="text" style={{fontSize:"1em", padding:"12px 14px", width: "50%"}}/><br/>
  rendermarket() {
    return(
      <div className="marketpanel">
        <div className="marketinfo delmar">
          {this.rendermarkhead()}
        </div>
        <div className="marketstat" style={{display: "none"}} id={this.id.toString()+"marketstat"}>
          {this.renderGraph()}
        </div>
        <div className="marketvolume" style={{display: "none"}} id={this.id.toString()+"marketvolume"}>
          {this.rendervolume()}
        </div>
        <div className="markettable" style={{display: "none"}} id={this.id.toString()+"markettable"}>
          <h2> History </h2> <br/>
          {this.rendertable()}
        </div>
      </div>
    )
  }
}
// style={{display: "none"}}

export default Person;
