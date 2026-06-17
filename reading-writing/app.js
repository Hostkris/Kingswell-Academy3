/*
  Reading + Writing Curriculum App
  ------------------------------------------------------------
  Drop-in system:
  - Basic / Intermediate / Advanced levels
  - Lessons, homework, quizzes, final tests
  - 40-question tests
  - Auto scoring for multiple choice
  - Model answers + rubrics for short answers
  - Progress tracking with localStorage
*/

const STORE_KEY = RW_CURRICULUM.meta.storageKey;

const state = {
  view: "dashboard",
  levelId: "basic",
  activeLessonId: null,
  activeTestId: null,
  progress: loadProgress()
};

function loadProgress() {
  const starter = {
    placement: null,
    lessons: {},
    tests: {},
    homework: {},
    rubricScores: {},
    levelOverride: null
  };

  try {
    return { ...starter, ...JSON.parse(localStorage.getItem(STORE_KEY)) };
  } catch (error) {
    return starter;
  }
}

function saveProgress() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state.progress));
  renderLevelAccess();
}

function resetProgress() {
  if (!confirm("Reset all demo progress for this browser?")) return;
  localStorage.removeItem(STORE_KEY);
  state.progress = loadProgress();
  state.view = "dashboard";
  render();
}

function $(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function percent(numerator, denominator) {
  if (!denominator) return 0;
  return Math.round((numerator / denominator) * 100);
}

function getLevel(levelId) {
  return RW_CURRICULUM.levels.find(level => level.id === levelId);
}

function getAllLessons() {
  return RW_CURRICULUM.levels.flatMap(level =>
    level.units.flatMap(unit =>
      unit.lessons.map(lesson => ({ ...lesson, unit, level }))
    )
  );
}

function getLesson(lessonId) {
  return getAllLessons().find(item => item.id === lessonId);
}

function getTest(testId) {
  if (testId === RW_CURRICULUM.placementTest.id) return RW_CURRICULUM.placementTest;

  for (const level of RW_CURRICULUM.levels) {
    if (level.finalTest.id === testId) {
      return { ...level.finalTest, levelId: level.id };
    }
  }

  const lesson = getLesson(testId);
  if (lesson) {
    return {
      id: lesson.id,
      title: `${lesson.title} Quiz`,
      instructions: "Answer the lesson quiz. Review explanations after submitting.",
      questions: lesson.quiz,
      lessonId: lesson.id,
      levelId: lesson.level.id
    };
  }

  return null;
}

function isLevelUnlocked(levelId) {
  if (levelId === "basic") return true;

  if (state.progress.levelOverride === levelId || state.progress.levelOverride === "advanced") {
    return true;
  }

  if (state.progress.placement?.recommendedLevel === levelId) return true;
  if (levelId === "intermediate" && state.progress.placement?.recommendedLevel === "advanced") return true;

  if (levelId === "intermediate") {
    return (state.progress.tests["basic-final"]?.score || 0) >= 80;
  }

  if (levelId === "advanced") {
    return (state.progress.tests["intermediate-final"]?.score || 0) >= 80;
  }

  return false;
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
  render();
}

function render() {
  renderLevelAccess();

  if (state.view === "dashboard") return renderDashboard();
  if (state.view === "courses") return renderCourses();
  if (state.view === "lesson") return renderLesson(state.activeLessonId);
  if (state.view === "tests") return renderTests();
  if (state.view === "test") return renderTest(state.activeTestId);
  if (state.view === "homework") return renderHomework();
  if (state.view === "progress") return renderProgress();
  if (state.view === "placement") return renderPlacement();

  renderDashboard();
}

function renderLevelAccess() {
  const box = $("#levelAccess");
  if (!box) return;

  box.innerHTML = RW_CURRICULUM.levels.map(level => {
    const unlocked = isLevelUnlocked(level.id);
    return `
      <p>
        <span class="badge ${unlocked ? "badge--success" : "badge--locked"}">
          ${unlocked ? "Unlocked" : "Locked"}
        </span>
        ${escapeHtml(level.title)}
      </p>
    `;
  }).join("");
}

function dashboardStats() {
  const lessons = getAllLessons();
  const completedLessons = lessons.filter(lesson => state.progress.lessons[lesson.id]?.completed).length;
  const tests = Object.values(state.progress.tests);
  const passedTests = tests.filter(test => test.score >= RW_CURRICULUM.meta.passingScore).length;
  const scores = tests.map(test => test.score).filter(score => Number.isFinite(score));
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return {
    totalLessons: lessons.length,
    completedLessons,
    passedTests,
    avg
  };
}

function renderDashboard() {
  const stats = dashboardStats();

  $("#app").innerHTML = `
    <div class="page-title">
      <div>
        <h2>Dashboard</h2>
        <p>This is the main classroom system: lessons, homework, quizzes, 40-question tests, answer explanations, and progress tracking.</p>
      </div>
      <button class="btn btn--gold" onclick="setView('courses')">Start Classrooms</button>
    </div>

    <div class="grid grid--3">
      <div class="stat">
        <span>Lessons Completed</span>
        <strong>${stats.completedLessons}/${stats.totalLessons}</strong>
        <div class="progress-bar"><span style="width:${percent(stats.completedLessons, stats.totalLessons)}%"></span></div>
      </div>
      <div class="stat">
        <span>Tests Passed</span>
        <strong>${stats.passedTests}</strong>
        <small>Passing score: ${RW_CURRICULUM.meta.passingScore}%</small>
      </div>
      <div class="stat">
        <span>Average Test Score</span>
        <strong>${stats.avg}%</strong>
        <small>Mastery starts at ${RW_CURRICULUM.meta.masteryScore}%</small>
      </div>
    </div>

    <div class="grid grid--2" style="margin-top:16px;">
      <div class="card">
        <h3>How the Curriculum Works</h3>
        <p><strong>Book reference → skill map → original lesson → homework → quiz → explanation → progress.</strong></p>
        <p>The platform does not need copied textbook pages. It needs original lessons and questions built from the skill map.</p>
      </div>
      <div class="card">
        <h3>Scoring Rules</h3>
        <p><span class="badge badge--warning">70%</span> Passing</p>
        <p><span class="badge badge--success">80%</span> Mastery / Level Unlock</p>
        <p><span class="badge">90%+</span> Advanced Mastery</p>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <h3>Teacher Source Map</h3>
      <div class="grid grid--2">
        ${RW_CURRICULUM.sourceGuides.map(source => `
          <div class="lesson-section">
            <strong>${escapeHtml(source.title)}</strong>
            <p>${escapeHtml(source.role)}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCourses() {
  const currentLevel = getLevel(state.levelId);

  $("#app").innerHTML = `
    <div class="page-title">
      <div>
        <h2>Classrooms</h2>
        <p>Select Basic, Intermediate, or Advanced. Locked levels open after mastery or placement.</p>
      </div>
    </div>

    <div class="tabs">
      ${RW_CURRICULUM.levels.map(level => {
        const unlocked = isLevelUnlocked(level.id);
        return `
          <button class="level-tab ${state.levelId === level.id ? "active" : ""}" 
            ${unlocked ? "" : "disabled"}
            onclick="selectLevel('${level.id}')">
            ${escapeHtml(level.title)}
          </button>
        `;
      }).join("")}
    </div>

    <section class="card">
      <h3>${escapeHtml(currentLevel.title)}</h3>
      <p>${escapeHtml(currentLevel.description)}</p>
      <p><span class="badge ${isLevelUnlocked(currentLevel.id) ? "badge--success" : "badge--locked"}">
        ${isLevelUnlocked(currentLevel.id) ? "Available" : "Locked"}
      </span> ${escapeHtml(currentLevel.unlockRule)}</p>
    </section>

    <div style="margin-top:16px;">
      ${currentLevel.units.map(unit => `
        <section class="unit">
          <h3>${escapeHtml(unit.title)}</h3>
          <p>${escapeHtml(unit.objective)}</p>
          <div class="lesson-list">
            ${unit.lessons.map(lesson => {
              const status = state.progress.lessons[lesson.id];
              return `
                <button class="lesson-link" onclick="openLesson('${lesson.id}')">
                  <span>${escapeHtml(lesson.title)}</span>
                  <small>
                    ${escapeHtml(lesson.objective)}
                    ${status?.completed ? ` • Completed • Score ${status.score}%` : ""}
                  </small>
                </button>
              `;
            }).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function selectLevel(levelId) {
  if (!isLevelUnlocked(levelId)) return;
  state.levelId = levelId;
  renderCourses();
}

function openLesson(lessonId) {
  state.activeLessonId = lessonId;
  state.view = "lesson";
  render();
}

function renderLesson(lessonId) {
  const lesson = getLesson(lessonId);
  if (!lesson) return renderCourses();

  const progress = state.progress.lessons[lesson.id];
  const homeworkDraft = state.progress.homework[lesson.id] || "";

  $("#app").innerHTML = `
    <button class="btn" onclick="setView('courses')">← Back to Classrooms</button>

    <article class="lesson-card" style="margin-top:14px;">
      <p class="eyebrow" style="color:var(--gold);">${escapeHtml(lesson.level.title)} • ${escapeHtml(lesson.unit.title)}</p>
      <h2>${escapeHtml(lesson.title)}</h2>
      <p><strong>Objective:</strong> ${escapeHtml(lesson.objective)}</p>
      <p><strong>Teacher source connection:</strong> ${escapeHtml(lesson.bookConnection)}</p>
      ${progress?.completed ? `<p><span class="badge badge--success">Completed</span> Quiz Score: ${progress.score}%</p>` : ""}

      <section class="lesson-section">
        <h3>Vocabulary</h3>
        <p>${lesson.vocabulary.map(word => `<span class="badge">${escapeHtml(word)}</span>`).join(" ")}</p>
      </section>

      <section class="lesson-section">
        <h3>Lesson</h3>
        <p>${escapeHtml(lesson.lessonText)}</p>
      </section>

      <section class="lesson-section">
        <h3>Examples</h3>
        ${lesson.examples.map(example => `
          <div class="example-box">
            <strong>${escapeHtml(example.label)}:</strong>
            <span>${escapeHtml(example.text)}</span>
          </div>
        `).join("")}
      </section>

      <section class="lesson-section">
        <h3>Practice Drills</h3>
        <ol class="drill-list">
          ${lesson.practiceDrills.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </section>

      <section class="homework-card">
        <h3>Homework</h3>
        <ol class="homework-list">
          ${lesson.homework.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
        <label for="homeworkText"><strong>Student Homework Response</strong></label>
        <textarea id="homeworkText" placeholder="Student writes homework here...">${escapeHtml(homeworkDraft)}</textarea>
        <button class="btn btn--gold" onclick="saveHomework('${lesson.id}')">Save Homework</button>
      </section>

      <section class="lesson-section">
        <h3>Lesson Quiz</h3>
        <p>This quiz gives answer explanations after submission.</p>
        <button class="btn btn--success" onclick="openTest('${lesson.id}')">Take Lesson Quiz</button>
      </section>
    </article>
  `;
}

function saveHomework(lessonId) {
  const value = $("#homeworkText").value;
  state.progress.homework[lessonId] = value;
  saveProgress();
  alert("Homework saved.");
}

function renderTests() {
  $("#app").innerHTML = `
    <div class="page-title">
      <div>
        <h2>Tests</h2>
        <p>Each level has a 40-question final test. Quizzes are inside lessons.</p>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Placement Test</h3>
        <p>Use this first if a student should skip Basic or start at a higher level.</p>
        <button class="btn btn--gold" onclick="openTest('${RW_CURRICULUM.placementTest.id}')">Take Placement Test</button>
      </div>

      ${RW_CURRICULUM.levels.map(level => {
        const test = state.progress.tests[level.finalTest.id];
        const unlocked = isLevelUnlocked(level.id);
        return `
          <div class="card">
            <h3>${escapeHtml(level.finalTest.title)}</h3>
            <p>${escapeHtml(level.finalTest.instructions)}</p>
            <p><span class="badge ${unlocked ? "badge--success" : "badge--locked"}">${unlocked ? "Available" : "Locked"}</span>
              ${test ? `Last score: ${test.score}%` : "Not attempted"}
            </p>
            <button class="btn btn--gold" ${unlocked ? "" : "disabled"} onclick="openTest('${level.finalTest.id}')">
              Start 40-Question Test
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function openTest(testId) {
  state.activeTestId = testId;
  state.view = "test";
  render();
}

function renderTest(testId) {
  const test = getTest(testId);
  if (!test) return renderTests();

  const questions = test.questions;

  $("#app").innerHTML = `
    <button class="btn" onclick="setView('${testId === RW_CURRICULUM.placementTest.id ? "placement" : "tests"}')">← Back</button>

    <section class="card" style="margin-top:14px;">
      <h2>${escapeHtml(test.title)}</h2>
      <p>${escapeHtml(test.instructions)}</p>
      <p><span class="badge">${questions.length} questions</span></p>
    </section>

    <form id="testForm">
      ${questions.map((q, index) => renderQuestion(q, index)).join("")}
      <button type="submit" class="btn btn--gold">Submit Test</button>
    </form>

    <div id="testResult"></div>
  `;

  $("#testForm").addEventListener("submit", event => {
    event.preventDefault();
    scoreTest(test);
  });
}

function renderQuestion(q, index) {
  if (q.type === "short-answer") {
    return `
      <fieldset class="question-card kwa-question-card">
        <legend>
          <span class="question-kicker">Question ${index + 1}</span>
          <span class="question-prompt">${escapeHtml(q.question)}</span>
        </legend>

        <label class="short-answer-label" for="${escapeHtml(q.id)}">
          Written Response
        </label>

        <textarea
          id="${escapeHtml(q.id)}"
          class="short-answer"
          name="${escapeHtml(q.id)}"
          placeholder="Write your answer here..."
        ></textarea>
      </fieldset>
    `;
  }

  return `
    <fieldset class="question-card kwa-question-card">
      <legend>
        <span class="question-kicker">Question ${index + 1}</span>
        <span class="question-prompt">${escapeHtml(q.question)}</span>
      </legend>

      <div class="choices answer-grid kwa-answer-grid" role="radiogroup" aria-label="Question ${index + 1} choices">
        ${q.choices.map((choice, choiceIndex) => {
          const letter = String.fromCharCode(65 + choiceIndex);
          const inputId = `${q.id}-${choiceIndex}`;

          return `
            <label class="option-label kwa-choice-card" for="${escapeHtml(inputId)}">
              <input
                id="${escapeHtml(inputId)}"
                type="radio"
                name="${escapeHtml(q.id)}"
                value="${choiceIndex}"
              >
              <span class="choice-letter kwa-choice-letter">${letter}</span>
              <span class="choice-copy kwa-choice-copy">
                <strong>${letter}.</strong>
                <span>${escapeHtml(choice)}</span>
              </span>
            </label>
          `;
        }).join("")}
      </div>
    </fieldset>
  `;
}

function scoreTest(test) {
  let earned = 0;
  let possible = 0;
  let autoPossible = 0;
  let autoEarned = 0;
  const missedSkills = {};
  const feedback = [];

  for (const q of test.questions) {
    possible += q.points || 1;

    if (q.type === "multiple-choice") {
      autoPossible += q.points || 1;
      const selected = document.querySelector(`input[name="${CSS.escape(q.id)}"]:checked`);
      const selectedValue = selected ? Number(selected.value) : null;
      const correct = selectedValue === q.answer;

      if (correct) {
        earned += q.points || 1;
        autoEarned += q.points || 1;
      } else {
        missedSkills[q.skill] = (missedSkills[q.skill] || 0) + 1;
      }

      feedback.push({
        question: q.question,
        type: q.type,
        correct,
        selected: selectedValue === null ? "No answer selected" : q.choices[selectedValue],
        correctAnswer: q.choices[q.answer],
        explanation: q.explanation,
        wrongExplanation: !correct && q.wrongExplanations?.[selectedValue]
          ? q.wrongExplanations[selectedValue]
          : null,
        skill: q.skill
      });
    } else {
      const answer = document.querySelector(`[name="${CSS.escape(q.id)}"]`)?.value || "";
      feedback.push({
        question: q.question,
        type: q.type,
        correct: null,
        studentAnswer: answer,
        modelAnswer: q.modelAnswer,
        rubric: q.rubric,
        skill: q.skill
      });
    }
  }

  const score = percent(autoEarned, autoPossible);
  const status = score >= RW_CURRICULUM.meta.masteryScore
    ? "Mastery reached"
    : score >= RW_CURRICULUM.meta.passingScore
      ? "Passed"
      : "Review needed";

  const record = {
    id: test.id,
    title: test.title,
    score,
    autoEarned,
    autoPossible,
    possible,
    status,
    missedSkills,
    completedAt: new Date().toISOString()
  };

  if (test.id === RW_CURRICULUM.placementTest.id) {
    const recommendedLevel = score >= 87 ? "advanced" : score >= 67 ? "intermediate" : "basic";
    state.progress.placement = {
      ...record,
      recommendedLevel
    };
    state.progress.levelOverride = recommendedLevel;
  } else {
    state.progress.tests[test.id] = record;
    if (test.lessonId) {
      state.progress.lessons[test.lessonId] = {
        completed: true,
        score,
        completedAt: record.completedAt
      };
    }
  }

  saveProgress();
  renderTestResult(test, record, feedback);
}

function renderTestResult(test, record, feedback) {
  const placementNote = test.id === RW_CURRICULUM.placementTest.id
    ? `<p><strong>Recommended Level:</strong> ${escapeHtml(state.progress.placement.recommendedLevel.toUpperCase())}</p>`
    : "";

  $("#testResult").innerHTML = `
    <section class="result-box">
      <h2>Score: ${record.score}%</h2>
      <p><strong>Status:</strong> ${escapeHtml(record.status)}</p>
      <p>Auto-scored questions: ${record.autoEarned}/${record.autoPossible}</p>
      ${placementNote}
      <p><strong>Note:</strong> Short answers are not auto-graded. The model answer and rubric appear below for teacher or self-review.</p>
    </section>

    <section class="result-box">
      <h3>Answer Explanations</h3>
      ${feedback.map((item, index) => {
        if (item.type === "short-answer") {
          return `
            <div class="explanation">
              <p><strong>${index + 1}. ${escapeHtml(item.question)}</strong></p>
              <p><strong>Your answer:</strong> ${escapeHtml(item.studentAnswer || "No written response")}</p>
              <p><strong>Model answer:</strong> ${escapeHtml(item.modelAnswer)}</p>
              <p><strong>Rubric:</strong></p>
              <ul>${item.rubric.map(r => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
              <p><strong>Skill:</strong> ${escapeHtml(item.skill)}</p>
            </div>
          `;
        }

        return `
          <div class="explanation ${item.correct ? "correct" : "incorrect"}">
            <p><strong>${index + 1}. ${escapeHtml(item.question)}</strong></p>
            <p><strong>Your answer:</strong> ${escapeHtml(item.selected)}</p>
            <p><strong>Correct answer:</strong> ${escapeHtml(item.correctAnswer)}</p>
            <p><strong>Explanation:</strong> ${escapeHtml(item.explanation)}</p>
            ${item.wrongExplanation ? `<p><strong>Why your answer missed:</strong> ${escapeHtml(item.wrongExplanation)}</p>` : ""}
            <p><strong>Skill:</strong> ${escapeHtml(item.skill)}</p>
          </div>
        `;
      }).join("")}
    </section>
  `;

  $("#testResult").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderHomework() {
  const lessons = getAllLessons();

  $("#app").innerHTML = `
    <div class="page-title">
      <div>
        <h2>Homework Center</h2>
        <p>Saved homework responses stay in this browser through localStorage.</p>
      </div>
    </div>

    ${lessons.map(lesson => {
      const draft = state.progress.homework[lesson.id] || "";
      return `
        <section class="homework-card">
          <h3>${escapeHtml(lesson.title)}</h3>
          <p><strong>Level:</strong> ${escapeHtml(lesson.level.title)}</p>
          <ol>${lesson.homework.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
          <textarea id="hw-${escapeHtml(lesson.id)}">${escapeHtml(draft)}</textarea>
          <button class="btn btn--gold" onclick="saveHomeworkFromCenter('${lesson.id}')">Save</button>
        </section>
      `;
    }).join("")}
  `;
}

function saveHomeworkFromCenter(lessonId) {
  const value = document.getElementById(`hw-${lessonId}`).value;
  state.progress.homework[lessonId] = value;
  saveProgress();
  alert("Homework saved.");
}

function renderProgress() {
  const lessons = getAllLessons();
  const tests = [
    RW_CURRICULUM.placementTest,
    ...RW_CURRICULUM.levels.map(level => level.finalTest)
  ];

  const missedTotals = {};
  Object.values(state.progress.tests).forEach(test => {
    Object.entries(test.missedSkills || {}).forEach(([skill, count]) => {
      missedTotals[skill] = (missedTotals[skill] || 0) + count;
    });
  });

  const weakSkills = Object.entries(missedTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  $("#app").innerHTML = `
    <div class="page-title">
      <div>
        <h2>Progress Tracking</h2>
        <p>Tracks lesson completion, test scores, missed skills, homework, and level unlocking.</p>
      </div>
    </div>

    <div class="grid grid--2">
      <section class="card">
        <h3>Lesson Progress</h3>
        ${lessons.map(lesson => {
          const p = state.progress.lessons[lesson.id];
          return `
            <p>
              <span class="badge ${p?.completed ? "badge--success" : "badge--locked"}">
                ${p?.completed ? "Done" : "Open"}
              </span>
              ${escapeHtml(lesson.title)}
              ${p ? `— ${p.score}%` : ""}
            </p>
          `;
        }).join("")}
      </section>

      <section class="card">
        <h3>Test Progress</h3>
        ${tests.map(test => {
          const p = test.id === RW_CURRICULUM.placementTest.id
            ? state.progress.placement
            : state.progress.tests[test.id];

          return `
            <p>
              <span class="badge ${p ? (p.score >= 80 ? "badge--success" : "badge--warning") : "badge--locked"}">
                ${p ? `${p.score}%` : "Not taken"}
              </span>
              ${escapeHtml(test.title)}
            </p>
          `;
        }).join("")}
      </section>
    </div>

    <section class="card" style="margin-top:16px;">
      <h3>Weak Skill Report</h3>
      ${weakSkills.length ? `
        <p>These are the skills students missed most often:</p>
        ${weakSkills.map(([skill, count]) => `
          <p><span class="badge badge--warning">${count} miss${count === 1 ? "" : "es"}</span> ${escapeHtml(skill)}</p>
        `).join("")}
      ` : "<p>No missed-skill data yet. Take a test to generate the report.</p>"}
    </section>

    <section class="card" style="margin-top:16px;">
      <h3>Writing Rubrics</h3>
      ${Object.entries(RW_CURRICULUM.writingRubrics).map(([level, rubric]) => `
        <h4>${escapeHtml(level.toUpperCase())}</h4>
        <table class="rubric-table">
          <thead><tr><th>Criterion</th><th>Description</th><th>Score</th></tr></thead>
          <tbody>
            ${rubric.map(item => `
              <tr>
                <td><strong>${escapeHtml(item.name)}</strong></td>
                <td>${escapeHtml(item.description)}</td>
                <td>0–${item.max}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `).join("")}
    </section>
  `;
}

function renderPlacement() {
  const placement = state.progress.placement;

  $("#app").innerHTML = `
    <div class="page-title">
      <div>
        <h2>Placement Test</h2>
        <p>Use this before assigning a student to Basic, Intermediate, or Advanced.</p>
      </div>
      <button class="btn btn--gold" onclick="openTest('${RW_CURRICULUM.placementTest.id}')">Start Placement Test</button>
    </div>

    <section class="card">
      <h3>Placement Result</h3>
      ${placement ? `
        <p><span class="badge badge--success">${placement.score}%</span></p>
        <p><strong>Recommended Level:</strong> ${escapeHtml(placement.recommendedLevel.toUpperCase())}</p>
        <p><strong>Completed:</strong> ${new Date(placement.completedAt).toLocaleString()}</p>
      ` : `
        <p>No placement test taken yet.</p>
      `}
    </section>

    <section class="card" style="margin-top:16px;">
      <h3>Manual Level Override</h3>
      <p>For a teacher/admin demo, you can manually open a level.</p>
      <div class="tabs">
        <button class="level-tab" onclick="setOverride('basic')">Basic</button>
        <button class="level-tab" onclick="setOverride('intermediate')">Intermediate</button>
        <button class="level-tab" onclick="setOverride('advanced')">Advanced</button>
      </div>
    </section>
  `;
}

function setOverride(levelId) {
  state.progress.levelOverride = levelId;
  saveProgress();
  state.levelId = levelId;
  alert(`Level override set to ${levelId}.`);
  renderPlacement();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
    });
  });

  $("#resetProgressBtn").addEventListener("click", resetProgress);

  render();
});
