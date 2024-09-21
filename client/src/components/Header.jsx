import { Box, Container, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="teal.500" color="white" py={4}>
      <Container maxW="container.lg">
        <Heading as="h1" size="lg">
          Tasko
        </Heading>
      </Container>
    </Box>
  );
};

export default Header;
