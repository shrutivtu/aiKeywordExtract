import { useState } from "react";
import { Container, Box } from "@chakra-ui/react";
import { Header, Footer, TextInput, KeywordsModal } from "./components";

const App = () => {
  const [keywords, setKeywords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt:
          "Extract the keywords from this text: " + text + "for the following information- Number of bedrooms, Number of bathrooms , Arrival date, Duration of stay , Number of adults , Number of children , Ages of children, Desired rating of accommodation, Preference for showing full price, Maximum price per night , Preferences for amenities - options: pool, TV, internet, desk, microwave, refrigerator, garden. Return an object with key value pair. Enclose all the keys in double quotes as well." +
          "",
        temperature: 0.13,
        max_tokens: 180,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );
      const json = await response.json();
      setKeywords(json.choices[0].text.trim());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box 
      bg="blue.600" 
      color="white" 
      paddingTop={130} 
    >
      <Container 
        maxW="3xl" 
        centerContent 
        minHeight="100vh"
      >
        <Header />
        <TextInput 
          extractKeywords={extractKeywords} 
        />
        <Footer />
      </Container>
      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default App;