// @ts-check
import color from "color";
import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import { useDarkMode } from "@src/hooks/useDarkMode";

import { DarkTheme, BrightDarkTheme, TomorrowNight } from "@src/theme/dark";
import { LightTheme } from "@src/theme/light";
import * as Fonts from "./fonts";
import Tippy from "@tippy.js/react";

type ThemeColorConfig = {
  Background: string;
  CurrentLine: string;
  Selection: string;
  Foreground: string;
  Comment: string;
  Red: string;
  Orange: string;
  Yellow: string;
  Green: string;
  Aqua: string;
  Blue: string;
  Purple: string;
};

type ThemeFontConfig = {
  System: string;
  HeaderSans: string;
  HeaderSerif: string;
  Body: string;
  Monospace: string;
};

enum ThemeScheme {
  LIGHT = "light",
  DARK = "dark",
}

enum ThemeName {
  TOMORROW = "Tomorrow",
  TOMORROW_NIGHT = "Tomorrow Night",
  TOMORROW_NIGHT_EIGHTIES = "Tomorrow Night 80s",
  TOMORROW_NIGHT_BRIGHT = "Tomorrow Night Bright",
}

type ThemeDimensions = {
  maxWidth: string;
  mainWidth: string;
  contentWidth: string;
};

type ThemeConfig = {
  name: ThemeName;
  color: ThemeColorConfig;
  inverted: ThemeColorConfig;
  background: string;
  fonts: ThemeFontConfig;
  scheme: ThemeScheme;
  dimensions: ThemeDimensions;
};

type ThemeProviderProps = {
  theme: ThemeConfig;
  size?: number;
  color?: keyof ThemeColorConfig;
  background?: keyof ThemeColorConfig;
  inverted?: boolean;
};

const darkModeInitialState = true;

const GlobalStyle = createGlobalStyle<ThemeProviderProps>`
 body {
    color: ${props => props.theme.color.Foreground};
    background-color: ${props =>
      props.theme.scheme === ThemeScheme.LIGHT
        ? color(props.theme.color.Background)
            .lighten(0.1)
            .hex()
        : color(props.theme.color.Background)
            .darken(0.1)
            .hex()};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DarkModeToggle = ({
  theme,
  darkMode: { isDarkMode, setDarkMode },
}: {
  theme: ThemeConfig;
  darkMode;
}) => {
  const SwitchWrapper = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
  `;
  const InlineCode = styled.span`
    color: ${props => props.theme.color.Foreground};
    background-color: ${props => props.theme.color.Background};
    border: 1px solid ${props => props.theme.color.Selection};
    font-family: ${props => props.theme.fonts.Monospace};
    padding: 0.2em 0.4em;
    font-size: 0.8em;
    border-radius: 3px;
  `;

  const StyledTippy = styled(Tippy)<ThemeProviderProps>`
    background-color: ${props => props.theme.color.CurrentLine};
    color: ${props => props.theme.color.Foreground};
    margin: 0 1rem 0 0;
    font-size: 0.7rem;

    &[x-placement^="top"] {
      .tippy-arrow {
        border-top-color: ${props => props.theme.color.CurrentLine};
      }
    }
  `;
  const ToolTip = styled.div<ThemeProviderProps>`
    text-align: left;
    font-family: ${props => props.theme.fonts.Monospace};
  `;
  const Info = styled.span<ThemeProviderProps>`
    color: ${props => props.theme.color.Comment};
    font-family: ${props => props.theme.fonts.Monospace};
  `;
  const Selected = styled.span<ThemeProviderProps & { selected: boolean }>`
    color: ${props =>
      props.selected
        ? props.theme.color.Foreground
        : props.theme.color.Comment};
    font-weight: ${props => (props.selected ? "bold" : "normal")};
    font-family: ${props => props.theme.fonts.Monospace};
  `;

  return (
    <StyledTippy
      arrow
      arrowType="sharp"
      content={
        <ToolTip>
          <Info>Switch themes with your keyboard.</Info>
          <br />

          <InlineCode>1</InlineCode>
          <Info>&nbsp;Light</Info>
          <Selected selected={theme.name === ThemeName.TOMORROW}>
            &nbsp;Tomorrow
          </Selected>
          <br />

          <InlineCode>2</InlineCode>
          <Info>&nbsp;Dark</Info>
          <Selected selected={theme.name === ThemeName.TOMORROW_NIGHT_EIGHTIES}>
            &nbsp;&nbsp;Tomorrow Night 80s
          </Selected>
          <br />

          <InlineCode>3</InlineCode>
          <Info>&nbsp;Dark</Info>
          <Selected selected={theme.name === ThemeName.TOMORROW_NIGHT}>
            &nbsp;&nbsp;Tomorrow Night
          </Selected>
          <br />

          <InlineCode>4</InlineCode>
          <Info>&nbsp;Dark</Info>
          <Selected selected={theme.name === ThemeName.TOMORROW_NIGHT_BRIGHT}>
            &nbsp;&nbsp;Tomorrow Night High Contrast
          </Selected>
          <br />
        </ToolTip>
      }
    >
      <SwitchWrapper>
        <Switch
          onChange={setDarkMode}
          checked={isDarkMode}
          uncheckedIcon={
            <span
              style={{
                display: "inline-block",
                marginLeft: "0.5em",
                marginTop: "0.05em",
                color: theme.color.Background,
              }}
            >
              ☾
            </span>
          }
          checkedIcon={
            <span
              style={{
                display: "inline-block",
                marginLeft: "0.5em",
                marginTop: "0.1em",
                color: theme.color.Background,
              }}
            >
              ☀
            </span>
          }
          onHandleColor={theme.color.Background}
          offHandleColor={theme.color.Background}
          onColor={theme.color.Selection}
          offColor={theme.color.Selection}
          width={60}
        />
      </SwitchWrapper>
    </StyledTippy>
  );
};

