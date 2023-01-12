import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/main_screen/ProfileScreen";
import PostsScreen from "../screens/main_screen/PostsScreen";
import CreateScreen from "../screens/main_screen/CreateScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import LoginScreen from "../screens/auth/LoginScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (isAuth) {
    return (
      <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focus, size, color }) => (
              <MaterialCommunityIcons
                name="postage-stamp"
                size={size}
                color={color}
              />
            ),
          }}
          name="posts_screen"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focus, size, color }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
          name="create"
          component={CreateScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focus, size, color }) => (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={size}
                color={color}
              />
            ),
          }}
          name="profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  );
};
