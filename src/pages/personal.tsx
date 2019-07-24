import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

import Footer from "../components/footer";
import Card from "../components/card";
import Menu from "../components/menu";
import {
  Flex,
  Header,
  Body,
  Updated,
  Subtitle,
  Title,
} from "@src/components/page";
const Home = ({ data }) => (
  <Flex>
    <Helmet
      title={`${data.site.siteMetadata.title} | ${data.site.siteMetadata.description}`}
    />
    <Header>
      <Title>{data.site.siteMetadata.title}</Title>
      <Subtitle>{data.site.siteMetadata.description}</Subtitle>
    </Header>
    <Body>
      <Menu />
      <Updated>updated hourly</Updated>
      {data.allFeedItem.nodes.map(post => (
        <Card {...post} key={post.link} />
      ))}
    </Body>
    <Footer />
  </Flex>
);

export default Home;
export const pageQuery = graphql`
  query Personal {
    allFeedItem(
      sort: { fields: pubDate, order: DESC }
      limit: 100
      filter: { folder: { eq: "Personal" } }
    ) {
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
