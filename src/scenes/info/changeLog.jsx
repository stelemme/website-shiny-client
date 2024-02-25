import { useState, useEffect } from "react";
import axios from "axios";
import Markdown from "react-markdown";

// Mui
import { Box } from "@mui/material";

export default function ChangeLog() {
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/stelemme/website-shiny-client/main/README.md"
        );

        setReadmeContent(response.data);
      } catch (error) {
        console.error("Error fetching README:", error);
      }
    };

    fetchReadme();
  }, []);

  return (
    <Box mx="auto" m="20px">
      <Markdown>{readmeContent}</Markdown>
    </Box>
  );
}
