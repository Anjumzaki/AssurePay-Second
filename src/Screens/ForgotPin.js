import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions, StackActions } from "react-navigation";
import * as Font from "expo-font";
import axios from "axios";
import Storage from "../Storage";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import { CheckBox, Body } from "native-base";

class ForgotPin extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      Password: "",
      msg: "",
      loading: false,
      checked: false,
      user: "",
      check: "",
      pass: "",
      pin: "",
      pinned: "",
      conPin: "",
    };
  }
  ChangePin = () => {
    if (this.state.userName) {
      if (this.state.Password) {
        if (this.state.pin) {
          if (this.state.conPin == this.state.pin) {
            AsyncStorage.setItem("username", this.state.userName);
            AsyncStorage.setItem("password", this.state.Password);
            AsyncStorage.setItem("pin", this.state.pin);
            AsyncStorage.setItem("checked", "true");
           
            // https://intense-harbor-45607.herokuapp.com
            axios
              .put(
                "https://intense-harbor-45607.herokuapp.com/change/pin/" +
                  this.state.userName +
                  "/" +
                  this.state.Password +
                  "/" +
                  this.state.pin,
                {}
              )
              .then((response) => {
                  this.props.navigation.navigate('Login')
              })
              .catch((error) => {
                this.setState({
                  msg: "login info is incorrect",
                  loading: false,
                });
              });
          } else {
            this.setState({
              msg: "Confirm Pin and new pin are not same",
              loading: false,
            });
          }
        } else {
          this.setState({
            msg: "Please enter new Pin",
            loading: false,
          });
        }
      } else {
        this.setState({
          msg: "Please enter your Password",
          loading: false,
        });
      }
    } else {
      this.setState({
        msg: "Please enter your Username",
        loading: false,
      });
    }
    this.setState({
      loading: false,
    });
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/background.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: Dimensions.get("window").height - 70,
              }}
            >
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.forms}
                  onChangeText={(userName) => this.setState({ userName })}
                  value={this.state.userName}
                  placeholder="User Name"
                  keyboardType="default"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.forms}
                  onChangeText={(Password) => this.setState({ Password })}
                  value={this.state.Password}
                  placeholder="Password"
                  keyboardType="default"
                  returnKeyType="next"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.forms}
                  onChangeText={(pin) => this.setState({ pin })}
                  value={this.state.pin}
                  placeholder="Pin"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.forms}
                  onChangeText={(conPin) => this.setState({ conPin })}
                  value={this.state.conPin}
                  placeholder="Confirm Pin"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  secureTextEntry={true}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#ff1358",
                    marginTop: 20,
                    fontSize: 17,
                  }}
                >
                  {this.state.msg}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ loading: true }, this.ChangePin())
                }
                style={styles.regButton}
              >
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text style={styles.regButton1}> Change Pin </Text>
                )}
              </TouchableOpacity>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ForgotPassword")
                  }
                >
                  <Text style={styles.reg}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.reg1}> Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <Text style={styles.reg}>SignUp</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    margin: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 10,
    width: 10,
    resizeMode: "stretch",
    alignItems: "center",
  },
  ImageStyle1: {
    padding: 10,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 10,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  forms: {
    fontSize: 19,
    padding: 8,
    width: Dimensions.get("window").width - 105,
    borderBottomWidth: 1,
    borderColor: "white",
    height: 50,
    fontFamily: "open-sans-bold",
    color: "white",
  },
  regButton1: {
    fontSize: 22,
    fontFamily: "open-sans-simple",
    color: "white",
  },
  regButton: {
    fontFamily: "open-sans-simple",
    width: Dimensions.get("window").width - 105,
    alignItems: "center",
    backgroundColor: "#ff1358",
    padding: 10,
    borderRadius: 100,
    marginTop: 60,
  },
  reg: {
    textDecorationLine: "underline",
    color: "#ff1358",

    fontFamily: "open-sans-simple",
    fontSize: 20,
  },
  reg1: {
    fontFamily: "open-sans-simple",
    color: "white",
    fontSize: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.user.userId,
});
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      userAsync,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPin);
