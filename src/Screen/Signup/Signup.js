


import React, { Component } from "react";


import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,

  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Button
} from "react-native";
import navigationStrings from "../../constant/navigationStrings";
import { showMessage, errorMessage } from "react-native-flash-message";
import validator from "../../utils/validations";
import apis from "../../apis";
import { LOGIN, SIGNUP, UPLOAD_IMAGE } from "../../config/urls";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import DateTimePicker from "react-native-modal-datetime-picker";








export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      firstName: "",
      email: "",
      dob: '',

      password: "",
      confirmPassword: "",
      isLoggedin: false,
      isDateTimePickerVisible: false



    }
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log(date);
    const dateString = date.toString() ;
    this.setState({
      dob: dateString
    })
    this.hideDateTimePicker();
  };

  chooseImageFromGallery = () => {

    const { selectedImage } = this.state;

    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


    launchImageLibrary(options, (response) => {


      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;


        this.setState({
          selectedImage: source,
        });

        //formData
        const apiData = new FormData();
        apiData.append('image', {
          uri: source,
          type: response.type,
          name: response.fileName
        });



        apis.uploadImage(apiData)
          .then(response => {

            console.log(response)

          })
          .catch(error => {
            console.log(error)

          });


        //api Call Imapge >> res >> uri >> uri setstate

      }
    });

  };




  isValidData = () => {


    const { firstName, email, password, confirmPassword, selectedImage } = this.state;



    const error = validator({ firstName: firstName, email: email, password: password, confirmPassword: confirmPassword })
    if (error) {
      showMessage({
        type: "danger",
        icon: "danger",
        message: error
      })
      return false;

    }

    let dataSend = { name: firstName, email: email, languageCode: "EN", signupType: "APP" }
    apis.signup(dataSend)
      .then(response => {
        console.log(response)
        this.props.navigation.navigate(navigationStrings.HOMEPAGE)

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


  render() {
    const { navigation } = this.props;
    const { selectedImage, dob } = this.state;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f4f4e6' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.signup}>Sign Up</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={this.chooseImageFromGallery}>
            <Image style={styles.profile} source={{ uri: selectedImage }} />

          </TouchableOpacity>



        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.card}>
            <TextInput
              style={styles.fields}
              placeholder="Name"
              onChangeText={this.changeName("firstName")}
            // defaultValue={text}
            />
          </View>
          <TouchableOpacity onPress={this.showDateTimePicker}>
            <View style={styles.card}>

              <TextInput
                style={styles.fields}
                placeholder="Date of Birth"
                value={dob}
              />
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}

              />



            </View>
          </TouchableOpacity>
          <View style={styles.card}>
            <TextInput
              style={styles.fields}
              placeholder="Email"
              onChangeText={this.changeName("email")}
            // defaultValue={text}
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.fields}
              placeholder="Password"
              onChangeText={this.changeName("password")}
            // defaultValue={text}
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.fields}
              placeholder="confirmPassword"
              onChangeText={this.changeName("confirmPassword")}
            // defaultValue={text}
            />
          </View>
          <View style={{ flexDirection: 'row', margin: 20, marginLeft: 20 }}>
            <Text style={{ marginLeft: 10 }}>Already Register</Text>
            <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.LOGIN)}>
              <Text style={{ marginLeft: 10 }}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.isValidData}>
              <Image style={{ height: 40, width: 50, marginLeft: 50 }} source={{ uri: "https://cdn5.vectorstock.com/i/1000x1000/55/44/arrow-right-flat-blue-color-icon-vector-5285544.jpg" }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
            <Text>By Signing up you agree to our</Text>
            <Text>Terms of service and Privacy Policy</Text>

          </View>


        </View>


      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  signup: {
    fontSize: 30
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


// import React, { Component } from "react";
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   StyleSheet,
//   TextInput,

//   SafeAreaView,
//   Image,
//   ScrollView
// } from "react-native";
// export default class Login extends Component{
//   render(){
//     return(
//       <View>
//         <Text>hellojerfkrbvkhebhvbev</Text>
// <Text>hellojerfkrbvkhebhvbev</Text>
//       </View>
//     )
//   }


//   }




