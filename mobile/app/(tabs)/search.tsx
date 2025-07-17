import { View, Text, TextInput,ScrollView, TouchableOpacity  } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'


const SearchScreen = () => {
  const TRENDING_TOPİCS = [
    {topic: "#ReactNative",tweets: "124K"},
    {topic: "#FootBallTransfer",tweets: "344K"},
    {topic: "#DailyFashion",tweets: "116K"},
    {topic: "#FitnessNews",tweets: "312K"},
    {topic: "#SummerMusic",tweets: "875K"},
   
  ]
  return (

    <SafeAreaView className='flex-1 bg-white'>
     {/* HEADER */}
     <View className='px-4 py-3 border-b border-gray-100'>
      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-full'>
        <Feather name='search' size={20} color={'#657786'}/>
        <TextInput
        placeholder='Search Twitter'
        placeholderTextColor={'#657786'}
        className='flex-1 ml-3 text-base'/>
      </View>

      
     </View>

     <ScrollView className='p-4' showsVerticalScrollIndicator={false}>
     <Text className='text-xl text-gray-900 mb-4 font-bold'>Trending for you</Text>
     {TRENDING_TOPİCS.map((item,index) => (
      <TouchableOpacity key={index} className='py-3 border-b border-gray-100'>
       <Text className='text-sm text-gray-500'>Trending at Week</Text>
       <Text className='font-bold text-gray-900 text-lg'>{item.topic}</Text>
       <Text className='text-gray-500 text-sm'>{item.tweets} Tweets</Text>
      </TouchableOpacity>
     ))}
     </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen