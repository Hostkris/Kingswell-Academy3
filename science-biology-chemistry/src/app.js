import { curriculum } from "./curriculum.js";
import { getLessonQuestions, getUnitTestQuestions } from "./questions.js";

const STORAGE_KEY = "kwaScienceBioChemProgress.v1";
const app = document.getElementById("app");
const resetProgressBtn = document.getElementById("resetProgressBtn");
const exportProgressBtn = document.getElementById("exportProgressBtn");

let currentLevelId = null;

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      lessons: {},
      homework: {},
      assessments: {}
    };
  } catch {
    return { lessons: {}, homework: {}, assessments: {} };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress, null, 2));
}

function updateProgress(mutator) {
  const progress = getProgress();
  mutator(progress);
  saveProgress(progress);
  return progress;
}

function scoreStatus(score) {
  if (score >= 90) return { label: "Mastered", className: "green" };
  if (score >= 80) return { label: "Proficient", className: "green" };
  if (score >= 70) return { label: "Passed", className: "gold" };
  if (score >= 60) return { label: "Needs Review", className: "gold" };
  return { label: "Retake Required", className: "red" };
}

function byId(id) {
  return document.getElementById(id);
}

function getLevel(levelId) {
  return curriculum.levels.find(level => level.id === levelId);
}

function getLesson(lessonId) {
  for (const level of curriculum.levels) {
    const lesson = level.unit.lessons.find(item => item.id === lessonId);
    if (lesson) return { level, unit: level.unit, lesson };
  }
  return null;
}

function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function calculateLevelProgress(level, progress) {
  const lessons = level.unit.lessons;
  const completedLessons = lessons.filter(lesson => progress.lessons[lesson.id]?.completed).length;
  const completedHomework = lessons.filter(lesson => progress.homework[lesson.id]?.completed).length;
  const quizScores = lessons
    .map(lesson => progress.assessments[`quiz:${lesson.id}`]?.bestScore)
    .filter(score => typeof score === "number");
  const unitTestScore = progress.assessments[`unit:${level.unit.id}`]?.bestScore;

  const averageQuiz = quizScores.length
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length)
    : 0;

  return {
    completedLessons,
    totalLessons: lessons.length,
    completedHomework,
    totalHomework: lessons.length,
    averageQuiz,
    unitTestScore: typeof unitTestScore === "number" ? unitTestScore : null,
    overallPercent: Math.round((
      percent(completedLessons, lessons.length) +
      percent(completedHomework, lessons.length) +
      averageQuiz +
      (typeof unitTestScore === "number" ? unitTestScore : 0)
    ) / 4)
  };
}

function renderDashboard() {
  currentLevelId = null;
  const progress = getProgress();

  app.innerHTML = `
    <section class="panel">
      <h2>Choose a Level</h2>
      <p>
        Each level has original lessons, homework, five-question lesson quizzes,
        and a forty-question mastery test. Scores and homework completion save in this browser.
      </p>
      <div class="level-grid">
        ${curriculum.levels.map(level => {
          const stats = calculateLevelProgress(level, progress);
          const unitTest = stats.unitTestScore === null ? "Not Taken" : `${stats.unitTestScore}%`;
          return `
            <article class="card level-card">
              <span class="badge">${level.gradeBand}</span>
              <h3>${level.title}</h3>
              <p>${level.unit.title}</p>
              <div class="progress-bar" aria-label="${level.title} progress">
                <div class="progress-fill" style="width:${stats.overallPercent}%"></div>
              </div>
              <p class="small"><strong>${stats.overallPercent}% overall progress</strong></p>
              <div class="stats-grid">
                <div class="stat"><strong>${stats.completedLessons}/${stats.totalLessons}</strong><span>Lessons</span></div>
                <div class="stat"><strong>${stats.completedHomework}/${stats.totalHomework}</strong><span>Homework</span></div>
                <div class="stat"><strong>${stats.averageQuiz}%</strong><span>Quiz Avg.</span></div>
                <div class="stat"><strong>${unitTest}</strong><span>Unit Test</span></div>
              </div>
              <hr />
              <button class="primary" data-open-level="${level.id}">Open ${level.title}</button>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-open-level]").forEach(button => {
    button.addEventListener("click", () => renderLevel(button.dataset.openLevel));
  });
}

