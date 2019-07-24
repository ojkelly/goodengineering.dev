import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Footer from "../components/footer";
import Card from "../components/card";
import { ThemeProviderProps } from "@src/theme";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 0;
  max-width: 100%;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 100%;
  width: ${(props: ThemeProviderProps) => props.theme.dimensions.contentWidth};
  border-bottom: 1px solid
    ${(props: ThemeProviderProps) => props.theme.color.CurrentLine};
`;

const Body = styled.div`
  width: ${(props: ThemeProviderProps) => props.theme.dimensions.contentWidth};
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
  line-height: 1em;
  text-align: left;
`;

const Subtitle = styled.span`
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  color: ${(props: ThemeProviderProps) => props.theme.color.Comment};
  font-size: 1rem;
  font-weight: normal;
  width: 100%;
  text-align: center;
`;

const Home = ({ data }) => (
  <Flex>
    <Helmet
      title={`${data.site.siteMetadata.title} - Updated: ${data.site.buildTime}`}
    />
    <Header>
      <Title>{data.site.siteMetadata.title}</Title>
      <Subtitle>{data.site.siteMetadata.description}</Subtitle>
    </Header>
    <Body>
      {data.allFeedItem.nodes.map(post => (
        <Card {...post} key={post.link} />
      ))}
    </Body>
    <Footer />
  </Flex>
);

export default Home;
export const pageQuery = graphql`
  query Posts {
    allFeedItem(sort: { fields: pubDate, order: DESC }, limit: 100) {
      nodes {
        pubDate(fromNow: true)
        link
        id
        title
        parent {
          ... on feed {
            title
            url
          }
        }
      }
    }
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`;
