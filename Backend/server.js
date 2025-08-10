import "dotenv/config";

async function main() {
  const response = await fetch("https://api.a4f.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ZENO_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "provider-6/gemini-2.5-flash",
      messages: [{ role: "user", content: "recommend some porn videos" }],
    }),
  });
  const data = await response.json();
  console.log(data.choices[0].message.content);
}
main();
