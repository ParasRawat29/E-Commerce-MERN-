import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PublicIcon from "@mui/icons-material/Public";
import DomainIcon from "@mui/icons-material/Domain";
import styled from "styled-components";
import MetaData from "../../../MetaData";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { saveShipingInfo } from "../../../../redux/actions/cartAction";
import CheckOutSteps from "./CheckOutSteps";

// styles for this component
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 60vh;
  font-family: "Roboto";
  /* background-color: lightblue; */
  .shippingWrapper {
    width: 95%;
    max-width: 400px;
    h2 {
      text-align: center;
      border-bottom: 1px solid black;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .inputGroup {
        border: 2px solid black;
        width: 80%;
        display: flex;
        align-items: center;
        margin: 0.7rem 0;
        position: relative;
        padding: 0 10px;
        input,
        select {
          height: 100%;
          width: 90%;
          font-size: 1.2rem;
          padding: 10px 15px;
          outline: none;
          border: none;
          background: transparent;
          z-index: 1;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        select {
          cursor: pointer;
        }
        & > label {
          position: absolute;
          top: 14px;
          left: 40px;
          font-size: 0.9rem;
          font-weight: 900;
          letter-spacing: 1px;
          background: inherit;
          transition: all 0.3s ease-in-out;
          color: gray;
          user-select: none;
          padding: 0 3px;
          z-index: 0;
        }
        input:focus + label,
        input:valid + label {
          transform: translate(-6px, -24px);
          font-size: 0.7rem;
          color: #fab700;
          background-color: white;
          z-index: 1;
        }
      }

      button {
        box-sizing: border-box;
        width: 90%;
        background-color: #ffb328;
        padding: 5px 10px;
        font-size: 1.3rem;
        font-weight: 700;
        cursor: pointer;
        color: black;
        &:hover {
          background-color: orange;
        }
        &:active {
          transform: scale(0.94);
        }
      }
    }
  }
`;

function Shipping() {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const ele = e.target.name;
    const val = e.target.value;

    setAddress((pre) => {
      return {
        ...pre,
        [ele]: val,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.phoneNumber.length < 10 || address.phoneNumber.length < 10) {
      alert.error("Phone number should be of 10 digits");
      return;
    }

    dispatch(saveShipingInfo(address));
    navigate("/order/confirm");
  };

  useEffect(() => {
    if (shippingInfo) {
      setAddress(() => {
        return {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          pincode: shippingInfo.pincode,
          phoneNumber: shippingInfo.phoneNo,
        };
      });
    }
  }, [shippingInfo]);

  console.log(shippingInfo);
  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckOutSteps activeStep={0} />
      <Container>
        <div className="shippingWrapper">
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <HomeIcon />
              <input
                name="address"
                type="text"
                onChange={handleInputChange}
                value={address.address}
                required
              />
              <label>Address</label>
            </div>
            <div className="inputGroup">
              <LocationCityIcon />
              <input
                name="city"
                type="text"
                onChange={handleInputChange}
                value={address.city}
                required
              />
              <label>City</label>
            </div>
            <div className="inputGroup">
              <LocationOnIcon />
              <input
                name="pincode"
                type="number"
                onChange={handleInputChange}
                value={address.pincode}
                required
              />
              <label>Pincode</label>
            </div>

            <div className="inputGroup">
              <LocalPhoneIcon />
              <input
                type="number"
                name="phoneNumber"
                onChange={handleInputChange}
                value={address.phoneNumber}
                size="10"
                required
              />
              <label>Phone No.</label>
            </div>
            <div className="inputGroup" style={{ padding: "5px 0" }}>
              <PublicIcon />
              <select
                name="country"
                required
                value={address.country}
                onChange={handleInputChange}
              >
                <option value={null} style={{ color: "gray" }}>
                  Country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {address.country && (
              <div className="inputGroup" style={{ padding: "5px 0" }}>
                <DomainIcon />
                <select
                  name="state"
                  required
                  value={address.state}
                  onChange={handleInputChange}
                >
                  <option key="0" value={null} disabled>
                    State
                  </option>
                  {State &&
                    State.getStatesOfCountry(address.country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button type="submit" disabled={address.state ? false : true}>
              Continue
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Shipping;
