
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { Box } from "@chakra-ui/react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box minH="100vh" bg="gray.100">
      
      <Box
        ml={{ lg: isSidebarOpen ? "250px" : "0" }}
        transition="margin-left 0.3s"
        h="100%"
      >
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Box p={4} h="100%">
          <Box h="100%" bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </Box>
  );
};

export default DashboardLayout;
