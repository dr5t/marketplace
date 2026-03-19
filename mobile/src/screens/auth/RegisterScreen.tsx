import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, User, ArrowLeft, Check } from "lucide-react-native";
import LiquidButton from "../../components/liquid/LiquidButton";
import Blob from "../../components/liquid/Blob";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [role, setRole] = useState("USER");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Blob size={500} gradient={["#FFC8A2", "#CDB4FF"]} style={styles.bgBlob} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.title}>Join Vrindaa 🧶</Text>
        <Text style={styles.subtitle}>Start your artisan collection</Text>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <User size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput placeholder="Your display name" style={styles.input} />
          </View>

          <View style={styles.inputWrapper}>
            <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput placeholder="Email address" style={styles.input} />
          </View>

          <View style={styles.inputWrapper}>
            <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput placeholder="Create password" style={styles.input} secureTextEntry />
          </View>

          {/* Role Selection */}
          <Text style={styles.label}>Register as</Text>
          <View style={styles.roleGrid}>
            {["USER", "SELLER"].map((r) => (
              <TouchableOpacity 
                key={r}
                style={[styles.roleBtn, role === r && styles.activeRole]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleText, role === r && styles.activeRoleText]}>
                  {r === "USER" ? "Buyer" : "Seller"}
                </Text>
                {role === r && <Check size={16} color="white" />}
              </TouchableOpacity>
            ))}
          </View>

          <LiquidButton title="Create Account" onPress={() => {}} style={styles.regBtn} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already part of us? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFF' },
  bgBlob: { bottom: -200, left: -150, opacity: 0.3 },
  content: { padding: 30, paddingTop: 60 },
  backBtn: { marginBottom: 30 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { color: '#6B7280', marginBottom: 32, fontWeight: '500', fontStyle: 'italic' },
  form: { marginTop: 10 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 20, height: 60, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  inputIcon: { marginRight: 15 },
  input: { flex: 1, fontSize: 16, color: '#1A1A1A' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#6B7280', marginTop: 10, marginBottom: 12, marginLeft: 4 },
  roleGrid: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  roleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 15, backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E7EB' },
  activeRole: { backgroundColor: '#7FD8FF', borderColor: '#7FD8FF' },
  roleText: { fontWeight: 'bold', color: '#6B7280' },
  activeRoleText: { color: 'white' },
  regBtn: { width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#6B7280' },
  linkText: { fontWeight: 'bold', color: '#7FD8FF' },
});
