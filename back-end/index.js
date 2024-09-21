require('dotenv').config()
require('express-async-errors'); 

const cors = require('cors');
const express = require('express');   
const path = require('path');
const app = express();


const port = process.env.PORT || 3000;
const connectDB = require('./db/connectDB')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const authMiddleware = require('./middleware/authentication')

const userRouter = require('./routes/user')
const tasksRouter = require('./routes/tasks')


app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors())
app.use(express.json())


app.use('/api/v1/auth', userRouter)
app.use('/api/v1/tasks', authMiddleware, tasksRouter)


app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware) 

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start()
 

