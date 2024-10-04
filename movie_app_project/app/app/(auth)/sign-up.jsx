import { View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from "../../components/FormField"
import CustomButton from "../../components/customButton"
import {Link, router} from "expo-router"
import {createUser} from "../../lib/appwrite"

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

const SignUp = () => {

  const[form,setForm] = useState({
    username:"",
    email:"",
    password:""
  })

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSubmitting,setIsSubmitting] = useState(false)


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className = " justify-center w-full h-full px-6 my-6">
        <Image source={images.mlogo} className="w-[180px] h-[122px]"/> 
        <Text className="text-white text-2xl text-semibold font-pbold mt-6 mb-5">Sign up to M-Series</Text>
        <FormField title="Username" value={form.username} handleChangeText={(e) => setForm({ ...form, username: e })}/>
        <FormField title="Email" value= {form.email} handleChangeText={(e) => setForm({ ...form, email: e })}/>
        <FormField title="Password" value= {form.password} handleTextChange={(e)=> setForm({...form, password})} />
        <CustomButton otherStyles={"mt-5 h-14"}
                      title="Sign up"
                      handlePress={submit}
                      isLoading={isSubmitting}
         />
         <View className="pt-4 justify-center flex-row gap-2">
            <Text className="text-white text-xl font-pregular">Have an account? </Text>
            <Link href="/sign-in" className="text-xl text-[#ff4000] underline font-pregular">Log in</Link>
         </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp