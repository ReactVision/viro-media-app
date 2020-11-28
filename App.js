/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  ViroText,
  ViroARScene,
  ViroARSceneNavigator,
} from 'react-viro';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const MainScene = () => {
  return <ViroARScene>
    <ViroText text="Hello World" position={[0, -.1, -1]} style={styles.helloWorldTextStyle} />
  </ViroARScene>;
};

const App = () => {
  useEffect(() => {
    check(PERMISSIONS.IOS.CAMERA)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              request(PERMISSIONS.IOS.CAMERA).then((result) => {
                // …
              });
              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
          // …
        });

  }, []);

  return (
      <View style={styles.container}>
        <ViroARSceneNavigator initialScene={{scene: MainScene}} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});

export default App;
