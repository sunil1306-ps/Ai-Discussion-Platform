import { Button, Textarea, Fieldset, VStack, Text, Input, Flex, Grid, GridItem, Box } from '@chakra-ui/react';
import { Field } from "@/components/ui/field"
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '@/components/NavBar';
import SideNav from '@/components/SideNav';

function CreateTopic() {
  const [title, setTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = useCallback(async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const url = "http://localhost:3000/post-question";
      const response = await axios.post(url, {title: title, question: questionText});
      console.log("question submitted", response.data);
      setQuestionText('');
      setTitle('')
      setLoading(false)
      const newData = response.data.newQuestion;
      navigate(`/topic/${newData._id}`);
    } catch(error) {
      console.log(error);
    }

  }, [title, questionText, navigate])

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
        <Flex p={4} justify='center' align='center' minH='100vh'>
          <form onSubmit={submitHandler}>
            <Fieldset.Root w='100%'>
              <VStack gap={5} w='100%' align='start'>
                <Fieldset.Legend><Text fontSize="xx-large">Ask a question</Text></Fieldset.Legend>
                <Fieldset.HelperText>Describe the topic and the doubt.</Fieldset.HelperText>
                <Fieldset.Content>
                  <Field name="title">
                    <Input
                      type='text'
                      w='600px'
                      placeholder='Title'
                      border='1px solid white'
                      value={title}
                      onChange={(e) => { setTitle(e.target.value) }}
                      required
                    >
                    </Input>
                  </Field>
                  <Field name="question">
                    <Textarea
                      name="question"
                      placeholder='Type in you question...'
                      height='200px'
                      border='1px solid white'
                      value={questionText}
                      onChange={(e) => { setQuestionText(e.target.value) }}
                      required
                    />
                  </Field>
                </Fieldset.Content>

                <Button loading={loading} type="submit" w='100%'>Submit</Button>

              </VStack>
            </Fieldset.Root>
          </form>
        </Flex>
      </GridItem>
      <GridItem area={'footer'}>
          <Box w='100%' h='100%' borderTop='1px solid white'></Box>
      </GridItem>
    </Grid>

  );
}

export default CreateTopic;