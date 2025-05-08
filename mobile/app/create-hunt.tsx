import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function CreateHuntScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="map"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Créer une chasse</ThemedText>
      </ThemedView>
      <ThemedText>
        Commencez ici pour configurer votre chasse personnalisée.
      </ThemedText>

      <Collapsible title="Étapes à suivre">
        <ThemedText>- Définir le nom de la chasse</ThemedText>
        <ThemedText>- Ajouter des indices ou étapes</ThemedText>
        <ThemedText>- Choisir un lieu de départ</ThemedText>
      </Collapsible>

      {Platform.OS === 'ios' && (
        <Collapsible title="Info iOS">
          <ThemedText>
            Utilisez le GPS pour démarrer automatiquement la chasse.
          </ThemedText>
        </Collapsible>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
