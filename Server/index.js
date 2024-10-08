const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connectDB();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["https://studynotion-client.vercel.app"],
		method:["POST","GET","PUT","DELETE","PATCH"],
		credentials: true,
	})
)
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
//   });
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/course", courseRoutes);
app.use("/payment", paymentRoutes);


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

