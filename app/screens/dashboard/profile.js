import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
  StatusBar,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function ProfileScreen() {
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modal for editing profile
  const [modalEditVisible, setModalEditVisible] = useState(false);
  
  // Form states for editing profile
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBio, setEditBio] = useState("");
const router = useRouter()
  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (!savedToken) {
        Alert.alert("Error", "No login token found. Please login.");
        return;
      }
      setToken(savedToken);
      fetchUserProfile(savedToken);
    })();
  }, []);

  const fetchUserProfile = async (authToken) => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.75:3000/api/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      
      if (data.success && data.user) {
        setUserProfile(data.user);
        // Set form values for editing
        setEditName(data.user.name || "");
        setEditEmail(data.user.email || "");
        setEditPhone(data.user.phone || "");
        setEditBio(data.user.bio || "");
      } else {
        Alert.alert("Error", "Failed to fetch profile data.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch profile data.");
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    
    if (!editName || !editEmail) {
      Alert.alert("Error", "Name and email are required.");
      return;
    }

    const profileObj = {
      name: editName,
      email: editEmail,
      phone: editPhone,
      bio: editBio,
    };

    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.75:3000//api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileObj),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        setUserProfile({ ...userProfile, ...profileObj });
        setModalEditVisible(false);
      } else {
        Alert.alert("Error", data.message || "Failed to update profile.");
      }
    } catch (err) {
      Alert.alert("Error", "Network error or invalid data.");
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            // Navigate to login screen or reset app state\
            router.push("components/login")
            Alert.alert("Success", "Logged out successfully!");
            
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    if (!token) return;
    setRefreshing(true);
    await fetchUserProfile(token);
    setRefreshing(false);
  };

  if (loading && !userProfile) {
    return (
      <SafeAreaView style={tw`flex-1 bg-gray-50 justify-center items-center`}>
        <ActivityIndicator size="large" color="#1257ce" />
        <Text style={tw`mt-4 text-gray-600`}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />
      
      {/* Header */}
      <View style={tw`bg-green-500 px-5 py-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          
          <Text style={tw`mt-10 text-xl font-bold text-white`}>Profile</Text>
          <TouchableOpacity onPress={() => setModalEditVisible(true)} style={tw`mt-10`}>
            
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={tw`flex-1`} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {userProfile && (
          <>
            {/* Profile Header */}
            <View style={tw`bg-white px-5 py-8 items-center`}>
              <View style={tw`relative mb-4`}>
                <Image
                  source={
                    userProfile.profile_picture
                      ? { uri: userProfile.profile_picture }
                      : require("D:/travel_planner/assets/avatar.webp")
                  }
                  style={tw`w-24 h-24 rounded-full`}
                  defaultSource={require("D:/travel_planner/assets/avatar.webp")}
                />
                <TouchableOpacity 
                  style={tw`absolute bottom-0 right-0 bg-blue-600 rounded-full p-2`}
                >
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text style={tw`text-2xl font-bold text-gray-900 mb-1`}>
                {userProfile.name || "User Name"}
              </Text>
              <Text style={tw`text-gray-500 mb-2`}>
                {userProfile.email || "user@example.com"}
              </Text>
              {userProfile.bio && (
                <Text style={tw`text-gray-600 text-center px-4`}>
                  {userProfile.bio}
                </Text>
              )}
            </View>

            {/* Profile Details */}
            <View style={tw`bg-white mt-4 mx-4 rounded-xl shadow-sm`}>
              <Text style={tw`text-lg font-bold text-gray-900 p-4 pb-2`}>
                Personal Information
              </Text>
              
              <View style={tw`px-4 pb-4`}>
                <View style={tw`flex-row items-center py-3 border-b border-gray-100`}>
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <View style={tw`ml-3 flex-1`}>
                    <Text style={tw`text-sm text-gray-500`}>Full Name</Text>
                    <Text style={tw`text-base text-gray-900`}>
                      {userProfile.name || "Not provided"}
                    </Text>
                  </View>
                </View>

                <View style={tw`flex-row items-center py-3 border-b border-gray-100`}>
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <View style={tw`ml-3 flex-1`}>
                    <Text style={tw`text-sm text-gray-500`}>Email</Text>
                    <Text style={tw`text-base text-gray-900`}>
                      {userProfile.email || "Not provided"}
                    </Text>
                  </View>
                </View>

                <View style={tw`flex-row items-center py-3 border-b border-gray-100`}>
                  <Ionicons name="call-outline" size={20} color="#6B7280" />
                  <View style={tw`ml-3 flex-1`}>
                    <Text style={tw`text-sm text-gray-500`}>Phone</Text>
                    <Text style={tw`text-base text-gray-900`}>
                      {userProfile.phone || "Not provided"}
                    </Text>
                  </View>
                </View>

                <View style={tw`flex-row items-center py-3`}>
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                  <View style={tw`ml-3 flex-1`}>
                    <Text style={tw`text-sm text-gray-500`}>Member Since</Text>
                    <Text style={tw`text-base text-gray-900`}>
                      {userProfile.created_at 
                        ? new Date(userProfile.created_at).toLocaleDateString()
                        : "Not available"
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>

           
              

            {/* Settings */}
            <View style={tw`bg-white mt-4 mx-4 rounded-xl shadow-sm mb-8`}>
              <Text style={tw`text-lg font-bold text-gray-900 p-4 pb-2`}>
                Settings
              </Text>
              
              <TouchableOpacity style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}>
                <Ionicons name="notifications-outline" size={20} color="#6B7280" />
                <Text style={tw`ml-3 flex-1 text-base text-gray-900`}>Notifications</Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}>
                <Ionicons name="shield-outline" size={20} color="#6B7280" />
                <Text style={tw`ml-3 flex-1 text-base text-gray-900`}>Privacy</Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}>
                <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
                <Text style={tw`ml-3 flex-1 text-base text-gray-900`}>Help & Support</Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={tw`flex-row items-center px-4 py-3`}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                <Text style={tw`ml-3 flex-1 text-base text-red-500`}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={modalEditVisible} animationType="slide" transparent>
        <View style={tw`flex-1 bg-black/40 justify-center`}>
          <ScrollView
            style={tw`bg-white mx-5 p-5 rounded-2xl max-h-[90%]`}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={tw`text-lg font-bold mb-4`}>Edit Profile</Text>
            
            <Text style={tw`font-semibold mb-1`}>Full Name*</Text>
            <TextInput
              placeholder="Enter your full name"
              value={editName}
              onChangeText={setEditName}
              style={tw`border border-gray-300 p-3 mb-3 rounded-lg`}
            />
            
            <Text style={tw`font-semibold mb-1`}>Email*</Text>
            <TextInput
              placeholder="Enter your email"
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              style={tw`border border-gray-300 p-3 mb-3 rounded-lg`}
            />
            
            <Text style={tw`font-semibold mb-1`}>Phone</Text>
            <TextInput
              placeholder="Enter your phone number"
              value={editPhone}
              onChangeText={setEditPhone}
              keyboardType="phone-pad"
              style={tw`border border-gray-300 p-3 mb-3 rounded-lg`}
            />
            
            <Text style={tw`font-semibold mb-1`}>Bio</Text>
            <TextInput
              placeholder="Tell us about yourself"
              value={editBio}
              onChangeText={setEditBio}
              multiline
              numberOfLines={4}
              style={[
                tw`border border-gray-300 p-3 mb-4 rounded-lg`,
                { height: 100, textAlignVertical: "top" }
              ]}
            />
            
            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={tw`bg-blue-600 p-4 rounded-lg mb-3`}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white text-center font-bold text-base`}>
                  Update Profile
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setModalEditVisible(false)}>
              <Text style={tw`text-center text-gray-500 text-base`}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}