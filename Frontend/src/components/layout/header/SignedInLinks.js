import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import cart from "../../../assets/icons/cart.svg";
import { logout } from "../../../redux/actions/userAction";
import MetaData from "../../MetaData";

function SignedInLinks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleOrderClick = () => {
    navigate("/orders");
  };
  const handleLogoutClick = () => {
    dispatch(logout());
    alert.success("Logout Successful");
  };
  const handleDashboardClick = () => {
    navigate("/admin/dashboard");
  };
  let actions = [
    { icon: <PersonIcon />, name: "Profile", func: handleProfileClick },
    { icon: <LocalMallIcon />, name: "Orders", func: handleOrderClick },
    { icon: <LogoutIcon />, name: "Logout", func: handleLogoutClick },
  ];

  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  if (user.role === "admin") {
    actions = [
      {
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: handleDashboardClick,
      },
      ...actions,
    ];
  }
  const noOfItems = useSelector((state) => state.cart.cartItems).length;

  return (
    <div className="cartWrapper">
      <MetaData title="Cart" />
      <Link to="/myCart">
        <button className="cartBtn">
          <div class="cartWrapper">
            <div class="cart">
              <img className="cartIcon" src={cart} alt="" />
              <div
                class="num"
                style={{ display: noOfItems === 0 ? "none" : "inline" }}
              >
                {noOfItems}
              </div>
            </div>
          </div>
        </button>
      </Link>
      <div className="userIcon">
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "absolute", top: 3, right: 0 }}
          direction={"down"}
          icon={
            user && user.avatar.image_url ? (
              <img
                src={user.avatar.image_url}
                alt="user"
                className="userImage"
                width="40px"
                height="40px"
              />
            ) : (
              "🧑"
            )
          }
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          className="speedD"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}

export default SignedInLinks;
