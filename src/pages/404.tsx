import { graphql, StaticQuery } from "gatsby";
import React from "react";

import { Header } from "../components/header";
import Footer from "../components/footer";

const NotFoundPage = () => {
  return (
    <div>
      <Header>404 Not Found</Header>
      <Footer />
    </div>
  );
};
export default NotFoundPage;
