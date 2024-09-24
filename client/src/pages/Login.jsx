import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { StyledLink } from "../components";
import axios from "axios";
import { toast } from "react-toastify";
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
    const email = formData.get("email");
    const password = formData.get("password");

    // to send the user to that page he was trying to access
    const pathname =
      new URL(request.url).searchParams.get("redirectTo") || "/dashboard";

    try {
      const response = await axios.post(
        "https://taskmanagerms-hbb3uppc.b4a.run/api/v1/auth/login",
        { email, password }
      );
      const data = response.data;

      const user = {
        name: data.name,
        email: data.email,
        profileImage: data.profileImage,
        token: data.token,
      };

      const addUser = handleUsersInLocalStorgeWhenGetNewUser(user);

      reloadData(user);
      if (addUser) {
        toast.success("Login successful!");
      } else {
        toast.warn("you already have that user");
      }
      return redirect(pathname);
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
    return null;
  };

const LoginPage = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const { message, search } = useLoaderData();

  const navigation = useNavigation();
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
              <Button
                isLoading={isSubmitting}
                loadingText="Logging in..."
                colorScheme="teal"
                width="full"
                type="submit"
              >
                Login
              </Button>
              <Text margin="auto" fontSize="sm">
                you don't have acount?
                <StyledLink
                  to={`../signup${search}`}
                  color="blue.500"
                  textDecoration="underline"
                >
                  register
                </StyledLink>
              </Text>
            </VStack>
          </Form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
