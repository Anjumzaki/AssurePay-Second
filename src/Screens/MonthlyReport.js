import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions, StackActions ,NavigationEvents} from "react-navigation";
import { CardItem } from "native-base";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

class MonthlyReport extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      years: ["All", "2020", "2021", "2022", "2023", "2024", "2025"],
      selectedyear: "All",
      months: [
        "All",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      selectedMonth: "All",
      selectedMonthNo: "All",
      transctions: null,
      filteredTransctions: null
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
  getNewData = () =>[
    axios
    .get(
      "https://intense-harbor-45607.herokuapp.com/get/all/transactions/" +
        this.props.user
    )
    .then(resp => {
      this.setState({
        transctions: resp.data,
        filteredTransctions: resp.data
      });
    })
    .catch(err => console.log(err))
  ]
  componentDidMount() {
   this.getNewData()
  }

  render() {
    var key = this.state.seName;
    var serachedTractions = [];
    if (this.state.seName) {
      serachedTractions = this.state.transctions.filter(function(transc) {
        return transc.name.toLowerCase().includes(key.toLowerCase());
      });
    }
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    return (
      <KeyboardAwareScrollView>
        <NavigationEvents onDidFocus={this.getNewData} />
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.myDrops}>
              <RNPickerSelect
                 style={styles.pickerIos}
                value={this.state.selectedyear}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ selectedyear: itemValue });
                  if (itemValue === "All") {
                    if (this.state.selectedMonth === "All") {
                      this.setState({
                        filteredTransctions: this.state.transctions
                      });
                    } else {
                      var that = this;
                      var filter = this.state.transctions.filter(function(
                        transc
                      ) {
                        var monC = that.state.selectedMonthNo;
                        if (parseInt(that.state.selectedMonthNo) < 10) {
                          monC = "0" + that.state.selectedMonthNo;
                        }

                        return (
                          parseInt(transc.soldDate.substring(5, 7)) ===
                          parseInt(monC)
                        );
                      });

                      this.setState({ filteredTransctions: filter });
                    }
                  } else {
                    if (this.state.selectedMonth === "All") {
                      let filter = this.state.transctions.filter(function(
                        transc
                      ) {
                        return transc.soldDate.substring(0, 4) == itemValue;
                      });

                      this.setState({ filteredTransctions: filter });
                    } else {
                      let that = this;
                      let filter = this.state.transctions.filter(function(
                        transc
                      ) {
                        var monC = that.state.selectedMonthNo;
                        if (parseInt(that.state.selectedMonthNo) < 10) {
                          monC = "0" + that.state.selectedMonthNo;
                        }
                        return (
                          transc.soldDate.substring(0, 4) == itemValue &&
                          parseInt(transc.soldDate.substring(5, 7)) ===
                            parseInt(monC)
                        );
                      });

                      this.setState({ filteredTransctions: filter });
                    }
                  }
                }}
                items={[
                  { label: "All", value: "All" },
                  { label: "2020", value: "2020" },
                  { label: "2021", value: "2021" },
                  { label: "2022", value: "2022" },
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                  { label: "2025", value: "2025" }
                ]}
              />
            </View>
            <View style={styles.myDrops}>
              <RNPickerSelect
              style={styles.pickerIos}
                  value={this.state.selectedMonth}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      selectedMonth: itemValue,
                      selectedMonthNo: itemIndex,
                    });
                    var sYear = this.state.selectedyear;
                    if (sYear === "All") {
                      if (itemValue === "All") {
                        this.setState({
                          filteredTransctions: this.state.transctions
                        });
                      } else {
                        var filter = this.state.transctions.filter(function(
                          transc
                        ) {
                          return transc.soldDate.substring(5, 7) == (itemIndex-1);
                        });
  
                        this.setState({ filteredTransctions: filter });
                      }
                    } else {
                      if (itemValue === "All") {
                        this.setState({
                          filteredTransctions: this.state.transctions
                        });
                      } else {
                        let filter = this.state.transctions.filter(function(
                          transc
                        ) {
                          return (
                            transc.soldDate.substring(5, 7) == (itemIndex-1) &&
                            transc.soldDate.substring(0, 4) === sYear
                          );
                        });
  
                        this.setState({ filteredTransctions: filter });
                      }
                    }
                  }}
                items={[
                  { label: "All", value: "All" },
                  { label: "Jan", value: "Jan" },
                  { label: "Feb", value: "Feb" },
                  { label: "Mar", value: "Mar" },
                  { label: "Apr", value: "Apr" },
                  { label: "May", value: "May" },
                  { label: "Jun", value: "Jun" },
                  { label: "Jul", value: "Jul" },
                  { label: "Aug", value: "Aug" },
                  { label: "Sep", value: "Sep" },
                  { label: "Oct", value: "Oct" },
                  { label: "Nov", value: "Nov" },
                  { label: "Dec", value: "Dec" },
                ]}
              />
            </View>
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.forms}
              placeholderTextColor={"gray"}
              onChangeText={seName => this.setState({ seName })}
              value={this.state.seName}
              placeholder="Search"
              keyboardType="default"
              returnKeyType="next"
            />
            <Image
              style={{ padding: 10, marginRight: 10, width: 20, height: 20 }}
              source={require("../../assets/newICons/042-magnifying-glass.png")}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            {this.state.seName
              ? serachedTractions.length > 0
                ? serachedTractions.map((transc, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("SingleTransDetails", {
                          transction: transc
                        })
                      }
                    >
                      <CardItem key={index} style={styles.cardHead1}>
                        <View style={styles.cardRow}>
                          <Text style={styles.heada}>{transc.name} </Text>
                          <Text style={styles.headb}>
                            {transc.soldDate}
                          </Text>
                          <Text style={styles.headc}>$ {transc.volume} </Text>
                        </View>
                      </CardItem>
                    </TouchableOpacity>
                  ))
                : null
              : this.state.filteredTransctions !== null
              ? this.state.filteredTransctions.map((transc, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("SingleTransDetails", {
                        transction: transc
                      })
                    }
                  >
                    <CardItem key={index} style={styles.cardHead1}>
                      <View style={styles.cardRow}>
                        <Text style={styles.heada}>{transc.name} </Text>
                        <Text style={styles.headb}>
                        {transc.soldDate}
                        </Text>
                        <Text style={styles.headc}>$ {transc.volume} </Text>
                      </View>
                    </CardItem>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  myDrops: {
    width: Dimensions.get("window").width / 2 - 20,
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#3f3fb9",
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#F6F6F6",
     ...Platform.select({
      ios: {
       height: 50,
       justifyContent:'center',
       alignItems:'center',
       paddingLeft:20,
      },
    }),
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#3f3fb9",
    borderWidth: 1,
    margin: 10
  },
  forms: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    color: "#3f3fb9",
    width: Dimensions.get("window").width - 55,
    fontSize: 18
  },
 

 
  cardHead1: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  cardRow: {
    flexDirection: "row",

    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#e8f1ff",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  pickerIos:{
   ...Platform.select({
      ios: {
       height: 50,
       padding:10,
      },
    }),
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

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyReport);
