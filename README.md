# Reading + Writing Curriculum Platform

This is a GitHub Pages-ready Reading + Writing curriculum system.

## Files

- `index.html` — page structure
- `styles.css` — premium classroom styling
- `data-reading-writing.js` — curriculum, lessons, homework, quizzes, 40-question tests, rubrics
- `app.js` — testing system, scoring, answer explanations, homework saving, and progress tracking

## Features

- Basic / Intermediate / Advanced classrooms
- Lesson pages with objectives, vocabulary, examples, practice drills, and homework
- Lesson quizzes with answer explanations
- 40-question final tests per level
- Placement test
- Auto-scoring for multiple choice
- Model answers and rubrics for short answers
- Progress tracking with `localStorage`
- Weak-skill report based on missed questions
- Level unlocking by mastery score

## Important Copyright Rule

Use books as teacher references only.

Do not paste copyrighted book chapters, worksheets, passages, or test banks into a public/paid website unless you have permission. The included lessons and questions are original starter content built from reading/writing skills, not copied book content.

## GitHub Pages Setup

Upload these files into your repository root:

```txt
index.html
styles.css
data-reading-writing.js
app.js
README.md
```

Then go to:

```txt
Settings → Pages → Deploy from branch → main → /root
```

Open your GitHub Pages link after it deploys.

## How to Expand

Add more lessons inside `data-reading-writing.js`.

Each lesson should follow this structure:

```js
{
  id: "b-u1-l3",
  title: "Lesson Title",
  bookConnection: "Teacher source reference.",
  objective: "What the student will learn.",
  vocabulary: ["word1", "word2"],
  lessonText: "Original lesson text.",
  examples: [{ label: "Example", text: "Example sentence." }],
  practiceDrills: ["Practice task"],
  homework: ["Homework task"],
  quiz: [questionObject1, questionObject2]
}
```

Question objects use this structure:

```js
mc(
  "question-id",
  "basic",
  "skill-name",
  "Question text?",
  ["Choice A", "Choice B", "Choice C", "Choice D"],
  1,
  "Explanation for the correct answer."
)
```

Short-answer objects use:

```js
short(
  "question-id",
  "basic",
  "skill-name",
  "Prompt text?",
  "Model answer text.",
  ["Rubric point 1", "Rubric point 2", "Rubric point 3", "Rubric point 4"]
)
```


## Integrated Final Site Notes

This final package keeps the premium Kingswell Academy portal as the root site and mounts the Reading + Writing curriculum inside `/reading-writing/` to prevent JavaScript naming conflicts between the two apps.

Upload the full folder contents to the root of the GitHub repository. Keep these files and folders together:

```txt
index.html
styles.css
data.js
app.js
manifest.webmanifest
service-worker.js
SOURCES.md
assets/
reading-writing/
```

The Reading + Writing app can be opened from the main navigation tab or directly at:

```txt
/reading-writing/index.html
```


## Integrated Curriculum Modules Added

This package now includes these standalone curriculum modules inside the main Kingswell Academy portal:

- `reading-writing/` — Reading + Writing curriculum app.
- `math-algebra/` — Math + Algebra curriculum system with placement, lessons, homework, quizzes, scoring, explanations, feedback, weak-skill tracking, mastered-skill tracking, and local progress storage.
- `science-biology-chemistry/` — Science + Biology + Chemistry curriculum module with Basic, Intermediate, and Advanced levels, lessons, homework rubrics, quizzes, 40-question mastery tests, scoring, explanations, review tags, progress tracking, and progress export.

Each module is mounted from the main navigation through an embedded frame and can also be opened as its own full page. This prevents JavaScript naming collisions while keeping every uploaded codebase working inside one GitHub Pages site.

## Final GitHub Upload Structure

```txt
index.html
styles.css
data.js
app.js
manifest.webmanifest
service-worker.js
SOURCES.md
assets/
reading-writing/
math-algebra/
science-biology-chemistry/
logic-research/
psychology/
```


## Additional Integrated Curriculum Modules

This complete package also includes:

- `logic-research/` — Logic + Research curriculum platform with Basic, Intermediate, and Advanced levels, curriculum data, lessons, homework, quizzes, 40-question final tests, auto-grading, answer explanations, skill scoring, rubrics, book/source mapping, and local progress tracking.
- `psychology/` — Psychology curriculum pack with Basic, Intermediate, and Advanced tracks, original lessons, homework worksheets, rubrics, lesson quizzes, 40-question final tests, scoring, answer explanations, review recommendations, completion tracking, certificates, and local browser progress tracking.

All added curriculum apps are mounted from the main Kingswell Academy navigation through embedded frames and can also open as full standalone pages. Keeping each curriculum in its own folder prevents module imports, variable names, CSS, and local progress storage from breaking each other.

## Complete GitHub Upload Structure

```txt
index.html
styles.css
data.js
app.js
manifest.webmanifest
service-worker.js
SOURCES.md
assets/
reading-writing/
math-algebra/
science-biology-chemistry/
logic-research/
psychology/
```


## Business + Marketing and Architecture + Drafting Added

This expanded package also includes:

- `business-marketing/` — Business + Marketing curriculum platform with Basic, Intermediate, and Advanced levels, 24 written lessons, objectives, vocabulary, examples, practice drills, homework assignments, rubrics, quizzes, 40-question final exams, automatic scoring, answer explanations, source-book connections, and local progress tracking.
- `architecture-drafting/` — Architecture + Drafting curriculum module with Basic, Intermediate, and Advanced levels, 12 classes per level, lesson summaries, objectives, vocabulary, homework/studio assignments, rubrics, class quizzes, 40-question level tests, scoring, explanations, remediation messages, progress tracking, and certificate unlock logic.

The root Kingswell Academy navigation now opens these modules beside Reading + Writing, Math + Algebra, Science + Biology + Chemistry, Logic + Research, and Psychology. Each curriculum remains isolated in its own folder to avoid JavaScript, CSS, and localStorage conflicts.

## Expanded GitHub Upload Structure

```txt
index.html
styles.css
data.js
app.js
manifest.webmanifest
service-worker.js
SOURCES.md
assets/
reading-writing/
math-algebra/
science-biology-chemistry/
logic-research/
psychology/
business-marketing/
architecture-drafting/
```


## Branding update

The official uploaded Kingswell Academy crest, banner, and app icons are now applied to the main site and linked across the curriculum modules.
