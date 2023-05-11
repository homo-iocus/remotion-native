import * as React from 'react';
import { Controls, RemotionContext } from '@remotion/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, View } from 'react-native';
import { RenderButton, RenderState } from './RenderButton';
import { PlayerContainer } from './PlayerContainer';
import { StatusBar } from 'expo-status-bar';
import { AspectRatio, AspectRatioToggler } from './AspectRatioToggler';
import { Horse } from './Horse';
import { CompToggler } from './CompToggler';

function Main() {
  const [state, setState] = React.useState<RenderState>({ type: 'preview' });
  const [currentAspectRatio, setCurrentAspectRatio] =
    React.useState<AspectRatio>('wide');

  const onAspectChange = React.useCallback((newAspect) => {
    setCurrentAspectRatio(newAspect);
  }, []);

  return (
    <View style={styles.flex}>
      <RemotionContext
        width={currentAspectRatio === 'wide' ? 1920 : 1080}
        height={currentAspectRatio === 'portrait' ? 1920 : 1080}
        durationInFrames={100}
        fps={30}
        inputProps={{}}
        component={Horse}
      >
        <View style={styles.flex}>
          {state.type === 'preview' ? (
            <PlayerContainer />
          ) : (
            <View style={styles.flex}>
              <Image
                fadeDuration={0}
                source={{ uri: state.lastFrameUrl }}
                resizeMode="contain"
                style={styles.fullSize}
              />
            </View>
          )}
          <View style={styles.spacer} />
          <View style={styles.controlsRow}>
            <AspectRatioToggler
              onChange={onAspectChange}
              current={currentAspectRatio}
            />
            <View style={styles.flex} />
            <CompToggler
              onChange={onAspectChange}
              current={currentAspectRatio}
            />
          </View>
          <View style={styles.spacer} />
          <Controls />
          <RenderButton state={state} setState={setState} />
        </View>
      </RemotionContext>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar style="light" />
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  app: {
    backgroundColor: '#222',
    flex: 1,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  spacer: {
    height: 20,
  },
  preview: {},
  controlsRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
});
