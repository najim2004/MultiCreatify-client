// src/components/Newsletter.js
import React, { useState } from "react";
import Container from "../../../Components/Container";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the subscription logic here, e.g., send data to your server
    setIsSubscribed(true);
  };

  return (
    <Container>
      <div className="md:mb-[60px] mb-20 lg:mb-[100px]">
        <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-4xl text-center lg:text-start font-semibold font-poppins tracking-tight text-titleClr sm:text-4xl">
              Get New Insights Weekly
            </h2>
            <p className="text-lg text-center lg:text-start leading-6 text-desClr mt-5">
              Subscribe to our newsletter to get the latest news, updates, and
              special offers delivered directly to your inbox.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 flex justify-center  lg:ml-8 lg:w-1/2">
            {!isSubscribed ? (
              <form className="sm:flex" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-white px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-white mt-3 sm:mt-0 sm:ml-3 px-5 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs"
                />
                <button
                  type="submit"
                  className="mt-3 w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="text-lg font-medium text-green-500">
                Thank you for subscribing!
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Newsletter;
