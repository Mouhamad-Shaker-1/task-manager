import React from "react";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { UsersContext } from "../context/UsersContext";
import { Link, Navigate } from "react-router-dom";

const DashboardHeader = ({ isSidebarOpen, toggleSidebar }) => {
  // the context to re-render the page if change the user
  const { currentUser, users, reloadData } = React.useContext(UsersContext);

  // if the last user log out navitage to home page without to try to call api if was in today page or all tasks with data
  const [redirectTo, setRedirectTo] = React.useState(null);

  // set the user in localStoage and the reloadData() update the context
  const handleSwitchUser = (user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
    reloadData(user);
  };

  // delete the user form LocalStorge and update the context by reLaodData()
  const handleLogout = () => {
    const usersLocal = JSON.parse(localStorage.getItem("users"));
    const newUsers = usersLocal.filter(
      (user) => user.email !== currentUser.email
    );

    // if the last user remove users and current-user
    if (newUsers.length == 0) {
      localStorage.removeItem("users");
      localStorage.removeItem("current-user");

      reloadData();

      // redirct to home
      setRedirectTo("/");
    } else {
      const newCurrentUser = newUsers[0];
      localStorage.setItem("users", JSON.stringify(newUsers));
      localStorage.setItem("current-user", JSON.stringify(newCurrentUser));
      reloadData(newCurrentUser);
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} replace={true} />;
  }

  const AvatarCurrentUser = () => {
    const urlImage = currentUser
      ? currentUser?.profileImage !== "" &&
        `http://localhost:3000${currentUser.profileImage}`
      : "";
    return (
      <Avatar
        size={"sm"}
        bg="green"
        color="#fff"
        name={currentUser?.name}
        src={urlImage}
      />
    );
  };

  return (
    <Box bg="teal.500" color="white" py={4} px={8} boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Button colorScheme="whiteAlpha" onClick={toggleSidebar}>
          <Icon as={HamburgerIcon} />
        </Button>

        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              color="withe"
              _hover={{ textDecoration: "none" }}
            >
              <AvatarCurrentUser />
              <ChevronDownIcon ml={2} />
            </MenuButton>
            <MenuList bg="teal.500" color="white">
              <MenuItem mb={1} bg="teal.600" _hover={{ bg: "teal.600" }}>
                <AvatarCurrentUser />
                <Text ml={3}>{currentUser?.name}</Text>
              </MenuItem>

              {users &&
                users.map((user) => {
                  return (
                    <MenuItem
                      key={user.email}
                      onClick={() => handleSwitchUser(user)}
                      mb={1}
                      bg="teal.500"
                      _hover={{ bg: "teal.600" }}
                    >
                      <Avatar
                        size={"sm"}
                        color="withe"
                        bg="green"
                        name={user.name}
                        src={
                          user.profileImage !== "" &&
                          `http://localhost:3000${user.profileImage}`
                        } // Replace with actual avatar URL
                      />
                      <Text ml={3}>{user.name}</Text>
                    </MenuItem>
                  );
                })}

              <Button
                as={Link}
                border="2px"
                to="/signup"
                mb={1}
                w="100%"
                borderColor="gray.600"
                color="gray.700"
                colorScheme="teal"
              >
                Add New User
              </Button>

              <Button onClick={handleLogout} colorScheme="red" w="100%">
                Log Out
              </Button>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
