import React, { Component } from 'react';
import './App.css';
import './bg.css';
import Person from './person.js'
import styled, {keyframes} from 'styled-components';
//import Plot from 'react-plotly.js';


const images = {
  fig: require("./connection.png"),
  logo1: require("./logo1.png"),
  logo2: require("./logo2.png"),
  login: require("./account.svg"),
  market: require("./market.svg"),
};

let Shuan = new Person(1, "Shuan-Chi Tsai", "tsea87", "12345", 8, 2, 1, "C", 
  [ 0.5, 0.45, 0.44, 0.6, 0.55, 0.65, 0.66, 0.70, 0.69, 0.77, 0.76]);
let YuChi = new Person(2, "Yu-Chi Hsieh", "ychsieh87", "54321", 4, 5, 2, "E", 
  [ 0.5, 0.49, 0.45, 0.43, 0.46, 0.50, 0.42, 0.41, 0.36, 0.33, 0.31]);

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

function confirmLogin(e) {
  document.getElementById("accountTab").style.display="none";
  document.getElementById("profileTab").style.display="block";
  document.getElementById("logoutTab").style.display="block";
  openTab(e, "profile");
}

function logout(e) {
  document.getElementById("profileTab").style.display="none";
  document.getElementById("accountTab").style.display="block";
  document.getElementById("logoutTab").style.display="none";
  openTab(e, "home");
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

  render() { 
    return (
      <div className="App">
        <div className='navbar'>
          <button className="tablinks" onClick={(e)=> openTab(e,'home')}> <img src={images.logo2} width="20px" alt=""/> Home </button>
          <a className="tablinks" onClick={(e)=>openTab(e,'buycoin')}> <i className="fab fa-monero"></i> Buy coins</a>
          <a className="tablinks" onClick={(e)=>openTab(e,'markets')}> <img src={images.market} width="15px" alt=""/> Markets</a>
          <a className="tablinks" onClick={(e)=>openTab(e,'challenge')}> <i className="fas fa-plus-circle"></i> Add challenge</a>
          <a className="tablinks" onClick={(e)=>openTab(e, "account")} id="accountTab"> <i className="fab fa-keycdn"></i> Login </a>
          <a className="tablinks" onClick={(e)=>openTab(e, "profile")} id="profileTab" style={{display: "none"}}> <i className="fab fa-keycdn"></i> Profile </a>
          <a className="tablinks" onClick={(e)=>logout(e)} id="logoutTab" style={{display: "none"}}> <i className="fa fa-sign-out"></i> Logout</a>
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
            <Subtitle> What is Blockfit? </Subtitle>
              <img className='App-logo' src={images.logo1} alt=''/>
		          <p> We are Prediction Markets on Blockchain assisted by Wearable Devices.
		      	  </p>
              <Subtitle> Why to Blockfit? </Subtitle>
              <p>
                With such a strong motivation pushing you towards your health goals, you'll definitely achieve whatever you want to achieve with us.
              </p>
              <Subtitle> How to Blockfit? </Subtitle>
              <p> Simplest platform to join in ever. All you need is to create an account, buy some tokens and plan for your own PM. You read to enjoy a healthier life?
              </p>
              <Subtitle> Features </Subtitle>
              <h1>Prediction Market</h1>
              <p>
                A market for people to trade predictions of possible outcomes on certain events. Thanks to Efficient Market Hypothesis, PM provides very accurate predictions.
              </p>
              <h1>Blockchain</h1>
              <p>
                Blockchain brings enormous benefits for our trading system, for example, its decentralized nature ensures the necessary anonymity Blockfit demands.
              </p>
              <h1>Wearable Devices</h1>
              <p>
                Both on identification and physical figure measurements, wearable devices are trust-worthy and totally reliable.
              </p>
              <Subtitle> Logarithmic MSR </Subtitle>
              First introduced by Robin Hanson in 2002, LMSR provides the math foundation for Blockfit's beloved automated market maker system.
              <p>
              </p>
              <Subtitle> Ethereum </Subtitle>
              <p>As the most successful and famous block chain platform, on Ethereum there are all the trades between Blockfittors and most important of all, the Blockcoins (tokens for trading)
              
              </p>
              <Subtitle> ECG Identificaion </Subtitle>
              <p>What a breakthrough in the 21st century. Now we have a profound way to clearly identify the planner, measure his/her physical figures and thus successfully run our model.
              
              </p>

		      </div>
	        <Wrapper>
	        Founder: Shuan-Chi Tsai, Yu-Chi Hsieh, Alex Huang<br/>
            Web designer: Alex Huang <br/>
		        Contact us: (02)1234-5678 <br/>
            Our website: <a href="https://tsea87.wixsite.com/blockfit"> <i className="fas fa-info-circle"></i> About us </a> <br/>
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
        <div id="markets" className="tabcontent">
          {renderPug()}
          <h1 >Markets</h1><br/>
          {Shuan.rendermarket()}
          {YuChi.rendermarket()}
        </div>
        <div id="challenge" className="tabcontent">
          {renderPug()}
          <h1> Add challenge !</h1>
          {Shuan.rendercreate()}
        </div>
        <div id="profile" className="tabcontent">
          {renderPug()}
          <h1>Personal Profile</h1>
          {Shuan.renderpanel()}
        </div>
        <div id="account" className="tabcontent trendingbg" style={{fontSize: "2em"}}>
          <h1 padding="3em"> Login </h1>
          <img src={images.login} width="30%" float="center" alt=""/> <br/>
          <label htmlFor="uname"><b>Username</b></label> <br/>
          <input className="passinput" type="text" placeholder="username@google.com.tw"/> <br/>
          <label htmlFor="psw"><b>Password</b></label> <br/>
          <input className="passinput" type="password" placeholder="Enter password here..."/> <br/>
          <button className="passbutton" onClick={(e) => confirmLogin(e)}> Submit </button> <br/>
          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember me
          </label>
        </div>
      </div>
    );
  }
}

/*<span class="logimg icon-account_circle"></span> <br/>*/
export default App;