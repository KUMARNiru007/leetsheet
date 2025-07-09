import axios from "axios"
export const getJudge0LanguageId = (Language) => {
    const languageMap = {
        "PYTHON" :71,
        "JAVA": 62,
        "JAVASCRIPT":63
    }
    return languageMap[Language.toUpperCase()]
}

//to hit the endpoint of judge0 submission batch

const sleep = (ms) => new Promise ((resolve) => setTimeout(resolve , ms))

export const pollBatchResults = async (tokens)=>{
    //infinite loop 
    while(true){
        
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const results = data.submissions;

        //every- -> when all the condition true then return
        const isAllDone = results.every(
            (r)=> r.status.id !== 1 && r.status.id !== 2 
            //1--> in queue
            //2--> abhi processing chal rahi hai
            //taken from judge0
            //every-all true then
        ) 

        if(isAllDone) return results
        await sleep(1000)
    }
} // after every 1000 ms ek pbar endpoint to ungali kar dega -- aur bhai kya hal chal hai .

export const submitBatch = async (submissions) => {

    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
        submissions
    })

    console.log("Submission Results",data)

    return data //return token
}
// in the loop always ask the endpoint is the work done is the work done 

export function getLanguageName(languageId){
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    return LANGUAGE_NAMES[languageId] || "Unknown"
}