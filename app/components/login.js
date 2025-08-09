"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Modal, ActivityIndicator } from "react-native"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"
import SignupForm from "D:/travel_planner/app/components/signUp.js"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const handleLogin = async () => {
    setIsSubmitting(true)

    try {
      const res = await fetch(`http://192.168.1.75:3000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }
      await AsyncStorage.setItem("token", data.token)
      alert(data.message || "Login successful!")
      router.push("screens/dashboard/home")
    } catch (err) {
      alert(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignupSuccess = () => {
    setShowSignupModal(false)
  }

  return (
    <ScrollView style={tw`flex-1 bg-white`} contentContainerStyle={tw`flex-grow`}>
      <StatusBar backgroundColor="#6488EA" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-[#6488EA] pt-12 pb-8 px-6 rounded-b-[40px]`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-white text-3xl font-bold`}>Welcome</Text>
        </View>
        <Text style={tw`text-white text-3xl font-bold mt-1`}>Login!</Text>
      </View>

      {/* Form */}
      <View style={tw`px-6 pt-8 flex-1`}>
        {/* Email Field */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-rose-800  mb-1`}>Email</Text>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={tw`flex-1 text-gray-700`}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="example@gmail.com"
            />
           
          </View>
        </View>

        {/* Password Field */}
        <View style={tw`mb-1`}>
          <Text style={tw`text-rose-800 font-medium mb-1`}>Password</Text>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={tw`flex-1 text-gray-700`}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6488EA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <View style={tw`items-end mb-8`}>
          <TouchableOpacity>
            <Text style={tw`text-gray-500 text-sm`}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={tw`bg-[#6488EA] py-3.5 rounded-full items-center justify-center mb-8`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-white font-bold text-base`}>LOGIN </Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={tw`flex-row justify-center items-center mt-auto mb-8`}>
          <Text style={tw`text-gray-500`}>Don't have account? </Text>
          <TouchableOpacity onPress={() => setShowSignupModal(true)}>
            <Text style={tw`text-rose-800  `}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Up Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSignupModal}
        onRequestClose={() => setShowSignupModal(false)}
      >
        <SignupForm onClose={() => setShowSignupModal(false)} onSignupSuccess={handleSignupSuccess} />
      </Modal>
    </ScrollView>
  )
}
