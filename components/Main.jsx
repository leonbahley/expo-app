import React, { useEffect } from "react";
import {
  nameSelector,
  isRefreshingSelector,
} from "../redux/auth/authSelectors";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../helpers/router";
import { useSelector, useDispatch } from "react-redux";

export default function Main() {
  const dispatch = useDispatch();
  const user = useSelector(nameSelector);
  const isRefreshing = useSelector(isRefreshingSelector);

  const routing = useRoute(user);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [user]);
  return (
    <>{!isRefreshing && <NavigationContainer>{routing}</NavigationContainer>}</>
  );
}
