import { AddIcon } from "@chakra-ui/icons";
import { GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AddTaskItem = () => {
  return (
    <GridItem
      as={Link}
      cursor="pointer"
      to="/dashboard/add-task"
      bg="teal.500"
      color="white"
      p="1.5em 1em"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{ textDecoration: "none", bg: "teal.600" }}
      gridColumn={{ base: "span 1", md: "span 2" }}
    >
      <AddIcon mr={2} />
      <Text fontSize="lg" fontWeight="semibold">
        Add Task
      </Text>
    </GridItem>
  );
};

export default AddTaskItem;
