import { View, type ViewProps, useColorScheme } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();
  const scheme = useColorScheme();
  
  const backgroundColor = (scheme === 'dark' ? darkColor : lightColor) ?? theme[type ?? 'background'];

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
