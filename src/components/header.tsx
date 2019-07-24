import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { ThemeProviderProps } from "../theme";
import { HeaderSans } from "../theme/fonts";

const Title = styled.h1`
  color: ${(props: ThemeProviderProps) => props.theme.color.Foreground};
  font-weight: bold;
  font-size: 2rem;
  font-family: ${HeaderSans};
  font-weight: 800;
  margin: 1rem auto 5rem auto;
  line-height: 1em;
  text-align: center;
  text-transform: uppercase;
`;

const Header = ({ children }) => (
  <>
    <Helmet title={children} />
    <Title>{children}</Title>
  </>
);

export default Header;
export { Header };
