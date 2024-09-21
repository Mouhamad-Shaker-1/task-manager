import React from "react";
import { Box, FormLabel, Button, useColorModeValue } from "@chakra-ui/react";

const CustomFileInput = React.forwardRef(
  ({ onChange, name, accept, required }, ref) => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const hoverBgColor = useColorModeValue("gray.200", "gray.600");

    return (
      <Box position="relative" cursor="pointer">
        <FormLabel
          htmlFor={name}
          cursor="pointer"
          bg={bgColor}
          p={4}
          borderRadius="md"
          textAlign="center"
          _hover={{ bg: hoverBgColor }}
          transition="background-color 0.2s"
        >
          Choose File
        </FormLabel>
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          required={required}
          onChange={onChange}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
          ref={ref}
        />
      </Box>
    );
  }
);

export default CustomFileInput;
