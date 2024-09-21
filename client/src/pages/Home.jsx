// src/pages/Home.jsx
import React from "react";
import { Link, redirect } from "react-router-dom";
import { Header } from "../components";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

//  if the user already have loging it will go to dashboard
export const loader = () => {
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  if (currentUser?.token || currentUser) {
    return redirect("/dashboard");
  }
  return null;
};

const Home = () => {
  return (
    <Box>
      <Header />
      {/* Body */}
      <Container maxW="container.lg" py={10}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
        >
          {/* Description Block */}
          <VStack spacing={4} align="start" flex="1" mr={{ base: 0, md: 10 }}>
            <Heading as="h2" size="xl">
              Welcome to Tasko app
            </Heading>
            <Text fontSize="lg">
              Tasko makes managing your tasks effortless. With intuitive
              features like drag-and-drop prioritization, deadline tracking, and
              smart reminders, Tasko helps you stay organized and productive.
              Whether you're working solo or with a team, Tasko keeps everything
              on track with ease.
            </Text>
            <Box>
              <Link to="login">
                <Button colorScheme="teal" mr={4}>
                  Login
                </Button>
              </Link>
              <Link to="signup">
                <Button variant="outline" colorScheme="teal">
                  Signup
                </Button>
              </Link>
            </Box>
          </VStack>

          {/* Image Block */}
          <Box flex="1" mt={{ base: 6, md: 0 }}>
            <Image
              src="./task-manager.png"
              alt="Description of the image"
              borderRadius="md"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
