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
  DatePickerIOS
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { Icon, Picker } from 'native-base'
class EditTrans extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      eye: true,
      name: "",
      contact: "",
      volume: "",
      msg: "",
      downPay: "",
      spiff: "0.0",
      spiffType: "%",
      spiffPer: 0,
      note: "",
      commission: "0.0",
      commPer: 0,
      bonus: "0.0",
      commType: "%",
      bonusPer: -1,
      bonusType: "%",
      pmdDeduction: false,
      pmdDeductionPer: 0,
      pmdType: "%",
      payDate: "",
      soldDate: "",
      userId: "",
      loading: false,
      userId: ""
    };
  }
  componentDidMount() {
    console.log(this.props.navigation.getParam("transaction"));
    const trans = this.props.navigation.getParam("transaction");

    this.setState({
      _id: trans._id,
      bonus: trans.bonus,
      commission: trans.commission,
      contact: trans.contact,
      downPay: trans.downPayment,
      name: trans.name,
      note: trans.note,
      payDate: new Date(trans.payDate),
      pmdDeduction: trans.pmdDeduction,
      soldDate: { dateString: trans.soldDate },
      spiff: trans.spiff,
      userId: trans.userId,
      volume: trans.volume
    });
  }
  saveTrasc(navigation) {
    this.setState({
      loading: true
    });
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
        .post(
          "https://intense-harbor-45607.herokuapp.com/edit/trasc/" +
            this.state._id,
          {
            payDate:this.state.payDate.getFullYear() + "-" + (
              this.state.payDate.getMonth() + 1 < 10 ?  "0" + (this.state.payDate.getMonth() + 1) : this.state.payDate.getMonth() + 1) + "-" + 
              (this.state.payDate.getDate()  < 10 ?  "0" + (this.state.payDate.getDate()) : this.state.payDate.getDate() ),
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
          }
        )
        .then(resp => {
          if (resp.status == 200) {
            Alert.alert(
              "Actions",
              "Edited",
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
        this.setState({ msg: "Please Select Date" });
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
  }
  render() {
    if(Platform.OS == "android" ) {   
      pay = this.state.payDate
  }
  else{
    var pay
    if(this.state.payDate) {
    pay = this.state.payDate.getFullYear() + "-" + (
      this.state.payDate.getMonth() + 1 < 10 ?  "0" + (this.state.payDate.getMonth() + 1) : this.state.payDate.getMonth() + 1) + "-" + 
      (this.state.payDate.getDate()  < 10 ?  "0" + (this.state.payDate.getDate()) : this.state.payDate.getDate() )
    }
    else{
      pay = this.state.soldDate.dateString
    }
  }
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
          {Platform.OS == "android" ? null:
          <Text style={{ marginTop: 10,marginBottom:10 }}>Pay Date</Text>}

          {Platform.OS == "android" ? (
            <View style={styles.SectionStyle}>
              <DatePicker
                style={[styles.forms, { paddingTop: -5 }]}
                date={this.state.payDate ? this.state.payDate : new Date(this.state.soldDate.dateString)} //initial date from state
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
                  this.setState({ payDate : payDate });
                }}
              />
            </View>
          ) : (
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => this.setState({ showDate: true })}
                style={(styles.SectionStyle, [{}])}
              >
                <Text style={[styles.forms]}>
                  {pay}
                </Text>
              </TouchableOpacity>
              {this.state.showDate && (
                <DatePickerIOS
                  style={{ paddingTop: 5 }}
                  date={this.state.payDate ? this.state.payDate : new Date(this.state.soldDate.dateString)}
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
                    dateText: {
                      fontSize: 19,
                      color: "black"
                    },
                    dateInput: {
                      borderWidth: 0,
                      placeholderTextColor: "black",

                      color: "black",

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
                />
              )}
              {this.state.showDate && (
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ showDate: false })}
                  >
                    <Text style={{ padding: 20, color: "blue" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

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
          {/* <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              onChangeText={spiff => this.setState({ spiff })}
              value={this.state.spiff}
              placeholder="Spiff "
              keyboardType="number-pad"
              returnKeyType="next"
            />
          </View> */}
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
          {Platform.OS == "android" ? (
            <View>
              <View style={styles.commSection}>
                <Text style={styles.perText}>Spiff</Text>
                <View
                  style={{
                    width: 80,
                    height: 50
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
                    height: 50
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
                    height: 50
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
                    textAlign: "right",
                    justifyContent: "flex-end"
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
          ) : (
            <View>
              <View style={styles.commSection}>
                <Text style={styles.perText}>Spiff</Text>
                <View
                  style={{
                    height: 50,
                    justifyContent: "center"
                  }}
                >
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Type"
                    iosIcon={<Icon name="arrow-down"></Icon>}
                    selectedValue={this.state.spiffType}
                    onValueChange={itemValue =>
                      this.setState({
                        spiffType: itemValue,
                        spiff: "",
                        spiffPer: ""
                      })
                    }
                  >
                    <Picker.Item label="%" value="%" />
                    <Picker.Item label="Fixed" value="Fixed" />
                  </Picker>
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
                  keyboardType="decimal-pad"
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
                    height: 50,
                    justifyContent: "center"
                  }}
                >
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Type"
                    iosIcon={<Icon name="arrow-down"></Icon>}
                    selectedValue={this.state.commType}
                    onValueChange={itemValue =>
                      this.setState({
                        commType: itemValue,
                        commission: "",
                        commPer: ""
                      })
                    }
                  >
                    <Picker.Item label="%" value="%" />
                    <Picker.Item label="Fixed" value="Fixed" />
                  </Picker>
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
                  keyboardType="decimal-pad"
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
                    height: 50,
                    justifyContent: "center"
                  }}
                >
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Type"
                    iosIcon={<Icon name="arrow-down"></Icon>}
                    selectedValue={this.state.bonusType}
                    onValueChange={itemValue =>
                      this.setState({
                        bonusType: itemValue,
                        bonus: "",
                        bonusPer: ""
                      })
                    }
                  >
                    <Picker.Item label="%" value="%" />
                    <Picker.Item label="Fixed" value="Fixed" />
                  </Picker>
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
                  keyboardType="decimal-pad"
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
                    height: 50,

                    justifyContent: "center"
                  }}
                >
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Type"
                    iosIcon={<Icon name="arrow-down"></Icon>}
                    selectedValue={this.state.pmdType}
                    onValueChange={itemValue =>
                      this.setState({
                        pmdType: itemValue
                      })
                    }
                  >
                    <Picker.Item label="%" value="%" />
                    <Picker.Item label="Fixed" value="Fixed" />
                  </Picker>
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
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                />

                <Text style={{ fontSize: 22 }}>
                  {this.state.pmdDeduction >= 0
                    ? this.state.pmdDeduction
                    : "0.0 $"}
                </Text>
              </View>
            </View>
          )}
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
    alignItems: "center",
    height: 35,
    margin: 10
  },

  forms: {
    fontSize: 19,
    padding: 8,
    width: Dimensions.get("window").width - 20,
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    fontFamily: "open-sans-bold",
    color: "black",
    borderRadius: 10
  },

  commSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTrans);