function renderLevel(levelId) {
  currentLevelId = levelId;
  const level = getLevel(levelId);
  const progress = getProgress();
  const stats = calculateLevelProgress(level, progress);
  const unitAssessmentKey = `unit:${level.unit.id}`;
  const unitScore = progress.assessments[unitAssessmentKey]?.bestScore;
  const unitStatus = typeof unitScore === "number" ? scoreStatus(unitScore) : null;

  app.innerHTML = `
    <section class="panel">
      <div class="button-row">
        <button class="secondary" id="backDashboard">← Back to Levels</button>
        <button class="gold" id="startUnitTest">Start 40-Question Mastery Test</button>
      </div>
      <hr />
      <p class="eyebrow">${level.gradeBand}</p>
      <h2>${level.title}: ${level.unit.title}</h2>
      <p>${curriculum.note}</p>

      <div class="source-grid">
        ${level.sourceBooks.map(book => `
          <article class="homework-item">
            <h4>${book.title}</h4>
            <p><strong>Role:</strong> ${book.role}</p>
            <p><strong>Used for:</strong> ${book.sourceUse}</p>
          </article>
        `).join("")}
      </div>

      <hr />
      <div class="stats-grid">
        <div class="stat"><strong>${stats.completedLessons}/${stats.totalLessons}</strong><span>Lessons Completed</span></div>
        <div class="stat"><strong>${stats.completedHomework}/${stats.totalHomework}</strong><span>Homework Completed</span></div>
        <div class="stat"><strong>${stats.averageQuiz}%</strong><span>Average Quiz Score</span></div>
        <div class="stat"><strong>${typeof unitScore === "number" ? `${unitScore}%` : "Not Taken"}</strong><span>${unitStatus ? unitStatus.label : "Unit Test"}</span></div>
      </div>
    </section>

    <section class="panel">
      <h2>Lessons</h2>
      <div class="lesson-grid">
        ${level.unit.lessons.map((lesson, index) => {
          const lessonDone = progress.lessons[lesson.id]?.completed;
          const homeworkDone = progress.homework[lesson.id]?.completed;
          const quiz = progress.assessments[`quiz:${lesson.id}`];
          const quizScore = quiz?.bestScore;
          const status = typeof quizScore === "number" ? scoreStatus(quizScore) : null;
          const cardClass = lessonDone && homeworkDone && quizScore >= 70 ? "completed" : quizScore < 70 && typeof quizScore === "number" ? "review" : "";
          return `
            <article class="card lesson-card ${cardClass}">
              <span class="badge">Lesson ${index + 1}</span>
              ${lessonDone ? `<span class="badge green">Read</span>` : `<span class="badge">Unread</span>`}
              ${homeworkDone ? `<span class="badge green">Homework Done</span>` : `<span class="badge gold">Homework Open</span>`}
              ${status ? `<span class="badge ${status.className}">Quiz: ${quizScore}% ${status.label}</span>` : `<span class="badge">Quiz Not Taken</span>`}
              <h3>${lesson.title}</h3>
              <p><strong>Source topic:</strong> ${lesson.sourceTopic}</p>
              <p>${lesson.objectives.join(" • ")}</p>
              <div class="button-row">
                <button class="primary" data-open-lesson="${lesson.id}">Open Lesson</button>
                <button class="secondary" data-quiz-lesson="${lesson.id}">Take Quiz</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;

  byId("backDashboard").addEventListener("click", renderDashboard);
  byId("startUnitTest").addEventListener("click", () => renderAssessment({
    mode: "unit",
    title: level.unit.testTitle,
    key: `unit:${level.unit.id}`,
    questions: getUnitTestQuestions(level.unit.id, level.unit.requiredTestQuestions),
    returnTo: () => renderLevel(levelId)
  }));

  document.querySelectorAll("[data-open-lesson]").forEach(button => {
    button.addEventListener("click", () => renderLesson(button.dataset.openLesson));
  });
  document.querySelectorAll("[data-quiz-lesson]").forEach(button => {
    button.addEventListener("click", () => startLessonQuiz(button.dataset.quizLesson));
  });
}

