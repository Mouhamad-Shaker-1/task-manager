import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function StyledLink({ to, children, ...props }) {
  return (
    <ChakraLink as={RouterLink} to={to} {...props}>
      {children}
    </ChakraLink>
  );
}

export default StyledLink;
