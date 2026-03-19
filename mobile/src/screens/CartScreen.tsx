import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react-native";
import LiquidButton from "../components/liquid/LiquidButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const PLACEHOLDER_CART = [
  { id: "1", title: "Lavender Cardigan", price: 2499, quantity: 1, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop" },
  { id: "2", title: "Pastel Tablecloth", price: 1299, quantity: 2, image: "https://images.unsplash.com/photo-1511270339343-bc8516029822?q=80&w=1080&auto=format&fit=crop" },
];

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [items, setItems] = useState(PLACEHOLDER_CART);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ShoppingBag size={64} color="#E5E7EB" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.browseText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity style={styles.qtyBtn}>
                    <Minus size={16} color="#4B5563" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyBtn}>
                    <Plus size={16} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteBtn}>
                <Trash2 size={20} color="#F87171" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
          <LiquidButton title="Checkout Now" onPress={() => {}} style={styles.checkoutBtn} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  backBtn: { padding: 10, backgroundColor: 'white', borderRadius: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  scrollContent: { padding: 20 },
  cartItem: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 24, padding: 12, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  itemImage: { width: 80, height: 80, borderRadius: 16, marginRight: 16 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#7FD8FF', marginBottom: 12 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { padding: 6, backgroundColor: '#F3F4F6', borderRadius: 8 },
  qtyText: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  deleteBtn: { padding: 12, marginLeft: 10 },
  footer: { padding: 24, backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalLabel: { fontSize: 16, color: '#6B7280', fontWeight: 'bold' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  checkoutBtn: { width: '100%' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 100 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#9CA3AF', marginTop: 20, marginBottom: 10 },
  browseText: { fontSize: 16, fontWeight: 'bold', color: '#7FD8FF' },
});
