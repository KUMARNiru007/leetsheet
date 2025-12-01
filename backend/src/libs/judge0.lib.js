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

// create axios instance preconfigured for Judge0 with RapidAPI headers
const judge0Client = axios.create({
    baseURL: process.env.JUDGE0_API_URL,
    timeout: parseInt(process.env.JUDGE0_TIMEOUT_MS || '60000', 10), // ms
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        ...(process.env.JUDGE0_RAPIDAPI_KEY && {
            'x-rapidapi-key': process.env.JUDGE0_RAPIDAPI_KEY,
        }),
        ...(process.env.JUDGE0_RAPIDAPI_HOST && {
            'x-rapidapi-host': process.env.JUDGE0_RAPIDAPI_HOST,
        }),
    },
})

// Debugging helper: print baseURL if debug enabled
if (process.env.DEBUG_JUDGE0 === 'true') {
    console.log('judge0Client baseURL:', judge0Client.defaults.baseURL)
}

// basic request wrapper with retry/backoff for transient errors (429/5xx/network)
const requestWithRetry = async (requestFn, { retries = parseInt(process.env.JUDGE0_RETRIES || '3', 10), backoff = parseInt(process.env.JUDGE0_BACKOFF_MS || '500', 10) } = {}) => {
    let attempt = 0
    let lastErr
    while (attempt <= retries) {
        try {
            return await requestFn()
        } catch (err) {
            lastErr = err
            attempt++
            const status = err?.response?.status
            // Retry only on rate limiting (429) or server errors 5xx or network errors
            const shouldRetry = !err?.response || status === 429 || (status >= 500 && status < 600)
            if (!shouldRetry || attempt > retries) break
            const delay = backoff * Math.pow(2, attempt - 1)
            await new Promise((r) => setTimeout(r, delay))
        }
    }
    throw lastErr
}

export const pollBatchResults = async (tokens)=>{
    //infinite loop 
    while(true){
        
        const {data} = await requestWithRetry(() => judge0Client.get(`/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
                fields: '*',
            }
        }))

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
    const {data} = await requestWithRetry(() => judge0Client.post(`/submissions/batch`, {
        submissions
    }, {
        params: {
            base64_encoded: false,
            wait: false,
            fields: '*',
        }
    }))

    console.log("Submission Results",data)

    // Normalise response: some Judge0 deployments return { submissions: [...] },
    // others return an array directly. Controllers expect an array that can be mapped.
    const resultArray = data?.submissions ?? data
    return resultArray //return tokens array-like
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

// helper to fetch a single submission's results
export const getSubmission = async (token, options={}) => {
    const params = {
        base64_encoded: options.base64_encoded ?? false,
        fields: options.fields ?? '*',
    }

    const { data } = await requestWithRetry(() => judge0Client.get(`/submissions/${token}`, { params }))
    return data
}

// submit a single submission (useful for quick runs or web editor execution)
export const submitSingle = async (submission, opts={}) => {
    // submission: { source_code, language_id, stdin }
    const params = {
        base64_encoded: opts.base64_encoded ?? false,
        wait: opts.wait ?? false,
        fields: opts.fields ?? '*',
    }
    const { data } = await requestWithRetry(() => judge0Client.post(`/submissions`, submission, { params }))
    return data
}

// Additional read-only endpoints
export const getLanguages = async () => {
    const { data } = await requestWithRetry(() => judge0Client.get(`/languages`))
    return data
}

export const getLanguageById = async (id) => {
    const { data } = await requestWithRetry(() => judge0Client.get(`/languages/${id}`))
    return data
}

export const getConfigInfo = async () => {
    const { data } = await requestWithRetry(() => judge0Client.get(`/config_info`))
    return data
}

export const getAbout = async () => {
    const { data } = await requestWithRetry(() => judge0Client.get(`/about`))
    return data
}