import React, { useContext, useEffect } from "react";
import { getDateString, requireAuth } from "../utils";
import { AllTasks } from "../components";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { DateContext } from "../context/DateContext";

export const loader = async ({ request }) => {
  await requireAuth(request);
  return null;
};

const TodayTasks = () => {
  const { setGlobleDateToAddingTask } = useContext(DateContext);

  const today = new Date();

  useEffect(() => {
    setGlobleDateToAddingTask(today);
  }, []);

  return (
    <Box p={4}>
      <Flex>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Today's Tasks
        </Text>
        <Spacer />
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          {getDateString(today)}
        </Text>
      </Flex>
      <AllTasks />
    </Box>
  );
};

export default TodayTasks;
