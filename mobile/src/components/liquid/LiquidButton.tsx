import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

interface LiquidButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
}

export default function LiquidButton({ title, onPress, style }: LiquidButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.wrapper, style]}
    >
      <MotiView
        from={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={styles.container}
      >
        <Text style={styles.text}>{title}</Text>
      </MotiView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#7FD8FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 99,
    backgroundColor: '#7FD8FF', // Primary liquid color
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
