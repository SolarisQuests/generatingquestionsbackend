import express from 'express';
import { CreateQuestions, GetIndividualData,GetAllData, UpdateDocument,GetDatabyhashid ,UpdateDocumentbyhashid } from '../Controller/apicontroller.js';



const apiroute = express.Router();


//interviewquestionsapp
apiroute.post("/createquestions",CreateQuestions)
apiroute.get("/get-individual-data/:id",GetIndividualData)
apiroute.get("/get-data-byhash/:hashid",GetDatabyhashid )
apiroute.get("/getalldata",GetAllData)
apiroute.put("/update-document/:id", UpdateDocument)
apiroute.put("/update-document2/:hashid", UpdateDocumentbyhashid)


export default apiroute

