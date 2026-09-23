import { app } from "./app";

const port = Number(process.env.PORT) || 8787;

app.listen(port, () => {
  console.log(`API do casamento em http://localhost:${port}`);
});
