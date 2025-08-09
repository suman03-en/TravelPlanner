import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DocumentScreen() {
  // Use fixed trip_id here for standalone usage
  const trip_id = 1;

  const [token, setToken] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalAddVisible, setModalAddVisible] = useState(false);

  // Form states for adding document
  const [documentType, setDocumentType] = useState("");
  const [status, setStatus] = useState("Valid");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (!savedToken) {
        Alert.alert("Error", "No login token found. Please login.");
        return;
      }
      setToken(savedToken);
      fetchDocuments(savedToken);
    })();
  }, []);

  const fetchDocuments = async (authToken) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://192.168.1.75:3000/api/trips/${trip_id}/documents`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setDocuments(data);
      } else if (data.documents && Array.isArray(data.documents)) {
        setDocuments(data.documents);
      } else {
        setDocuments([]);
        Alert.alert("Notice", "No documents found for this trip.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch documents.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = async () => {
    if (!token) {
      Alert.alert("Error", "No token found.");
      return;
    }
    if (!documentType || !status) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const documentObj = {
      document_type: documentType,
      status: status,
      expiry_date: expiryDate,
    };

    try {
      setLoading(true);
      const res = await fetch(
        `http://192.168.1.75:3000/api/trips/${trip_id}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(documentObj),
        }
      );
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Document added successfully!");
        setDocuments((prev) => [...prev, data.document]);
        setModalAddVisible(false);
        setDocumentType("");
        setStatus("Valid");
        setExpiryDate("");
      } else {
        Alert.alert("Error", data.message || "Failed to add document.");
      }
    } catch (err) {
      Alert.alert("Error", "Network error or invalid data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.document_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-500 px-5 py-6`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          
          <Text style={tw`text-xl font-bold text-white  mt-10`}>Documents</Text>
         
        </View>

       
      </View>

      {/* Document List */}
      <ScrollView
        style={tw`flex-1 px-4 pt-4`}
        showsVerticalScrollIndicator={false}
      >
        {loading && documents.length === 0 ? (
          <ActivityIndicator size="large" color="#10B981" style={tw`mt-10`} />
        ) : filteredDocuments.length === 0 ? (
          <Text style={tw`text-center text-gray-400 mt-10`}>
            {searchQuery ? "No documents found." : "No documents yet."}
          </Text>
        ) : (
          filteredDocuments.map((document, index) => (
            <View
              key={index}
              style={tw`bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-sm`}
            >
              <View
                style={[
                  tw`w-12 h-12 rounded-xl items-center justify-center mr-4`,
                  { backgroundColor: ["#10B981", "#06B6D4", "#8B5CF6"][index % 3] },
                ]}
              >
                <Ionicons name="document-text" size={24} color="white" />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                  {document.document_type || "Unknown Document"}
                </Text>
                <Text style={tw`text-sm text-gray-500`}>
                  Status: {document.status || "N/A"}
                </Text>
                {document.expiry_date && (
                  <Text style={tw`text-xs text-gray-400 mt-1`}>
                    Expires: {document.expiry_date}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Document Button */}
      <View style={tw`absolute bottom-8 right-6`}>
        <TouchableOpacity
          style={tw`w-14 h-14 bg-green-500 rounded-full items-center justify-center shadow-lg`}
          onPress={() => setModalAddVisible(true)}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Add Document Modal */}
      <Modal visible={modalAddVisible} animationType="slide" transparent>
        <View style={tw`flex-1 bg-black/40 justify-center`}>
          <ScrollView
            style={tw`bg-white mx-5 p-5 rounded-2xl max-h-[90%]`}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={tw`text-lg font-bold mb-4`}>Add New Document</Text>

            <Text style={tw`font-semibold mb-1`}>Document Type*</Text>
            <TextInput
              placeholder="e.g., Passport, Driving License"
              value={documentType}
              onChangeText={setDocumentType}
              style={tw`border border-gray-300 p-3 mb-3 rounded-lg`}
            />

            <Text style={tw`font-semibold mb-1`}>Status*</Text>
            <TextInput
              placeholder="Valid, Expired, etc."
              value={status}
              onChangeText={setStatus}
              style={tw`border border-gray-300 p-3 mb-3 rounded-lg`}
            />

            <Text style={tw`font-semibold mb-1`}>Expiry Date (optional)</Text>
            <TextInput
              placeholder="MM/YYYY"
              value={expiryDate}
              onChangeText={setExpiryDate}
              style={tw`border border-gray-300 p-3 mb-4 rounded-lg`}
            />

            <TouchableOpacity
              onPress={handleAddDocument}
              style={tw`bg-green-500 p-4 rounded-lg mb-3`}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white text-center font-bold text-base`}>
                  Save Document
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalAddVisible(false)}>
              <Text style={tw`text-center text-gray-500 text-base`}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
