const CACHE_NAME = "kingswell-academy-v12";
const CORE = [
  ".",
  "index.html",
  "styles.css",
  "data.js",
  "app.js",
  "manifest.webmanifest",
  "SOURCES.md",
  "shared/kwa-ui-fix.css",
  "shared/kwa-assessment-fix.js",
  "shared/kwa-video-classroom.css",
  "shared/kwa-youtube-classrooms.js",
  "reading-writing/index.html",
  "reading-writing/styles.css",
  "reading-writing/data-reading-writing.js",
  "reading-writing/app.js",
  "assets/icons/favicon.svg",
  "assets/branding/kingswell-academy-logo-512.png",
  "assets/branding/kingswell-academy-banner.png",
  "assets/docs/Kingswell_Academy_Syllabus_Calendar.png",
  "assets/docs/Kingswell_Academy_Classroom_Workbook.html",
  "science-biology-chemistry/src/questions.js",
  "science-biology-chemistry/src/curriculum.js",
  "science-biology-chemistry/src/app.js",
  "science-biology-chemistry/styles.css",
  "science-biology-chemistry/index.html",
  "math-algebra/engine/progress.js",
  "math-algebra/engine/feedback.js",
  "math-algebra/engine/scoring.js",
  "math-algebra/data/sources.js",
  "math-algebra/data/homework.js",
  "math-algebra/data/questions.js",
  "math-algebra/data/curriculum.js",
  "math-algebra/app.js",
  "math-algebra/styles.css",
  "math-algebra/index.html",
  "logic-research/index.html",
  "logic-research/styles.css",
  "logic-research/app.js",
  "logic-research/data.logicResearch.js",
  "logic-research/questions.logicResearch.js",
  "logic-research/homework.logicResearch.js",
  "logic-research/rubrics.logicResearch.js",
  "logic-research/grading.logicResearch.js",
  "logic-research/progress.logicResearch.js",
  "psychology/index.html",
  "psychology/psychology.css",
  "psychology/psychology-app.js",
  "psychology/curriculum-data.js",
  "psychology/question-bank.js",
  "psychology/testing-engine.js",
  "business-marketing/index.html",
  "business-marketing/styles.css",
  "business-marketing/app.js",
  "business-marketing/data/businessMarketingCurriculum.js",
  "business-marketing/data/businessMarketingQuestions.js",
  "architecture-drafting/index.html",
  "architecture-drafting/styles.css",
  "architecture-drafting/data/architecture-drafting-curriculum.js",
  "architecture-drafting/js/progress-tracker.js",
  "architecture-drafting/js/quiz-engine.js",
  "architecture-drafting/js/app.js"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => Promise.allSettled(CORE.map(url => cache.add(url)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(resp => {
    if(new URL(req.url).origin === location.origin){ const copy=resp.clone(); caches.open(CACHE_NAME).then(cache => cache.put(req, copy)); }
    return resp;
  }).catch(() => cached || caches.match('index.html'))));
});
