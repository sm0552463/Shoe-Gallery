import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us -Ecommerce App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://imgs.search.brave.com/3qlE6YF_Nd-AjCVOfhlynrALgVAFx4CvLOK3OvuqgbY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/Ym91dC1hcy1zZXJ2/aWNlLWNvbnRhY3Qt/aW5mb3JtYXRpb24t/Y29uY2VwdF81Mzg3/Ni0xMzg1MDkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          We take pride in curating a wide range of products to cater to all your needs.
           Whether you’re looking for the latest gadgets, fashionable apparel, home essentials,
            or unique gifts, we have it all. Each product is carefully selected to ensure quality
             and satisfaction for our 
            customers.
            We take pride in curating a wide range
             of products to cater to all your needs. Whether you’re looking for
              the latest gadgets, fashionable apparel, home essentials, or unique gifts, 
              we have it all. Each product is carefully selected to ensure quality 
            and satisfaction for our customers.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;