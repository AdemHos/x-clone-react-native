import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS,ConversationType } from '@/data/conversation'
import { Feather } from '@expo/vector-icons'

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText,setSearchText] = useState("");
  const [conversationsList,setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation,setSelectedConversation] = useState < ConversationType | null>(null)
  const [isChatOpen,setIsChatOpen] = useState(false);
  const [newMessage,setNewMessage] = useState("")

  const deleteConversation =(conversationId: number) => {
    Alert.alert("Delete Conversation","Are you sure delete concersation", [
      {text: "Cancel",style:"cancel"},
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setConversationsList((prev) => prev.filter((conv) => conv.id !== conversationId ) )
        }
      }
    ])
  }

  const openConversation = (conversation:ConversationType) => {
    setSelectedConversation(conversation)
    setIsChatOpen(true)
  }
  
  const closeChatModal = () => {
    setIsChatOpen(false)
    setSelectedConversation(null)
    setNewMessage("")
  }

  const sendMessage = () => {
    if(newMessage.trim() && selectedConversation ) {
      // Update last message in conversation
      setConversationsList(
        (prev) => 
          prev.map(
            (conv) => 
              conv.id === selectedConversation.id
            ? {...conv, lastMessage: newMessage, time: "now"}
            : conv
          )
      );
      setNewMessage("")
      Alert.alert("Message Sent!",

      )
    }`Your message has been sent to ${selectedConversation?.user.name}`
  }
  return (
    <SafeAreaView className='flex-1 bg-white' edges={["top"]}>
      {/* HEADER */}
     <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
      <Text className='text-xl font-bold text-gray-900'>Messages</Text>
      <TouchableOpacity className=''>
       <Feather name='edit' size={24} color={'#1DA1F2'}/>
      </TouchableOpacity>
     </View>

     {/* SEARCH BAR */}
     <View className='px-4 py-3 border-b border-gray-100'>
       <View className='flex-row items-center px-4 py-3 rounded-full bg-gray-100'>
        <Feather name='search' size={20} color={'#657786'}/>
        <TextInput 
        placeholder='Search people and groups'
        placeholderTextColor={'#657786'}
        className='flex-1 ml-3 text-base'
        value={searchText}
        onChangeText={setSearchText}/>
        </View>  
     </View>  

     {/* CONVERSATION LİST */}
     <ScrollView className='flex-1'
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingBottom:100+insets.bottom}}>

      {conversationsList.map(conversation => (
        <TouchableOpacity key={conversation.id}
        className='flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50'
        onPress={() => openConversation(conversation)}
        onLongPress={() =>deleteConversation(conversation.id)}>
          <Image
          source={{uri: conversation.user.avatar}}
          className='mr-3 rounded-full size-12'/>

          <View className='flex-1'>
            <View className='flex-row items-center justify-between mb-1'>
             <View className='flex-row items-center gap-1'>
               <Text className='font-semibold text-gray-900'>
              {conversation.user.name}
             </Text>
             {conversation.user.verified && (
              <Feather name='check-circle' size={16} color={'#1DA1F2'} className='ml-1'/>
             )}
             <Text className='text-sm text-gray-500 ml-1'>
               @{conversation.user.username}
             </Text>
             </View>
             <Text className='text-gray-500 text-sm'>
              {conversation.time}
             </Text>
            </View>
            <Text className='text-gray-500 text-sm' numberOfLines={1}>
              {conversation.lastMessage}
            </Text>
          </View>

        </TouchableOpacity>
      ))}

     </ScrollView >

     {/* Quick Actions */}
     <View className='px-4 py-2 border-t border-gray-100 bg-gray-50'>
      <Text className='text-xs text-gray-500 text-center'>Tap to open Long press to delete</Text>
     </View>

     {/* Modal */}
     <Modal visible={isChatOpen} animationType='slide' presentationStyle='pageSheet'>
      {selectedConversation && (
        <SafeAreaView className='flex-1'>
        {/* Chat Header */}
        <View className='flex-row items-center px-4 py-3 border-b border-gray-100'>
         <TouchableOpacity className='mr-3 ' onPress={closeChatModal}>
          <Feather name='arrow-left' size={24} color={'#1DA1F2'}/>

         </TouchableOpacity>
         <Image source={{uri:selectedConversation.user.avatar}} className='rounded-full size-10 mr-3'/>
         <View className='flex-1'>
          <View className='flex-row items-center '>
           <Text className='font-semibold text-gray-900 mr-1'>
            {selectedConversation.user.name}
           </Text>
           {selectedConversation.user.verified && (
            <Feather size={16} name='check-circle' color={'#1DA1F2'}/>
           )}
          </View>
         </View>
        </View>

        {/* Chat Messages Area */}
        <ScrollView className='flex-1 px-4 py-4'>
         <View className='mb-4'>
         <Text className='text-gray-400 text-center text-sm mb-4'>
          This is the begining of your conversation with {selectedConversation.user.name}
         </Text>

         {/* Conversation Messages */}
         {selectedConversation.messages.map((message) => (
          <View key={message.id}
          className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}>
           {!message.fromUser && (
            <Image source={{uri:selectedConversation.user.avatar}}
            className='size-8 rounded-full mr-2'/>
           )}
           <View className={`flex-1 ${message.fromUser ? "items-end" : ""}`}>
             <View className={`rounded-2xl px-4 py-3 max-w-xs 
              ${message.fromUser ? "bg-blue-500":"bg-gray-100"}`}>
               <Text className={message.fromUser ? "text-white": "text-gray-900"}>
                {message.text}
               </Text>
             </View>
             <Text className='text-xs text-gray-400 mt-1'>
              {message.time}
             </Text>
           </View>
          </View>
         ))}
         </View>
        </ScrollView>

        {/* Message Input */}
        <View className='flex-row items-center gap-4 px-4 py-3 border-t border-gray-100'>
         <View className='flex-1 flex-row items-center px-4 py-2 bg-gray-100 rounded-2xl '>
          <TextInput
          className='flex-1 text-base'
          placeholder='Start a Message'
          placeholderTextColor={"#657786"}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline/>
         </View>
         <TouchableOpacity className={`size-10 items-center justify-center rounded-full ${
          newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
         }`}
         onPress={sendMessage}
         disabled={!newMessage.trim()}>
          <Feather name='send' size={20} color={"white"}/>

         </TouchableOpacity>
        </View>

        </SafeAreaView>
      )} 
     </Modal>

    </SafeAreaView>
  )
}

export default MessagesScreen