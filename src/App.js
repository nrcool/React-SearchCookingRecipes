import React, { Component } from 'react';
import "./css/app.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import _ from "dotenv";
import Details from "./details"

_.config();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      search:"chicken",
      recipe:[]
    }
    this.getdata=this.getdata.bind(this);
  } 
componentDidMount(){
  this.getdata("chicken")
}
 getdata(value){
      fetch(`https://api.edamam.com/search?q=${value}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`).then(response=>{
        return response.json();
      }).then(data => {
        console.log(data)
        return this.setState({
        recipe:data.hits
      })
    })
  this.refs.search.value="";
} 


  render() {
    
    return (
      <>
      <div className="app">
        <h1>FOOD RECIPIES</h1>
          <input ref="search" type="text"/>
          <button onClick={()=>this.getdata(this.refs.search.value)}>SEARCH</button>        
      </div>
      <Router>
      <section className="main">
      {this.state.recipe.map((item,index)=>{
        return (
          <div className="item" key={index}>
        <h3>{item.recipe.label}</h3>
        <img src={item.recipe.image} alt=""/>
        <div className="btns">
          <button><a href={item.recipe.url} >Publisher URL </a></button>
          <button><Link to="/details">Details </Link></button>
          </div>
      </div>
        )
      })}
      </section>
      <Route path="/details" component={Details}/>
      </Router>
      </>
    )
  }
}

