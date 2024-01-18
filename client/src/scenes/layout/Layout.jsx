import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector(state => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width='100%' height='100%'>
      <Sidebar
        data={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flex={1}>
        <Navbar
          data={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