const keys = {
  one: 49,
  two: 50,
  three: 51,
  four: 52,
};

const inputElements = ["INPUT", "TEXTAREA", "A", "BUTTON"];

const handleKeyDown = ({ setTheme, theme, setDarkMode }) => e => {
  const { keyCode, metaKey, ctrlKey } = e;
  const { activeElement } = document;

  if (inputElements.includes(activeElement.tagName)) {
    return;
  }
  if (metaKey || ctrlKey) return;

  switch (keyCode) {
    case keys.one:
      setDarkMode(false);
      setTheme({
        ...theme,
        name: ThemeName.TOMORROW,
        color: LightTheme,
        inverted: TomorrowNight,
        background: color(LightTheme.Background)
          .lighten(0.1)
          .hex(),
        scheme: ThemeScheme.LIGHT,
      });
      break;

    case keys.two:
      setDarkMode(true);
      setTheme({
        ...theme,
        name: ThemeName.TOMORROW_NIGHT_EIGHTIES,
        color: DarkTheme,
        inverted: LightTheme,
        background: color(DarkTheme.Background)
          .darken(0.1)
          .hex(),
        scheme: ThemeScheme.DARK,
      });
      break;

    case keys.three:
      setDarkMode(true);
      setTheme({
        ...theme,
        name: ThemeName.TOMORROW_NIGHT,
        color: TomorrowNight,
        inverted: LightTheme,
        background: color(TomorrowNight.Background)
          .darken(0.1)
          .hex(),
        scheme: ThemeScheme.DARK,
      });
      break;

    case keys.four:
      setDarkMode(true);
      setTheme({
        ...theme,
        name: ThemeName.TOMORROW_NIGHT_BRIGHT,
        color: BrightDarkTheme,
        inverted: LightTheme,
        background: color(BrightDarkTheme.Background)
          .darken(0.1)
          .hex(),
        scheme: ThemeScheme.DARK,
      });
      break;

    default:
      break;
  }
};

const Theme = ({ children, mounted, showDarkModeToggle = true }) => {
  const [isDarkMode, setDarkMode] = useDarkMode(
    darkModeInitialState,
    !!mounted
  );

  const toggleTheme = isDarkMode => {
    const colorConfig = isDarkMode ? DarkTheme : LightTheme;

    return {
      isDarkMode,
      color: colorConfig,
      inverted: isDarkMode ? DarkTheme : LightTheme,
      name: isDarkMode ? ThemeName.TOMORROW_NIGHT_EIGHTIES : ThemeName.TOMORROW,
      background: isDarkMode
        ? color(colorConfig.Background)
            .darken(0.1)
            .hex()
        : color(colorConfig.Background)
            .lighten(0.1)
            .hex(),
      fonts: Fonts,
      scheme: isDarkMode ? ThemeScheme.DARK : ThemeScheme.LIGHT,
      dimensions: {
        maxWidth: "80rem",
        mainWidth: "60rem",
        contentWidth: "45rem",
      },
    };
  };

  const [theme, setTheme] = useState(toggleTheme(isDarkMode));

  useEffect(() => {
    const handler = handleKeyDown({
      setTheme,
      theme,
      setDarkMode,
    });
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  });

  const darkModeToggleHandler = () => {
    const isDark = !(theme.scheme === ThemeScheme.DARK);

    setTheme(toggleTheme(isDark));
    setDarkMode(isDark);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {showDarkModeToggle && (
          <DarkModeToggle
            theme={theme}
            darkMode={{
              isDarkMode: isDarkMode,
              setDarkMode: darkModeToggleHandler,
            }}
          />
        )}
        <GlobalStyle />
        {children}
      </Wrapper>
    </ThemeProvider>
  );
};

// A util for use in styled-components that allows overridding of
// colors, and inverions
const themeColorPicker = (defaultColor: keyof ThemeColorConfig) => (
  props: ThemeProviderProps
): string => {
  const theme = props.inverted ? props.theme.inverted : props.theme.color;
  return theme[props.color || defaultColor];
};

const themeBackgroundColorPicker = (defaultColor?: boolean) => (
  props: ThemeProviderProps
): string => {
  const theme = props.inverted ? props.theme.inverted : props.theme.color;

  if (props.background) {
    return props.background && theme[props.background];
  }

  if (props.inverted) {
    return props.theme.inverted.Background;
  }

  return defaultColor ? props.theme.background : "";
};

export {
  Theme,
  ThemeConfig,
  ThemeColorConfig,
  ThemeProviderProps,
  themeColorPicker,
  themeBackgroundColorPicker,
  ThemeScheme,
};
