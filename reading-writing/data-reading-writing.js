/*
  Reading + Writing Curriculum Data
  ------------------------------------------------------------
  IMPORTANT:
  - Books are used as teacher reference sources.
  - Lessons, questions, passages, explanations, and homework below are original starter content.
  - Do not copy copyrighted book pages, chapters, worksheets, or test banks into a public/paid site.
*/

const RW_CURRICULUM = {
  meta: {
    title: "Reading + Writing Curriculum",
    passingScore: 70,
    masteryScore: 80,
    advancedMasteryScore: 90,
    testQuestionCount: 40,
    storageKey: "kwaReadingWritingProgressV1"
  },
  sourceGuides: [
    {
      title: "Everything You Need to Ace English Language Arts in One Big Fat Notebook",
      role: "Basic grammar, vocabulary, reading fiction, reading nonfiction, and writing map."
    },
    {
      title: "Actually, the Comma Goes Here",
      role: "Punctuation sequence: periods, commas, apostrophes, quotation marks, semicolons, dashes, parentheses, ellipses, and style."
    },
    {
      title: "Illuminating Comprehension and Close Reading",
      role: "Close reading, text-dependent questions, evidence-based answers, segmented reading, and better discussion questions."
    },
    {
      title: "Writing to Learn",
      role: "Writing as thinking, reflection, explaining knowledge, writing across subjects, and advanced composition."
    },
    {
      title: "On Writing Well",
      role: "Clarity, nonfiction style, revision, word economy, and audience."
    },
    {
      title: "They Say / I Say",
      role: "Argument structure, summary, response, counterargument, synthesis, and academic writing."
    }
  ],
  levels: []
};

function mc(id, level, skill, question, choices, answer, explanation, wrongExplanations = []) {
  return {
    id,
    level,
    skill,
    type: "multiple-choice",
    question,
    choices,
    answer,
    explanation,
    wrongExplanations,
    points: 1
  };
}

function short(id, level, skill, question, modelAnswer, rubric, points = 4) {
  return {
    id,
    level,
    skill,
    type: "short-answer",
    question,
    modelAnswer,
    rubric,
    points
  };
}

