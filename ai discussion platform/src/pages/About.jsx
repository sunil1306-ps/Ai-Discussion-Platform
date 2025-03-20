import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();


  return (
    <Flex p={4} justify='center' minH='100vh' align='center'>
      <VStack gap={6}>
        <Heading>About Us</Heading>
        <Text>This is a platform for AI-generated discussions. Stay tuned for more features!</Text>
        <Button variant='outline' border='1px solid white' onClick={() => {navigate(`/home`)}}> 
          Get Started
        </Button>
      </VStack>
    </Flex>
  );
}

export default About;