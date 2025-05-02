export const getJudge0LanguageId = (Language) => {
    const languageMap = {
        "PYTHON" :71,
        "JAVA": 62,
        "JAVASCRIPT":63.
    }
    return languageMap[Language.toUpperCase()]
}

//to hit the endpoint of judge0 submission batch
export const submitBatch = async (submissions) => {

    const {data} = await axios.post(`${process.env.JUDGE0_API-URL}/submissions/batch?base64_encoded=false`, {
        submissions
    })

    console.log("Submission Results",data)

    return data
}


// in the loop always ask the endpoint is the work done is the work done 
export const pollBatchResults = async (tokens)=>{
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
        ) 

        if(isAllDone) return results
        await sleep(1000)
    }
}