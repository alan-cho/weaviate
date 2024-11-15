import weaviate, { vectorizer, generative } from "weaviate-client";
import "dotenv/config";

// Best practice: store your credentials in environment variables
const WCD_URL = process.env.WCD_URL;
const WCD_API_KEY = process.env.WCD_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = await weaviate.connectToWeaviateCloud(
  WCD_URL, // Replace with your Weaviate Cloud URL
  {
    authCredentials: new weaviate.ApiKey(WCD_API_KEY), // Replace with your Weaviate Cloud API key
    headers: {
      "X-OpenAI-Api-Key": OPENAI_API_KEY,
    },
  }
);

const questions = client.collections.get("Question");

const result = await questions.query.nearText("biology", { limit: 2 });

result.objects.forEach((item) => {
  console.log(JSON.stringify(item.properties, null, 2));
});

client.close(); // Close the client connection
