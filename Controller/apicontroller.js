// const { MongoClient,ObjectId } = require('mongodb');
// const SftpClient = require('ssh2-sftp-client');
// const dotenv =require('dotenv')
// const { Storage } = require('@google-cloud/storage');
// const mime = require('mime');
import { MongoClient, ObjectId } from 'mongodb';

import dotenv from 'dotenv';









dotenv.config();
const mongoUrl = process.env.MONGOURI;
const dbName = 'Documenttask';
const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });




// const storage = new Storage({ keyFilename:"./servicecredentials.json" });
// const bucketName = process.env.GCS_BUCKET_NAME;
//  const bucket = storage.bucket(bucketName);

async function connectToMongo() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
     
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
  
  connectToMongo();

 
  




    export const CreateQuestions = async (req, res) => {
     
      try {
        const { firstName, lastName, yearsOfExperience, jobRole, skills,randomid } = req.body;
        const createdAt = new Date();
        const db = client.db(dbName);

        const collection = db.collection('interviewquestions');
          const result=    await collection.insertOne({ 
              firstName:firstName,
              lastName:lastName,
              yearsOfExperience:yearsOfExperience,
              jobRole:jobRole,
              skills:skills,
               created_date: createdAt, 
                processed_date: "",
                json_data: [], 
                questions: [], 
                results: [], 
                 generatedurl:"",
                hashcode:randomid,
                
            });
      
            console.log(`Stored questions in MongoDB`);
         
            const insertedDocument = await collection.findOne({ _id: result.insertedId });

            console.log('Stored questions in MongoDB');
        
            res.status(201).send(insertedDocument);
          
          // res.send(result);
        } catch (error) {
          console.error(error.message);
          res.status(500).send('An error occurred');
        }
    
    
      }

      export const GetIndividualData = async (req, res) => {
        try {
          const db = client.db(dbName)
          const { id } = req.params;
      
          if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
          }
      
          const collection = db.collection('interviewquestions');
          const document = await collection.findOne({ _id:new ObjectId(id)  });
      
          if (!document) {
            return res.status(404).send('Document not found');
          }
      
          res.status(200).send(document);
        } catch (error) {
          console.error(error.message);
          res.status(500).send('An error occurred');
        }
      };


      export const GetDatabyhashid = async (req, res) => {
        try {
          const db = client.db(dbName)
          const { hashid } = req.params;
      
          // if (hashid) {
          //   return res.status(400).send('Invalid ID format');
          // }
      
          const collection = db.collection('interviewquestions');
          const document = await collection.findOne({ hashcode:hashid  });
      
          if (!document) {
            return res.status(404).send('Document not found');
          }
      
          res.status(200).send(document);
        } catch (error) {
          console.error(error.message);
          res.status(500).send('An error occurred');
        }
      };

      export const GetAllData=async(req,res)=>{
        try {
          const db = client.db(dbName)
          const collection1 = db.collection('interviewquestions');
          // Fetch data from MongoDB collection
          const alldata = await collection1.find({}).toArray(); // Convert cursor to array
           res.status(200).json(alldata );
        } catch (error) {
          
        }
      }
   

      export const UpdateDocument = async (req, res) => {
        try {
          const db = client.db(dbName);
          const { id } = req.params;
      
          // if (!ObjectId.isValid(id)) {
          //   return res.status(400).send('Invalid ID format');
          // }
      
          const { updateFields } = req.body;
          if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).send('No fields to update');
          }
      
          const collection = db.collection('interviewquestions');
          const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
      
          if (result.matchedCount === 0) {
            return res.status(404).send('Document not found');
          }
      
          res.status(200).send('Document updated successfully');
        } catch (error) {
          console.error(error.message);
          res.status(500).send('An error occurred');
        }
      };
      export const UpdateDocumentbyhashid = async (req, res) => {
        try {
          const db = client.db(dbName);
          const { hashid } = req.params;
      
       
      
          const { updateFields } = req.body;
          if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).send('No fields to update');
          }
      
          const collection = db.collection('interviewquestions');
          const result = await collection.updateOne({ hashcode:hashid  }, { $set: updateFields });
      
          if (result.matchedCount === 0) {
            return res.status(404).send('Document not found');
          }
          res.send(result)
          res.status(200).send('Document updated successfully');
        } catch (error) {
          console.error(error.message);
          res.status(500).send('An error occurred');
        }
      };












  

 