const BASIC_TEST_QUESTIONS = [
  mc("b-final-01", "basic", "complete-sentences", "Which choice is a complete sentence?", ["Because the lesson started.", "The student opened the book.", "After the bell rang.", "Reading quietly in class."], 1, "A complete sentence has a subject, a predicate, and a complete thought."),
  mc("b-final-02", "basic", "sentence-fragments", "Which choice is a sentence fragment?", ["The class reviewed grammar.", "Maya wrote a paragraph.", "Because the answer was unclear.", "The teacher explained the rule."], 2, "A fragment is an incomplete thought. This choice begins with 'because' but never finishes the idea."),
  mc("b-final-03", "basic", "subject-predicate", "In the sentence 'The careful reader noticed the clue,' what is the subject?", ["careful", "reader", "noticed", "clue"], 1, "The subject is who or what the sentence is about: reader."),
  mc("b-final-04", "basic", "subject-predicate", "In the sentence 'The careful reader noticed the clue,' what is the predicate?", ["The careful reader", "noticed the clue", "the clue", "reader noticed"], 1, "The predicate tells what the subject does or is."),
  mc("b-final-05", "basic", "comma-list", "Which sentence uses commas correctly in a list?", ["We packed pencils notebooks and folders.", "We packed pencils, notebooks, and folders.", "We packed, pencils notebooks and folders.", "We packed pencils notebooks, and folders."], 1, "Items in a series should be separated by commas."),
  mc("b-final-06", "basic", "comma-intro", "Which sentence uses a comma correctly after an introductory word?", ["Yes I finished the reading.", "Yes, I finished the reading.", "Yes I, finished the reading.", "Yes I finished, the reading."], 1, "Introductory words like 'Yes' are usually followed by a comma."),
  mc("b-final-07", "basic", "apostrophes", "Which sentence uses the apostrophe correctly?", ["The students essay was clear.", "The student's essay was clear.", "The students' essay was clear, and it belonged to one student.", "The student essay's was clear."], 1, "One student owns one essay, so use student's."),
  mc("b-final-08", "basic", "quotation-marks", "Which sentence uses quotation marks correctly?", ["Mia said, I found the answer.", "Mia said, “I found the answer.”", "Mia said “I found the answer.", "Mia said, “I found the answer."], 1, "The exact spoken words are placed inside quotation marks, and punctuation stays inside the closing mark."),
  mc("b-final-09", "basic", "capitalization", "Which sentence is capitalized correctly?", ["on monday, we read a poem.", "On Monday, we read a poem.", "On monday, we read a Poem.", "on Monday, we read a poem."], 1, "The first word of a sentence and the day of the week should be capitalized."),
  mc("b-final-10", "basic", "verb-tense", "Which sentence keeps the verb tense consistent?", ["Yesterday, I walk to class and finished my notes.", "Yesterday, I walked to class and finished my notes.", "Yesterday, I walk to class and finish my notes.", "Yesterday, I walking to class and finished my notes."], 1, "Both actions happened yesterday, so both verbs should be past tense."),
  mc("b-final-11", "basic", "pronouns", "Which pronoun correctly completes the sentence: 'Jordan and ___ studied together.'", ["me", "I", "mine", "my"], 1, "Use 'I' as part of a compound subject."),
  mc("b-final-12", "basic", "homophones", "Which sentence uses 'there' correctly?", ["Their going to read.", "There going to read.", "The books are over there.", "They put there books away."], 2, "'There' refers to a place."),
  mc("b-final-13", "basic", "context-clues", "The passage says, 'The room was silent; not a single student whispered.' What does 'silent' mean?", ["bright", "quiet", "crowded", "messy"], 1, "The clue 'not a single student whispered' shows that silent means quiet."),
  mc("b-final-14", "basic", "context-clues", "The sentence says, 'The fragile vase cracked when it fell.' What does 'fragile' most likely mean?", ["easy to break", "very colorful", "heavy", "old"], 0, "The clue 'cracked when it fell' shows that fragile means easy to break."),
  mc("b-final-15", "basic", "main-idea", "Which sentence is most likely a main idea?", ["Blue whales can weigh more than 100 tons.", "Whales are large ocean mammals with several unique traits.", "Some whales sing.", "A whale calf drinks milk."], 1, "A main idea is broad enough to cover the details."),
  mc("b-final-16", "basic", "supporting-detail", "Which detail supports the main idea: 'Reading every day improves vocabulary'?", ["Many books have colorful covers.", "A dictionary is heavy.", "Daily readers meet more new words.", "Libraries have chairs."], 2, "Meeting more new words directly supports vocabulary growth."),
  mc("b-final-17", "basic", "summary", "Which is the best summary of a story about a girl who practices piano for weeks and wins a recital?", ["A girl owns a piano.", "A girl practices hard and succeeds at a recital.", "A recital has many people.", "The piano is black."], 1, "A summary gives the main events without tiny details."),
  mc("b-final-18", "basic", "fact-opinion", "Which sentence is a fact?", ["Poetry is the best kind of writing.", "Every student should love essays.", "A paragraph usually focuses on one main idea.", "Grammar is boring."], 2, "A fact can be checked. The other choices are opinions."),
  mc("b-final-19", "basic", "cause-effect", "Which word often signals cause and effect?", ["because", "beside", "however", "also"], 0, "'Because' often explains why something happened."),
  mc("b-final-20", "basic", "compare-contrast", "Which word signals contrast?", ["also", "because", "however", "first"], 2, "'However' shows a difference or contrast."),
  mc("b-final-21", "basic", "fiction-character", "A character is best described as:", ["the people or beings in a story", "the lesson of a story", "the place of a story", "the order of events"], 0, "Characters are the people, animals, or beings who take part in a story."),
  mc("b-final-22", "basic", "fiction-setting", "Setting means:", ["the author’s opinion", "the time and place of a story", "the problem in a story", "the final lesson"], 1, "Setting is where and when a story happens."),
  mc("b-final-23", "basic", "plot", "Plot means:", ["the message of a poem", "the sequence of events in a story", "a word’s meaning", "a punctuation rule"], 1, "Plot is the sequence of events."),
  mc("b-final-24", "basic", "theme", "Theme is best defined as:", ["a story’s central message", "the title of a book", "a comma rule", "a character’s name"], 0, "Theme is the message or lesson developed by a text."),
  mc("b-final-25", "basic", "nonfiction", "Which text is most likely nonfiction?", ["a fairy tale", "a poem about a dragon", "an article about volcanoes", "a fantasy novel"], 2, "Nonfiction gives information about real topics."),
  mc("b-final-26", "basic", "text-features", "Which text feature helps readers find where topics are located in a book?", ["index", "dialogue", "setting", "theme"], 0, "An index lists topics and page numbers."),
  mc("b-final-27", "basic", "topic-sentence", "Which sentence would work best as a topic sentence?", ["Also, carrots are orange.", "Healthy snacks can help students stay focused.", "Then I closed the bag.", "Because apples."], 1, "A topic sentence states the paragraph’s main point."),
  mc("b-final-28", "basic", "paragraph-unity", "Which sentence does not belong in a paragraph about caring for a dog?", ["Dogs need clean water.", "Dogs should be walked regularly.", "My favorite color is blue.", "Dogs need safe places to sleep."], 2, "This sentence does not support the paragraph’s topic."),
  mc("b-final-29", "basic", "transitions", "Which transition best shows sequence?", ["however", "for example", "next", "although"], 2, "'Next' shows order."),
  mc("b-final-30", "basic", "revision", "Which revision is clearer?", ["The thing was good.", "The mystery novel was exciting.", "It was stuff.", "The one was okay."], 1, "Specific nouns and adjectives make writing clearer."),
  mc("b-final-31", "basic", "editing", "Which sentence is written correctly?", ["She dont like fragments.", "She doesn't like fragments.", "She doesn't likes fragments.", "She don't likes fragments."], 1, "'Doesn't' agrees with 'she,' and the main verb stays in base form."),
  mc("b-final-32", "basic", "punctuation-end", "Which sentence needs a question mark?", ["Where is the workbook", "The workbook is here", "Read the passage", "I found the workbook"], 0, "A direct question needs a question mark."),
  mc("b-final-33", "basic", "word-choice", "Which word best completes the sentence: 'The teacher gave a ___ explanation.'", ["clear", "clearly", "clearness", "cleared"], 0, "An adjective is needed to describe 'explanation.'"),
  mc("b-final-34", "basic", "roots-affixes", "The prefix 're-' usually means:", ["before", "again", "not", "under"], 1, "The prefix re- means again, as in reread."),
  mc("b-final-35", "basic", "roots-affixes", "The suffix '-less' usually means:", ["full of", "without", "one who", "able to"], 1, "The suffix -less means without."),
  mc("b-final-36", "basic", "evidence", "Which phrase best introduces text evidence?", ["I guess that", "The passage states", "Maybe", "I feel like"], 1, "'The passage states' points back to evidence from the text."),
  mc("b-final-37", "basic", "inference", "If a character grabs an umbrella before leaving, what can you infer?", ["It may rain.", "It is midnight.", "The character is angry.", "The character cannot read."], 0, "An umbrella is commonly used when rain is expected."),
  short("b-final-38", "basic", "paragraph-writing", "Write a 5-sentence paragraph explaining why daily reading helps students improve.", "A strong answer gives a clear topic sentence, at least three supporting details, and a closing sentence.", ["Topic sentence", "Three supporting details", "Clear organization", "Correct grammar and punctuation"]),
  short("b-final-39", "basic", "short-response", "Read this sentence: 'Lena checked her notes twice before the quiz.' What does this detail show about Lena?", "It shows Lena is careful, prepared, or responsible because she reviews her notes before being tested.", ["Valid inference", "Evidence from sentence", "Clear explanation", "Complete sentence"]),
  short("b-final-40", "basic", "revision-writing", "Revise this weak sentence to make it clearer: 'The thing was really good.'", "A strong revision replaces vague words with specific details, such as 'The adventure novel was exciting because every chapter ended with a surprise.'", ["Specific noun", "Precise adjective or detail", "Clear sentence", "Correct punctuation"])
];

