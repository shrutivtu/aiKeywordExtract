import { Container, Box } from "@chakra-ui/react";
import { Header, Footer, TextInput, KeywordsModal } from "./components";
import useKeywordExtraction from "./hooks/useKeywordExtraction";

const App = () => {

  const { fetchData, keywords, loading, isOpen, closeModal } = useKeywordExtraction();

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
          extractKeywords={fetchData} 
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