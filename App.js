import React, { Component } from 'react';
import { View, Text } from 'react-native'
import Routes from './src/Navigation/Routes';
import FlashMessage from "react-native-flash-message";
import { getUserData } from './src/utils/utils';



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedin: false
    }
  }

  componentDidMount() {

    getUserData().then(res => {
      if (res) {
        this.setState({
          isLoggedin: true
        })
      }
    }
    )

  }

  render() {
    const {isLoggedin} = this.state 
    console.log(isLoggedin)
    return (

      <>
        <Routes isLoggedin={isLoggedin} />
        <FlashMessage position="top" />
      </>

    )
  }
}



