import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ShoppingCart, User as UserIcon } from "lucide-react-native";
import Blob from "../components/liquid/Blob";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const CATEGORIES = ["All", "Home decor", "Apparel", "Accessories", "Toys"];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState([
    { id: "1", title: "Pastel Tablecloth", price: 1299, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop" },
    { id: "2", title: "Handmade Scarf", price: 899, image: "https://images.unsplash.com/photo-1511270339343-bc8516029822?q=80&w=1080&auto=format&fit=crop" },
    { id: "3", title: "Crochet Amigurumi", price: 599, image: "https://images.unsplash.com/photo-1615486511484-92e175cca4ee?q=80&w=1080&auto=format&fit=crop" },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Blob size={400} gradient={["#7FD8FF", "#CDB4FF"]} style={styles.topBlob} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello Guest 👋</Text>
            <Text style={styles.title}>Explore Designs</Text>
          </View>
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Cart')}
          >
            <ShoppingCart size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search crochet magic..." 
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map((cat, idx) => (
            <TouchableOpacity key={idx} style={[styles.catBtn, idx === 0 && styles.activeCat]}>
              <Text style={[styles.catText, idx === 0 && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <Text style={styles.sectionTitle}>Featured Items 🧶</Text>
        <View style={styles.productGrid}>
          {products.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFF' },
  topBlob: { top: -100, left: -50, opacity: 0.2 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  welcomeText: { fontSize: 14, color: '#6B7280', fontWeight: 'bold' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A1A1A', fontFamily: 'System' },
  iconBtn: { padding: 12, backgroundColor: 'white', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  searchContainer: { marginBottom: 24 },
  searchInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 25, paddingHorizontal: 20, height: 50, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#1A1A1A' },
  categoryScroll: { marginBottom: 32, marginLeft: -4 },
  catBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, backgroundColor: 'white' },
  activeCat: { backgroundColor: '#7FD8FF' },
  activeCatText: { color: 'white' },
  catText: { fontWeight: 'bold', color: '#6B7280', fontSize: 14 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '48%', backgroundColor: 'white', borderRadius: 24, padding: 8, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, elevation: 3 },
  productImage: { width: '100%', aspectRatio: 0.9, borderRadius: 18, marginBottom: 12 },
  productInfo: { paddingHorizontal: 4, paddingBottom: 8 },
  productTitle: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#7FD8FF' },
});
