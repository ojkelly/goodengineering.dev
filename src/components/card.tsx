import React from "react";
import styled from "styled-components";

import { ThemeProviderProps } from "@src/theme";

const Link = styled.a`
  text-decoration: none;
  flex: 1;
  border-radius: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin: 1.3rem 0;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${(props: ThemeProviderProps) =>
      props.theme.color.CurrentLine};
    border-radius: 3px;
  }
`;

const Title = styled.span`
  color: ${(props: ThemeProviderProps) => props.theme.color.Foreground};
  font-weight: normal;
  font-size: 2.2rem;
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.HeaderSerif};
  line-height: 1.2em;
  padding: 0.4rem 0;
  text-decoration: none;
  align-self: flex-start;
  width: 100%;
  flex-grow: 1;
`;

const Subtitle = styled.span`
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  color: ${(props: ThemeProviderProps) => props.theme.color.Yellow};
  align-self: flex-end;
  justify-self: flex-end;
  font-size: 1rem;
  width: 100%;
`;

const DateWrapper = styled.span`
  color: ${(props: ThemeProviderProps) => props.theme.color.Aqua};
  font-style: italic;
`;

const BlogName = styled.span`
  color: ${(props: ThemeProviderProps) => props.theme.color.Green};
`;
const Hostname = styled.span`
  text-transform: lowercase;
  font-family: ${(props: ThemeProviderProps) => props.theme.fonts.Monospace};
  color: ${(props: ThemeProviderProps) => props.theme.color.Purple};
  align-self: flex-end;
  justify-self: flex-end;
  font-size: 1rem;
  width: 100%;
`;

const Card = ({
  pubDate,
  title,
  link,
  parent: { title: blog, url: blogUrl },
}) => {
  const blogUrlParsed = new URL(blogUrl);
  return (
    <Link href={link} target="_blank">
      <Hostname>{blogUrlParsed.hostname.replace("www.", "")}</Hostname>
      <Title>{title}</Title>
      <Subtitle>
        <DateWrapper>
          {pubDate.includes("minute") ? "in the last hour" : pubDate}
        </DateWrapper>{" "}
        &middot; <BlogName>{blog}</BlogName>
      </Subtitle>
    </Link>
  );
};

export default Card;
