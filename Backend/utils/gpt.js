import "dotenv/config";

const getGPTResponse = async (userMessage) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GPT_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "provider-3/gpt-4.1-mini",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  try {
    const response = await fetch(
      "https://api.a4f.co/v1/chat/completions",
      options
    );

    if (!response.ok) {
      // Log the actual error response for debugging
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check if the response has the expected structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Unexpected API response structure");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in getGPTResponse:", error);
    throw error; // Re-throw the original error instead of creating a new generic one
  }
};

export default getGPTResponse;
