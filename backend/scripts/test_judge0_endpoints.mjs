import dotenv from 'dotenv';
dotenv.config();

// Use dynamic import so env vars are available to the imported module
const judge0Module = await import('../src/libs/judge0.lib.js');
const judge0 = judge0Module;

async function runTests(){
    try{
        console.log('Testing Judge0 endpoints with base URL:', process.env.JUDGE0_API_URL);
        const languages = await judge0.getLanguages();
        console.log('Languages count:', Array.isArray(languages) ? languages.length : 'unknown');

        const singleLang = await judge0.getLanguageById(52);
        console.log('Language 52 name:', singleLang?.name || JSON.stringify(singleLang));

        const config = await judge0.getConfigInfo();
        console.log('Config info keys:', Object.keys(config || {}));

        const about = await judge0.getAbout();
        console.log('About', about?.version || about?.name || about);

        // Try a single submission (non-destructive) if env var set
        if (process.env.JUDGE0_TEST_SOURCE_CODE) {
            const res = await judge0.submitSingle({
                source_code: process.env.JUDGE0_TEST_SOURCE_CODE,
                language_id: parseInt(process.env.JUDGE0_TEST_LANGUAGE_ID || '71', 10),
            }, { wait: true });
            console.log('SubmitSingle result:', res);
        } else {
            console.log('Skipping submitSingle test; set JUDGE0_TEST_SOURCE_CODE in .env to test it.');
        }

        console.log('All checks done');
    }catch(e){
        console.error('Test failure:', e?.response?.status, e?.message || e);
        if (e?.response?.data) console.error('Response data:', e.response.data);
        process.exit(1)
    }
}

runTests()
