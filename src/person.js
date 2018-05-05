import React from 'react';
import Plot from 'react-plotly.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';
import './index.css';

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
      console.log("success");
      document.getElementById(this.id.toString()+"marketstat").style.display = "block";
      document.getElementById(this.id.toString()+"marketvolume").style.display = "block";
      document.getElementById(this.id.toString()+"markettable").style.display = "block";
    }
    console.log("failed");
  }

  rendermarkhead (){
    return(
      <div className="panel">
        <div className="panel-img delmar">
          <img src={gethorse(this.id-1)} alt='' className="img-chopper" style={{width:"100%"}}/>
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
              <button className="mytradebt" onClick={(e)=>{this.display()}} id={this.id.toString()+"display"}> Show more info </button>
              <button className="mytradebt" onClick={(e)=>{this.display()}} id={this.id.toString()+"display"} style={{display: "none"}}> Show more info </button>
              <button className="mytradebt" style={{float:"left"}}> Trade </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


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
