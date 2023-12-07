import express from "express";
import morgan from "morgan";

//Routes
import blogRoutes from "./routes/blog.routes";
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


//Settings (Configuraciones)
app.set("port", 4000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/blog",blogRoutes);

export default app;