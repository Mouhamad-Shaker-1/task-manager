import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  const bgColor = useColorModeValue("teal.50", "teal.900");
  const textColor = useColorModeValue("teal.700", "teal.200");
  const buttonColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      direction="column"
      p={4}
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2} color={textColor}>
          Page Not Found
        </Text>
        <Text color={textColor} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <Button
          as={RouterLink}
          to="/"
          colorScheme="teal"
          bg={buttonColor}
          color="white"
          variant="solid"
          size="lg"
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
};

export default NotFound;
