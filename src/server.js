require("express-async-errors");

const cors = require("cors");
const AppError = require("./utils/AppError")
const express = require("express");
const uploadConfig  = require("./configs/upload")

const routes = require("./routes")


const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());

app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next )=> {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });

})

const PORT = 3333;
app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));