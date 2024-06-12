import express from 'express';
import cors from 'cors';
import apiroute from './routes/apiroute.js';

const app = express();
const port = 3011;
app.use(cors())
app.use(express.json());

app.use("/", apiroute);





  
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

