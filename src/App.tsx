import React from "react";
import styled from "styled-components";

import { Theme } from "./theme";

// eslint-disable-next-line no-console
console.log("I use Arch btw.");

const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
`;

class App extends React.Component<any, any> {
  state = { hasMounted: false };

  componentDidMount() {
    this.setState({ hasMounted: true });
  }

  render() {
    let showDarkModeToggle = true;

    if (this.state.hasMounted === false) {
      return null;
    }

    return (
      <Container>
        <Theme
          mounted={this.state.hasMounted}
          showDarkModeToggle={showDarkModeToggle}
        >
          {this.props.children}
        </Theme>
      </Container>
    );
  }
}

const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
export { App, wrapRootElement };
