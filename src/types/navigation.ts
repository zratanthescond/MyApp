import type { StackScreenProps } from "@react-navigation/stack";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";

export type ApplicationStackParamList = {
  Startup: undefined;
  Example: undefined;
  BordureauDetails: undefined;
  Individu: undefined;
  Factures: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
export type HomeTabParamList = {
  home: NavigatorScreenParams<ApplicationStackParamList>;
  "Tab B": NavigatorScreenParams<ApplicationStackParamList>;
};
export type TabBarIconPropsType = {
  focused: boolean;
  color: string;
  size: number;
  route?: RouteProp<HomeTabParamList, keyof HomeTabParamList>;
};
