import React, { useEffect, useState } from "react";
import Header from "./components/layout/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import LeftSidebar from "./components/layout/leftsidebar/LeftSidebar";
import AdminRoutes from "./components/routes/AdminRoutes";
import UserRoutes from "./components/routes/UserRoutes";
import SpinnerLoader from "./components/layout/loader/SpinnerLoader";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (!isLoading && user && user.role === "admin") {
    return (
      <div className="App" style={{ overflowX: "hidden" }}>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <LeftSidebar isSidebarOpen={isSidebarOpen} />
        <AdminRoutes />
        <UserRoutes
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    );
  } else
    return (
      <div className="App" style={{ overflowX: "hidden" }}>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <LeftSidebar isSidebarOpen={isSidebarOpen} />
        <UserRoutes
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    );
}

export default App;
