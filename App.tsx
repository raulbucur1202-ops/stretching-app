// App.tsx
// MOVA – Einstiegspunkt der App.
//
// Beim Start wird geprüft, ob das Onboarding bereits abgeschlossen ist:
//   - noch nicht: zeige das Onboarding
//   - schon erledigt: zeige direkt die normale App (Home + Tabs)
// Während der Prüfung wird kurz ein ruhiger Ladezustand gezeigt (kein Flackern).

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
} from '@expo-google-fonts/hanken-grotesk';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';

import { colors } from './theme/colors';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import RoutinePlayerScreen from './screens/RoutinePlayerScreen';
import RoutineDetailScreen from './screens/RoutineDetailScreen';
import ProgramDetailScreen from './screens/ProgramDetailScreen';
import PaywallScreen from './screens/PaywallScreen';
import OnboardingFlow from './onboarding/OnboardingFlow';
import { OnboardingProvider } from './onboarding/OnboardingContext';
import { isOnboardingDone, clearOnboarding } from './storage/profile';
import { clearProgramProgress } from './data/programProgress';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Drei mögliche Zustände der App.
type AppStatus = 'loading' | 'onboarding' | 'app';

export default function App() {
  const [status, setStatus] = useState<AppStatus>('loading');

  // Design-System-Schriften laden (Fraunces + Hanken Grotesk).
  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  // Beim ersten Start: prüfen, ob das Onboarding schon erledigt ist.
  useEffect(() => {
    isOnboardingDone().then((done) => setStatus(done ? 'app' : 'onboarding'));
  }, []);

  // Funktionen, die andere Bildschirme über den Context nutzen können.
  const controls = {
    // Nach erfolgreichem Speichern: zur normalen App wechseln.
    completeOnboarding: () => setStatus('app'),
    // Reset-Button im Profil: Daten löschen und zurück ins Onboarding.
    resetOnboarding: async () => {
      await clearOnboarding();
      await clearProgramProgress();
      setStatus('onboarding');
    },
  };

  return (
    <OnboardingProvider value={controls}>
      {(status === 'loading' || !fontsLoaded) && (
        // Ruhiger Ladezustand: nur der Off-White-Hintergrund.
        <View style={{ flex: 1, backgroundColor: colors.background }} />
      )}
      {status !== 'loading' && fontsLoaded && status === 'onboarding' && (
        <OnboardingFlow />
      )}
      {status !== 'loading' && fontsLoaded && status === 'app' && (
        <RootNavigator />
      )}
    </OnboardingProvider>
  );
}

// Stack-Navigator: umschließt die Tabs und legt den Routine-Player als
// Vollbild-Screen DARÜBER (öffnet sich über der Tab-Leiste, ist kein Tab).
function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen name="RoutineDetail" component={RoutineDetailScreen} />
        <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
        <Stack.Screen
          name="Player"
          component={RoutinePlayerScreen}
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{ presentation: 'fullScreenModal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Die normale App mit der unteren Tab-Navigation.
function MainTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          // Keine obere Kopfleiste – jeder Screen bringt sein eigenes Layout mit.
          headerShown: false,

          // MOVA-Farben für die Tab-Leiste:
          tabBarActiveTintColor: colors.accent, // aktives Tab in tiefem Türkis
          tabBarInactiveTintColor: colors.textMuted, // inaktive in Grau
          tabBarStyle: {
            backgroundColor: colors.background, // Off-White
            borderTopWidth: 1,
            borderTopColor: colors.border, // dünne Linie oben
          },

          // Passendes Icon je nach Tab auswählen.
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bibliothek') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Fortschritt') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Bibliothek" component={LibraryScreen} />
        <Tab.Screen name="Fortschritt" component={ProgressScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
