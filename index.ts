import express from 'express';
import cartRoutes from './Cart';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", cartRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});