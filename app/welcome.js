import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter()
  const handleSignUp = () => {
    router.push("components/signUp");
    // Navigate to sign up screen
    // navigation.navigate('SignUp');
  };

  const handleLogIn = () => {
    router.push("components/login");
    // Navigate to log in screen
    // navigation.navigate('LogIn');
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground
        source={require("D:/travel_planner/assets/Kathmandu-.jpg")}
        style={[
          tw`h-full absolute w-full`,                      // height of image
          { width: '130%', transform: [{ translateX: 0 }] }  // shift right
        ]}
        resizeMode="cover"
      > </ImageBackground>
        {/* Status Bar Content */}
        <View style={tw`flex-row justify-between items-center px-6 pt-4 pb-2`}>
         
          <View style={tw`flex-row items-center`}>
          </View>
        </View>

        {/* Main Content */}
        <View style={tw`flex-1 justify-end px-6 pb-12`}>
          {/* Welcome Text */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-white text-4xl font-bold leading-tight`}>
              Welcome to{'\n'}travel planner
            </Text>
          </View>

          {/* Buttons */}
          <View style={tw`gap-4`}>
            {/* Sign Up Button */}
            <TouchableOpacity
              style={tw`bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl py-4 px-6`}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white text-center text-lg font-semibold`}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Log In Button */}
            <TouchableOpacity
              style={tw`bg-blue-600 rounded-xl py-4 px-6`}
              onPress={handleLogIn}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white text-center text-lg font-semibold`}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
     
    </SafeAreaView>
  );
};

export default WelcomeScreen;