const INTERMEDIATE_TEST_QUESTIONS = [
  mc("i-final-01", "intermediate", "close-reading", "What is the main purpose of close reading?", ["To finish fast", "To memorize every word", "To examine details, language, and evidence carefully", "To skip difficult sections"], 2, "Close reading means slowing down to examine how the text works."),
  mc("i-final-02", "intermediate", "annotation", "Which annotation is most useful?", ["cool", "This detail shows the narrator is afraid because he avoids the hallway.", "boring", "I do not like this font."], 1, "Useful annotations connect details to meaning."),
  mc("i-final-03", "intermediate", "text-evidence", "Which answer best uses evidence?", ["I think she is brave.", "She is brave because the passage says she stepped forward when everyone else moved back.", "She is brave because I like her.", "She is brave, obviously."], 1, "The answer states a claim and supports it with evidence."),
  mc("i-final-04", "intermediate", "inference", "A character smiles during an argument but clenches his fists. What can readers infer?", ["He may be hiding anger.", "He is asleep.", "He is eating.", "He forgot the argument."], 0, "Body language can reveal feelings the character is trying to hide."),
  mc("i-final-05", "intermediate", "author-purpose", "An author writes an article explaining how solar panels work. The purpose is mostly to:", ["entertain", "inform", "confuse", "sell shoes"], 1, "Explaining how something works is informational writing."),
  mc("i-final-06", "intermediate", "tone", "Which word describes the tone of: 'The plan was a disaster from the first step.'", ["critical", "celebratory", "neutral", "playful"], 0, "Words like 'disaster' create a critical tone."),
  mc("i-final-07", "intermediate", "central-idea", "A central idea differs from a topic because it:", ["is only one word", "states the main point about the topic", "is always a question", "never uses evidence"], 1, "The central idea is the main point the author makes about the topic."),
  mc("i-final-08", "intermediate", "structure", "A text that explains similarities and differences uses which structure?", ["chronological", "compare and contrast", "problem and solution", "cause and effect"], 1, "Compare/contrast structure shows similarities and differences."),
  mc("i-final-09", "intermediate", "structure", "A text that tells events in time order uses which structure?", ["chronological", "classification", "argument", "definition"], 0, "Chronological structure uses time order."),
  mc("i-final-10", "intermediate", "argument", "A claim is:", ["a random fact", "the writer’s main position", "a comma rule", "a paragraph break"], 1, "A claim is the position the writer argues for."),
  mc("i-final-11", "intermediate", "argument", "Which is the strongest evidence for a claim about school libraries?", ["I like libraries.", "Libraries are nice.", "A district report showed library use increased reading scores by 12%.", "Books have pages."], 2, "Specific data from a relevant report is stronger than opinion."),
  mc("i-final-12", "intermediate", "counterclaim", "A counterclaim is:", ["the opposite or competing position", "a spelling error", "a topic sentence", "a type of noun"], 0, "A counterclaim is a viewpoint that challenges the writer’s claim."),
  mc("i-final-13", "intermediate", "rebuttal", "A rebuttal should:", ["ignore the counterclaim", "answer the counterclaim with reasoning and evidence", "repeat the title", "end the essay immediately"], 1, "A rebuttal responds to the opposing view."),
  mc("i-final-14", "intermediate", "revision", "Which revision makes this sentence more precise: 'The article says stuff about sleep.'", ["The article explains how sleep affects memory and attention.", "The article says stuff.", "It talks about things.", "Sleep is there."], 0, "Precise writing names the topic and action clearly."),
  mc("i-final-15", "intermediate", "transitions", "Which transition best introduces an example?", ["For example", "However", "Although", "Meanwhile"], 0, "For example introduces evidence or an example."),
  mc("i-final-16", "intermediate", "transitions", "Which transition best introduces a contrast?", ["Similarly", "In addition", "However", "For instance"], 2, "However signals contrast."),
  mc("i-final-17", "intermediate", "quotation-integration", "Which sentence integrates a quotation best?", ["Quote: reading matters.", "The author shows reading matters when she writes, “daily practice builds fluency.”", "The quote is there.", "Reading matters “daily practice builds fluency”."], 1, "The sentence introduces the quotation and connects it to the idea."),
  mc("i-final-18", "intermediate", "paraphrase", "Paraphrasing means:", ["copying exact words without quotation marks", "restating an idea in your own words", "deleting evidence", "changing only one word"], 1, "Paraphrasing restates meaning in new wording."),
  mc("i-final-19", "intermediate", "summary", "A good summary should:", ["include only personal opinions", "include every tiny detail", "state the main ideas briefly and objectively", "change the author’s meaning"], 2, "A summary is brief, accurate, and objective."),
  mc("i-final-20", "intermediate", "objective-writing", "Which sentence is most objective?", ["The author is totally wrong.", "The article argues that longer school days may increase practice time.", "This essay is dumb.", "Only lazy people disagree."], 1, "Objective writing avoids insults and sticks to what the text says."),
  mc("i-final-21", "intermediate", "fiction-analysis", "A character’s motivation is:", ["why the character acts", "where the story happens", "the type of punctuation used", "the author’s biography"], 0, "Motivation is the reason behind a character’s actions."),
  mc("i-final-22", "intermediate", "theme-development", "A theme is developed through:", ["only the title", "characters’ choices, conflicts, and consequences", "font size", "page numbers"], 1, "Theme develops through events, choices, conflict, and outcomes."),
  mc("i-final-23", "intermediate", "point-of-view", "A first-person narrator uses:", ["he/she/they only", "I/me/my", "you/your only", "no pronouns"], 1, "First person uses I, me, my, we, or us."),
  mc("i-final-24", "intermediate", "bias", "Bias means:", ["a perfectly neutral view", "a preference or slant that affects presentation", "a text feature", "a type of comma"], 1, "Bias is a slant or preference that can shape how information is presented."),
  mc("i-final-25", "intermediate", "source-evaluation", "Which source is usually stronger for a research paragraph?", ["anonymous comment", "peer-reviewed study", "random meme", "untitled screenshot"], 1, "A peer-reviewed study is more reliable than anonymous or unsupported material."),
  mc("i-final-26", "intermediate", "grammar", "Which sentence uses active voice?", ["The essay was written by Noah.", "Noah wrote the essay.", "The essay was being written.", "The essay had been written."], 1, "Active voice makes the subject perform the action."),
  mc("i-final-27", "intermediate", "grammar", "Which sentence avoids wordiness?", ["Due to the fact that it rained, the game ended.", "Because it rained, the game ended.", "At this point in time, rain happened.", "The game, due to rain, in regard to ending, ended."], 1, "Clear writing removes unnecessary phrases."),
  mc("i-final-28", "intermediate", "punctuation", "Which sentence uses a semicolon correctly?", ["I studied; because the test was hard.", "I studied; the test was hard.", "I; studied the test was hard.", "I studied the; test was hard."], 1, "A semicolon can join two closely related complete sentences."),
  mc("i-final-29", "intermediate", "punctuation", "Which sentence uses a colon correctly?", ["Bring these items: pencil, notebook, and folder.", "Bring: these items pencil.", "Bring these: items are useful.", "Bring these items pencil: notebook."], 0, "A colon can introduce a list after a complete thought."),
  mc("i-final-30", "intermediate", "editing", "Which sentence is correctly punctuated?", ["Although the passage was difficult, the class understood it.", "Although the passage was difficult the class understood it.", "Although, the passage was difficult the class understood it.", "Although the passage, was difficult the class understood it."], 0, "An introductory dependent clause is followed by a comma."),
  mc("i-final-31", "intermediate", "organization", "Which essay order is strongest?", ["Evidence, closing, claim, introduction", "Introduction, claim, evidence, explanation, conclusion", "Conclusion, evidence, title, claim", "Random notes, claim, random notes"], 1, "Strong essays move from introduction and claim to evidence, explanation, and conclusion."),
  mc("i-final-32", "intermediate", "paragraph-writing", "What should every body paragraph support?", ["the title font", "the thesis or main claim", "the page number", "the author photo"], 1, "Body paragraphs should support the main claim."),
  mc("i-final-33", "intermediate", "evidence-explanation", "After giving evidence, a writer should usually:", ["explain how the evidence supports the claim", "change topics", "apologize", "delete the claim"], 0, "Evidence needs reasoning so the reader sees why it matters."),
  mc("i-final-34", "intermediate", "vocabulary", "The word 'reluctant' means:", ["eager", "unwilling or hesitant", "careless", "loud"], 1, "Reluctant means unwilling or hesitant."),
  mc("i-final-35", "intermediate", "vocabulary", "The word 'analyze' means:", ["to examine closely", "to ignore", "to decorate", "to summarize with no detail"], 0, "Analyze means to examine parts and meaning carefully."),
  mc("i-final-36", "intermediate", "vocabulary", "The word 'contrast' means:", ["show similarities", "show differences", "repeat exactly", "define a word"], 1, "Contrast means to show differences."),
  mc("i-final-37", "intermediate", "mla-apa-basics", "Why do writers cite sources?", ["to make the paper longer", "to give credit and let readers check information", "to avoid writing", "to hide evidence"], 1, "Citations credit sources and support verification."),
  short("i-final-38", "intermediate", "close-reading-response", "Write a short response explaining how a character’s action can reveal motivation. Use one invented example.", "A strong answer explains that actions show what a character wants, fears, or values and gives a clear example.", ["Clear explanation", "Invented example", "Connection to motivation", "Complete sentences"]),
  short("i-final-39", "intermediate", "argument-paragraph", "Write one argument paragraph claiming whether students should read every day. Include claim, evidence, and reasoning.", "A strong answer includes a clear claim, one piece of relevant evidence, and reasoning explaining why the evidence supports the claim.", ["Claim", "Evidence", "Reasoning", "Organization"]),
  short("i-final-40", "intermediate", "revision", "Revise this sentence for clarity and precision: 'The writer uses things to show the idea.'", "A strong revision names the technique and idea, such as: 'The writer uses repeated images of darkness to show the character’s fear.'", ["Specific technique", "Specific idea", "Clear wording", "Correct punctuation"])
];

