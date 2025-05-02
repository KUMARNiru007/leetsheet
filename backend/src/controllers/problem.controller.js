import {db} from "../libs/db.js"
import {
   getJudge0LanguageId,
   pollBatchResults,
   submitBatch,
 } from "../libs/judge0.lib.js";

export const createProblem = async (req,res) => {
   // going to get all the data from the request body

   const {title ,description ,difficulty ,tags ,examples, constraints ,testcases ,codeSnippets , referenceSolutions} = req.body ;

   // going to check the user role

   if(req.user.role !== "ADMIN"){
    return res.status(403).json({
        message:"You are not allowed to create problem"
    })
   }

   try{
    for(const [language , solutionCode] of Object.enteries(referenceSolutions)){
 const languageId = getJudge0LanguageId(language)
    
 if (!languageId){
    return res.status(400).json({error:`Language ${language} is not supported`})
 }
//destructutr input and output
   const submissions = testcases.map(({input,output}) => ({

      source_code:solutionCode,
      language_id:languageId,
      stdin:input, // input send to judge0
      expected_output:output, //the output that will come after judge0


   })) // array of submission of each lanhuage -- all language will be checked.
   
   const submissionResults = await submitBatch(submissions);  //recieved tokens from the test cases


   const tokens = submissionResults.map((res) => res.token); //token recived


   //polling

   const results = await pollBatchResults(tokens);

   for(let i = 0 ; i< result.length ; i++){
      const result = result[i] ;
      if(result.status.id !== 3){
         return res.status(400).json({
            error:`Testcases ${i+1} failed for langyage ${language}`
         })
      }
   }


   // new problem
   const newProblwm = await db.problem.create({
      data:{
         title ,description , difficulty ,tags , examples , constraints , testcases , codeSnippets , referenceSolutions , 
         userId:req.user.id,
      }
   });

   return res.status(201).json(newProblem);
  

    }

   }catch(error){

   }
   // loop each and every solution for different language
   

}

export const getAllProblem = async (req,res) => {}

export const getProblemById = async (req,res) => {}

export const updatedProblem = async (req,res) => {}

export const deleteProblem = async (req,res) => {}

export const getAllProblemsSolvedByUser = async (req,res) => {}

