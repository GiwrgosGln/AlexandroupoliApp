/* eslint-disable */
import type { BlurTint } from "expo-blur";
import * as React from "react";
import type { SharedValue, WithSpringConfig } from "react-native-reanimated";

interface IScrollableSearchContext {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  scrollY: SharedValue<number>;
  pullDistance: SharedValue<number>;
  shouldAutoFocus: SharedValue<boolean>;
  onPullToFocusCallback: React.MutableRefObject<(() => void) | null>;
}

interface IScrollContent {
  children: React.ReactNode;
  readonly pullThreshold?: number;
}
interface IAnimatedComponent {
  children: React.ReactNode;
  readonly focusedOffset?: number;
  readonly unfocusedOffset?: number;
  readonly enablePullEffect?: boolean;
  readonly onPullToFocus?: () => void;
  readonly springConfig?: WithSpringConfig;
}

interface IOverlay {
  readonly children?: React.ReactNode;
  readonly onPress?: () => void;
  readonly enableBlur?: boolean;
  readonly blurTint?: BlurTint;
  readonly maxBlurIntensity?: number;
}

interface IFocusedScreen extends React.PropsWithChildren {}
interface IScrollableSearch extends React.PropsWithChildren {}

export type {
  IAnimatedComponent,
  IFocusedScreen,
  IOverlay,
  IScrollableSearch,
  IScrollableSearchContext,
  IScrollContent,
};
