import { Flex, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SideNav() {
    return (
        <Flex justify='center' borderRight='1px solid white' h='100%'>
            <VStack gap={3} mt={20}>
              <Link to={`/home`}>
                <Text fontSize='sm'>Home</Text>
              </Link>
              <Link to={`/create-topic`}>
                <Text fontSize='sm'>Ask a question</Text>
              </Link>
            </VStack>
          </Flex>
    )
}

export default SideNav;