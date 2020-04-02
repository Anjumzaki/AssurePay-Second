import React, { Component } from "react";
import { Alert, Text, View } from "react-native";

import CodeInput from "react-native-confirmation-code-field";

export default class Confirmation extends Component {
  render() {
    /*concept : https://dribbble.com/shots/3246445-OTP-Screen-2-0*/
    return (
      <CodeInput
        cellProps={{
          style: {
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
            backgroundColor: "white"
          }
        }}
        inputPosition={"full-width"}
        codeLength={5}
        inactiveColor={"#ADADAD"}
        space={16}
        size={60}
        activeColor={"#ADADAD"}
      />
    );
  }
}
