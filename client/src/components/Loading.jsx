import React from "react";
import { Box, Spinner, Text, Center } from "@chakra-ui/react";


const LoadingComponent = () => {
  return (
    <Center height="200px" bg="transparent">
      <Box textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          marginBottom="4"
        />
        <Text fontSize="xl" color="gray.600">
          Loading...
        </Text>
      </Box>
    </Center>
  );
};

export default LoadingComponent;
