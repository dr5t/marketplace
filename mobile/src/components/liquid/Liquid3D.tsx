import React, { Suspense } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei/native";

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} scale={1.2}>
        <MeshDistortMaterial
          color="#7FD8FF"
          distort={0.4}
          speed={3}
        />
      </Sphere>
    </Float>
  );
}

export default function Liquid3D() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator color="#7FD8FF" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
        </Canvas>
      </Suspense>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Interactive 3D Preview 🔄</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F9FF',
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#7FD8FF',
    textTransform: 'uppercase',
  },
});