const ADVANCED_TEST_QUESTIONS = [
  mc("a-final-01", "advanced", "rhetorical-analysis", "Rhetorical analysis focuses on:", ["only spelling", "how a writer uses language and structure to persuade or affect readers", "the number of pages", "the author’s handwriting"], 1, "Rhetorical analysis studies how writing works on an audience."),
  mc("a-final-02", "advanced", "claim", "Which is the strongest academic claim?", ["Phones exist.", "School phone policies should balance focus with emergency access.", "I like phones.", "Phones are cool."], 1, "A strong claim is arguable, specific, and focused."),
  mc("a-final-03", "advanced", "evidence-quality", "Which evidence is strongest?", ["A verified study with clear data", "A rumor", "A meme", "A vague memory"], 0, "Strong evidence is credible, relevant, and verifiable."),
  mc("a-final-04", "advanced", "reasoning", "Reasoning is the part of an argument that:", ["explains how evidence supports the claim", "repeats the title", "adds random facts", "avoids the issue"], 0, "Reasoning connects evidence to the claim."),
  mc("a-final-05", "advanced", "counterargument", "An advanced argument should handle counterarguments by:", ["ignoring them", "mocking them", "representing them fairly and responding with evidence", "deleting them"], 2, "Strong academic writing treats opposing views fairly before responding."),
  mc("a-final-06", "advanced", "synthesis", "Synthesis means:", ["combining ideas from multiple sources into a new understanding", "copying one source", "writing without sources", "listing quotes without explanation"], 0, "Synthesis connects multiple sources and ideas."),
  mc("a-final-07", "advanced", "source-credibility", "Which question best evaluates source credibility?", ["Is the author qualified and is the evidence verifiable?", "Is the website colorful?", "Is the title exciting?", "Is it short?"], 0, "Credentials and verifiable evidence matter more than appearance."),
  mc("a-final-08", "advanced", "bias", "An advanced reader handles bias by:", ["pretending it does not exist", "identifying the slant and checking evidence", "rejecting every source", "accepting the loudest source"], 1, "Bias should be identified and weighed against evidence."),
  mc("a-final-09", "advanced", "summary-response", "In academic writing, summary should usually come before response because:", ["the reader needs to understand the idea being answered", "summary is easier", "response is illegal", "the conclusion comes first"], 0, "You should fairly present the idea before agreeing, disagreeing, or qualifying."),
  mc("a-final-10", "advanced", "qualifying-argument", "To qualify a claim means to:", ["partly agree while adding limits or conditions", "erase the claim", "insult the opposition", "avoid evidence"], 0, "Qualifying adds nuance by showing when or how a claim applies."),
  mc("a-final-11", "advanced", "thesis", "Which thesis is most focused?", ["Education is a thing.", "Online learning can improve access for working adults when courses include feedback, structure, and accountability.", "Learning is good.", "Schools have students."], 1, "This thesis is specific, arguable, and sets up clear categories."),
  mc("a-final-12", "advanced", "paragraph-coherence", "A coherent paragraph should:", ["move logically from claim to evidence to reasoning", "change topics every sentence", "include only quotes", "avoid transitions"], 0, "Coherence means the ideas connect smoothly."),
  mc("a-final-13", "advanced", "quote-analysis", "After quoting a source, an advanced writer should:", ["analyze the quote’s meaning and relevance", "move on without comment", "add three more quotes immediately", "delete the thesis"], 0, "Quotes need interpretation."),
  mc("a-final-14", "advanced", "paraphrase-integrity", "A correct paraphrase:", ["keeps the original meaning but uses new wording and cites the source", "changes one word", "copies the sentence", "removes the citation"], 0, "Paraphrase must be genuinely rewritten and cited."),
  mc("a-final-15", "advanced", "plagiarism", "Plagiarism includes:", ["using another person’s words or ideas without credit", "writing a thesis", "editing a sentence", "using transitions"], 0, "Plagiarism is using words or ideas without proper credit."),
  mc("a-final-16", "advanced", "research-question", "Which research question is strongest?", ["Is reading good?", "How does daily independent reading affect vocabulary growth in middle school students?", "Books?", "Why is stuff important?"], 1, "A strong research question is focused and researchable."),
  mc("a-final-17", "advanced", "evidence-relevance", "Evidence is relevant when it:", ["directly supports the claim", "sounds fancy", "is very old no matter what", "uses big words"], 0, "Relevant evidence connects directly to the point."),
  mc("a-final-18", "advanced", "logical-fallacy", "Attacking the person instead of the argument is called:", ["ad hominem", "chronology", "annotation", "syntax"], 0, "Ad hominem attacks the person rather than the argument."),
  mc("a-final-19", "advanced", "logical-fallacy", "A false dilemma happens when a writer:", ["pretends there are only two choices when more exist", "uses evidence", "defines a term", "quotes accurately"], 0, "False dilemma unfairly limits the options."),
  mc("a-final-20", "advanced", "rhetoric-ethos", "Ethos appeals to:", ["credibility and character", "emotion", "logic only", "punctuation"], 0, "Ethos is the appeal to credibility."),
  mc("a-final-21", "advanced", "rhetoric-pathos", "Pathos appeals to:", ["emotion", "sentence length", "citation format", "page design"], 0, "Pathos uses emotion."),
  mc("a-final-22", "advanced", "rhetoric-logos", "Logos appeals to:", ["logic and evidence", "font choice", "anger only", "author biography only"], 0, "Logos uses logic, facts, and reasoning."),
  mc("a-final-23", "advanced", "style", "Concise writing means:", ["using the fewest words needed to say the idea clearly", "making every sentence short no matter what", "removing all detail", "using vague words"], 0, "Concise writing removes clutter without removing meaning."),
  mc("a-final-24", "advanced", "style", "Which sentence is most concise?", ["In my personal opinion, I think that revision is very important.", "Revision is important.", "It is a true fact that revision matters.", "Revision, in terms of writing, is a thing that matters."], 1, "This sentence states the idea directly."),
  mc("a-final-25", "advanced", "syntax", "Syntax refers to:", ["sentence structure", "source credibility", "paragraph theme", "book genre only"], 0, "Syntax is the arrangement of words and phrases in sentences."),
  mc("a-final-26", "advanced", "diction", "Diction refers to:", ["word choice", "page number", "font size", "paragraph count"], 0, "Diction means word choice."),
  mc("a-final-27", "advanced", "tone", "Tone is created mainly through:", ["diction, detail, and sentence structure", "page margins only", "the index", "copyright page"], 0, "Tone comes from the writer’s choices."),
  mc("a-final-28", "advanced", "audience", "Audience awareness means:", ["adjusting content, tone, and evidence for readers", "writing only for yourself", "using no examples", "avoiding structure"], 0, "Good writers consider who will read the work."),
  mc("a-final-29", "advanced", "genre", "A literature review usually:", ["summarizes and organizes existing research on a topic", "tells a fictional story", "lists groceries", "avoids sources"], 0, "A literature review explains what research says about a topic."),
  mc("a-final-30", "advanced", "abstract", "An abstract is:", ["a brief summary of a research paper", "a comma rule", "a character trait", "an opinion paragraph"], 0, "An abstract summarizes a research paper’s purpose, method, and findings."),
  mc("a-final-31", "advanced", "method", "In research writing, a method section explains:", ["how the research was conducted", "only the title", "the author’s favorite book", "the conclusion first"], 0, "The method section explains the research process."),
  mc("a-final-32", "advanced", "conclusion", "An advanced conclusion should:", ["synthesize the argument and show why it matters", "repeat every sentence", "add unrelated evidence", "apologize for the essay"], 0, "A strong conclusion brings the argument together."),
  mc("a-final-33", "advanced", "revision", "Global revision focuses on:", ["big issues like thesis, structure, evidence, and reasoning", "only spelling", "only font", "only title"], 0, "Global revision improves the whole piece."),
  mc("a-final-34", "advanced", "editing", "Line editing focuses on:", ["sentence-level clarity, style, grammar, and flow", "topic selection only", "research question only", "file name only"], 0, "Line editing works at the sentence level."),
  mc("a-final-35", "advanced", "peer-review", "Good peer feedback should be:", ["specific, respectful, and useful", "vague and insulting", "only praise", "only grammar marks"], 0, "Useful feedback gives specific guidance."),
  mc("a-final-36", "advanced", "metacognition", "A revision reflection should explain:", ["what changed, why it changed, and what improved", "only the word count", "only the due date", "nothing"], 0, "Reflection helps students understand their writing process."),
  mc("a-final-37", "advanced", "capstone", "A capstone writing project should prove that the student can:", ["read, analyze, research, argue, revise, and present knowledge", "only memorize definitions", "only use commas", "avoid sources"], 0, "A capstone should demonstrate multiple advanced skills."),
  short("a-final-38", "advanced", "rhetorical-analysis-writing", "Write a short rhetorical analysis of this invented sentence: 'If we ignore the library, we abandon the quiet engine of the school.' Explain the effect of the metaphor.", "A strong answer explains that the library is compared to an engine, suggesting it quietly powers learning.", ["Identifies metaphor", "Explains effect", "Connects to audience", "Clear writing"]),
  short("a-final-39", "advanced", "synthesis-writing", "Write a synthesis claim connecting reading, writing, and thinking.", "A strong answer explains that reading supplies ideas, writing organizes those ideas, and thinking improves through both.", ["Clear synthesis claim", "Connects all three concepts", "Academic tone", "Complete sentences"]),
  short("a-final-40", "advanced", "research-writing", "Write a research question and one possible source type you would use to answer it.", "A strong answer gives a focused research question and identifies a credible source type such as a peer-reviewed article, government report, or academic book.", ["Focused question", "Credible source type", "Explanation of usefulness", "Correct grammar"])
];

