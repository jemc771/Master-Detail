import React from 'react';
import './App.css';
import Heroes from './components/heroes';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { getHeroes } from './actions/app';       

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      heroes: [],
      isFetch: false
    }
  }

  componentDidMount(){
    const publicKey = '6e1e6dccb77caa5abfe7a2239f3a7a06'
    const ts = '2020-03-20 20:00:00';
    const hash = 'c2031a89b753c0b0d74b0f5e4b716b85'; 

    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => {
        return response.json();
    })
    .then((myJson) => {
      this.props.getHeroes(myJson.data.results); //react redux
      this.setState({
        heroes: myJson.data.results,
        isFetch: true
      })
    })
      .catch(error => {
       alert("error");
    });
  }

  render(){
    const {heroes, isFetch} = this.state;
    
    if(!isFetch){
      return <div>Loading..</div>
    }

    return <div className="container">
          <div className="row">
              <h3>Master Detail</h3>
          </div>
          <div className="row">
              <Heroes items={heroes}></Heroes>
          </div>
    </div> 
  }

}

const mapDispatchToProps = dispatch => ({
  getHeroes : value => dispatch(getHeroes(value))
});

const AppConnnected = connect(null,mapDispatchToProps)(App);

export default AppConnnected;