function renderLesson(lessonId) {
  const found = getLesson(lessonId);
  if (!found) return renderDashboard();
  const { level, lesson } = found;
  const progress = getProgress();
  const homeworkDone = progress.homework[lesson.id]?.completed;

  app.innerHTML = `
    <article class="lesson-page">
      <div class="button-row">
        <button class="secondary" id="backToLevel">← Back to ${level.title}</button>
        <button class="primary" id="markLessonRead">Mark Lesson Read</button>
        <button class="gold" id="takeLessonQuiz">Take 5-Question Quiz</button>
      </div>
      <hr />
      <p class="eyebrow">${level.title}</p>
      <h2>${lesson.title}</h2>
      <p><strong>Book/source topic:</strong> ${lesson.sourceTopic}</p>

      <section class="lesson-section">
        <h3>Learning Objectives</h3>
        <ul>${lesson.objectives.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>

      <section class="lesson-section">
        <h3>Vocabulary</h3>
        <p>${lesson.vocabulary.map(word => `<span class="badge">${word}</span>`).join(" ")}</p>
      </section>

      <section class="lesson-section">
        <h3>Teacher-Style Lesson</h3>
        <p>${lesson.lesson}</p>
      </section>

      <section class="lesson-section">
        <h3>Examples</h3>
        <ul>${lesson.examples.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>

      <section class="lesson-section">
        <h3>Homework</h3>
        <div class="homework-grid">
          ${lesson.homework.map((item, index) => `
            <div class="homework-item">
              <span class="badge gold">Task ${index + 1}</span>
              <p>${item}</p>
            </div>
          `).join("")}
        </div>
        <div class="button-row">
          <button class="success" id="toggleHomework">${homeworkDone ? "Homework Completed ✓" : "Mark Homework Complete"}</button>
        </div>
      </section>

      <section class="lesson-section">
        <h3>Homework / Project Rubric</h3>
        <ul>${lesson.rubric.map(item => `<li>${item}</li>`).join("")}</ul>
      </section>
    </article>
  `;

  byId("backToLevel").addEventListener("click", () => renderLevel(level.id));
  byId("markLessonRead").addEventListener("click", () => {
    updateProgress(progress => {
      progress.lessons[lesson.id] = {
        completed: true,
        completedAt: new Date().toISOString()
      };
    });
    renderLesson(lesson.id);
  });
  byId("toggleHomework").addEventListener("click", () => {
    updateProgress(progress => {
      progress.homework[lesson.id] = {
        completed: true,
        completedAt: new Date().toISOString()
      };
    });
    renderLesson(lesson.id);
  });
  byId("takeLessonQuiz").addEventListener("click", () => startLessonQuiz(lesson.id));
}

function startLessonQuiz(lessonId) {
  const found = getLesson(lessonId);
  const questions = getLessonQuestions(lessonId);
  renderAssessment({
    mode: "quiz",
    title: `${found.lesson.title} Quiz`,
    key: `quiz:${lessonId}`,
    questions,
    returnTo: () => renderLevel(found.level.id)
  });
}

function renderAssessment({ mode, title, key, questions, returnTo }) {
  if (!questions.length) {
    app.innerHTML = `
      <section class="assessment-page">
        <h2>No questions found</h2>
        <p>Add questions to <code>src/questions.js</code> with the matching lessonId or unitId.</p>
        <button class="secondary" id="backBtn">Back</button>
      </section>
    `;
    byId("backBtn").addEventListener("click", returnTo);
    return;
  }

  app.innerHTML = `
    <section class="assessment-page">
      <div class="button-row">
        <button class="secondary" id="cancelAssessment">Cancel</button>
      </div>
      <hr />
      <p class="eyebrow">${mode === "unit" ? "40-Question Mastery Test" : "Lesson Quiz"}</p>
      <h2>${title}</h2>
      <p>Choose the best answer for each question. After submission, the platform gives score, mastery status, corrections, answer explanations, and review tags.</p>

      <form id="assessmentForm">
        ${questions.map((question, qIndex) => `
          <article class="question-card">
            <span class="badge">${question.skill}</span>
            <h3>${qIndex + 1}. ${question.prompt}</h3>
            ${question.choices.map((choice, cIndex) => `
              <label class="choice">
                <input type="radio" name="question-${qIndex}" value="${cIndex}" required />
                ${choice}
              </label>
            `).join("")}
          </article>
        `).join("")}
        <button class="primary" type="submit">Submit Assessment</button>
      </form>
    </section>
  `;

  byId("cancelAssessment").addEventListener("click", returnTo);

  byId("assessmentForm").addEventListener("submit", event => {
    event.preventDefault();
    const answers = questions.map((_, index) => {
      const selected = document.querySelector(`input[name="question-${index}"]:checked`);
      return Number(selected.value);
    });
    const result = gradeAssessment(questions, answers);

    updateProgress(progress => {
      const previous = progress.assessments[key];
      const attempt = {
        score: result.score,
        correct: result.correct,
        total: result.total,
        status: result.status.label,
        takenAt: new Date().toISOString()
      };

      progress.assessments[key] = {
        bestScore: previous?.bestScore ? Math.max(previous.bestScore, result.score) : result.score,
        attempts: [...(previous?.attempts || []), attempt]
      };
    });

    renderResults({ title, result, returnTo });
  });
}

