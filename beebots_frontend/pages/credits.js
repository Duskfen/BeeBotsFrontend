import Head from "next/head";
import Box from "../components/box";
import styles from "./credits.module.scss";

export default function Credits() {
  return (
    // https://www.ihk-wiesbaden.de/recht/rechtsberatung/internetrecht-und-werbung/internetauftritt-rechtliche-anforderungen-und-pflichten-1255572
    <>
      <Head>
        <title>Beebots Legal Notice</title>
      </Head>
      <h1>Beebots Legal Notice</h1>

      <h2>Legal Notice</h2>
      <Box>
        <div className={styles.creditWrapper}>
          <p>
            <b>Provider:</b>
          </p>
          <p>Lugmayr Gabriel, Pömmer Dominik, Faltin Dominik</p>
        </div>
        <div className={styles.creditWrapper}>
          <p>
            <b>Address:</b>
          </p>
          <p>3925 Arbesbach, Arbesbach 60</p>
        </div>
        <div className={styles.creditWrapper}>
          <p>
            <b>Contact:</b>
          </p>
          <p>
            <a href="mailto:Gabriel@waldviertelblick.at">
              Gabriel@waldviertelblick.at
            </a>
            , <a href="tel:+4367762054831">+43 677 62054831</a>
          </p>
        </div>
      </Box>

      <h2>Privacy & Cookies</h2>
      <Box>
        <ol>
          <p>
            At Beebots, one of our main priorities is the privacy of our
            visitors. This Privacy Policy document contains types of information
            that is collected and recorded by Beebots and how we use it.
          </p>

          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>

          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Beebots. This policy is not
            applicable to any information collected offline or via channels
            other than this website. Our Privacy Policy was created with the
            help of
            <a href="https://www.privacypolicygenerator.info">
              Privacy Policy Generator
            </a>
            .
          </p>

          <li>
            <h3>Consent</h3>

            <p>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </p>

            <h3>Information we collect</h3>

            <p>
              The personal information that you are asked to provide, and the
              reasons why you are asked to provide it, will be made clear to you
              at the point we ask you to provide your personal information.
            </p>
            <p>
              If you contact us directly, we may receive additional information
              about you such as your name, email address, phone number, the
              contents of the message and/or attachments you may send us, and
              any other information you may choose to provide.
            </p>
            <p>
              When you register for an Account, we may ask for your contact
              information, including items such as name, company name, address,
              email address, and telephone number.
            </p>

            <h3>How we use your information</h3>

            <p>
              We use the information we collect in various ways, including to:
            </p>

            <ul>
              <li>
                <p>Provide, operate, and maintain our website</p>
              </li>
              <li>
                <p>Improve, personalize, and expand our website</p>
              </li>
              <li>
                <p>Understand and analyze how you use our website</p>
              </li>
              <li>
                <p>
                  {" "}
                  Develop new products, services, features, and functionality
                </p>
              </li>
              <li>
                <p>
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes
                </p>
              </li>
              <li>
                <p>Send you emails</p>
              </li>
              <li>
                <p>Find and prevent fraud</p>
              </li>
            </ul>
          </li>
          <li>
            <h3>Log Files</h3>

            <p>
              Beebots follows a standard procedure of using log files. These
              files log visitors when they visit websites. All hosting companies
              do this and a part of hosting services' analytics. The information
              collected by log files include internet protocol (IP) addresses,
              browser type, Internet Service Provider (ISP), date and time
              stamp, referring/exit pages, and possibly the number of clicks.
              These are not linked to any information that is personally
              identifiable. The purpose of the information is for analyzing
              trends, administering the site, tracking users' movement on the
              website, and gathering demographic information.
            </p>
          </li>
          <li>
            <h3>Cookies and Web Beacons</h3>

            <p>
              Like any other website, Beebots uses 'cookies'. These cookies are
              used to store information including visitors' preferences, and the
              pages on the website that the visitor accessed or visited. The
              information is used to optimize the users' experience by
              customizing our web page content based on visitors' browser type
              and/or other information.
            </p>

            <p>
              For more general information on cookies, please read{" "}
              <a href="https://www.generateprivacypolicy.com/#cookies">
                the Cookies article on Generate Privacy Policy website
              </a>
              .
            </p>
          </li>
          <li>
            <h3>Advertising Partners Privacy Policies</h3>

            <p>
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of Beebots.
            </p>

            <p>
              Third-party ad servers or ad networks uses technologies like
              cookies, JavaScript, or Web Beacons that are used in their
              respective advertisements and links that appear on Beebots, which
              are sent directly to users' browser. They automatically receive
              your IP address when this occurs. These technologies are used to
              measure the effectiveness of their advertising campaigns and/or to
              personalize the advertising content that you see on websites that
              you visit.
            </p>

            <p>
              Note that Beebots has no access to or control over these cookies
              that are used by third-party advertisers.
            </p>
          </li>
          <li>
            <h3>Third Party Privacy Policies</h3>

            <p>
              Beebots's Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options.{" "}
            </p>

            <p>
              You can choose to disable cookies through your individual browser
              options. To know more detailed information about cookie management
              with specific web browsers, it can be found at the browsers'
              respective websites.
            </p>
          </li>
          <li>
            <h3>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>

            <p>
              Under the CCPA, among other rights, California consumers have the
              right to:
            </p>
            <p>
              Request that a business that collects a consumer's personal data
              disclose the categories and specific pieces of personal data that
              a business has collected about consumers.
            </p>
            <p>
              Request that a business delete any personal data about the
              consumer that a business has collected.
            </p>
            <p>
              Request that a business that sells a consumer's personal data, not
              sell the consumer's personal data.
            </p>
            <p>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </li>
          <li>
            <h3>GDPR Data Protection Rights</h3>

            <p>
              We would like to make sure you are fully aware of all of your data
              protection rights. Every user is entitled to the following:
            </p>
            <p>
              The right to access – You have the right to request copies of your
              personal data. We may charge you a small fee for this service.
            </p>
            <p>
              The right to rectification – You have the right to request that we
              correct any information you believe is inaccurate. You also have
              the right to request that we complete the information you believe
              is incomplete.
            </p>
            <p>
              The right to erasure – You have the right to request that we erase
              your personal data, under certain conditions.
            </p>
            <p>
              The right to restrict processing – You have the right to request
              that we restrict the processing of your personal data, under
              certain conditions.
            </p>
            <p>
              The right to object to processing – You have the right to object
              to our processing of your personal data, under certain conditions.
            </p>
            <p>
              The right to data portability – You have the right to request that
              we transfer the data that we have collected to another
              organization, or directly to you, under certain conditions.
            </p>
            <p>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </li>
          <li>
            <h3>Children's Information</h3>

            <p>
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity.
            </p>

            <p>
              Beebots does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that
              your child provided this kind of information on our website, we
              strongly encourage you to contact us immediately and we will do
              our best efforts to promptly remove such information from our
              records.
            </p>
          </li>
        </ol>
      </Box>

      <h2>Credits</h2>
      <Box className={styles.creditWrapper}>
        <p>
          <b>Free vectors, icons and illustrations from Streamline:</b>
        </p>
        <p>
          <a href="https://streamlinehq.com">https://streamlinehq.com</a>
        </p>
      </Box>
    </>
  );
}
