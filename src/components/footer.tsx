import React from "react";
import styled from "styled-components";
import { ThemeProviderProps } from "../theme";

const FooterWrapper = styled.p`
  border-top: 1px solid
    ${(props: ThemeProviderProps) => props.theme.color.CurrentLine};
  margin: 1rem auto;
  padding: 2rem 0;
  line-height: 1.4em;
  max-width: ${(props: ThemeProviderProps) => props.theme.dimensions.maxWidth};
  width: 100%;
  color: ${(props: ThemeProviderProps) => props.theme.color.Comment};

  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  font-weight: normal;
  text-align: center;
`;

const FooterLink = styled.a`
  color: ${(props: ThemeProviderProps) => props.theme.color.Foreground};
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  text-decoration: none;
  &:hover {
    color: ${(props: ThemeProviderProps) => props.theme.color.Foreground};
  }
`;

const Footer = () => (
  <FooterWrapper>
    Made with ☕ in Melbourne, Australia <br />
    by <FooterLink href="https://www.owenkelly.com.au"> Owen Kelly</FooterLink>
    <br />
    <br />
    Submit a{" "}
    <FooterLink href="https://github.com/ojkelly/goodengineering.dev">
      Pull Request
    </FooterLink>{" "}
    to get your blog added.
    <br />
    <small>You need a valid RSS feed.</small>
  </FooterWrapper>
);

export default Footer;
