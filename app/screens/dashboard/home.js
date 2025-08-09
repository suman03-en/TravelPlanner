import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
  StatusBar
} from 'react-native';
import tw from 'twrnc';

const HomeScreen = () => {
  const handleSearch = () => {
    Alert.alert('Search', 'Search functionality');
  };

  const handleCategoryPress = ( category) => {
    Alert.alert(category, `Navigate to ${category} section`);
  };

  const handleDestinationPress = (destination) => {
    Alert.alert('Destination', `Navigate to ${destination} details`);
  };

  const categories = [
    { id: 1, name: 'Hotel', icon: '🏨' },
    { id: 2, name: 'Destination', icon: '🏔️' },
    { id: 3, name: 'Food', icon: '🍽️' },
  ];

  const popularDestinations = [
    {
      id: 1,
      name: 'Pokhara',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Mustang',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Gosainkunda',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar backgroundColor="#10B981" barStyle="light-content" />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
         
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mt-8 mb-10 px-4 py-3 bg-green-500`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-lg font-semibold text-gray-800`}>📍</Text>
            <Text style={tw`text-lg font-semibold text-gray-800 ml-1`}>
              Kathmandu, Nepal
            </Text>
          </View>
          <TouchableOpacity style={tw`p-2`}>
            <Text style={tw`text-xl`}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={tw`mx-4 mb-6`}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop'
            }}
            style={tw`h-48 rounded-2xl overflow-hidden justify-end`}
            imageStyle={tw`rounded-2xl`}
          >
            <View style={tw`bg-black bg-opacity-30 p-6 rounded-2xl`}>
              <Text style={tw`text-white text-2xl font-bold mb-4`}>
                Where do you want to go?
              </Text>
              
              {/* Search Bar */}
              <TouchableOpacity
                style={tw`bg-white bg-opacity-90 rounded-xl px-4 py-3 flex-row items-center`}
                onPress={handleSearch}
              >
                <Text style={tw`text-gray-500 flex-1`}>Explore now</Text>
                <Text style={tw`text-gray-400 text-lg`}>🔍</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Category Icons */}
        <View style={tw`flex-row justify-around px-4 mb-8`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={tw`items-center`}
              onPress={() => handleCategoryPress(category.name)}
            >
              <View style={tw`w-16 h-16 bg-blue-400 rounded-full items-center justify-center mb-2`}>
                <Text style={tw`text-4xl mb-2`}>{category.icon}</Text>
              </View>
              <Text style={tw`text-gray-700 text-sm font-medium`}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Destinations */}
        <View style={tw`px-4`}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>
            Popular Destination
          </Text>
          
          <View style={tw`flex-row justify-between`}>
            {popularDestinations.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={tw`flex-1 mx-1`}
                onPress={() => handleDestinationPress(destination.name)}
              >
                <View style={tw`bg-white rounded-xl shadow-sm overflow-hidden`}>
                  <Image
                    source={{ uri: destination.image }}
                    style={tw`w-full h-24 bg-gray-200`}
                    resizeMode="cover"
                  />
                  <View style={tw`p-2`}>
                    <Text style={tw`text-gray-800 font-medium text-center text-sm`}>
                      {destination.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={tw`h-6`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;