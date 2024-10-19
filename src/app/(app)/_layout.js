import { Redirect } from "expo-router";
import { useSession } from "../../context/ctx";
import LoadingScreen from "../../components/LoadingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  House,
  List,
  StarFour,
  Storefront,
  Article,
} from "phosphor-react-native";
// Páginas para tabBar
import Lojas from "./(tabs)/Lojas.js";
import Home from "./(tabs)/index.js";
import Menu from "./(tabs)/Menu.js";
import Pontos from "./(tabs)/Pontos.js";
import Resgates from "./(tabs)/Resgates.js";
import { View, Text } from "react-native";
import Preferences from "../preferences.js";
import HelpCenter from "./helpCenter.js";
import Faq from "./faq.js";
import EditProfile from "./editProfile.js";
import { Stack } from "expo-router";
import TabLayout from "./(tabs)/_layout.js";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarInactiveTintColor: "#fff",
//         tabBarActiveTintColor: "#FFD700",
//         tabBarStyle: {
//           backgroundColor: "#050505",
//           borderTopWidth: 0,
//           height: 80,
//           padding: 20,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "bold",
//         },
//         tabBarLabel: ({ focused, color }) => (
//           <Text style={{ color: focused ? "#FFD700" : "#fff", fontSize: 12 }}>
//             {route.name}
//           </Text>
//         ),
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <House size={24} color={focused ? "#FFD700" : color} />
//               {focused && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -20,
//                     height: 4,
//                     width: 48,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     backgroundColor: "#FFD700",
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Extrato"
//         component={Extrato}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <Article size={24} color={focused ? "#FFD700" : color} />
//               {focused && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -20,
//                     height: 4,
//                     width: 48,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     backgroundColor: "#FFD700",
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Pontos"
//         component={Pontos}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <StarFour size={32} color={focused ? "#FFD700" : color} />
//               {focused && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -20,
//                     height: 4,
//                     width: 48,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     backgroundColor: "#FFD700",
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Lojas"
//         component={Lojas}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <Storefront size={24} color={focused ? "#FFD700" : color} />
//               {focused && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -20,
//                     height: 4,
//                     width: 48,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     backgroundColor: "#FFD700",
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Menu"
//         component={Menu}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <List size={24} color={focused ? "#FFD700" : color} />
//               {focused && (
//                 <View
//                   style={{
//                     position: "absolute",
//                     top: -20,
//                     height: 4,
//                     width: 48,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     backgroundColor: "#FFD700",
//                   }}
//                 />
//               )}
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   )
// }

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/onboardingScreen" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen name="helpCenter" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="editProfile" />
    </Stack>
    // <Stack.Navigator>
    //   <Stack.Screen name='MainTabs' component={TabNavigator} options={{headerShown: false}} />
    //   <Stack.Screen name='/' component={Home} options={{headerShown: false}} />
    //   <Stack.Screen name='preferences' component={Preferences} options={{headerShown: false}} />
    //   <Stack.Screen name='helpCenter' component={HelpCenter} options={{headerShown: false}}/>
    //   <Stack.Screen name='faq' component={Faq} options={{headerShown: false}} />
    //   <Stack.Screen name="editProfile" component={EditProfile} options={{headerShown: false}} />
    // </Stack.Navigator>
  );
}
