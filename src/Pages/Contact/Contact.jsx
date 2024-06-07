import { useRef } from "react";

import Lottie from "lottie-react";
import contactUs from "/public/contact-us.json";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };
  return (
    <div className="pt-20 min-h-screen mx-auto ">
      <Helmet>
        <title>Contact Us | MultiCreatify</title>
      </Helmet>
      <div className="max-w-[1200px]  mx-auto">
        <div className="text-center mt-4 mb-4">
          <h3 className=" text-3xl font-semibold">Contact Us</h3>

          <p className="text-center max-w-[650px] mt-4 mx-auto">
            compiles a diverse array of artistic creations and craft projects,
            inspiring creativity and offering endless DIY possibilities.
          </p>
        </div>
        <hr className="border border-gray-400" />
        <div className="min-h-[300px] flex flex-col gap-8 justify-center my-8">
          <h3 className="text-xl">
            <b>Company Name:</b> MultiCreatify Inc.
          </h3>
          <h3 className="text-xl">
            <b>Address:</b> 1234 MultiCreatify, <br /> Suite 5678, <br /> Tech
            Valley, <br /> CA 94016,
            <br /> USA
          </h3>
          <h3 className="text-xl">
            <b>Contact:</b>
            <br />
            <b>Phone:</b> (555) 123-4567 <br /> <b>Email:</b>
            contact@multicreatify.com
          </h3>
        </div>
        <div className="grid  mt-4 lg:mt-6 px-3 grid-cols-1 lg:grid-cols-2">
          <Lottie className="max-w-[500px]" animationData={contactUs} />

          <div className="p-3">
            <h3 className="text-2xl font-semibold text-center">Message Us</h3>
            <p className="my-4 text-center">
              Connect with us easily through our 'Contact Us' page. We're here
              to answer your questions and address any concerns promptly.
            </p>

            <hr className="w-full my-6 border-titleClr h-[1px]" />

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3"
            >
              <div className="form-group">
                <label className="font-medium" htmlFor="name">
                  YOUR FULL NAME:
                </label>
                <br />
                <input
                  ref={nameRef}
                  placeholder="Your Full Name"
                  className="p-5 bg-white border-[1px] h-10 w-full rounded-[5px]"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="font-medium" htmlFor="email">
                  YOUR EMAIL ADDRESS:
                </label>
                <br />
                <input
                  ref={emailRef}
                  placeholder="Your Email Address"
                  className="p-5 bg-white border-[1px] h-10 w-full rounded-[5px]"
                  type="email"
                  required
                />
              </div>
              <div className="form-group lg:col-span-2">
                <label className="font-medium">YOUR MESSAGE:</label>
                <br />
                <textarea
                  ref={messageRef}
                  placeholder="Type Your Message Here"
                  className="p-5 bg-white border-[1px] w-full h-[200px] rounded-[5px]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full lg:col-span-2 rounded-sm btn bg-titleClr text-white text-xl font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
