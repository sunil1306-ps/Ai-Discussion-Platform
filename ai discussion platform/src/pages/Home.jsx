import { Button, VStack, Text, HStack, Grid, GridItem, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const deleteQuestion = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (

    <Grid
      templateAreas={
        `"header header"
        "nav main"
        "nav footer"`
      }
      gridTemplateRows={'50px 1fr 50px'}
      gridTemplateColumns={'1fr 5fr'}
      minHeight='100vh'
      width='100%'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem area={'header'}>
          <NavBar />
      </GridItem>
      <GridItem area={'nav'} color='white'>
          <SideNav />
      </GridItem>
      <GridItem area={'main'} color='white'>

        <VStack gap={5} align='start'>

          <VStack align='start' spacing={3}  mt={5}>
            <Text fontSize='xx-large' fontWeight='bold'>Welcome!!!</Text>
            <Text fontSize='xl' fontWeight='bold'>Submitted Questions: </Text>
            {questions.length === 0 ? (
              <Text color="white">No questions submitted yet.</Text>
            ) : (
              questions.map((q) => (
                <VStack key={q._id} align='start' spacing={4} marginX={10} marginY={2}>
                  <HStack align="center" spacing={4}>
                    <Link to={`/topic/${q._id}`}>
                      <VStack bg="black" borderRadius="md" w="full" align='start' minW='300px'>
                        <Text fontSize='lg' pl={4} pt={4}>{q.title}</Text>
                        <Text pl={4} pb={4} pr={4} fontWeight='light'>
                          {truncateText(q.question, 50)}
                        </Text>
                      </VStack>
                    </Link>
                    <Button loading={loading} variant="outline" colorScheme="red" size="sm" onClick={() => deleteQuestion(q._id) }>
                      Delete
                    </Button>
                  </HStack>
                </VStack>
              ))
            )}
          </VStack>
        </VStack>

      </GridItem>
      <GridItem area={'footer'}>
          <Box w='100%' h='100%' borderTop='1px solid white'></Box>
      </GridItem>
    </Grid>

  );

}

export default Home;