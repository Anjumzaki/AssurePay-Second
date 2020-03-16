import React from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  DatePickerIOS,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import Storage from "../Storage";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
class MainScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      name: "",
      contact: "",
      volume: "",
      msg: "",
      downPay: "",
      spiff: "0.0",
      spiffType: "%",
      spiffPer: -1,
      note: "",
      commission: "0.0",
      commPer: -1,
      bonus: "0.0",
      commType: "%",
      bonusPer: -1,
      bonusType: "%",
      pmdDeduction: 0,
      pmdDeductionPer: -1,
      pmdType: "%",
      payDate: new Date(),
      soldDate: "",
      userId: "",
      loading: false
    };
  }
  login() {
    this.props.navigation.navigate("MainTabs");
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "MainTabs" })]
      })
    );
  }
  async getId() {
    return await Storage.getItem("userId");
  }
  componentDidMount() {
    this.setState({ soldDate: this.props.navigation.getParam("sectedDate") });
    var date = this.props.navigation.getParam("sectedDate").dateString;
    var year = new Date(date).getFullYear();
    var month = new Date(date).getMonth() + 1;
    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/fixedAmount/" +
          this.props.user +
          "/" +
          year.toString() +
          "/" +
          month.toString()
      )
      .then(resp => {
        if (resp.data !== null) {
          this.setState({
            commPer: resp.data.commission,
            bonusPer: resp.data.bonus,
            pmdDeductionPer: resp.data.pmdDeduction,
            commType: resp.data.commType,
            bonusType: resp.data.bonusType,
            pmdType: resp.data.pmdDeductionType
          });
        }
      })
      .catch(err => console.log(err));
  }
  saveTrasc = navigation => {
    if (
      this.state.payDate &&
      // this.state.soldDate &&
      this.state.name &&
      this.state.contact &&
      this.state.volume &&
      this.state.downPay < 101
      // this.state.spiff &&
      // this.state.note &&
      // this.state.commPer >= 0 &&
      // this.state.bonusPer >= 0 &&
      // this.state.pmdDeductionPer >= 0
    ) {
      axios
        .post("https://intense-harbor-45607.herokuapp.com/post/transaction", {
          payDate: this.state.payDate,
          soldDate: this.state.soldDate.dateString,
          name: this.state.name,
          contact: this.state.contact,
          volume: this.state.volume ? this.state.volume : 0,
          downPayment: this.state.downPay,
          spiff: this.state.spiff ? this.state.spiff : 0,
          note: this.state.note,
          commission: this.state.commission ? this.state.commission : 0,
          bonus: this.state.bonus ? this.state.bonus : 0,
          pmdDeduction: this.state.pmdDeduction,
          userId: this.props.user
        })
        .then(resp => {
          if (resp.status == 200) {
            Alert.alert(
              "Actions",
              "Transaction Posted",
              [
                {
                  text: "Okay",
                  onPress: () => navigation.navigate("HomePage")
                }
              ],
              { cancelable: true }
            );
          } else {
            Alert.alert("Something Went Wrong!");
          }
        })
        .catch(err => Alert.alert("Something Went Wrong!"));
    } else {
      if (!this.state.payDate) {
        this.setState({ msg: "Please Enter Date" });
      } else if (!this.state.name) {
        this.setState({ msg: "Please Enter Name" });
      } else if (!this.state.contact) {
        this.setState({ msg: "Please Enter Contract #" });
      } else if (!this.state.volume) {
        this.setState({ msg: "Please Enter Volume" });
      } else if (this.state.downPay > 101) {
        this.setState({ msg: "Downpayment must be less than or equal 100 %" });
      }
    }
    this.setState({
      loading: false
    });
  };
  render() {

    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              value={this.state.soldDate.dateString}
              placeholder="Sold Date"
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
          <Text style={{marginTop:15}}>Pay Date</Text>
          <View style={styles.SectionStyle}>
            
            {Platform.OS == 'android' ?  <DatePicker
              style={[styles.forms, { paddingTop: -5 }]}
              date={this.state.payDate} //initial date from state
              mode="date" //The enum of date, datetime and timeQ
              placeholder="Pay date"
              allowFontScaling={false}
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              minDate={this.state.soldDate.dateString}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 5,
                  marginLeft: 0
                },
                dateText: {
                  fontSize: 19,
                  color: "black"
                },
                dateInput: {
                  borderWidth: 0,
                  placeholderTextColor: "black",
                  alignItems: "flex-start",
                  color: "black",
                  position: "relative",
                  paddingBottom: 8
                },
                dateTouchBody: {
                  color: "black"
                },
                placeholderText: {
                  fontSize: 19,
                  color: "gray"
                }
              }}
              onDateChange={payDate => {
                this.setState({ payDate });
              }}
            /> : <DatePicker
            style={[styles.forms, { paddingTop: -5 }]}
            date={this.state.payDate} 
            //initial date from state
            mode="date" //The enum of date, datetime and timeQ
            placeholder="Pay date"
            allowFontScaling={false}
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
           // minDate={this.state.soldDate.dateString}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 5,
                marginLeft: 0
              },
              dateText: {
                fontSize: 19,
                color: "black"
              },
              dateInput: {
                borderWidth: 0,
                placeholderTextColor: "black",
                alignItems: "flex-start",
                color: "black",
                position: "relative",
                paddingBottom: 0
              },
              dateTouchBody: {
                color: "black"
              },
              placeholderText: {
                fontSize: 19,
                color: "gray"
              }
            }}
            onDateChange={payDate => {
              this.setState({ payDate });
            }}
          /> }
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              placeholder="Name"
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              onChangeText={contact => this.setState({ contact })}
              value={this.state.contact}
              placeholder="Contract#"
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              onChangeText={volume => {
                this.setState({ volume });
              }}
              value={this.state.volume}
              placeholder="Volume"
              keyboardType="number-pad"
              returnKeyType="next"
              onBlur={() => {
                var calc;
                if (this.state.commType === "%") {
                  calc = (this.state.commPer * this.state.volume) / 100;
                } else {
                  calc = this.state.commPer;
                }
                this.setState({ commission: calc, commission1: calc });
                var calc1;
                if (this.state.bonusType === "%") {
                  calc1 = (this.state.bonusPer * this.state.volume) / 100;
                } else {
                  calc1 = this.state.bonusPer;
                }
                this.setState({ bonus: calc1 });
                var calc3;
                if (this.state.spiffType === "%") {
                  calc3 = (this.state.spiffPer * this.state.volume) / 100;
                } else {
                  calc3 = this.state.spiffPer;
                }
                this.setState({ spiff: calc3 });
                var calc2;
                if (this.state.pmdType === "%") {
                  calc2 =
                    (this.state.pmdDeductionPer * this.state.volume) / 100;
                  this.setState({ commission: calc - calc2 });
                  if (this.state.commission < 0) {
                    this.setState({
                      pmdDeductionPer: 0,
                      msg: "Commission cannot be less than zero"
                    });
                  }
                } else {
                  calc2 = this.state.pmdDeductionPer;
                  this.setState({ commission: calc - calc2 });
                }
                this.setState({ pmdDeduction: calc2 });
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              onChangeText={downPay => this.setState({ downPay })}
              value={this.state.downPay}
              placeholder="Downpayment %"
              keyboardType="number-pad"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              onChangeText={note => this.setState({ note })}
              value={this.state.note}
              placeholder="Note "
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
          <View>
            <View style={styles.commSection}>
              <Text style={styles.perText}>Spiff</Text>
              <View
                style={{
                  width: 80,
                  height: 50,
                  justifyContent:'center',
                  
                }}
              >
                <RNPickerSelect
                  value={this.state.spiffType}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      spiffType: itemValue,
                      spiff: "",
                      spiffPer: ""
                    })
                  }
                  items={[
                    { label: "%", value: "%" },
                    { label: "Fixed", value: "Fixed" }
                  ]}
                />
              </View>

              <TextInput
                style={{ width: 100, padding: 10 }}
                onChangeText={spiffPer => {
                  var calc;
                  if (this.state.spiffType === "%") {
                    calc = (spiffPer * this.state.volume) / 100;
                  } else {
                    calc = spiffPer;
                  }
                  this.setState({ spiffPer, spiff: calc });
                }}
                value={Math.round(this.state.spiffPer)}
                placeholder="Spiff"
                keyboardType="number-pad"
                returnKeyType="next"
              />
              <Text style={{ fontSize: 22 }}>
                {this.state.spiff >= 0 ? Math.round(this.state.spiff) : "0.0"}
              </Text>
            </View>
            <View style={styles.commSection}>
              <Text style={styles.perText}>Commission</Text>
              <View
                style={{
                  width: 80,
                  height: 50,
                  justifyContent:'center'
                }}
              >
                <RNPickerSelect
                  value={this.state.commType}
                  items={[
                    { label: "%", value: "%" },
                    { label: "Fixed", value: "Fixed" }
                  ]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      commType: itemValue,
                      commission: "",
                      commPer: ""
                    })
                  }
                />
              </View>
              <TextInput
                style={{ width: 100, padding: 10 }}
                onChangeText={commPer => {
                  var calc;
                  if (this.state.commType === "%") {
                    calc = (commPer * this.state.volume) / 100;
                  } else {
                    calc = commPer;
                  }
                  this.setState({
                    commPer,
                    commission: calc,
                    commission1: calc
                  });
                }}
                value={Math.round(this.state.commPer)}
                placeholder="Commission "
                keyboardType="number-pad"
                returnKeyType="next"
              />
              <Text style={{ fontSize: 22 }}>
                {this.state.commission >= 0
                  ? Math.round(this.state.commission)
                  : "0.0"}
              </Text>
            </View>

            <View style={styles.commSection}>
              <Text style={styles.perText}>Bonus</Text>
              <View
                style={{
                  width: 80,
                  height: 50,
                  justifyContent:'center'
                }}
              >
                <RNPickerSelect
                  value={this.state.bonusType}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      bonusType: itemValue,
                      bonus: "",
                      bonusPer: ""
                    })
                  }
                  items={[
                    { label: "%", value: "%" },
                    { label: "Fixed", value: "Fixed" }
                  ]}
                />
              </View>
              <TextInput
                style={{ width: 100, padding: 10 }}
                onChangeText={bonusPer => {
                  var calc;
                  if (this.state.bonusType === "%") {
                    calc = (bonusPer * this.state.volume) / 100;
                  } else {
                    calc = bonusPer;
                  }
                  this.setState({ bonusPer, bonus: calc });
                }}
                value={Math.round(this.state.bonusPer)}
                placeholder="Bonus"
                keyboardType="number-pad"
                returnKeyType="next"
              />

              <Text style={{ fontSize: 22 }}>
                {this.state.bonus >= 0 ? Math.round(this.state.bonus) : "0.0"}
              </Text>
            </View>
            <View style={styles.commSection}>
              <Text>PMD</Text>
              <View
                style={{
                  width: 80,
                  height: 50,
                 
                  justifyContent: "center",

                }}
              >
                <RNPickerSelect
                  value={this.state.pmdType}
                  items={[
                    { label: "%", value: "%" },
                    { label: "Fixed", value: "Fixed" }
                  ]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ pmdType: itemValue })
                  }
                />
              </View>
              <TextInput
                style={{
                  textAlign: "center"
                }}
                placeholderText={{ fontSize: 10 }}
                onChangeText={pmdDeductionPer => {
                  var calc;
                  if (this.state.pmdType === "%") {
                    calc = (pmdDeductionPer * this.state.volume) / 100;
                    this.setState({
                      commission: this.state.commission1 - calc
                    });
                    if (this.state.commission < 0) {
                      this.setState({
                        pmdDeductionPer: 0,
                        msg: "Commission cannot be less than zero"
                      });
                    }
                  } else {
                    calc = pmdDeductionPer;
                    this.setState({
                      commission: this.state.commission1 - calc
                    });
                  }
                  this.setState({ pmdDeductionPer, pmdDeduction: calc });
                }}
                value={Math.round(this.state.pmdDeductionPer)}
                placeholder="Podium/Mentor/Deduction"
                keyboardType="number-pad"
                returnKeyType="next"
              />

              <Text style={{ fontSize: 22 }}>
                {this.state.pmdDeduction >= 0
                  ? this.state.pmdDeduction
                  : "0.0 $"}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ textAlign: "center", color: "red" }}>
              {this.state.msg}
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() =>
                this.setState(
                  {
                    loading: true
                  },
                  this.saveTrasc(this.props.navigation)
                )
              }
            >
              {this.state.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white" }}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    
    height: 35,
    margin: 10
  },

  forms: {
    fontSize: 19,
    padding: 8,
    width: Dimensions.get("window").width - 20,
    borderWidth: 1,
    borderColor: "black",
    fontFamily: "open-sans-bold",
    color: "black",
    borderRadius: 10,
    height: 45,
    marginTop: 10
  },

  commSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
   
  },
  saveBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#3f3fb9",
    color: "white",
    borderRadius: 10,
    marginBottom: 30
  },
  pickerIos: {
    ...Platform.select({
      ios: {
        width: 60
      }
    })
  },
  perText: {
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 75
  }
});

const mapStateToProps = state => ({
  user: state.user.userId
});
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      userAsync
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
