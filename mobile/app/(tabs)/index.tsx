import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '../conponents/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'

const HomeScreen = () => {
  useUserSync()
  return (
    <SafeAreaView className='flex-'>
      <Text>Home Screen</Text>
      <SignOutButton/>
    </SafeAreaView>
  )
}

export default HomeScreen