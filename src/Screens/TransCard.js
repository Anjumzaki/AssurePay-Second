import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {  Card, CardItem,  } from "native-base";
import axios from "axios";

export default class TransCard extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      userName: "",
      Password: "",
      msg: "",
      delLoading: false,
      editLoading: false
    };
    this.trDelete = this.trDelete.bind(this)
  }
  trDelete = (navigation) => {
    Alert.alert(
      "Actions",
      "Are you sure you want to delete permanently ",
      [
        {
          text: "No",
          style: "cancel",
          onPress:() => this.setState({delLoading:false})
        },
        {
          text: "Yes",
          onPress: () => this.deleteTrans(navigation)
        }
      ],
      { cancelable: true }
    );
  };
  deleteTrans = (navigation) => {
    this.setState({
      deleteTrans: false
    });
    axios
      .post(
        "https://intense-harbor-45607.herokuapp.com/delete/trasc/" +
          this.props.transc._id
      )
      .then(res => alert("Succesfully Deleted")).then(
        navigation.navigate('MonthlyReport')
      )
  };
  render() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
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
    const saleDate =this.props.transc.soldDate;
    const PayDate =new Date(this.props.transc.payDate);
    var pay = PayDate.getFullYear() + "-" + (PayDate.getMonth()+1) +"-" + PayDate.getDate() 
   
    return (
      <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
        <CardItem style={styles.cardHead1}>
          <View>
            <Text style={styles.head}>Sold Date: </Text>
            <Text style={styles.head1}>
           {saleDate}
            </Text>
          </View>
          <View>
            <Text style={styles.head}>Pay Date: </Text>
            <Text style={styles.head1}>
             {this.props.transc.payDate.slice(0,10)}
            </Text>
          </View>
        </CardItem>
        <CardItem style={styles.cardHead}>
          <Text style={styles.head}>Name: </Text>
          <Text style={styles.head1}>{this.props.transc.name} </Text>
        </CardItem>
        <CardItem style={styles.cardHead}>
          <Text style={styles.head}>Contract # </Text>
          <Text style={styles.head1}>{this.props.transc.contact} </Text>
        </CardItem>
        <CardItem style={styles.cardHead1}>
          <View>
            <Text style={styles.head}>Volume: </Text>
            <Text style={styles.head1}>
              {" "}
              {Math.round(this.props.transc.volume)}{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.head}>Downpayment: </Text>
            <Text style={styles.head1}>
              {" "}
              {Math.round(this.props.transc.downPayment)} %
            </Text>
          </View>
          <View>
            <Text style={styles.head}>Spiff: </Text>
            <Text style={styles.head1}>
              {" "}
              $ {Math.round(this.props.transc.spiff)}{" "}
            </Text>
          </View>
        </CardItem>
        <CardItem style={styles.cardHead1}>
          <View>
            <Text style={styles.head}>Bonus: </Text>
            <Text style={styles.head1}>
              $ {Math.round(this.props.transc.bonus)}{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.head}>Commission: </Text>
            <Text style={styles.head1}>
              $ {Math.round(this.props.transc.commission)}{" "}
            </Text>
          </View>
        </CardItem>
        <CardItem style={styles.cardHead}>
          <Text style={styles.head}>Podium/Mentor/Deduction: </Text>
          <Text style={styles.head1}>
            $ {Math.round(this.props.transc.pmdDeduction)}{" "}
          </Text>
        </CardItem>
        <CardItem>
          <Text>{this.props.transc.note}</Text>
        </CardItem>
        <CardItem  style={styles.cardHead}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditTrans',{transaction:this.props.transc})} style={styles.edit}>
            <Text style={{ color: "white" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ delLoading: true }, this.trDelete(this.props.navigation))}
            style={styles.delete}
          >
            {this.state.delLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: "white" }}>Delete</Text>
            )}
          </TouchableOpacity>
        </CardItem>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  myDrops: {
    width: Dimensions.get("window").width / 3,
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#3f3fb9",
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#F6F6F6"
  },
  myDrop: {
    height: 40,
    width: "100%",
    color: "#3f3fb9"
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
    padding: 10,
    backgroundColor: "#fff",
    color: "#3f3fb9",
    width:
      Dimensions.get("window").width - Dimensions.get("window").width / 3 - 75,
    fontSize: 18
  },
  head: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "center"
  },

  cardHead: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardHead1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  head1: {
    color: "#3f3fb9",
    fontSize: 19
  },
  edit: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#3f3fb9",
    borderRadius: 10
  },
  delete: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ff1358",
    borderRadius: 10
  }
});
