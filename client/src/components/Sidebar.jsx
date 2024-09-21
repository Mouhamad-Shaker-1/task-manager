import React from "react";
import {
  Box,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
const Sidebar = ({ isOpen, onClose }) => {
  const activeLinkStyles = {
    fontWeight: "bold",
    color: "#81E6D9",
    backgroundColor: "#2C7A7B",
    borderLeft: "4px solid",
    borderColor: "#81E6D9",
    paddingLeft: "12px",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
  };

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w={isOpen ? "250px" : "0"}
      bg="teal.600"
      color="white"
      overflowX="hidden"
      transition="width 0.3s"
      zIndex={10}
      boxShadow="lg"
    >
      <IconButton
        icon={<CloseIcon />}
        position="absolute"
        top={2}
        right={2}
        aria-label="Close Sidebar"
        onClick={onClose}
        variant="ghost"
        colorScheme="whiteAlpha"
        size="sm"
        display={{ base: "block", lg: "none" }} // Show on small screens, hide on large screens
      />
      <VStack align="stretch" spacing={4} p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Sidebar
        </Text>
        <NavLink
          to="."
          end
          style={({ isActive }) =>
            isActive
              ? activeLinkStyles
              : { textDecoration: "none", color: "inherit" }
          }
        >
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Today's Tasks
          </Text>
        </NavLink>
        <NavLink
          to="all-tasks"
          style={({ isActive }) =>
            isActive
              ? activeLinkStyles
              : { textDecoration: "none", color: "inherit" }
          }
        >
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            tasks with date
          </Text>
        </NavLink>
        <NavLink
          to="status"
          style={({ isActive }) =>
            isActive
              ? activeLinkStyles
              : { textDecoration: "none", color: "inherit" }
          }
        >
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            status
          </Text>
        </NavLink>
        <NavLink
          to="profile"
          style={({ isActive }) =>
            isActive
              ? activeLinkStyles
              : { textDecoration: "none", color: "inherit" }
          }
        >
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Profile
          </Text>
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
