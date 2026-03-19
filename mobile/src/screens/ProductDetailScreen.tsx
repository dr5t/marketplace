import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Star, Heart, ShoppingBag, Cuboid as Cube } from "lucide-react-native";
import LiquidButton from "../components/liquid/LiquidButton";
import Liquid3D from "../components/liquid/Liquid3D";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const [view3D, setView3D] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gallery */}
        <View style={styles.imageContainer}>
          {view3D ? (
             <Liquid3D />
          ) : (
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop" }} 
              style={styles.image}
            />
          )}
          
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cubeBtn}
            onPress={() => setView3D(!view3D)}
          >
            <Cube size={20} color={view3D ? "#7FD8FF" : "#1A1A1A"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.heartBtn}>
            <Heart size={24} color="#FFC8A2" fill="#FFC8A2" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>APPAREL</Text>
            </View>
            <View style={styles.ratingRow}>
              <Star size={14} color="#FBBF24" fill="#FBBF24" />
              <Text style={styles.ratingText}>4.9 (120)</Text>
            </View>
          </View>

          <Text style={styles.title}>Pastel Dream Crochet Cardigan</Text>
          <Text style={styles.price}>₹2,499</Text>

          <Text style={styles.description}>
            Experience ultimate comfort with our hand-knitted lavender cardigan. Made from 100% organic cotton...
          </Text>

          {/* Seller Section */}
          <View style={styles.sellerCard}>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerAvatar} />
              <View>
                <Text style={styles.sellerName}>Maria's Knits</Text>
                <Text style={styles.sellerSub}>Official Artisan</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.contactBtn}>
              <Text style={styles.contactText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartIconBtn}>
          <ShoppingBag size={24} color="#7FD8FF" />
        </TouchableOpacity>
        <LiquidButton 
          title="Add to Cart" 
          onPress={() => {}} 
          style={styles.addBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  imageContainer: { width: '100%', height: 400, position: 'relative' },
  image: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 20, left: 20, padding: 12, backgroundColor: 'white', borderRadius: 20 },
  cubeBtn: { position: 'absolute', top: 20, right: 80, padding: 12, backgroundColor: 'white', borderRadius: 20 },
  heartBtn: { position: 'absolute', top: 20, right: 20, padding: 12, backgroundColor: 'white', borderRadius: 20 },
  content: { padding: 24, borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: 'white', marginTop: -32 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#EEF2FF', borderRadius: 12 },
  categoryText: { fontSize: 10, fontWeight: 'bold', color: '#6366F1' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#6B7280' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#7FD8FF', marginBottom: 16 },
  description: { fontSize: 15, color: '#6B7280', lineHeight: 24, marginBottom: 32 },
  sellerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#F8FAFF', borderRadius: 24 },
  sellerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sellerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#7FD8FF' },
  sellerName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  sellerSub: { fontSize: 12, color: '#9CA3AF' },
  contactBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#7FD8FF' },
  contactText: { fontSize: 12, fontWeight: 'bold', color: '#7FD8FF' },
  bottomBar: { flexDirection: 'row', alignItems: 'center', padding: 24, paddingBottom: 32, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#F3F4F6', gap: 16 },
  cartIconBtn: { padding: 16, borderRadius: 20, backgroundColor: '#F0F9FF', alignItems: 'center', justifyContent: 'center' },
  addBtn: { flex: 1 },
});
