import React from 'react';
import { Box, Heading, Text, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useRouteError } from 'react-router-dom';

const ErrorPage = ({ error }) => {

  const routeError = useRouteError();
  console.log(routeError, error)

  const bgColor = useColorModeValue('teal.50', 'teal.900');
  const textColor = useColorModeValue('teal.700', 'teal.200');
  const buttonColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Flex
      h='100%'
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
          Oops!
        </Heading>
        <Text fontSize="18px" mt={3} mb={2} color={textColor}>
          {routeError ? routeError.message : error}
        </Text>
        <Text color={textColor} mb={6}>
          Please try again later or contact support if the problem persists.
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

export default ErrorPage;
