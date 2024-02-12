import {
  DarkTheme as reactNavigationDark,
  DefaultTheme as reactNavigationLight,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  useTheme,
} from 'react-native-paper';

type AppTheme = typeof appMaterialLight;

const materialLight = {
  ...MD3LightTheme,
  colors: {
    primary: 'rgb(185, 12, 85)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 217, 223)',
    onPrimaryContainer: 'rgb(63, 0, 24)',
    secondary: 'rgb(117, 86, 92)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 217, 223)',
    onSecondaryContainer: 'rgb(43, 21, 26)',
    tertiary: 'rgb(122, 87, 51)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 220, 189)',
    onTertiaryContainer: 'rgb(44, 22, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: '#201a1b',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 27)',
    surfaceVariant: 'rgb(243, 221, 224)',
    onSurfaceVariant: 'rgb(82, 67, 70)',
    outline: 'rgb(132, 115, 117)',
    outlineVariant: 'rgb(214, 194, 196)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(53, 47, 48)',
    inverseOnSurface: 'rgb(250, 238, 239)',
    inversePrimary: 'rgb(255, 177, 194)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(252, 239, 247)',
      level2: 'rgb(249, 232, 241)',
      level3: 'rgb(247, 225, 236)',
      level4: 'rgb(247, 222, 235)',
      level5: 'rgb(245, 218, 231)',
    },
    surfaceDisabled: 'rgba(32, 26, 27, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 27, 0.38)',
    backdrop: 'rgba(58, 45, 47, 0.4)',
  },
};

const materialDark = {
  ...MD3DarkTheme,
  colors: {
    primary: 'rgb(255, 177, 194)',
    onPrimary: 'rgb(102, 0, 43)',
    primaryContainer: 'rgb(143, 0, 63)',
    onPrimaryContainer: 'rgb(255, 217, 223)',
    secondary: 'rgb(228, 189, 195)',
    onSecondary: 'rgb(67, 41, 47)',
    secondaryContainer: 'rgb(91, 63, 69)',
    onSecondaryContainer: 'rgb(255, 217, 223)',
    tertiary: 'rgb(236, 190, 145)',
    onTertiary: 'rgb(70, 42, 9)',
    tertiaryContainer: 'rgb(96, 64, 29)',
    onTertiaryContainer: 'rgb(255, 220, 189)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(32, 26, 27)',
    onBackground: '#ece0e0',
    surface: 'rgb(32, 26, 27)',
    onSurface: 'rgb(236, 224, 224)',
    surfaceVariant: 'rgb(82, 67, 70)',
    onSurfaceVariant: 'rgb(214, 194, 196)',
    outline: 'rgb(158, 140, 143)',
    outlineVariant: 'rgb(82, 67, 70)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(236, 224, 224)',
    inverseOnSurface: 'rgb(53, 47, 48)',
    inversePrimary: 'rgb(185, 12, 85)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(43, 34, 35)',
      level2: 'rgb(50, 38, 40)',
      level3: 'rgb(57, 43, 45)',
      level4: 'rgb(59, 44, 47)',
      level5: 'rgb(63, 47, 50)',
    },
    surfaceDisabled: 'rgba(236, 224, 224, 0.12)',
    onSurfaceDisabled: 'rgba(236, 224, 224, 0.38)',
    backdrop: 'rgba(58, 45, 47, 0.4)',
  },
};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight,
  reactNavigationDark,
  materialLight,
  materialDark,
});

export const appMaterialLight = {
  ...materialLight,
  colors: {
    ...materialLight.colors,
    ...LightTheme.colors,
  },
};
export const appMaterialDark = {
  ...materialDark,
  colors: {
    ...materialDark.colors,
    ...DarkTheme.colors,
  },
};
export const navigationTheme = LightTheme;
export const navigationDarkTheme = DarkTheme;
export const useAppTheme = () => useTheme<AppTheme>();
