import React from 'react';
import { redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import { requireAuth } from '../utils';


import { Form, } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { addTaskFromAPI, getTaskFromAPI, updateTaskFromAPI } from '../api';

export const loader = async ({ params, request }) => {
  await requireAuth(request)

  // if the params id not exist that mean we need to add task not updat the task
  // so we don't have to call the api to get the task to update
  // else we call api and get the task to show it the user 
  
  const taskID = params.id
  if(!taskID) {
    return null
  }

  const task = await getTaskFromAPI(taskID)
  return task
}

export const action = (globleDateToAddingTask) => async ({ params, request }) => {
  const formData = await request.formData();
  const task = {
    name: formData.get('name'),
    description: formData.get('description'),
    createdAt: globleDateToAddingTask
  };
  const taskID = params.id
  // the taskID to difine if we will update the task or will add one

  if(!taskID) {
    await addTaskFromAPI(task)
    return 'add-task'
  }
  await updateTaskFromAPI(taskID, task)
  return redirect('../');
}

const EditTask = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  const loader = useLoaderData()
  const actionData = useActionData()
  const formRef = React.useRef() 

 
  // to reset the form
  if(actionData=='add-task' && formRef.current) {
    formRef.current.reset();
  }

  const taskUpdate = loader && loader.task

  // the mood to difine if we will update the task or will add one
  // if update will get the task we need to update and use it in the form
  // else the from will be empty
  let mood = 'edite-task'
  if(!loader) {
    mood = 'add-task'
  }

  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting"

  return (
    <Flex minHeight="100%" alignItems="center" justifyContent="center">
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg={formBackground}
      maxWidth={{ base: '100%', md: '600px' }} // Adjust width for larger screens
      width="100%" // Ensure the form takes up the full width of its container
    >
      <Heading mb={4} textAlign="center">{mood == 'edite-task' ? 'Edite Task' : 'Add Task'}</Heading>
      <Form ref={formRef} method="post" action=".">
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Task Name</FormLabel>
            <Input defaultValue={mood == 'edite-task' ? taskUpdate.name : ''} name="name" placeholder="Enter task name" bg="white" borderColor="gray.300" />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea defaultValue={mood == 'edite-task' ? taskUpdate.description : ''} name="description" placeholder="Enter task description" bg="white" borderColor="gray.300" />
          </FormControl>

          <Button isLoading={isSubmitting} loadingText="submitting..." mt={4} colorScheme="teal" type="submit" size="lg" width="full">
            Submit
          </Button>
        </VStack>
      </Form>
    </Box>
  </Flex>
  );
};

export default EditTask;
