import React, { Component } from 'react';
import './App.css';
import './bg.css';
import styled, {keyframes} from 'styled-components';
import Plot, {Plotly} from 'react-plotly.js';


const images = {
  fig: require("./connection.png"),
  logo1: require("./logo1.png"),
  logo2: require("./logo2.png"),
};

const Shuan = {
  photo: require("./person1.jpg"),
  id: 1,
  name: "Shuan-Chi Tsai",
  usrname: "tsea87",
  password: "12345",
  succ: 2,
  fail: 0,
  nonexe: 0,
  betprice: [ 0.5, 0.4, 0.2, 0.6, 0.7, 0.8, 0.2, 0.34, 0.56, 0.45, 0.33],
  bid: [],
  ask: [],
  renderpanel() {
    return(
      <div className="panel" id="1" >
        TODO: the panel of person
      </div>
    )
  },
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Subtitle = styled.h2`
  font-size: 1.2em;
  text-align: center;
  color: palevioletred;
  margin: 1em 3em 1em 3em;
  border-left: 6px solid red;
  background: white;
`;

const Wrapper = styled.section`
  text-align: center;
  padding: 1em;
  background: rgba(127,255,212, 0.3);
  background: linear-gradient(to bottom right, rgba(127,255,212, 0.3), rgba(0,255,255,0.3));
`;
/*original color=> background: papayawhip;*/
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.div`
  float: ${props=>props.Right?"right":"left"};
  margin-top: 1em;
  padding: 1em;
  display: inline;
  animation: ${rotate360} 2s linear infinite;
  font-size: 2rem;
`;

function openTab(event, key) {
  let i , tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for(i = 0; i < tabcontent.length; i++) {/*reset display*/
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for(i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(key).style.display = "block";
  event.currentTarget.className += " active";
}

function renderPug() {
  return(
    <div >
    <div id="wrapper"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub"><div className="sub">
    </div></div></div></div></div></div></div></div></div></div></div></div>
    </div>
  )
}



export class Graph extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
    );
  }
}

class App extends Component {
  renderIcon(name) {
    return (
      <button className='icon'> <i className={`${name}`}></i> </button>
    )
  }
  rendersideNav(){
    return(
      <div className='sidenav'>
        <a> <i className="fa fa-bars"/> </a>
      </div>
    )
  }

  showDefault(id){
    document.getElementById(id).style.display="block";
  }

  renderProfile(id, ) {


  }

  render() { 
    return (
      <div className="App">
        <div className='navbar'>
          <button className="tablinks" onClick={(e)=> openTab(e,'home')}> <img src={images.logo2} width="20px" alt=""/> Home </button>
          <a className="tablinks" onClick={(e)=>openTab(e,'buycoin')}> <i className="fab fa-monero"></i> Buy coins</a>
          <a className="tablinks" onClick={(e)=>openTab(e,'markets')}> <span className="icon-coin-dollar"></span>Markets</a>
          <a className="tablinks" onClick={(e)=>openTab(e,'challenge')}> <i class="fas fa-plus-circle"></i> Add challenge</a>
          <a className="tablinks" onClick={(e)=>openTab(e, "account")}> <i className="fab fa-keycdn"></i> Login </a>
          <a className="tablinks" onClick={(e)=>openTab(e, "profile")}> <i className="fab fa-keycdn"></i> Profile </a>
          <input placeholder="@Search" type="text"/>
        </div>
        {this.rendersideNav()}
        <div id='home' className="tabcontent" style={{display:"block"}}>
          <Wrapper>
            <Logo>&lt; <img src={images.logo1} width='30px' alt=''/> &gt;</Logo>
            <Logo Right>&lt; <img src={images.logo2} width='30px' alt=''/> &gt;</Logo>
            <br/>
            <Title>
              Blockfit: <br/>
              Your profitable habit
            </Title>
          </Wrapper>
        

		      <div>
            <Subtitle> About Blockfit </Subtitle>
              <img className='App-logo' src={images.logo1} alt=''/>
              
		          <p> Blockfit is an interesting contract market for those who wants
		      	  to keep their own medical order such as exercising regularly, 
		      	  measuring their blood sugar after per meals...etc. People who 
		      	  enrolled in this project will have a "Goal" to finish. One should 
		      	  aimed at making profits from finishing the goal. One can also be an
		      	  "investor", a people who bets other people to win/fail. 
		      	  </p>
		      	  <p> The design incorporated the portraits of predictive market, 
		      	  telemedicine and blockchain.
		      	  </p>
              <Subtitle> Trading policies </Subtitle>
              <Subtitle> Buying/Selling coins </Subtitle>
              <Subtitle> Rankboard </Subtitle>
              <Subtitle> About us </Subtitle>
		      </div>
	        <Wrapper>
	        Founder: Shuan-Chi Tsai, Yu-Chi Hsieh, Alex Huang<br/>
            Web designer: Alex Huang <br/>
		        Contact us: (02)1234-5678 <br/>
            Our website: <a href="#"> <i className="fas fa-info-circle"></i> About us </a> <br/>
            {this.renderIcon("fab fa-twitter-square")}
            {this.renderIcon("fab fa-facebook")}
            {this.renderIcon("fab fa-github-square")}
	        </Wrapper>
        </div>
        <div id="buycoin" className="tabcontent">
          <div className="getcoinbg">
            <Title>Buying coins</Title>
            <div>
              <input placeholder="Enter $ Here" type="text" className="dollar"/>
              <button className="button1"><i className="fas fa-check-circle"></i></button>
            </div>
          </div>
        </div>
        <div id="markets" className="tabcontent trendingbg">
          <h1 >Markets</h1><br/>
          Here is graph <br/>
          <div float="left">
            <Graph/>
          </div>
        </div>
        <div id="challenge" className="tabcontent">
          TODO: add challenge
        </div>
        <div id="profile" className="tabcontent">
          {renderPug()}
          TODO: profile <br/>
          {Shuan.renderpanel()}
        </div>
        <div id="account" className="tabcontent trendingbg" font-size="2em">
          <h1 padding="3em"> Login </h1>
          <span class="logimg icon-account_circle"></span> <br/>
          <label for="uname"><b>Username</b></label> <br/>
          <input className="passinput" type="text" placeholder="username@google.com.tw"/> <br/>
          <label for="psw"><b>Password</b></label> <br/>
          <input className="passinput" type="password" placeholder="Enter password here..."/> <br/>
          <button className="passbutton"> Submit </button> <br/>
          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember me
          </label>
        </div>

      </div>
    );
  }
}


export default App;
/*
const Footer = styled.footer`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 4em;
  background: papayawhip;
`;

const Input = styled.input`
  padding: 0.5em;
  Margin-left: 0em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
*/

