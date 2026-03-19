import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{
          scale: 1,
          rotate: '0deg',
          borderRadius: 40,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: ['0deg', '180deg', '360deg'],
          borderRadius: [40, 20, 60, 40],
        }}
        transition={{
          type: 'timing',
          duration: 3000,
          loop: true,
          repeatReverse: false,
        }}
        style={styles.blob}
      />
      <MotiView
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
        }}
      >
        <Text style={styles.text}>🧶 Weaving Magic...</Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  blob: {
    width: 100,
    height: 100,
    backgroundColor: '#7FD8FF',
    opacity: 0.4,
    marginBottom: 40,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7FD8FF',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
