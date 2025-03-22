import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, author, keywords, description,title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
      <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps={
  title:"Ecommerce App",
  description:"mern stack project",
  keywords:"mern,react,node,mongodb,express",
  author:"Sumit Mishra"
};

export default Layout;
