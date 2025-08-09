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
  Switch,
  Modal,
  Pressable,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TripScreen() {
  const [token, setToken] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedTripDetails, setSelectedTripDetails] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // Modal visibility states
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [menuVisibleIndex, setMenuVisibleIndex] = useState(null); // To toggle 3-dot menu per trip

  // Form states for Add and Update trip
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Trip being edited (for update)
  const [tripToEdit, setTripToEdit] = useState(null);

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (!savedToken) {
        Alert.alert("Error", "No login token found. Please login.");
        return;
      }
      setToken(savedToken);
      fetchTrips(savedToken);
    })();
  }, []);

  const fetchTrips = async (authToken) => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.75:3000/api/trips", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();

      if (Array.isArray(data)) setTrips(data);
      else if (data.trips && Array.isArray(data.trips)) setTrips(data.trips);
      else if (data.trip) setTrips([data.trip]);
      else setTrips([]);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch trips.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTripDetails = async (tripId) => {
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    try {
      setLoadingPlan(true);
      const res = await fetch(`http://192.168.1.75:3000/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.trip) {
        setSelectedTripDetails(data.trip);
      } else {
        Alert.alert("Error", "Failed to fetch trip details.");
        setSelectedTripDetails(null);
      }
    } catch (err) {
      Alert.alert("Error", "Network error while fetching trip details.");
      setSelectedTripDetails(null);
    } finally {
      setLoadingPlan(false);
    }
  };

  // --- ADD TRIP ---
  const handleAddTrip = async () => {
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    if (!tripName || !location || !startDate || !endDate) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    const tripObj = {
      trip_name: tripName,
      location,
      start_date: startDate,
      end_date: endDate,
      notes,
      is_completed: isCompleted,
    };
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.75:3000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tripObj),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Trip added successfully!");
        await fetchTrips(token);
        setModalAddVisible(false);
        clearForm();
      } else {
        Alert.alert("Error", data.message || "Failed to add trip.");
      }
    } catch (err) {
      Alert.alert("Error", "Network error or invalid data.");
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATE TRIP ---
  const openUpdateModal = (trip) => {
    setTripToEdit(trip);
    setTripName(trip.trip_name);
    setLocation(trip.location);
    setStartDate(trip.start_date);
    setEndDate(trip.end_date);
    setNotes(trip.notes || "");
    setIsCompleted(trip.is_completed);
    setModalUpdateVisible(true);
    setMenuVisibleIndex(null); // close menu
  };

  const handleUpdateTrip = async () => {
    if (!token || !tripToEdit) {
      Alert.alert("Error", "No token or trip selected.");
      return;
    }
    if (!tripName || !location || !startDate || !endDate) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    const updatedTrip = {
      trip_name: tripName,
      location,
      start_date: startDate,
      end_date: endDate,
      notes,
      is_completed: isCompleted,
    };
    try {
      setLoading(true);
      const res = await fetch(
        `http://192.168.1.75:3000/api/trips/${tripToEdit.trip_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTrip),
        }
      );
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Trip updated successfully!");
        await fetchTrips(token);
        setModalUpdateVisible(false);
        clearForm();
        setTripToEdit(null);
      } else {
        Alert.alert("Error", data.message || "Failed to update trip.");
      }
    } catch (err) {
      Alert.alert("Error", "Network error or invalid data.");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE TRIP ---
  const handleDeleteTrip = (tripId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this trip?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTrip(tripId),
        },
      ]
    );
    setMenuVisibleIndex(null);
  };

  const deleteTrip = async (tripId) => {
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`http://192.168.1.75:3000/api/trips/${tripId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Deleted", "Trip deleted successfully.");
        await fetchTrips(token);
        if (selectedTripDetails?.trip_id === tripId) setSelectedTripDetails(null);
      } else {
        Alert.alert("Error", data.message || "Failed to delete trip.");
      }
    } catch (err) {
      Alert.alert("Error", "Network error or invalid data.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to clear forms
  const clearForm = () => {
    setTripName("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setNotes("");
    setIsCompleted(false);
  };

  return (
    
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />
      {/* Header */}
      <View style={tw`flex-row justify-between items-center px-5 py-4 mt-10 bg-green-500`}>
         
        <Text style={tw`text-2xl font-bold text-gray-900`}>My Trips</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-5 pt-5`}>
          {loading && trips.length === 0 ? (
            <ActivityIndicator size="large" color="#1257ce" />
          ) : trips.length === 0 ? (
            <Text style={tw`text-center text-gray-400 mt-10`}>No trips yet.</Text>
          ) : (
            <View style={tw`flex-row flex-wrap justify-between`}>
              {trips.map((trip, i) => (
                <View
                  key={i}
                  style={tw`bg-white rounded-2xl shadow-sm mb-4 w-[48%] overflow-hidden relative`}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => fetchTripDetails(trip.trip_id)}
                  >
                    <Image
                      source={require("D:/travel_planner/assets/nepal.jpg")}
                      style={tw`w-full h-20`}
                      resizeMode="cover"
                    />
                    <View style={tw`p-3`}>
                      <Text style={tw`text-sm font-semibold text-gray-900`}>
                        {trip.trip_name}
                      </Text>
                      <Text style={tw`text-xs text-gray-500`}>{trip.location}</Text>
                      <Text style={tw`text-xs text-gray-400 mt-1`}>
                        {trip.start_date} - {trip.end_date}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* 3-dot menu button */}
                  <TouchableOpacity
                    style={tw`absolute bottom-18 right-1 p-1 z-50`}
                    onPress={() =>
                      setMenuVisibleIndex(menuVisibleIndex === i ? null : i)
                    }
                  >
                    <Ionicons name="ellipsis-vertical" size={20} color="#ba232dff" />
                  </TouchableOpacity>

                  {/* Menu Dropdown */}
                  {menuVisibleIndex === i && (
                    <View
                      style={[
                        tw`absolute top-10 right-3 bg-white rounded shadow-lg py-1 z-50`,
                        { width: 120 },
                      ]}
                    >
                      <Pressable
                        onPress={() => openUpdateModal(trip)}
                        style={tw`px-4 py-2`}
                      >
                        <Text style={tw`text-gray-700`}>Update</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => handleDeleteTrip(trip.trip_id)}
                        style={tw`px-4 py-2`}
                      >
                        <Text style={tw`text-red-600`}>Delete</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Upcoming Trip Plan Section */}
          {loadingPlan && (
            <ActivityIndicator size="large" color="#020d20ff" style={tw`mt-5 `} />
          )}

          {selectedTripDetails && !loadingPlan && (
            <View style={tw`px-5 pt-6 pb-5 bg-white rounded-2xl `}>
              <Text
                style={tw`text-xs font-bold text-gray-500 mb-4 tracking-wider`}
              >
                 TRIP PLAN
              </Text>

              <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>
                {selectedTripDetails.trip_name}
              </Text>

              <View style={tw`mb-6`}>
                <Text style={tw`text-gray-700`}>
                  Location: {selectedTripDetails.location}
                </Text>
                <Text style={tw`text-gray-700`}>
                  Dates: {selectedTripDetails.start_date} -{" "}
                  {selectedTripDetails.end_date}
                </Text>
                <Text style={tw`text-gray-700 mb-2`}>
                  Notes: {selectedTripDetails.notes || "None"}
                </Text>
                <Text
                  style={tw`text-sm font-semibold px-2 py-1 rounded-full ${
                    selectedTripDetails.is_completed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedTripDetails.is_completed ? "Completed" : "Upcoming"}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Trip Button */}
      <View style={tw`absolute bottom-10 right-6`}>
        <TouchableOpacity
          style={tw`items-center bg-blue-500 p-3 rounded-full shadow-lg`}
          onPress={() => {
            clearForm();
            setModalAddVisible(true);
            setMenuVisibleIndex(null);
          }}
        >
          <Ionicons name="add-circle-sharp" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Add Trip Modal */}
      <Modal visible={modalAddVisible} animationType="slide" transparent>
        <View style={tw`flex-1 bg-black/40 justify-center`}>
          <ScrollView
            style={tw`bg-white mx-5 p-5 rounded-2xl max-h-[90%]`}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={tw`text-lg font-bold mb-4`}>Add New Trip</Text>

            <Text style={tw`font-semibold mb-1`}>Trip Name*</Text>
            <TextInput
              placeholder="Trip Name"
              value={tripName}
              onChangeText={setTripName}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>Location*</Text>
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>Start Date* (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="2024-07-01"
              value={startDate}
              onChangeText={setStartDate}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>End Date* (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="2024-07-10"
              value={endDate}
              onChangeText={setEndDate}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>Notes</Text>
            <TextInput
              placeholder="Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              style={[tw`border p-2 mb-3 rounded`, { height: 80, textAlignVertical: "top" }]}
            />

            <View style={tw`flex-row items-center mb-3`}>
              <Text style={tw`font-semibold mr-3`}>Completed</Text>
              <Switch
                value={isCompleted}
                onValueChange={setIsCompleted}
                thumbColor={isCompleted ? "#34D399" : "#E5E7EB"}
                trackColor={{ false: "#D1D5DB", true: "#A7F3D0" }}
              />
            </View>

            <TouchableOpacity
              onPress={handleAddTrip}
              style={tw`bg-blue-500 p-3 rounded mb-2`}
            >
              <Text style={tw`text-white text-center font-bold`}>Save Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalAddVisible(false)}>
              <Text style={tw`text-center text-gray-500`}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Update Trip Modal */}
      <Modal visible={modalUpdateVisible} animationType="slide" transparent>
        <View style={tw`flex-1 bg-black/40 justify-center`}>
          <ScrollView
            style={tw`bg-white mx-5 p-5 rounded-2xl max-h-[90%]`}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={tw`text-lg font-bold mb-4`}>Update Trip</Text>

            <Text style={tw`font-semibold mb-1`}>Trip Name*</Text>
            <TextInput
              placeholder="Trip Name"
              value={tripName}
              onChangeText={setTripName}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>Location*</Text>
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>Start Date* (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="2024-07-01"
              value={startDate}
              onChangeText={setStartDate}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>End Date* (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="2024-07-10"
              value={endDate}
              onChangeText={setEndDate}
              style={tw`border p-2 mb-3 rounded`}
            />

            <Text style={tw`font-semibold mb-1`}>Notes</Text>
            <TextInput
              placeholder="Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              style={[tw`border p-2 mb-3 rounded`, { height: 80, textAlignVertical: "top" }]}
            />

            <View style={tw`flex-row items-center mb-3`}>
              <Text style={tw`font-semibold mr-3`}>Completed</Text>
              <Switch
                value={isCompleted}
                onValueChange={setIsCompleted}
                thumbColor={isCompleted ? "#34D399" : "#E5E7EB"}
                trackColor={{ false: "#D1D5DB", true: "#A7F3D0" }}
              />
            </View>

            <TouchableOpacity
              onPress={handleUpdateTrip}
              style={tw`bg-green-600 p-3 rounded mb-2`}
            >
              <Text style={tw`text-white text-center font-bold`}>Update Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalUpdateVisible(false);
                clearForm();
                setTripToEdit(null);
              }}
            >
              <Text style={tw`text-center text-gray-500`}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
