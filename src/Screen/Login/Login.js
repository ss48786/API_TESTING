import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput
} from "react-native";
import navigationStrings from "../../constant/navigationStrings";
import { showMessage, errorMessage } from "react-native-flash-message";
import validator from "../../utils/validations";
import apis from "../../apis";
import { LOGIN, SIGNUP } from "../../config/urls";





export default class Login extends Component{
constructor(props){
  super(props)
  this.state={
email:"",
password:""
  }
}
isValidlogin = () => {
    
    
  const { email, password  } = this.state;

 const error = validator({ email:email,password:password})
 if (error) {
   showMessage({
     type: "danger",
     icon: "danger",
     message: error
   })
   return false;
 }

 console.log({  email: email, password: password,  languageCode: "EN", signupType: "APP" })
 let dataSend = { password:password, email: email, languageCode: "EN", signupType: "APP" }
 apis.login(dataSend)
   .then(response => {
     console.log(response)
     this.props.navigation.navigate(navigationStrings.HOMEPAGE)
     showMessage({
      type: "success",
      icon: "success",
      message: "data saved successfully"
    })

   }).catch(error => {
     console.log(error)

   });


};





  changeName(key) {

    return (value) => {
      this.setState({
        [key]: value
      })
    }

  }
    
  render(){
    return(
      <View style={{ flex: 1, backgroundColor: '#f4f4e6' }}>
         <View style={{ flexDirection: 'row', justifyContent: 'center', margin:50 }}>
          <Text style={styles.signup}>Log In</Text>
        </View>
        <View style={styles.card}>
            <TextInput
              style={styles.fields}
              placeholder="Email"
              onChangeText={this.changeName("firstName")}
            // defaultValue={text}
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.fields}
              placeholder="Password"
              onChangeText={this.changeName("firstName")}
            // defaultValue={text}
            />
          </View>
          <TouchableOpacity onPress={()=> this.isValidlogin} style={{flexDirection:'row', justifyContent:'center', marginTop:50}}>
              <Image style={{ height: 40, width: 50 }} source={{ uri: "https://cdn5.vectorstock.com/i/1000x1000/55/44/arrow-right-flat-blue-color-icon-vector-5285544.jpg" }} />
            </TouchableOpacity>
          </View>
    )
  }
}
const styles = StyleSheet.create({
  signup: {
    fontSize: 30,
    
  },
  profile: {
    height: 100,
    width: 100,

    borderRadius: 100 / 2

  },
  card: {
    borderWidth: 0.5,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderColor: '#f7f7ed',
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.43,

    shadowRadius: 4.65,





  },

  fields: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  }

})