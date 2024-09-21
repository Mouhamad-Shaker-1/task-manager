import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { FaTasks, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { getAllTasksFromAPI, getPerformance } from "../api";
import LoadingComponent from "../components/Loading";
import { requireAuth } from "../utils";
import { Await, defer, useLoaderData, useRevalidator } from "react-router-dom";
import useRevalidateOnUserChange from "../hooks/useRevalidateOnUserChange";

export const loader = async ({ request }) => {
  await requireAuth(request);
  const data = getPerformance();
  return defer({ data });
};

const StatusPage = () => {
  const dataPerformanc = useLoaderData();

  useRevalidateOnUserChange();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Await resolve={dataPerformanc.data}>
        {(dataPerformanc) => {
          return (
            <Box p={4}>
              <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
                Task Manager Status
              </Text>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={6}
              >
                <Card variant="elevated" bg="blue.500" color="white">
                  <CardHeader>
                    <Flex alignItems="center">
                      <Icon as={FaTasks} boxSize={6} mr={5} />
                      <Stat>
                        <StatLabel>Total Tasks</StatLabel>
                        <StatNumber>{dataPerformanc.totalTasks}</StatNumber>
                      </Stat>
                    </Flex>
                  </CardHeader>
                </Card>
                <Card variant="elevated" bg="green.500" color="white">
                  <CardHeader>
                    <Flex alignItems="center">
                      <Icon as={FaCheckCircle} boxSize={6} mr={5} />
                      <Stat>
                        <StatLabel>Completed Tasks</StatLabel>
                        <StatNumber>{dataPerformanc.completedTasks}</StatNumber>
                      </Stat>
                    </Flex>
                  </CardHeader>
                </Card>
                <Card variant="elevated" bg="orange.500" color="white">
                  <CardHeader>
                    <Flex alignItems="center">
                      <Icon as={FaHourglassHalf} boxSize={6} mr={5} />
                      <Stat>
                        <StatLabel>Pending Tasks</StatLabel>
                        <StatNumber>{dataPerformanc.pendingTasks}</StatNumber>
                      </Stat>
                    </Flex>
                  </CardHeader>
                </Card>
              </Grid>
            </Box>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default StatusPage;
