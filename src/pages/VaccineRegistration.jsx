import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import vaccineRegistration from "../assets/vaccineRegistration.png";
import HospitalDropdown from "../components/HospitalDropdown";
import VaccineDropdown from "../components/VaccineDropdown";
import axios from "axios";
import { ActivePageType } from "../../utils/ActivePageType";
import GreenAlert from "../components/GreenAlert";
import RedAlert from "../components/RedAlert";
import { useNavigate } from "react-router";

const VaccineRegistration = () => {
  const [disableFields, setDisableFields] = useState(false);
  const [hospital, setHospital] = useState();
  const [vaccine, setVaccine] = useState();
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nid, setNid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const clearResponseMessages = () => {
      setErrorMessage("");
      if (responseMessage) {
        setResponseMessage("");
        navigate("/vaccines/"+localStorage.nid);
      }
    };

    if (responseMessage) {
      const timer = setTimeout(clearResponseMessages, 1000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  useEffect(() => {
    const clearErrorMessages = () => {
      setErrorMessage("");
    };

    if (errorMessage) {
      const timer = setTimeout(clearErrorMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleVaccineRegistration = async (e) => {
    console.log();
    e.preventDefault();
    setDisableFields(true);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      n_id: localStorage.nid,
      vaccine_id: vaccine._id,
      administeredAt: hospital,
      vaccine_name: vaccine.vaccine_name,
    };
    console.log(body);

    try {
      const register = await axios.post(
        "https://vaccine-app-server-kilfewcikq-uc.a.run.app/api/vaccine/vaccine_register",
        {
          n_id: localStorage.nid,
          vaccine_id: vaccine._id,
          administeredAt: hospital,
          vaccine_name: vaccine.vaccine_name,
        },
        config
      );

      const response = register.data;
      console.log(response);
      if (response.success) {
        setDisableFields(true);
        setErrorMessage("");
        setResponseMessage(response.message);
        // navigate("/vaccines");
        // window.location.reload();
      } else {
        setErrorMessage("");
        setResponseMessage(response.message);
      }
    } catch (error) {
      setResponseMessage("");
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      <Navbar active_page={ActivePageType.VaccineRegistration} />
      <fieldset disabled={disableFields}>
        <form
          className="bg-white relative lg:py-4"
          onSubmit={handleVaccineRegistration}
        >
          <div
            className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
        xl:px-5 lg:flex-row"
          >
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                  <img src={vaccineRegistration} className="btn-" />
                </div>
              </div>
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                  <button
                    type="submit"
                    className="w-full text-4xl font-medium text-center leading-snug font-serif"
                  >
                    Book Your Vaccination
                  </button>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <p
                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-6 mr-0 mb-12 font-medium text-gray-600
                    absolute"
                      >
                        Hospital
                      </p>
                      {/* <OnKeySearchDropdown onSelect={setHospital}/> */}
                      <HospitalDropdown
                        onSelect={(selectedHospital) =>
                          setHospital(selectedHospital)
                        }
                      />
                    </div>

                    <div className="relative">
                      <p
                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-6 mr-0 mb-0 font-medium text-gray-600
                    absolute "
                      >
                        Vaccine
                      </p>
                      <VaccineDropdown
                        onSelect={(selectedVaccine) =>
                          setVaccine(selectedVaccine)
                        }
                      />
                    </div>
                    {errorMessage && <RedAlert alert_message={errorMessage} />}
                    {!errorMessage && responseMessage && (
                      <GreenAlert alert_message={responseMessage} />
                    )}

                    <div className="relative">
                      <button
                        disabled={disableFields}
                        className={`w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white  bg-indigo-500
                    rounded-lg transition duration-200 hover:bg-indigo-600`}
                      >
                        Book Vaccination
                      </button>
                    </div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 91 91"
                  className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
              fill-current"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72" />
                          <circle cx="15.296" cy="3.445" r="2.719" />
                          <circle cx="27.333" cy="3.445" r="2.72" />
                          <circle cx="39.369" cy="3.445" r="2.72" />
                          <circle cx="51.405" cy="3.445" r="2.72" />
                          <circle cx="63.441" cy="3.445" r="2.72" />
                          <circle cx="75.479" cy="3.445" r="2.72" />
                          <circle cx="87.514" cy="3.445" r="2.719" />
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72" />
                          <circle cx="15.296" cy="3.525" r="2.719" />
                          <circle cx="27.333" cy="3.525" r="2.72" />
                          <circle cx="39.369" cy="3.525" r="2.72" />
                          <circle cx="51.405" cy="3.525" r="2.72" />
                          <circle cx="63.441" cy="3.525" r="2.72" />
                          <circle cx="75.479" cy="3.525" r="2.72" />
                          <circle cx="87.514" cy="3.525" r="2.719" />
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72" />
                          <circle cx="15.296" cy="3.605" r="2.719" />
                          <circle cx="27.333" cy="3.605" r="2.72" />
                          <circle cx="39.369" cy="3.605" r="2.72" />
                          <circle cx="51.405" cy="3.605" r="2.72" />
                          <circle cx="63.441" cy="3.605" r="2.72" />
                          <circle cx="75.479" cy="3.605" r="2.72" />
                          <circle cx="87.514" cy="3.605" r="2.719" />
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72" />
                          <circle cx="15.296" cy="3.686" r="2.719" />
                          <circle cx="27.333" cy="3.686" r="2.72" />
                          <circle cx="39.369" cy="3.686" r="2.72" />
                          <circle cx="51.405" cy="3.686" r="2.72" />
                          <circle cx="63.441" cy="3.686" r="2.72" />
                          <circle cx="75.479" cy="3.686" r="2.72" />
                          <circle cx="87.514" cy="3.686" r="2.719" />
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72" />
                          <circle cx="15.296" cy="2.767" r="2.719" />
                          <circle cx="27.333" cy="2.767" r="2.72" />
                          <circle cx="39.369" cy="2.767" r="2.72" />
                          <circle cx="51.405" cy="2.767" r="2.72" />
                          <circle cx="63.441" cy="2.767" r="2.72" />
                          <circle cx="75.479" cy="2.767" r="2.72" />
                          <circle cx="87.514" cy="2.767" r="2.719" />
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72" />
                          <circle cx="15.296" cy="2.846" r="2.719" />
                          <circle cx="27.333" cy="2.846" r="2.72" />
                          <circle cx="39.369" cy="2.846" r="2.72" />
                          <circle cx="51.405" cy="2.846" r="2.72" />
                          <circle cx="63.441" cy="2.846" r="2.72" />
                          <circle cx="75.479" cy="2.846" r="2.72" />
                          <circle cx="87.514" cy="2.846" r="2.719" />
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72" />
                          <circle cx="15.296" cy="2.926" r="2.719" />
                          <circle cx="27.333" cy="2.926" r="2.72" />
                          <circle cx="39.369" cy="2.926" r="2.72" />
                          <circle cx="51.405" cy="2.926" r="2.72" />
                          <circle cx="63.441" cy="2.926" r="2.72" />
                          <circle cx="75.479" cy="2.926" r="2.72" />
                          <circle cx="87.514" cy="2.926" r="2.719" />
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72" />
                          <circle cx="15.296" cy="3.006" r="2.719" />
                          <circle cx="27.333" cy="3.006" r="2.72" />
                          <circle cx="39.369" cy="3.006" r="2.72" />
                          <circle cx="51.405" cy="3.006" r="2.72" />
                          <circle cx="63.441" cy="3.006" r="2.72" />
                          <circle cx="75.479" cy="3.006" r="2.72" />
                          <circle cx="87.514" cy="3.006" r="2.719" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <svg
                  viewBox="0 0 91 91"
                  className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
              fill-current"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72" />
                          <circle cx="15.296" cy="3.445" r="2.719" />
                          <circle cx="27.333" cy="3.445" r="2.72" />
                          <circle cx="39.369" cy="3.445" r="2.72" />
                          <circle cx="51.405" cy="3.445" r="2.72" />
                          <circle cx="63.441" cy="3.445" r="2.72" />
                          <circle cx="75.479" cy="3.445" r="2.72" />
                          <circle cx="87.514" cy="3.445" r="2.719" />
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72" />
                          <circle cx="15.296" cy="3.525" r="2.719" />
                          <circle cx="27.333" cy="3.525" r="2.72" />
                          <circle cx="39.369" cy="3.525" r="2.72" />
                          <circle cx="51.405" cy="3.525" r="2.72" />
                          <circle cx="63.441" cy="3.525" r="2.72" />
                          <circle cx="75.479" cy="3.525" r="2.72" />
                          <circle cx="87.514" cy="3.525" r="2.719" />
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72" />
                          <circle cx="15.296" cy="3.605" r="2.719" />
                          <circle cx="27.333" cy="3.605" r="2.72" />
                          <circle cx="39.369" cy="3.605" r="2.72" />
                          <circle cx="51.405" cy="3.605" r="2.72" />
                          <circle cx="63.441" cy="3.605" r="2.72" />
                          <circle cx="75.479" cy="3.605" r="2.72" />
                          <circle cx="87.514" cy="3.605" r="2.719" />
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72" />
                          <circle cx="15.296" cy="3.686" r="2.719" />
                          <circle cx="27.333" cy="3.686" r="2.72" />
                          <circle cx="39.369" cy="3.686" r="2.72" />
                          <circle cx="51.405" cy="3.686" r="2.72" />
                          <circle cx="63.441" cy="3.686" r="2.72" />
                          <circle cx="75.479" cy="3.686" r="2.72" />
                          <circle cx="87.514" cy="3.686" r="2.719" />
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72" />
                          <circle cx="15.296" cy="2.767" r="2.719" />
                          <circle cx="27.333" cy="2.767" r="2.72" />
                          <circle cx="39.369" cy="2.767" r="2.72" />
                          <circle cx="51.405" cy="2.767" r="2.72" />
                          <circle cx="63.441" cy="2.767" r="2.72" />
                          <circle cx="75.479" cy="2.767" r="2.72" />
                          <circle cx="87.514" cy="2.767" r="2.719" />
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72" />
                          <circle cx="15.296" cy="2.846" r="2.719" />
                          <circle cx="27.333" cy="2.846" r="2.72" />
                          <circle cx="39.369" cy="2.846" r="2.72" />
                          <circle cx="51.405" cy="2.846" r="2.72" />
                          <circle cx="63.441" cy="2.846" r="2.72" />
                          <circle cx="75.479" cy="2.846" r="2.72" />
                          <circle cx="87.514" cy="2.846" r="2.719" />
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72" />
                          <circle cx="15.296" cy="2.926" r="2.719" />
                          <circle cx="27.333" cy="2.926" r="2.72" />
                          <circle cx="39.369" cy="2.926" r="2.72" />
                          <circle cx="51.405" cy="2.926" r="2.72" />
                          <circle cx="63.441" cy="2.926" r="2.72" />
                          <circle cx="75.479" cy="2.926" r="2.72" />
                          <circle cx="87.514" cy="2.926" r="2.719" />
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72" />
                          <circle cx="15.296" cy="3.006" r="2.719" />
                          <circle cx="27.333" cy="3.006" r="2.72" />
                          <circle cx="39.369" cy="3.006" r="2.72" />
                          <circle cx="51.405" cy="3.006" r="2.72" />
                          <circle cx="63.441" cy="3.006" r="2.72" />
                          <circle cx="75.479" cy="3.006" r="2.72" />
                          <circle cx="87.514" cy="3.006" r="2.719" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  );
};

export default VaccineRegistration;
