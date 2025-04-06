"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  // Separate refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  // Checking visibility
  const homeInView = useInView(homeRef, { triggerOnce: false });
  const aboutInView = useInView(aboutRef, { triggerOnce: false });
  const contactInView = useInView(contactRef, { triggerOnce: false });
  const footerInView = useInView(footerRef, { triggerOnce: false });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      try {
        let response = await axios.post(
          "https://api.miepay.ca/api/store-query",
          { ...values, first_name: values.name }
        );
        if (response.data.statusCode == 200) {
          toast.success(response.data.message);
          resetForm();
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    },
  });
  const [showOption, setShowOption] = useState(
    window.innerWidth ? true : false
  );

  return (
    <>
      <div className="bodycontainer">
        <section id="home" ref={homeRef}>
          <div className="navMain">
            <div className="brandLogo">
              <img src="/images/brandLogo.png" />
            </div>

            <div className="rightNav">
              <div className="barImg">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2976/2976215.png"
                  onClick={() => setShowOption(!showOption)}
                />
              </div>
              {showOption && (
                <div className="options">
                  <p>
                    <a href="#home">Home</a>
                  </p>
                  <p>
                    <a href="#about">About Us</a>
                  </p>
                  <p>
                    <a href="#contact">Contact</a>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="homeContent">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                animate={homeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 1,
                }}
                className="homeContentImg"
              >
                <img src="/images/logocenter3.png" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={homeInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 1,
                }}
              >
                Refer. Earn. Repeat.
              </motion.p>
            </div>
          </div>
        </section>

        <section id="about" ref={aboutRef}>
          <div className="aboutContent">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                animate={aboutInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 1,
                }}
                className="aboutContentImg"
              >
                <img src="/images/left.png" />
                <img src="/images/center.png" className="scale5" />
                <img src="/images/right.png" />
              </motion.div>
              <motion.h5
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                animate={aboutInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 1,
                  delay: 1,
                }}
              >
                MIE PAY
              </motion.h5>
              <motion.p
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                animate={aboutInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 1,
                  delay: 2,
                }}
              >
                Your secure digital wallet designed htmlFor seamless payments.
                We simplify transactions with transparent tracking and zero
                hidden fees. Soon expanding to multiple services, Mie Pay makes
                managing your money effortless and worry-free.
              </motion.p>
            </div>
          </div>
        </section>

        <section id="contact" ref={contactRef}>
          <div className="contactContent">
            <motion.div
              className="contactInfo"
              initial={{ opacity: 0, x: 100, scale: 0.5 }}
              animate={contactInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{
                duration: 1,
                delay: 1,
              }}
            >
              <h5>CONTACT</h5>
              <h6>Have any questions about Mie Pay?</h6>
              <p>
                Our dedicated team is ready to assist you anytime! Reach us at.
              </p>
              <h4>Email</h4>
              <h4>info@miepay.ca</h4>
              <div className="callDiv">
                <h4>Call</h4>
                <h4>+1 (416)827-0039</h4>
              </div>
              <p>for instant support with your digital wallet needs.</p>
            </motion.div>
            <motion.div
              className="contactForm"
              initial={{ opacity: 0, x: -100, scale: 0.5 }}
              animate={contactInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{
                duration: 1,
                delay: 1,
              }}
            >
              <h5>Contact Us</h5>
              <form id="contactForm" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={
                      formik.touched.name && formik.errors.name
                        ? "borderRed"
                        : "borderWhite"
                    }
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "borderRed"
                        : "borderWhite"
                    }
                    placeHolder="Your email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="subject"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                    className={
                      formik.touched.subject && formik.errors.subject
                        ? "borderRed"
                        : "borderWhite"
                    }
                    placeHolder="Subject"
                    required
                  />
                </div>
                <div>
                  <input
                    id="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className={
                      formik.touched.message && formik.errors.message
                        ? "borderRed"
                        : "borderWhite"
                    }
                    placeholder="Message"
                    required
                  />
                </div>
                <div className="sendBtn">
                  <button type="submit">Send</button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        <div className="footer" ref={footerRef}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={footerInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1,
            }}
            className="socialMediaMain"
          >
            <div>
              <a href="https://www.instagram.com/miepay.ca/" target="blank">
                <img src="/images/instagram2.png" alt="Logo" />
              </a>
            </div>
            <div>
              <img src="/images/tik-tok2.png" alt="Logo" />
            </div>
            <div>
              <a href="https://www.youtube.com/@MIEPAY_CA" target="blank">
                <img src="/images/youtube2.png" alt="Logo" />
              </a>
            </div>
            <div>
              <a href="https://x.com/Miepay_ca" target="blank">
                <img src="/images/twitter2.png" alt="Logo" />
              </a>
            </div>
            <div>
              <img src="/images/facebook2.png" alt="Logo" />
            </div>
            <div>
              <img src="/images/linkedin2.png" alt="Logo" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={footerInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1,
            }}
            className="scrollMain"
          >
            <p className="scroll-text">Scrool</p>
            <div className="line"></div>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
