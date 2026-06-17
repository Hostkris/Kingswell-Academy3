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
