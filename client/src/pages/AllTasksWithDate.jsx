import React, { useContext } from 'react';
import { requireAuth } from '../utils';
import { AllTasks } from '../components';
import { Box, Flex, Icon, Text, useBreakpointValue } from '@chakra-ui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { DateContext } from '../context/DateContext';

export const loader = async ({ request }) => {
  await requireAuth(request)
  return null
}

const TodayTasks = () => {
  // this page user globleData context to make sure if the user
  // choose the date re-render the app and the call use context to sort data
  const { globleDateToAddingTask, setGlobleDateToAddingTask } = useContext(DateContext);


  const titleFontSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Flex alignItems="center" cursor="pointer" onClick={onClick} ref={ref}>
      <Text fontSize={titleFontSize} fontWeight="bold">
        {value}
      </Text>
      <Icon as={FaCalendarAlt} boxSize={6} ml={2} />
    </Flex>
  ));

  return (
    
    <Box p={4}>
      <Flex direction={flexDirection} alignItems="center" mb={6}>
        <Text fontSize={titleFontSize} fontWeight="bold" mb={{ base: 4, md: 0 }}>
          Tasks with date
        </Text>
        <Box mr={{md:3}} ml={{ base: 0, md: 'auto' }}>
          <DatePicker
            selected={globleDateToAddingTask}
            onChange={(date) => setGlobleDateToAddingTask(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            customInput={<CustomInput />}
          />
        </Box>
      </Flex>
      <AllTasks />
    </Box>
  )
};


export default TodayTasks;
