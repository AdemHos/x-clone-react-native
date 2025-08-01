import { Text, View,Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function Index() {
 const {isLoading,handleSocialAuth} = useSocialAuth()
  return (
    <View
    className="flex-1 bg-white"
    >
      <View className="flex-1 px-8 justify-between">
       <View className="flex-1 justify-center">
        {/* IMAGE */}
        <View className="items-center">
         <Image source={require("../../assets/images/auth2.png")}
         className="size-96"
         resizeMode="contain"/>
        </View>

        {/* BUTTONS */}
        <View className="flex-col gap-4">
          <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300
          rounded-full px-6 py-3"
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={isLoading}
          style={{
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}>
          
           {isLoading ?(
            <ActivityIndicator size={'small'} color={'#42285F4'}/>
           ) :(
            <View className="flex-row items-center justify-center">
            <Image
            source={require("../../assets/images/google.png")}
            className="size-10 mr-3"
            resizeMode="contain"/>

             <Text className="text-black font-medium text-base">Continue with Google</Text>
           </View>
           )}

          

          </TouchableOpacity>
           <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300
          rounded-full px-6 py-3"
          onPress={() => handleSocialAuth("oauth_apple")}
          disabled={isLoading}
          style={{
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}>
          
           {isLoading ?(
            <ActivityIndicator size={'small'} color={'#42285F4'}/>
           ) :(
            <View className="flex-row items-center justify-center">
            <Image
            source={require("../../assets/images/apple.png")}
            className="size-8 mr-3"
            resizeMode="contain"/>

            <Text className="text-black font-medium text-base">Continue with Apple</Text>
           </View>
           )}

           

          </TouchableOpacity>
        </View>
        {/* TERMS */}
        <Text className="text-gray-300 leading-4 text-xs mt-6 px-2">
          By signing up , you agree to our <Text className="text-blue-500">Terms</Text>
          {","}
          <Text className="text-blue-500">Privacy Policy</Text>
          {",and"}
          <Text className="text-blue-500">Cookie Use</Text>
        </Text>
       </View>
      </View>
    </View>
  );
}


