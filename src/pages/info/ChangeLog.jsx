import { useState, useEffect } from "react";
import Markdown from "react-markdown";

// Mui
import { Box } from "@mui/material";

// Hooks
import { useGetRequest } from "../../hooks/useAxios";

export default function ChangeLog() {
  const getRequest = useGetRequest();

  const [readmeContent, setReadmeContent] = useState("");

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await getRequest(
          "https://raw.githubusercontent.com/stelemme/website-shiny-client/main/README.md",
          {
            baseURL: undefined,
            headers: {
              Authorization: undefined,
            },
          }
        );

        setReadmeContent(response);
      } catch {
        return;
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
