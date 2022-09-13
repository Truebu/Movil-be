import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import noteRoutes from "./business/routes/note.routes";
import userRoutes from "./business/routes/user.routes";

const app = express();

app.set("json spaces", 2);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

export default app;
