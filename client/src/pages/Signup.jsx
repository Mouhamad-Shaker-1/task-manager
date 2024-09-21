import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { StyledLink } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import { handleUsersInLocalStorgeWhenGetNewUser } from "../utils";

// if the user try go access a page and that page need auth he will get a message
// on his screan and the search is the url if he swich to signup page or login
export function loader({ request }) {
  const message = new URL(request.url).searchParams.get("message");
  const search = new URL(request.url).search;
  return { message, search };
}

export const action =
  (reloadData) =>
  async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const location = formData.get("location");

    // to send the user to that page he was trying to access
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/dashboard";

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        { name, lastName, email, password, location }
      );
      const data = response.data;

      const user = {
        name: data.name,
        email: data.email,
        profileImage: data.profileImage,
        token: data.token,
      };

      handleUsersInLocalStorgeWhenGetNewUser(user);

      reloadData(user);

      handleUsersInLocalStorgeWhenGetNewUser(data);

      toast.success("Login successful!");

      return redirect(pathname);
    } catch (error) {
      toast.error("Signup failed: " + error.message);
    }
    return null;
  };

const SignupPage = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const navigation = useNavigation();

  const { message, search } = useLoaderData();

  const isSubmitting = navigation.state == "submitting";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxW="container.sm" py={10}>
        <Box
          p={6}
          borderRadius="lg"
          bg={formBackground}
          boxShadow="md"
          width="100%"
        >
          <Text color="red" textAlign="center">
            {message && message}
          </Text>
          <Form method="post" replace>
            <VStack spacing={4} align="start">
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input
                  required
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  required
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl id="location">
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  type="text"
                  placeholder="Enter your location"
                />
              </FormControl>
              <Button
                colorScheme="teal"
                width="full"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Signing up..."
              >
                Sign Up
              </Button>
              <Text margin="auto" fontSize="sm">
                you already have an acount?
                <StyledLink
                  to={`../login${search}`}
                  color="blue.500"
                  textDecoration="underline"
                >
                  Login
                </StyledLink>
              </Text>
            </VStack>
          </Form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupPage;
