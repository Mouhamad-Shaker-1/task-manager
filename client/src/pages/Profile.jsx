import React, { Suspense, useContext, useEffect } from "react";
import {
  Form,
  useActionData,
  redirect,
  useNavigation,
  useLoaderData,
  defer,
  Await,
  useRevalidator,
} from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { requireAuth, updateUserInLocalStorge } from "../utils";
import CustomFileInput from "../components/CustomFieldInput";
import { getUser, updateUser } from "../api";
import LoadingComponent from "../components/Loading";
import useRevalidateOnUserChange from "../hooks/useRevalidateOnUserChange";

export const loader = async ({ request }) => {
  await requireAuth(request);
  const user = getUser();
  return defer({ user });
};

export const action =
  (reloadData) =>
  async ({ request }) => {
    const formData = await request.formData();

    const data = await updateUser(formData);

    const user = {
      name: data.name,
      email: data.email,
      profileImage: data.profileImage,
    };

    updateUserInLocalStorge(user);

    reloadData(user);

    return null;
  };

const ProfileForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";
  const loaderData = useLoaderData();

  useRevalidateOnUserChange();

  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Await resolve={loaderData.user}>
        {(user) => {
          return (
            <Box
              p={8}
              maxWidth="800px"
              mx="auto"
              bg={bgColor}
              borderRadius="lg"
              boxShadow="lg"
            >
              <Form
                method="post"
                encType="multipart/form-data"
                key={user.name + user.email + user.profileImage}
              >
                <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
                  <GridItem>
                    <FormControl id="name">
                      <FormLabel>Name</FormLabel>
                      <Input
                        defaultValue={user.name}
                        type="text"
                        name="name"
                        required
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        defaultValue={user.lastName}
                        type="text"
                        name="lastName"
                        required
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <Input
                        defaultValue={user.email}
                        type="email"
                        name="email"
                        required
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <FormControl id="profileImage">
                      <FormLabel>Profile Image</FormLabel>
                      <CustomFileInput
                        name="profileImage"
                        accept="image/*"
                        onChange={(e) => console.log(e.target.files[0])}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <Button
                      isLoading={isSubmitting}
                      loadingText="submitting..."
                      mt={4}
                      colorScheme="teal"
                      type="submit"
                      size="lg"
                      width="full"
                    >
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </Form>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default ProfileForm;
