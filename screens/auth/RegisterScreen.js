import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { authSignUpUser } from "../../redux/auth/authOperations";

// import { SvgXml } from "react-native-svg";
// const addNewPostIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" width="354" height="213" viewBox="0 0 354 212.4">
//   <path  d="M-.64 113.55c2.44 41.18 28.74 70.26 55.56 83.8 19.99 10.09 34.23 10.68 58.86 10.68 45.61 0 93.79.54 139.04-.01 21.84-.27 38.18-6.15 53.32-15.64 57.07-35.78 63.54-118.19 12.02-161.92-24.83-21.08-45.64-24.68-79.75-24.68-45.5 0-93.94-.57-139.04.02-27.38.36-56.47 12.9-72.39 31.48-5.88 6.86-10.11 11.32-14.84 20.05-8.65 16-14.08 34.31-12.78 56.22zm174.39 26.25v-30.61h-30.61v-4.82h30.61V73.76h4.82v30.61h30.61v4.82h-30.61v30.61h-4.82z" style="fill:#ff6c00"/>
//   </svg>
// `;

const initialState = {
  email: "",
  password: "",
  nickname: "",
};

export const RegisterScreen = ({ navigation }) => {
  // const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const [state, setState] = useState(initialState);
  // const [nickName, setNickName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const nameHandler = (text) => setNickName(text);
  // const emailHandler = (text) => setEmail(text);
  // const passwordHandler = (text) => setPassword(text);

  const dispatch = useDispatch();

  const [isFocus, setIsFocus] = useState({
    nickname: false,
    email: false,
    password: false,
  });
  // const [isFocusNickName, setIsFocusNickName] = useState(false);
  // const [isFocusEmail, setIsFocusEmail] = useState(false);
  // const [isFocusPassword, setIsFocusPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    // setIsKeyboardShow(false);
    Keyboard.dismiss();
  };
  const handleSubmit = () => {
    // setIsKeyboardShow(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));
    // dispatch(authSignUpUser({ nickName, email, password }));

    setState(initialState);
    // setNickName("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        onLayout={onLayoutRootView}
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : -100}
      >
        <ImageBackground
          source={require("../../assets/images/Photo_BG.png")}
          style={styles.image}
        >
          <View style={styles.back}>
            <View style={styles.backAvatar}>
              <AntDesign
                style={[styles.backIcon, styles.backIconPlus]}
                name="pluscircleo"
                size={26}
                color="black"
              />
              <AntDesign
                style={[styles.backIcon, styles.backIconClose]}
                name="closecircleo"
                size={26}
                color="black"
              />
            </View>

            <Text style={styles.textTitle}>Регистрация</Text>

            <View style={styles.form}>
              <TextInput
                value={state.nickname}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, nickname: value }))
                }
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isFocus.nickname ? `#FF6C00` : `#E8E8E8`,
                }}
                // onFocus={() => setIsKeyboardShow(true)}
                onFocus={() => setIsFocus({ ...isFocus, nickname: true })}
                onBlur={() => setIsFocus({ ...isFocus, nickname: false })}
              />
              <TextInput
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isFocus.email ? `#FF6C00` : `#E8E8E8`,
                }}
                // onFocus={() => setIsKeyboardShow(true)}
                onFocus={() => setIsFocus({ ...isFocus, email: true })}
                onBlur={() => setIsFocus({ ...isFocus, email: false })}
              />
              <TextInput
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={true}
                style={{
                  ...styles.input,
                  borderColor: isFocus.password ? `#FF6C00` : `#E8E8E8`,
                }}
                // onFocus={() => setIsKeyboardShow(true)}
                onFocus={() => setIsFocus({ ...isFocus, password: true })}
                onBlur={() => setIsFocus({ ...isFocus, password: false })}
              />

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={handleSubmit}
                // onPress={() => navigation.navigate("PostsScreen")}
              >
                <Text style={styles.btnTitle}>Зареєструватись</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.7}
              >
                <Text style={styles.textRegistration}>
                  Вже є обліковий запис?{" "}
                  <Text style={(styles.textRegistration, styles.textAction)}>
                    Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    justifyContent: "flex-end",
    alignItems: "center",
  },
  back: {
    position: "relative",
    width: "100%",
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backAvatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // marginTop: -60,
  },

  backIcon: {
    position: "absolute",
    right: -13,
    bottom: 16,
  },
  backIconPlus: {
    color: "#FF6C00",
  },
  backIconClose: {
    color: "#F6F6F6",
    bottom: 42,
  },

  textTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 92,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    marginBottom: 16,
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 30,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textRegistration: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textAction: {
    color: "#053f82",
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginBottom: 45,
    alignItems: "center",
  },
});