RW_CURRICULUM.levels = [
  {
    id: "basic",
    title: "Basic Reading + Writing",
    unlockRule: "Open to all students.",
    description: "Foundation level: sentences, punctuation, vocabulary, paragraphs, fiction, nonfiction, and basic writing.",
    masteryRequired: 80,
    units: [
      {
        id: "b-u1",
        title: "Class 1: Sentence, Grammar, and Punctuation Foundations",
        objective: "Students learn how sentences work and how punctuation controls meaning.",
        lessons: [
          {
            id: "b-u1-l1",
            title: "Complete Sentences vs. Fragments",
            bookConnection: "Use the ELA grammar book as the teacher map for sentence basics.",
            objective: "Identify complete sentences and correct fragments.",
            vocabulary: ["sentence", "fragment", "subject", "predicate", "complete thought"],
            lessonText: "A complete sentence has a subject, a predicate, and a complete thought. A fragment is missing one of those parts. Strong writing begins with sentences that can stand on their own.",
            examples: [
              { label: "Complete", text: "The reader found the answer in the second paragraph." },
              { label: "Fragment", text: "Because the reader found the answer." },
              { label: "Fix", text: "Because the reader found the answer, she explained her response clearly." }
            ],
            practiceDrills: [
              "Label five sentences as complete or fragment.",
              "Fix three fragments by adding missing information.",
              "Write three complete sentences about today’s reading."
            ],
            homework: [
              "Write 8 complete sentences about a book, movie, or article.",
              "Find 3 fragments and rewrite them as complete sentences.",
              "Write a 5-sentence paragraph using no fragments."
            ],
            quiz: [
              BASIC_TEST_QUESTIONS[0],
              BASIC_TEST_QUESTIONS[1],
              BASIC_TEST_QUESTIONS[2],
              BASIC_TEST_QUESTIONS[3],
              BASIC_TEST_QUESTIONS[30]
            ]
          },
          {
            id: "b-u1-l2",
            title: "Commas, Apostrophes, and Quotation Marks",
            bookConnection: "Use the punctuation books as teacher references for the rule sequence.",
            objective: "Use basic punctuation correctly in sentences.",
            vocabulary: ["comma", "apostrophe", "quotation mark", "possession", "dialogue"],
            lessonText: "Punctuation is traffic control for reading. Commas group ideas, apostrophes show possession or contraction, and quotation marks show exact speech or copied words.",
            examples: [
              { label: "Comma List", text: "We packed pencils, notebooks, and folders." },
              { label: "Apostrophe", text: "The student’s essay was clear." },
              { label: "Quotation", text: "Mia said, “I found the answer.”" }
            ],
            practiceDrills: [
              "Correct five comma-list sentences.",
              "Rewrite five possessive nouns with apostrophes.",
              "Punctuate three lines of dialogue."
            ],
            homework: [
              "Write 5 sentences using comma lists.",
              "Write 5 sentences using apostrophes for possession.",
              "Write 4 sentences of dialogue using quotation marks."
            ],
            quiz: [
              BASIC_TEST_QUESTIONS[4],
              BASIC_TEST_QUESTIONS[5],
              BASIC_TEST_QUESTIONS[6],
              BASIC_TEST_QUESTIONS[7],
              BASIC_TEST_QUESTIONS[31]
            ]
          }
        ]
      },
      {
        id: "b-u2",
        title: "Class 2: Vocabulary and Reading Comprehension",
        objective: "Students build vocabulary, identify main ideas, and support answers with details.",
        lessons: [
          {
            id: "b-u2-l1",
            title: "Context Clues and Word Meaning",
            bookConnection: "Use the ELA vocabulary units as the teacher map for roots, affixes, and context clues.",
            objective: "Use nearby words to determine meaning.",
            vocabulary: ["context clue", "definition", "example", "synonym", "antonym"],
            lessonText: "A context clue is information around an unknown word that helps reveal meaning. Readers should look before and after the word before reaching for a dictionary.",
            examples: [
              { label: "Clue", text: "The fragile vase cracked when it fell." },
              { label: "Meaning", text: "Fragile means easy to break." }
            ],
            practiceDrills: [
              "Underline clues around unknown words.",
              "Write a possible meaning before checking a dictionary.",
              "Use each new word in an original sentence."
            ],
            homework: [
              "Choose 8 unfamiliar words from a reading.",
              "Write the sentence where each word appears.",
              "Guess the meaning using context, then check a dictionary."
            ],
            quiz: [
              BASIC_TEST_QUESTIONS[12],
              BASIC_TEST_QUESTIONS[13],
              BASIC_TEST_QUESTIONS[33],
              BASIC_TEST_QUESTIONS[34],
              BASIC_TEST_QUESTIONS[35]
            ]
          },
          {
            id: "b-u2-l2",
            title: "Main Idea, Details, and Summary",
            bookConnection: "Use the ELA reading nonfiction section as the teacher map.",
            objective: "Find the main idea and support it with details.",
            vocabulary: ["main idea", "detail", "summary", "fact", "opinion"],
            lessonText: "The main idea is what the whole paragraph or passage is mostly about. Details prove, explain, or illustrate the main idea. A summary retells the central point without tiny details.",
            examples: [
              { label: "Main Idea", text: "Daily reading improves vocabulary." },
              { label: "Supporting Detail", text: "Daily readers meet more new words." }
            ],
            practiceDrills: [
              "Read one paragraph and write its main idea.",
              "List three details that support it.",
              "Write a one-sentence summary."
            ],
            homework: [
              "Read one short article.",
              "Write the central idea.",
              "List 4 supporting details.",
              "Write a 3-sentence summary."
            ],
            quiz: [
              BASIC_TEST_QUESTIONS[14],
              BASIC_TEST_QUESTIONS[15],
              BASIC_TEST_QUESTIONS[16],
              BASIC_TEST_QUESTIONS[17],
              BASIC_TEST_QUESTIONS[36]
            ]
          }
        ]
      },
      {
        id: "b-u3",
        title: "Class 3: Paragraph Writing",
        objective: "Students write organized paragraphs with topic sentences and support.",
        lessons: [
          {
            id: "b-u3-l1",
            title: "Topic Sentences and Paragraph Unity",
            bookConnection: "Use the ELA writing section as the teacher map for paragraph structure.",
            objective: "Write a focused paragraph that stays on topic.",
            vocabulary: ["topic sentence", "supporting sentence", "unity", "closing sentence"],
            lessonText: "A paragraph should focus on one main idea. The topic sentence names that idea. Supporting sentences explain it, and the closing sentence completes the thought.",
            examples: [
              { label: "Topic Sentence", text: "Healthy snacks can help students stay focused." },
              { label: "Off Topic", text: "My favorite color is blue." }
            ],
            practiceDrills: [
              "Pick the best topic sentence from a list.",
              "Remove one off-topic sentence from a paragraph.",
              "Write a 6-sentence paragraph."
            ],
            homework: [
              "Write one paragraph about why reading matters.",
              "Underline the topic sentence.",
              "Circle one transition word.",
              "Revise one vague sentence."
            ],
            quiz: [
              BASIC_TEST_QUESTIONS[26],
              BASIC_TEST_QUESTIONS[27],
              BASIC_TEST_QUESTIONS[28],
              BASIC_TEST_QUESTIONS[29],
              BASIC_TEST_QUESTIONS[37]
            ]
          }
        ]
      }
    ],
    finalTest: {
      id: "basic-final",
      title: "Basic Reading + Writing Final Test",
      instructions: "Answer all 40 questions. Multiple choice is auto-scored. Short answers receive model answers and rubric guidance.",
      questions: BASIC_TEST_QUESTIONS
    }
  },
  {
    id: "intermediate",
    title: "Intermediate Reading + Writing",
    unlockRule: "Unlocks after Basic final mastery score of 80% or higher, or by placement.",
    description: "Middle level: close reading, inference, evidence, tone, author’s purpose, revision, and argument paragraphs.",
    masteryRequired: 80,
    units: [
      {
        id: "i-u1",
        title: "Class 1: Close Reading and Evidence",
        objective: "Students learn how to slow down, annotate, infer, and prove answers from a text.",
        lessons: [
          {
            id: "i-u1-l1",
            title: "Close Reading Without Guessing",
            bookConnection: "Use the close-reading book as the teacher reference for text-dependent questions and queries.",
            objective: "Use details from the text to support answers.",
            vocabulary: ["close reading", "annotation", "evidence", "inference", "query"],
            lessonText: "Close reading is careful reading. Students should notice word choice, repeated ideas, shifts in tone, and details that reveal meaning.",
            examples: [
              { label: "Weak Answer", text: "She is nervous because I think so." },
              { label: "Strong Answer", text: "She is nervous because her hands shake as she reaches for the paper." }
            ],
            practiceDrills: [
              "Annotate three details in a short passage.",
              "Write one inference based on body language.",
              "Answer one question with evidence."
            ],
            homework: [
              "Read a short passage.",
              "Write 5 annotations.",
              "Answer 3 questions using evidence from the text."
            ],
            quiz: [
              INTERMEDIATE_TEST_QUESTIONS[0],
              INTERMEDIATE_TEST_QUESTIONS[1],
              INTERMEDIATE_TEST_QUESTIONS[2],
              INTERMEDIATE_TEST_QUESTIONS[3],
              INTERMEDIATE_TEST_QUESTIONS[37]
            ]
          }
        ]
      },
      {
        id: "i-u2",
        title: "Class 2: Author’s Purpose, Tone, and Structure",
        objective: "Students identify why and how authors build meaning.",
        lessons: [
          {
            id: "i-u2-l1",
            title: "Purpose, Tone, and Structure",
            bookConnection: "Use the reading nonfiction sections and close-reading guidance as teacher references.",
            objective: "Identify author purpose, tone, and text structure.",
            vocabulary: ["purpose", "tone", "central idea", "structure", "bias"],
            lessonText: "Writers make choices. Purpose explains why the text was written. Tone reveals attitude. Structure controls how the information is arranged.",
            examples: [
              { label: "Purpose", text: "An article explaining how solar panels work is mostly written to inform." },
              { label: "Tone", text: "Words like 'disaster' and 'failure' create a critical tone." }
            ],
            practiceDrills: [
              "Label the purpose of three short paragraphs.",
              "Identify two tone words.",
              "Explain one text structure."
            ],
            homework: [
              "Find one article.",
              "Write its purpose, tone, and central idea.",
              "Explain the structure in 3 sentences."
            ],
            quiz: [
              INTERMEDIATE_TEST_QUESTIONS[4],
              INTERMEDIATE_TEST_QUESTIONS[5],
              INTERMEDIATE_TEST_QUESTIONS[6],
              INTERMEDIATE_TEST_QUESTIONS[7],
              INTERMEDIATE_TEST_QUESTIONS[23]
            ]
          }
        ]
      },
      {
        id: "i-u3",
        title: "Class 3: Argument Writing",
        objective: "Students write claim-evidence-reasoning paragraphs and respond to counterclaims.",
        lessons: [
          {
            id: "i-u3-l1",
            title: "Claim, Evidence, Reasoning",
            bookConnection: "Use argument writing sections as teacher references.",
            objective: "Build a paragraph with a claim, evidence, and reasoning.",
            vocabulary: ["claim", "evidence", "reasoning", "counterclaim", "rebuttal"],
            lessonText: "An argument is not just an opinion. It needs a claim, proof, and reasoning that explains why the proof matters.",
            examples: [
              { label: "Claim", text: "Students should read daily." },
              { label: "Evidence", text: "Daily readers encounter more vocabulary." },
              { label: "Reasoning", text: "More vocabulary exposure helps students understand harder texts." }
            ],
            practiceDrills: [
              "Write one claim.",
              "Add one piece of evidence.",
              "Explain the evidence in two sentences."
            ],
            homework: [
              "Write one argument paragraph.",
              "Include claim, evidence, reasoning, and a closing sentence.",
              "Revise for clarity and punctuation."
            ],
            quiz: [
              INTERMEDIATE_TEST_QUESTIONS[9],
              INTERMEDIATE_TEST_QUESTIONS[10],
              INTERMEDIATE_TEST_QUESTIONS[11],
              INTERMEDIATE_TEST_QUESTIONS[12],
              INTERMEDIATE_TEST_QUESTIONS[38]
            ]
          }
        ]
      }
    ],
    finalTest: {
      id: "intermediate-final",
      title: "Intermediate Reading + Writing Final Test",
      instructions: "Answer all 40 questions. Multiple choice is auto-scored. Short answers receive model answers and rubric guidance.",
      questions: INTERMEDIATE_TEST_QUESTIONS
    }
  },
  {
    id: "advanced",
    title: "Advanced Reading + Writing",
    unlockRule: "Unlocks after Intermediate final mastery score of 80% or higher, or by placement.",
    description: "Advanced level: rhetoric, research, synthesis, academic argument, source evaluation, and capstone writing.",
    masteryRequired: 85,
    units: [
      {
        id: "a-u1",
        title: "Class 1: Academic Argument and Rhetorical Analysis",
        objective: "Students learn how advanced writers build persuasive, evidence-based arguments.",
        lessons: [
          {
            id: "a-u1-l1",
            title: "Claims, Counterclaims, and Rhetorical Appeals",
            bookConnection: "Use academic argument books as teacher references for summary, response, and argument structure.",
            objective: "Analyze claims, evidence, reasoning, and rhetorical appeals.",
            vocabulary: ["thesis", "claim", "counterclaim", "ethos", "pathos", "logos"],
            lessonText: "Advanced reading asks how a text works. Advanced writing asks whether an argument is clear, fair, well-supported, and persuasive.",
            examples: [
              { label: "Ethos", text: "The writer builds trust by showing expertise." },
              { label: "Logos", text: "The writer uses data and reasoning." },
              { label: "Pathos", text: "The writer uses emotion to move the audience." }
            ],
            practiceDrills: [
              "Identify one claim in a paragraph.",
              "Label one appeal: ethos, pathos, or logos.",
              "Write one fair counterclaim."
            ],
            homework: [
              "Write a thesis about reading and education.",
              "Add one counterclaim.",
              "Write a rebuttal using evidence and reasoning."
            ],
            quiz: [
              ADVANCED_TEST_QUESTIONS[0],
              ADVANCED_TEST_QUESTIONS[1],
              ADVANCED_TEST_QUESTIONS[4],
              ADVANCED_TEST_QUESTIONS[19],
              ADVANCED_TEST_QUESTIONS[37]
            ]
          }
        ]
      },
      {
        id: "a-u2",
        title: "Class 2: Research, Source Evaluation, and Synthesis",
        objective: "Students learn how to evaluate sources and combine ideas responsibly.",
        lessons: [
          {
            id: "a-u2-l1",
            title: "Research Questions and Credible Sources",
            bookConnection: "Use advanced writing and research-writing books as teacher references.",
            objective: "Create research questions and evaluate source quality.",
            vocabulary: ["research question", "source", "credibility", "bias", "synthesis"],
            lessonText: "Good research starts with a focused question. Good academic writing does not simply stack quotes; it synthesizes sources into a clear explanation or argument.",
            examples: [
              { label: "Weak Question", text: "Is reading good?" },
              { label: "Strong Question", text: "How does daily independent reading affect vocabulary growth in middle school students?" }
            ],
            practiceDrills: [
              "Turn three broad topics into focused research questions.",
              "Rank three sources from strongest to weakest.",
              "Write one synthesis sentence connecting two source ideas."
            ],
            homework: [
              "Write one research question.",
              "Find two credible source types you would use.",
              "Write a 5-sentence explanation of why those sources fit."
            ],
            quiz: [
              ADVANCED_TEST_QUESTIONS[5],
              ADVANCED_TEST_QUESTIONS[6],
              ADVANCED_TEST_QUESTIONS[7],
              ADVANCED_TEST_QUESTIONS[15],
              ADVANCED_TEST_QUESTIONS[39]
            ]
          }
        ]
      },
      {
        id: "a-u3",
        title: "Class 3: Capstone Writing Project",
        objective: "Students produce a polished essay with research, analysis, revision, and reflection.",
        lessons: [
          {
            id: "a-u3-l1",
            title: "Draft, Revise, Edit, Reflect",
            bookConnection: "Use writing-to-learn and clear writing books as teacher references.",
            objective: "Complete a final writing cycle from draft to revision reflection.",
            vocabulary: ["draft", "global revision", "line editing", "reflection", "capstone"],
            lessonText: "Advanced writers revise at multiple levels. Global revision fixes the argument and structure. Line editing fixes clarity, style, grammar, and flow.",
            examples: [
              { label: "Global Revision", text: "Move paragraph three before paragraph two because the logic is clearer." },
              { label: "Line Editing", text: "Replace 'a lot of things' with 'three major causes.'" }
            ],
            practiceDrills: [
              "Write a thesis.",
              "Revise one paragraph for structure.",
              "Line edit five sentences.",
              "Write a revision reflection."
            ],
            homework: [
              "Draft a 750–1000 word essay.",
              "Revise for thesis, structure, evidence, and reasoning.",
              "Submit a reflection explaining what changed and why."
            ],
            quiz: [
              ADVANCED_TEST_QUESTIONS[32],
              ADVANCED_TEST_QUESTIONS[33],
              ADVANCED_TEST_QUESTIONS[34],
              ADVANCED_TEST_QUESTIONS[35],
              ADVANCED_TEST_QUESTIONS[36]
            ]
          }
        ]
      }
    ],
    finalTest: {
      id: "advanced-final",
      title: "Advanced Reading + Writing Final Test",
      instructions: "Answer all 40 questions. Multiple choice is auto-scored. Short answers receive model answers and rubric guidance.",
      questions: ADVANCED_TEST_QUESTIONS
    }
  }
];

