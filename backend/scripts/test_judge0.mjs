import * as judge0 from '../src/libs/judge0.lib.js';

console.log('getJudge0LanguageId("python") ->', judge0.getJudge0LanguageId('python'));
console.log('getLanguageName(71) ->', judge0.getLanguageName(71));

// show available exports
console.log('exports: ', Object.keys(judge0));
