import { useState } from "react";
import { TRAVEL_QUERY } from "../query";

const useKeywordExtraction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (text) => {
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
        prompt: TRAVEL_QUERY + `Here is the query ${text}`,
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { fetchData, keywords, loading, isOpen, closeModal };
};

export default useKeywordExtraction;