function gradeAssessment(questions, answers) {
  let correct = 0;
  const results = questions.map((question, index) => {
    const studentAnswerIndex = answers[index];
    const isCorrect = studentAnswerIndex === question.correctIndex;
    if (isCorrect) correct += 1;

    return {
      ...question,
      studentAnswerIndex,
      studentAnswerText: question.choices[studentAnswerIndex],
      correctAnswerText: question.choices[question.correctIndex],
      isCorrect
    };
  });

  const score = Math.round((correct / questions.length) * 100);
  return {
    score,
    status: scoreStatus(score),
    correct,
    total: questions.length,
    results
  };
}

function renderResults({ title, result, returnTo }) {
  const missed = result.results.filter(item => !item.isCorrect);
  const reviewTags = [...new Set(missed.map(item => item.reviewTag))];

  app.innerHTML = `
    <section class="results-page">
      <p class="eyebrow">Assessment Results</p>
      <h2>${title}</h2>
      <div class="stats-grid">
        <div class="stat"><strong>${result.score}%</strong><span>Score</span></div>
        <div class="stat"><strong>${result.status.label}</strong><span>Status</span></div>
        <div class="stat"><strong>${result.correct}/${result.total}</strong><span>Correct</span></div>
        <div class="stat"><strong>${missed.length}</strong><span>Needs Review</span></div>
      </div>

      ${reviewTags.length ? `
        <section class="lesson-section">
          <h3>Recommended Review</h3>
          <p>Review these skills before moving forward:</p>
          <p>${reviewTags.map(tag => `<span class="badge gold">${tag}</span>`).join(" ")}</p>
        </section>
      ` : `
        <section class="lesson-section">
          <h3>Clean Pass</h3>
          <p>No missed questions. That means the student is ready for the next section.</p>
        </section>
      `}

      <section class="lesson-section">
        <h3>Answer Explanations</h3>
        ${result.results.map((item, index) => `
          <article class="card result-card ${item.isCorrect ? "correct" : "incorrect"}">
            <span class="badge ${item.isCorrect ? "green" : "red"}">${item.isCorrect ? "Correct" : "Incorrect"}</span>
            <span class="badge">${item.skill}</span>
            <h4>${index + 1}. ${item.prompt}</h4>
            <p><strong>Student answer:</strong> ${item.studentAnswerText}</p>
            <p><strong>Correct answer:</strong> ${item.correctAnswerText}</p>
            <p><strong>Explanation:</strong> ${item.explanation}</p>
          </article>
        `).join("")}
      </section>

      <div class="button-row">
        <button class="primary" id="returnAfterResults">Return to Curriculum</button>
        <button class="secondary" id="printResults">Print / Save Results</button>
      </div>
    </section>
  `;

  byId("returnAfterResults").addEventListener("click", returnTo);
  byId("printResults").addEventListener("click", () => window.print());
}

resetProgressBtn.addEventListener("click", () => {
  if (confirm("Reset all saved progress for this demo curriculum?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderDashboard();
  }
});

exportProgressBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(getProgress(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "kwa-science-biology-chemistry-progress.json";
  link.click();
  URL.revokeObjectURL(url);
});

renderDashboard();
