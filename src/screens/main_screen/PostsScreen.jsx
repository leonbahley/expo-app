import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nested_screens/DefaultPostsScreen";
import MapScreen from "../nested_screens/MapScreen";
import CommentsScreen from "../nested_screens/CommentsScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="posts" component={DefaultPostsScreen} />
      <NestedScreen.Screen name="map" component={MapScreen} />
      <NestedScreen.Screen name="comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
}
