import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/*CONFIGURATIONS*/

const __filename = fileURLToPath(import.meta.url); // we have to do this as we have type set to module;
console.log(__filename); /* /Users/jyotiraditya/Desktop/SocialMediaApp/server/index.js */
const __dirname = path.dirname(__filename);
console.log(__dirname); /* /Users/jyotiraditya/Desktop/SocialMediaApp/server */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({storage}); // now we will use the upload variable to upload files;


/* MONGOOSE */
 
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(()=>{
    app.listen(PORT,()=>{console.log(`Server Port: ${PORT}`)});
}).catch((error)=>{
    console.log(`${error} did not connect`);
})