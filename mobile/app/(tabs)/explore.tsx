import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';


export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      <ThemedText>This app includes example code to help you get started.</ThemedText>

      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens: 
          <ThemedText type="defaultSemiBold"> app/(tabs)/index.tsx </ThemedText> 
          and 
          <ThemedText type="defaultSemiBold"> app/(tabs)/explore.tsx</ThemedText>.
        </ThemedText>
        <ThemedText>
          The layout file in 
          <ThemedText type="defaultSemiBold"> app/(tabs)/_layout.tsx </ThemedText>
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press 
          <ThemedText type="defaultSemiBold"> w </ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Images">
        <ThemedText>
          For static images, use the 
          <ThemedText type="defaultSemiBold"> @2x </ThemedText> and 
          <ThemedText type="defaultSemiBold"> @3x </ThemedText> suffixes.
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Custom fonts">
        <ThemedText>
          See 
          <ThemedText type="defaultSemiBold"> app/_layout.tsx </ThemedText> 
          for how to load custom fonts like 
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>this one</ThemedText>.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template supports both light and dark modes. Use 
          <ThemedText type="defaultSemiBold"> useColorScheme() </ThemedText> 
          to adjust UI colors.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Animations">
        <ThemedText>
          This template uses 
          <ThemedText type="defaultSemiBold"> react-native-reanimated </ThemedText> 
          for animations, like in 
          <ThemedText type="defaultSemiBold"> components/HelloWave.tsx</ThemedText>.
        </ThemedText>
        {Platform.OS === 'ios' && (
          <ThemedText>
            The 
            <ThemedText type="defaultSemiBold"> components/ParallaxScrollView.tsx </ThemedText> 
            provides a parallax header effect.
          </ThemedText>
        )}
      </Collapsible>
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
