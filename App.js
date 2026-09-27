import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Client access codes: 6 characters, mix of letters and numbers.
// Add one entry per client organization.
const ACCESS_CODES = {
  JPM4K9: 'JP Morgan',
};

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    const normalized = code.trim().toUpperCase();
    const org = ACCESS_CODES[normalized];
    if (org) {
      onUnlock(org);
    } else {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <Text style={styles.title}>OfficeSwap</Text>
        <Text style={styles.subtitle}>Enter your access code</Text>

        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={code}
          onChangeText={(text) => {
            setCode(text.slice(0, 6));
            setError(false);
          }}
          maxLength={6}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          placeholder="XXXXXX"
          placeholderTextColor="#9AA0A6"
          textAlign="center"
        />

        {error && <Text style={styles.errorText}>Invalid access code</Text>}

        <TouchableOpacity
          style={[styles.button, code.length !== 6 && styles.buttonDisabled]}
          onPress={submit}
          disabled={code.length !== 6}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  const [org, setOrg] = useState(null);

  if (!org) {
    return <AccessGate onUnlock={setOrg} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome, {org}</Text>
        <Text style={styles.subtitle}>OfficeSwap is unlocked.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  input: {
    width: 220,
    height: 56,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    fontSize: 24,
    letterSpacing: 6,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
