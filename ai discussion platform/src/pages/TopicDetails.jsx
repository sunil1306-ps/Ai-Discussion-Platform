import { Text, VStack, Flex, Box, Grid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import NavBar from '@/components/NavBar';
import SideNav from '@/components/SideNav';

function TopicDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-questions/${id}`);
        setQuestion(response.data.question);
        console.log(question);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id]);

  if (!question) return <Text>Loading...</Text>

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
        <Flex justify='center'>
          <VStack align='start' spacing={4} marginX={10} marginY={2} maxWidth='80%'>
            <VStack align="start" spacing={2} p={3} bg="black" borderRadius="md" minW='300px'>
              <Text textDecoration='underline' fontWeight='bold'>{question.title}</Text>
              <Text fontWeight='light'>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {question.question}
                </ReactMarkdown>
              </Text>
            </VStack>
            
            <Box
              bg='black'
              color='white'
              borderRadius='md'
              p={6}
            >
              <Text fontSize='large' textDecoration='underline' mb={2} fontWeight='bold'>Mistral Response:</Text>
              <Text fontWeight='light'>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {question.mistralResponse}
                </ReactMarkdown>
              </Text>
            </Box>
            <Box
              bg='black'
              color='white'
              borderRadius='md'
              p={6}
            >
              <Text fontSize='large' textDecoration='underline' mb={2} fontWeight='bold'>Gemini Response:</Text>
              <Text fontWeight='light'>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {question.googleResponse}
                </ReactMarkdown>
              </Text>
            </Box>
          
          </VStack>
        </Flex>
      </GridItem>
      <GridItem area={'footer'}>
          <Box w='100%' h='100%' borderTop='1px solid white'></Box>
      </GridItem>
    </Grid>

  );
}

export default TopicDetail;