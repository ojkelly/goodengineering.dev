import React from "react";

import { Link } from "gatsby";
import { ThemeProviderProps } from "@src/theme";

import styled from "styled-components";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem 0 0 0;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props: ThemeProviderProps) => props.theme.color.Foreground};
  font-weight: normal;
  font-size: 1rem;
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  margin: 0 0.3rem;

  &.active {
    font-weight: bold;
    color: ${(props: ThemeProviderProps) => props.theme.color.Yellow};
  }
`;

const Menu = () => (
  <MenuWrapper>
    <MenuItem activeClassName="active" to="/">
      All
    </MenuItem>
    <MenuItem activeClassName="active" to="/personal">
      Personal
    </MenuItem>
    <MenuItem activeClassName="active" to="/company">
      Company
    </MenuItem>
  </MenuWrapper>
);

export default Menu;