RW_CURRICULUM.placementTest = {
  id: "rw-placement",
  title: "Reading + Writing Placement Test",
  instructions: "This test places students into Basic, Intermediate, or Advanced. The platform recommends a level after scoring.",
  questions: [
    BASIC_TEST_QUESTIONS[0],
    BASIC_TEST_QUESTIONS[4],
    BASIC_TEST_QUESTIONS[12],
    BASIC_TEST_QUESTIONS[14],
    BASIC_TEST_QUESTIONS[26],
    INTERMEDIATE_TEST_QUESTIONS[0],
    INTERMEDIATE_TEST_QUESTIONS[2],
    INTERMEDIATE_TEST_QUESTIONS[5],
    INTERMEDIATE_TEST_QUESTIONS[9],
    INTERMEDIATE_TEST_QUESTIONS[27],
    ADVANCED_TEST_QUESTIONS[1],
    ADVANCED_TEST_QUESTIONS[4],
    ADVANCED_TEST_QUESTIONS[6],
    ADVANCED_TEST_QUESTIONS[15],
    ADVANCED_TEST_QUESTIONS[23]
  ]
};

RW_CURRICULUM.writingRubrics = {
  basic: [
    { name: "Focus", description: "The paragraph stays on one main idea.", max: 4 },
    { name: "Support", description: "The paragraph uses details or examples.", max: 4 },
    { name: "Organization", description: "The paragraph has a topic sentence, body, and closing.", max: 4 },
    { name: "Conventions", description: "Sentences, punctuation, and capitalization are mostly correct.", max: 4 }
  ],
  intermediate: [
    { name: "Claim", description: "The response has a clear claim or answer.", max: 4 },
    { name: "Evidence", description: "The response uses accurate text evidence.", max: 4 },
    { name: "Reasoning", description: "The response explains how the evidence supports the claim.", max: 4 },
    { name: "Style + Conventions", description: "The writing is clear, precise, and edited.", max: 4 }
  ],
  advanced: [
    { name: "Thesis", description: "The essay has a focused, arguable thesis.", max: 4 },
    { name: "Source Use", description: "The essay uses credible evidence and responsible citation habits.", max: 4 },
    { name: "Analysis + Synthesis", description: "The essay explains, connects, and evaluates ideas instead of stacking quotes.", max: 4 },
    { name: "Revision + Style", description: "The final draft is organized, concise, polished, and reflective.", max: 4 }
  ]
};
