import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, ArrowLeft } from "lucide-react-native";
import LiquidButton from "../../components/liquid/LiquidButton";
import Blob from "../../components/liquid/Blob";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Blob size={500} gradient={["#CDB4FF", "#7FD8FF"]} style={styles.bgBlob} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome back ✨</Text>
        <Text style={styles.subtitle}>Continue your crochet journey</Text>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput 
              placeholder="Email your magic..." 
              style={styles.input} 
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput 
              placeholder="Your secret code" 
              style={styles.input} 
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <LiquidButton title="Login" onPress={() => {}} style={styles.loginBtn} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to Vrindaa? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFF' },
  bgBlob: { top: -200, right: -150, opacity: 0.3 },
  content: { padding: 30, paddingTop: 60 },
  backBtn: { marginBottom: 40 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { color: '#6B7280', marginBottom: 40, fontWeight: '500' },
  form: { marginTop: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 20, height: 60, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  inputIcon: { marginRight: 15 },
  input: { flex: 1, fontSize: 16, color: '#1A1A1A' },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { fontSize: 14, fontWeight: 'bold', color: '#6B7280' },
  loginBtn: { width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: '#6B7280' },
  linkText: { fontWeight: 'bold', color: '#7FD8FF' },
});
