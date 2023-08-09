import { useNavigate } from "react-router-dom";
import store from "../stores/store";
import { Helmet } from "react-helmet";
import "./styles.css";

const UploadData = () => {
  const Store = store();
  // const navigate = useNavigate()

  // const accNos = Object.keys(Store.data)

  const onUpload = async () => {
    await Store.onUpload();

    // accNos.length > 0 ? navigate(`/dashboard/${accNos[0]}`): <></>
  };

  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kavach2023</title>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="css/styles.css" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
          rel="stylesheet"
        />

        <script
          src="https://kit.fontawesome.com/f2f9183f73.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>

      <section id="title" className="gradient-background">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1 style={{fontSize: "70px"}}>Detect Fraudulent Transactions with Team 404</h1>
              <p style={{fontSize: "25px"}}>
                Our fund trail analysis tool helps you to identify fraudulent
                activities in your transactions.
              </p>
            </div>

            <div className="page-container col-lg-6">
              <div className="image-container">
                <img src="./cyber3.png" alt="Rotating Image" />
              </div>
            </div>

            <div className="file-upload">
              <label style={{fontSize:"40px"}} className="upload" htmlFor="fileInput">
                Please Upload Your Bank Statement
              </label>
              <input
                className="input-link file"
                type="file"
                id="fileInput"
                accept=".pdf,.xls,.xlsx,.csv,.xlsm"
                onChange={Store.onChange}
              />
              <div className="selected-file" id="selectedFile"></div>
            </div>
            <div className="form-group">
              <button
              style={{height:"60px", width:"180px", fontSize:"30px", fontWeight:"bold"}}
                onClick={onUpload}
                type="button"
                className="btn btn-primary btn-lg button"
              >
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font work">
        <h1
          className="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider"
          style={{ fontWeight: "bold", fontSize: "60px", marginTop: "40px"}}
        >
          HOW TO USE?
        </h1>
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg  
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>

                <div className="flex-grow pl-4">
                  <h3
                    className="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    STEP 1
                  </h3>
                  <p className="leading-relaxed" style={{ color: "black" , fontSize: "20px"}}>
                    Upload your bank statement in Landing page.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2
                    className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider "
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    STEP 2
                  </h2>
                  <p className="leading-relaxed" style={{ color: "black" , fontSize: "20px"}}>
                    Select the desired option on the Dashboard.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2
                    className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    STEP 3
                  </h2>
                  <p className="leading-relaxed" style={{ color: "black" , fontSize: "20px"}}>
                    Click on the graph to get the information.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2
                    className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    STEP 4
                  </h2>
                  <p className="leading-relaxed" style={{ color: "black" , fontSize: "20px"}}>
                    Click on advanced analysis option for more detailed
                    information.
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2
                    className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider"
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    FINISH
                  </h2>
                  <p className="leading-relaxed" style={{ color: "black" , fontSize: "20px"}}>
                    Preview your Report.
                  </p>
                </div>
              </div>
            </div>
            {/* <img src="https://source.unsplash.com/620x300/?indianrupee,cybersecurity" alt="search terms"/> */}
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font techstack">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="sm:w-16 sm:h-16 w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2
                className="text-gray-900 text-lg title-font font-medium mb-2 head"
                style={{ color: "white" , fontSize: "30px"}}
              >
                BigChainDB
              </h2>
              <p className="leading-relaxed text-base para" style={{ color: "white" , fontSize: "20px"}}>
                BigchainDB is a decentralized, blockchain-based distributed
                database designed to combine the benefits of traditional
                databases with the advantages of blockchain technology. It was
                developed to address the limitations of scalability,
                performance, and data management faced by many blockchain
                systems
              </p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </a>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2
                className="text-gray-900 text-lg title-font font-medium mb-2 head"
                style={{ color: "white" , fontSize: "30px"}}
              >
                Python Flask
              </h2>
              <p className="leading-relaxed text-base para" style={{ color: "white" , fontSize: "20px"}}>
                Python Flask is a lightweight and versatile web framework used
                for building web applications and APIs. It is designed to make
                it easy to create web services and handle HTTP requests, making
                it a popular choice for developing server-side components of
                applications..
              </p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </a>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="sm:w-16 sm:h-16 w-10 h-10"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="sm:w-16 sm:h-16 w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2
                className="text-gray-900 text-lg title-font font-medium mb-2 head"
                style={{ color: "white" , fontSize: "30px"}}
              >
                Web Development
              </h2>
              <p className="leading-relaxed text-base para" style={{ color: "white" , fontSize: "20px"}}>
                React is a popular JavaScript library for building user
                interfaces (UI) for web applications. It allows developers to
                create interactive and dynamic UI components that update and
                change in response to user actions, without needing to reload
                the entire web page. React is known for its component-based
                architecture, which makes it easier to manage and reuse UI
                elements.
              </p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="row">
          <div className="feature-box col-lg-4">
            <i className=" icon fa-regular fa-circle-check fa-4x"></i>

            <h3>Accurate Fund Flow Data</h3>
            <p className="grey">
              Gain precise insights into fund movements and performance. Make
              data-driven investment decisions with confidence.
            </p>
          </div>

          <div className="feature-box col-lg-4">
            <i className=" icon fa-sharp fa-solid fa-bullseye fa-4x"></i>
            <h3>Enhanced Risk Management</h3>
            <p className="grey">
              Identify potential risks and opportunities in fund trails.
              Mitigate risks and optimize portfolio strategies effectively
            </p>
          </div>
          <div className="feature-box col-lg-4">
            <i className=" icon fa-solid fa-heart fa-4x"></i>
            <h3>Trusted Expertise and Security </h3>
            <p className="grey">
              Experienced financial analysts provide expert analysis. Ensure
              data security and compliance with industry standards.
            </p>
          </div>
        </div>
      </section>
      <section id="grad-color">
        <section className="text-gray-600 body-font relative">
          <div className="absolute inset-0 bg-gray-300">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="map"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4);" }}
            ></iframe>
          </div>
          <div className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                For any Queries
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                Precise fund flow insights for confident investment decisions.
                Feel free to ask!
              </p>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlForS="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <button className="text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                Send
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Our team will respond you shortly.Thank you for visiting us.
              </p>
            </div>
          </div>
        </section>

        {/* <footer id="footer" className="gradient-background">
          <div className="container">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 mt-5 ">
              <div className="col mb-3">
                <p className="text-body-secondary">© Team404</p>
              </div>

              <div className="col mb-3"></div>

              <div className="col mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column foot">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-primary">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Features
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column foot">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Features
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column foot">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      Features
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      TechStack
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-body-secondary">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
          <p>© Copyright Team404</p>
        </footer>*/}
      </section>
    </div>
  );
};

export default UploadData;
