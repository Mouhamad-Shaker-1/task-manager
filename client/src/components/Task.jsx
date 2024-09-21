import {
  GridItem,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Task = ({ task, deleteTask, handleComplete }) => {
  const bgColor = useColorModeValue(
    task.completed ? "green.500" : "teal.500",
    task.completed ? "green.700" : "teal.700"
  );
  const textColor = useColorModeValue("white", "gray.200");

  return (
    <GridItem bg={bgColor} color={textColor} p={4} borderRadius="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          {task.name}
        </Text>
        <Flex>
          <IconButton
            icon={<CheckIcon />}
            aria-label="Complete Task"
            onClick={() => handleComplete(task._id, task.completed)}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="sm"
            mr={2}
          />
          <Link to={`/dashboard/edit-task/${task._id}`}>
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit Task"
              variant="ghost"
              colorScheme="whiteAlpha"
              size="sm"
              mr={2}
            />
          </Link>
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Task"
            onClick={() => deleteTask(task._id)}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="sm"
          />
        </Flex>
      </Flex>
      <Text>{task.description}</Text>
    </GridItem>
  );
};

export default Task;
