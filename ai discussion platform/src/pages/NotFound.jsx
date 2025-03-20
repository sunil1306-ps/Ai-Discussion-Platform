import { Box, Heading, Text } from '@chakra-ui/react';

function NotFound() {
  return (
    <Box p={4}>
      <Heading mb={4}>404 - Page Not Found</Heading>
      <Text>The page you are looking for does not exist.</Text>
    </Box>
  );
}

export default NotFound;