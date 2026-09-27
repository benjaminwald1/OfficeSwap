import React, { useState } from 'react';
import {
  Image,
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

// Personal access codes: 6 characters, mix of letters and numbers.
// One entry per participant in the NYC office swap.
const ACCESS_CODES = {
  HBTRQJ: 'John Richert',
  GF5CBF: 'Joe DeBarbrie',
  PQBN4Q: 'Jack LaGere',
  '6TAL5X': 'Brian Pehoski',
  TKPXGF: 'Bob Berkus',
  '2GYYSC': 'Dave Khalsa',
  '7H2FUZ': 'Barry Lutz',
  NECQUF: 'Matt Wedge',
  QG2T7Z: 'Cameron Morris',
  LZYPTE: 'Christopher Dass',
  LRL72T: 'Corey Ryan',
  QWDQCW: 'Chris Backscheider',
  '3TEPWP': 'Craig Rosoff',
  '937KSJ': 'Mark Breeden',
  RS53ZQ: 'Ian Radomski',
  J9FDHK: 'Humberto Garcia-Salas',
  L5E227: 'Andrew Redmond',
  SAHTXH: 'Trey Hanlan',
  U5L7AS: 'Fei-Fei Zhang',
  MGVNKZ: 'Andrew Sinclair',
  LAW9BH: 'Carl Torrillo',
  ZVRDRF: 'Ryan Lake',
  F9EJJ8: 'Rohan Juneja',
  LS5PNV: 'Max Barrett',
  '3Z66HR': 'Nick Melton',
  QEXBQQ: 'Miles Perkins',
  AEDQEC: 'Dan Rufo',
  XERT9P: 'Casey Chopek',
  J8R84N: 'Olga Polunina',
  GG5Y54: 'Rohit Bhandari',
  '7DGD3X': 'Ward Jones',
  GRNN6J: 'Joe Lace',
  '5MT7RE': 'Brandon Speck',
  '6GDAFR': 'JC Raby',
  L498P3: 'Douglas Melsheimer',
  DL2A2S: 'Mike Amez',
  '7U59KN': 'Rodney Miller',
  UPDDWD: 'Andrew Castaldo',
  D8LDFM: 'Andrew Martin',
  EER3HR: 'Jeremy Berntsen',
  CF4WSP: 'Robert S Daugherty',
  WRS3JV: 'Jay Harris',
  '7WEA7G': 'Steve Lanese',
  EPSJYE: 'Firdaus Pohowalla',
  RZUL6V: 'Rob Rosenfeld',
  AVGJSH: 'Joe Warshawsky',
  GKTUPX: 'Leo Reilly',
};

const LOGO = require('./assets/icon.png');

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    const normalized = code.trim().toUpperCase();
    const name = ACCESS_CODES[normalized];
    if (name) {
      onUnlock(name);
    } else {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <Image source={LOGO} style={styles.logo} />
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
  const [name, setName] = useState(null);

  if (!name) {
    return <AccessGate onUnlock={setName} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image source={LOGO} style={styles.logoSmall} />
        <Text style={styles.title}>Welcome, {name}</Text>
        <Text style={styles.subtitle}>OfficeSwap is unlocked.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1420',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 128,
    height: 128,
    borderRadius: 28,
    marginBottom: 20,
  },
  logoSmall: {
    width: 88,
    height: 88,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F5F7FA',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9AA6B8',
    marginBottom: 32,
  },
  input: {
    width: 220,
    height: 56,
    borderWidth: 2,
    borderColor: '#2A3B52',
    borderRadius: 12,
    fontSize: 24,
    letterSpacing: 6,
    fontWeight: '600',
    color: '#F5F7FA',
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#F87171',
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#F2A93B',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: '#4B5563',
  },
  buttonText: {
    color: '#0B1420',
    fontSize: 16,
    fontWeight: '700',
  },
});
