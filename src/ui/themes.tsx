import {
  CreateThemeArgs,
  newskitDarkTheme,
  newskitLightTheme,
  createTheme,
} from 'newskit';

const customTheme: CreateThemeArgs = {
  name: 'my-custom-select-theme',
  overrides: {
    stylePresets: {
      selectPanelCustom: {
        base: {
          backgroundColor: '{{colors.interface010}}',
          borderRadius: '{{borders.borderRadiusRounded010}}',
          borderStyle: 'solid',
          borderWidth: '{{borders.borderWidth010}}',
          borderColor: '{{colors.whiteTint010}',
          boxShadow: '{{shadows.shadow050}}',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...customTheme,
  baseTheme: newskitLightTheme,
});

export const darkTheme = createTheme({
  ...customTheme,
  baseTheme: newskitDarkTheme,
});
