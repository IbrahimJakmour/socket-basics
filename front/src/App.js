import React, { Component } from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';


class App extends Component {

  state = { socket:null, globalNumber:0 ,username:"",message:"hi"}

  componentDidMount(){
    const socket = io('http://localhost:8888');

    this.setState({socket:socket})

    socket.on('new car arrived in parking', (car) => { console.log(car.color+" "+car.brand)})
    socket.on('message', (message) => { console.log(message)})
    
    socket.on('number:change', (globalNumber) => {
      this.setState({globalNumber})
    })
    socket.on('user:new', (username)=>{
      console.log('a user called '+username+' has connected')
    })

    socket.on('user:me', (username)=>{
      this.setState({username})
    })
  }

  onIncrement = () => this.state.socket.emit('increment')

  onDecrement = () => this.state.socket.emit('decrement')


  handleMessage=(e)=> {
  e.preventDefault();
  const message = e.target.txt.value;
    this.setState(() => ({ message }));
    console.log("message: " + this.state.message);
    
}

// onChange = (e) => {
//   const message = e.target.value
//   this.setState({message})
// }
// onKeyDown = (e) => {
//    if(e.keyCode === 13){ // enter
//       const message = this.state.value
//       // do what you want with input value
//    }
// }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
	<h1>{this.state.globalNumber}</h1>
        <p className="App-intro">
          <button onClick={this.onIncrement}>+</button>
          <button onClick={this.onDecrement}>-</button>
        </p>
        <h2>{this.state.username} is connected</h2>
        <div>
        <form onSubmit={this.handleMessage}>
        <input type="text" name="txt" placeholder="write something" /* onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.value}*//>
        <button   type="submit" name="submit">Send</button>
        </form>
        <h3>message: {this.state.message}</h3>
        </div>
      </div>
    );
  }
}

export default App;
