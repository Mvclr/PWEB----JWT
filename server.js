// to colocando uns comentários aí que acho que vou terminar esse sistema depois de entregar, mas dei também uma explicada do que eu usei que não foi passado em aula
const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add this line to parse cookies

// Routes
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
