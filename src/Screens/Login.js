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
import { NavigationActions, StackActions,NavigationEvents } from "react-navigation";
import * as Font from "expo-font";
import axios from "axios";
import Storage from "../Storage";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import { CheckBox, Body } from "native-base";

class Login extends React.Component {
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
    };
  }
  resetPins() {
    let user;
    let pass;
    let check;
    let pinned;
    try {
      user =  AsyncStorage.getItem("username");
      pass =  AsyncStorage.getItem("password");
      check =  AsyncStorage.getItem("checked");
      pinned =  AsyncStorage.getItem("pin");
    } catch (e) {}
    console.log(user);
    console.log(check);
    console.log(pass);
    console.log(pinned, "pin");
    this.setState({
      user,
      check,
      pass,
      pinned,
    });
  }
  async componentDidMount() {
    let user;
    let pass;
    let check;
    let pinned;
    try {
      user = await AsyncStorage.getItem("username");
      pass = await AsyncStorage.getItem("password");
      check = await AsyncStorage.getItem("checked");
      pinned = await AsyncStorage.getItem("pin");
    } catch (e) {}
    console.log(user);
    console.log(check);
    console.log(pass);
    console.log(pinned, "pin");
    this.setState({
      user,
      check,
      pass,
      pinned,
    });
  }
  login = () => {
    if (this.state.userName) {
      if (this.state.Password) {
        AsyncStorage.setItem("username", this.state.userName);
        AsyncStorage.setItem("password", this.state.Password);
        AsyncStorage.setItem("checked", this.state.checked.toString());
        axios
          .post("https://intense-harbor-45607.herokuapp.com/login", {
            userName: this.state.userName,
            password: this.state.Password,
          })
          .then((response) => {
            this.props.userAsync(response.data.response._id);
            if (response.data.resp === "match") {
              this.props.navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "MainTabs" }),
                  ],
                })
              );
              this.setState({ loading: false });
            } else if (response.data.resp === "wrong") {
              this.setState({ msg: "password is incorrect", loading: false });
            }
          })
          .catch((error) => {
            this.setState({ msg: "login info is incorrect", loading: false });
          });
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
  handlePin = (pin) => {
    if (pin == this.state.pinned) {
      this.setState({
        pinLoading: true,
      });
      axios
        .post("https://intense-harbor-45607.herokuapp.com/login", {
          userName: this.state.user,
          password: this.state.pass,
        })
        .then((response) => {
          this.props.userAsync(response.data.response._id);
          if (response.data.resp === "match") {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: "MainTabs" }),
                ],
              })
            );
            this.setState({ loading: false });
          } else if (response.data.resp === "wrong") {
            this.setState({ msg: "password is incorrect", loading: false });
          }
        })
        .catch((error) => {
          this.setState({ msg: "login info is incorrect", loading: false });
        });
    }
    if (pin.length == 4 && pin !== this.state.pinned) {
      alert("Incorrect Pin");
    }
    if (pin.length < 5) {
      this.setState({
        pin,
      });
    }
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/background.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <NavigationEvents onDidFocus={this.resetPins} />
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {this.state.check == "true" ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: Dimensions.get("window").height - 70,
              }}
            >
              {this.state.pinLoading ? (
                <ActivityIndicator size="large" color="#ff1358" />
              ) : (
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={[styles.forms, { textAlign: "center" }]}
                    onChangeText={(pin) => this.handlePin(pin)}
                    value={this.state.pin}
                    placeholder="4 digit pin"
                    keyboardType="number-pad"
                    returnKeyType="next"
                  />
                </View>
              )}
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ check: "false" })}
                >
                  <Text style={styles.reg}>Login Instead</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("ForgotPin")}
                >
                  <Text style={styles.reg}>Forgot Pin</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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

                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                  }}
                >
                  <CheckBox
                    onPress={() =>
                      this.setState({ checked: !this.state.checked })
                    }
                    style={{ marginRight: 20 }}
                    checked={this.state.checked}
                    color="#ff1358"
                  />
                  <Text style={{ color: "white", fontSize: 15 }}>
                    Remember Me{" "}
                  </Text>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {" "}
                    (Requires 4 digit pin)
                  </Text>
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
                  onPress={() => this.setState({ loading: true }, this.login())}
                  style={styles.regButton}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text style={styles.regButton1}> Login </Text>
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
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity
                  onPress={() => this.setState({check:'true'})}
                >
                  <Text style={styles.reg}>Login with Pin</Text>
                </TouchableOpacity>
              </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.reg1}> Don't have an account? </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("SignUp")}
                  >
                    <Text style={styles.reg}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
