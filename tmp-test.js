import { analyzeQuizAgainstSlides } from './src/app/services/analysisService.js';
const questions=[{id:1,questionText:'Explain TF-IDF formula and application.'}];
const slides=[{id:1,title:'Slide 1',text:'TF-IDF formula: term frequency and inverse document frequency. Use for document weighting.'}];
const r=analyzeQuizAgainstSlides(questions,slides);
console.log(JSON.stringify(r.questions[0], null, 2));
