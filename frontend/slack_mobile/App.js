import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import GlobalStyles from './styles/GlobalStyles';

export default function App() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.text}>Open up App.js to start working on your app!</Text>
      <Text>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}
