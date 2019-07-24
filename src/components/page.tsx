import { ThemeProviderProps } from "@src/theme";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 0;
  max-width: 100vw;
  width: ${(props: ThemeProviderProps) => props.theme.dimensions.contentWidth};
  /* width: 100%; */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 100%;
  border-bottom: 1px solid
    ${(props: ThemeProviderProps) => props.theme.color.CurrentLine};
`;

const Body = styled.div`
  margin: auto;
  word-break: break-word;
  max-width: 100%;
  box-sizing: border-box;
`;
const Title = styled.h1`
  color: ${(props: ThemeProviderProps) => props.theme.color.Foreground};
  font-size: 4rem;
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.HeaderSerif};
  padding: 1rem auto 0 auto;
  margin: 1rem 0 1rem 0;
  line-height: 1em;
  text-align: center;

  @media (max-width: 768px) {
    margin: 3rem 0 1rem 0;
    font-size: 2rem;
  }
`;

const Updated = styled.div`
  text-transform: lowercase;
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  color: ${(props: ThemeProviderProps) => props.theme.color.Comment};
  font-size: 0.6rem;
  font-weight: normal;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
`;

const Subtitle = styled.span`
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  color: ${(props: ThemeProviderProps) => props.theme.color.Comment};
  font-size: 1rem;
  font-weight: normal;
  width: 100%;
  text-align: center;
`;

export { Flex, Header, Body, Updated, Subtitle, Title };
