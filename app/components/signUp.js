import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native"
import tw from "twrnc"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router";
export default function SignupForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
const router = useRouter()
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch(`http://192.168.1.75:3000/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error === "User already registered") {
          Alert.alert("Error", "This email is already registered. Please login.")
        } else {
          throw new Error(data.error || "Something went wrong")
        }
        return
      }

      Alert.alert("Success", data.message || "Signup successful!")
      router.push("components/login")
      // You can reset form or navigate somewhere here if needed
    } catch (err) {
      Alert.alert("Error", err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar backgroundColor="#6488EA" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-[#6488EA] pt-12 pb-8 px-6 rounded-b-[40px]`}>
        <Text style={tw`text-white text-3xl font-bold`}>Create Your</Text>
        <Text style={tw`text-white text-3xl font-bold mt-1`}>Account</Text>
      </View>

      {/* Form */}
      <ScrollView style={tw`px-6 pt-8 flex-1`}>
        {/* Full Name */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-rose-800 mb-1`}>Full Name</Text>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={tw`flex-1 text-gray-700`}
              placeholder="Example: Jane Doe"
            />
          </View>
        </View>

        {/* Email */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-rose-800 mb-1`}>Email</Text>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={tw`flex-1 text-gray-700`}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="example@gmail.com"
            />
          </View>
        </View>

        {/* Password */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-rose-800 mb-1`}>Password</Text>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={tw`flex-1 text-gray-700`}
              secureTextEntry={!showPassword}
              placeholder="Enter password"
              
            />
              
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#6488EA"
              />
            </TouchableOpacity>
          </View>
          {password.length > 0 && password.length < 8 && (
    <Text style={tw`text-red-500 mt-1`}>Password must be at least 8 characters long</Text>
  )}
        </View>

        {/* Confirm Password */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-rose-800 mb-1`}>Confirm Password</Text>
          <View style={tw`flex-row items-center border-b border-gray-300 pb-2`}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={tw`flex-1 text-gray-700`}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm password"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#9f1239"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSignup}
          disabled={isSubmitting}
          style={tw`bg-[#6488EA] py-3.5 rounded-full items-center justify-center mb-8`}
        >
          <Text style={tw`text-white font-bold text-base`}>
            {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
