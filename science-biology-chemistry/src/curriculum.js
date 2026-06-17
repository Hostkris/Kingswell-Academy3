export const curriculum = {
  id: "science-biology-chemistry",
  title: "Science + Biology + Chemistry",
  note: "Use the books as teacher/source guides. Lessons, homework, questions, explanations, and rubrics in this module are original platform content based on source topics.",
  levels: [
    {
      id: "basic",
      title: "Basic Level",
      gradeBand: "Beginner / Middle School Foundation",
      sourceBooks: [
        {
          title: "Everything You Need to Ace Science in One Big Fat Notebook",
          role: "Main beginner science spine",
          sourceUse: "Scientific investigation, lab safety, SI units, matter, energy, cells, earth science, ecology, and intro genetics"
        }
      ],
      unit: {
        id: "basic-core-science",
        title: "Foundations of Science, Life, and Matter",
        testTitle: "Basic Science Mastery Test",
        requiredTestQuestions: 40,
        lessons: [
          {
            id: "basic-science-01",
            title: "Thinking Like a Scientist",
            sourceTopic: "Scientific investigation and scientific thinking",
            objectives: [
              "Separate observation from inference",
              "Write a testable scientific question",
              "Explain how evidence supports or rejects a hypothesis"
            ],
            vocabulary: ["observation", "inference", "hypothesis", "evidence", "data", "conclusion"],
            lesson: "Science begins with careful observation, not guessing. A scientist collects evidence, asks a testable question, forms a hypothesis, tests it, and explains what the data shows. Good science does not chase the answer it wants; it follows the evidence wherever it goes.",
            examples: [
              "Observation: The leaf has brown edges. Inference: The plant may not be getting enough water.",
              "Testable question: Does sunlight affect how fast bean plants grow?"
            ],
            homework: [
              "Write five observations about an object at home.",
              "Turn one observation into a testable question.",
              "Write one hypothesis using if/then wording.",
              "Explain why a guess is not the same as a hypothesis."
            ],
            rubric: ["Clear observation", "Testable question", "Logical hypothesis", "Uses evidence-based language"]
          },
          {
            id: "basic-science-02",
            title: "Variables and Fair Experiments",
            sourceTopic: "Scientific experiments",
            objectives: [
              "Identify independent, dependent, and controlled variables",
              "Explain why fair tests change one variable at a time",
              "Choose a control group when needed"
            ],
            vocabulary: ["independent variable", "dependent variable", "control variable", "control group", "fair test"],
            lesson: "A fair experiment changes one main factor and keeps the rest the same. The independent variable is what you change. The dependent variable is what you measure. Controlled variables are kept the same so the test is not sloppy.",
            examples: [
              "Question: Does fertilizer affect plant height? Independent variable: fertilizer amount. Dependent variable: plant height.",
              "Controlled variables: same plant type, same water amount, same light, same pot size."
            ],
            homework: [
              "Design a fair test about plant growth, paper airplanes, or ice melting.",
              "List the independent and dependent variables.",
              "List three controlled variables.",
              "Explain what would make your experiment unfair."
            ],
            rubric: ["Correct variable labels", "Fair-test design", "Clear measurement plan", "Controlled variables named"]
          },
          {
            id: "basic-science-03",
            title: "Lab Safety and Scientific Tools",
            sourceTopic: "Lab safety and scientific tools",
            objectives: [
              "Apply basic lab safety rules",
              "Match tools to their purpose",
              "Explain why unknown substances require caution"
            ],
            vocabulary: ["goggles", "beaker", "graduated cylinder", "balance", "microscope", "wafting", "chemical waste"],
            lesson: "Lab safety is not decoration. It prevents burns, cuts, poisoning, eye damage, and bad data. Students should wear proper protection, follow directions, report spills, and never taste or directly smell unknown materials.",
            examples: [
              "Use a graduated cylinder to measure liquid volume.",
              "Use a balance to measure mass.",
              "Use a microscope to view objects too small to see clearly with the naked eye."
            ],
            homework: [
              "Create a ten-rule lab safety contract.",
              "Draw and label five lab tools.",
              "Explain what to do during an unknown liquid spill.",
              "Write why food and drinks do not belong in a lab."
            ],
            rubric: ["Safety rules are specific", "Tools matched correctly", "Spill response is safe", "Explanation is clear"]
          },
          {
            id: "basic-science-04",
            title: "Measurement and SI Units",
            sourceTopic: "SI units and measurements",
            objectives: [
              "Use SI units for length, mass, volume, and temperature",
              "Read measurements carefully",
              "Explain why standard units matter"
            ],
            vocabulary: ["meter", "gram", "liter", "Celsius", "mass", "volume", "precision", "unit"],
            lesson: "Science needs standard units so people can compare results. SI units keep measurement consistent. Length is commonly measured in meters, mass in grams, liquid volume in liters or milliliters, and temperature in Celsius.",
            examples: [
              "A pencil may be measured in centimeters.",
              "Water volume in a beaker may be measured in milliliters.",
              "Body temperature or water temperature may be measured in degrees Celsius."
            ],
            homework: [
              "Measure five household objects in centimeters.",
              "Record three liquid volumes in milliliters if safe to do so.",
              "Explain why scientists do not just use random units like handfuls.",
              "Convert 1 meter into centimeters."
            ],
            rubric: ["Correct units", "Accurate recording", "Shows conversions", "Explains standard measurement"]
          },
          {
            id: "basic-science-05",
            title: "Matter, Properties, and Phases",
            sourceTopic: "Matter, properties, and phases",
            objectives: [
              "Define matter",
              "Compare solids, liquids, and gases",
              "Separate physical properties from chemical properties"
            ],
            vocabulary: ["matter", "mass", "volume", "solid", "liquid", "gas", "physical property", "chemical property"],
            lesson: "Matter is anything that has mass and takes up space. Solids keep their shape, liquids take the shape of their container, and gases spread out to fill available space. Physical properties can be observed without changing the substance into something new.",
            examples: [
              "Ice melting is a physical change.",
              "Wood burning is a chemical change because new substances form.",
              "Color, density, melting point, and texture are physical properties."
            ],
            homework: [
              "List three solids, three liquids, and three gases.",
              "Describe two physical properties of a coin.",
              "Explain why burning paper is a chemical change.",
              "Draw particle spacing for solid, liquid, and gas."
            ],
            rubric: ["Correct examples", "Accurate phase comparison", "Physical/chemical difference clear", "Diagram shows particle spacing"]
          },
          {
            id: "basic-science-06",
            title: "Atoms, Elements, Compounds, and Mixtures",
            sourceTopic: "Periodic table, atomic structure, and compounds",
            objectives: [
              "Define atom, element, compound, and mixture",
              "Identify atoms as building blocks of matter",
              "Explain how compounds differ from mixtures"
            ],
            vocabulary: ["atom", "element", "compound", "mixture", "molecule", "proton", "neutron", "electron"],
            lesson: "Atoms are tiny building blocks of matter. An element contains only one kind of atom. A compound forms when atoms chemically combine. A mixture combines substances physically, so the parts can often be separated without a chemical reaction.",
            examples: [
              "Oxygen is an element.",
              "Water is a compound made from hydrogen and oxygen.",
              "Trail mix is a mixture because the parts are physically combined."
            ],
            homework: [
              "Define atom, element, compound, and mixture.",
              "Give two examples of each term.",
              "Explain why water is not a mixture.",
              "Draw a simple atom with protons, neutrons, and electrons."
            ],
            rubric: ["Terms defined correctly", "Examples accurate", "Compound vs mixture explained", "Atom diagram labeled"]
          },
          {
            id: "basic-science-07",
            title: "Cells and Living Things",
            sourceTopic: "Classification and cells",
            objectives: [
              "State the basic idea of cell theory",
              "Identify basic cell parts",
              "Explain characteristics of living things"
            ],
            vocabulary: ["cell", "cell membrane", "nucleus", "cytoplasm", "organism", "unicellular", "multicellular"],
            lesson: "Living things are made of cells. Some organisms have one cell, while others have many. Cells have parts that help them survive, grow, use energy, respond to the environment, and reproduce.",
            examples: [
              "Bacteria are unicellular.",
              "Humans are multicellular.",
              "The cell membrane controls what enters and leaves the cell."
            ],
            homework: [
              "List six characteristics of living things.",
              "Label a basic cell diagram.",
              "Compare unicellular and multicellular organisms.",
              "Explain why a rock is not alive."
            ],
            rubric: ["Living traits named", "Cell parts labeled", "Comparison is accurate", "Explanation uses science vocabulary"]
          },
          {
            id: "basic-science-08",
            title: "Ecosystems and Food Chains",
            sourceTopic: "Ecosystems and environment",
            objectives: [
              "Identify producers, consumers, and decomposers",
              "Trace energy through a food chain",
              "Explain how organisms depend on each other"
            ],
            vocabulary: ["ecosystem", "producer", "consumer", "decomposer", "food chain", "food web", "habitat"],
            lesson: "An ecosystem includes living organisms and the nonliving parts of their environment. Energy usually begins with producers, moves to consumers, and returns nutrients through decomposers. Remove one part, and the whole system can wobble.",
            examples: [
              "Grass is a producer.",
              "A rabbit is a consumer.",
              "Fungi can act as decomposers."
            ],
            homework: [
              "Draw a food chain with at least four organisms.",
              "Label the producer and consumers.",
              "Explain what decomposers do.",
              "Describe what could happen if one organism disappeared."
            ],
            rubric: ["Correct energy flow", "Roles labeled", "Decomposer function explained", "Cause/effect reasoning shown"]
          }
        ]
      }
    },
    {
      id: "intermediate",
      title: "Intermediate Level",
      gradeBand: "High School Core",
      sourceBooks: [
        {
          title: "Everything You Need to Ace Biology in One Big Fat Notebook",
          role: "Main biology spine",
          sourceUse: "Biology basics, chemistry of life, cells, bacteria, viruses, body systems, genetics, evolution, and ecology"
        },
        {
          title: "Everything You Need to Ace Chemistry in One Big Fat Notebook",
          role: "Main chemistry spine",
          sourceUse: "Measurement, matter, atomic theory, periodic table, bonding, VSEPR, reactions, acids, bases, and calculations"
        }
      ],
      unit: {
        id: "intermediate-bio-chem-core",
        title: "High School Biology and Chemistry Core",
        testTitle: "Intermediate Biology + Chemistry Mastery Test",
        requiredTestQuestions: 40,
        lessons: [
          {
            id: "intermediate-bio-01",
            title: "Cell Structure and Function",
            sourceTopic: "Cell theory and cell structure",
            objectives: ["Explain cell theory", "Identify major organelles", "Compare plant and animal cells"],
            vocabulary: ["organelle", "nucleus", "mitochondrion", "ribosome", "chloroplast", "cell wall", "cell membrane"],
            lesson: "Cells are organized systems. Organelles perform specific jobs: the nucleus stores genetic directions, ribosomes build proteins, mitochondria help make ATP, and membranes control movement in and out of the cell.",
            examples: ["Plant cells have chloroplasts and cell walls.", "Animal cells do not have cell walls."],
            homework: ["Label plant and animal cells.", "Write organelle function flashcards.", "Compare mitochondria and chloroplasts.", "Explain why cells need membranes."],
            rubric: ["Organelles labeled", "Functions accurate", "Plant/animal differences clear", "Uses vocabulary correctly"]
          },
          {
            id: "intermediate-bio-02",
            title: "Photosynthesis and Cellular Respiration",
            sourceTopic: "Chemical energy, photosynthesis, and cellular respiration",
            objectives: ["Describe photosynthesis", "Describe cellular respiration", "Compare energy storage and energy release"],
            vocabulary: ["glucose", "ATP", "chlorophyll", "photosynthesis", "cellular respiration", "carbon dioxide", "oxygen"],
            lesson: "Photosynthesis stores energy by using light to make glucose. Cellular respiration releases usable energy from glucose by making ATP. These processes connect plants, animals, oxygen, carbon dioxide, and food energy.",
            examples: ["Photosynthesis: carbon dioxide + water + light produces glucose and oxygen.", "Respiration: glucose and oxygen help produce ATP, carbon dioxide, and water."],
            homework: ["Write both process summaries.", "Create a compare/contrast chart.", "Explain why animals depend on photosynthesis.", "Draw the cycle of oxygen and carbon dioxide."],
            rubric: ["Equations summarized", "Comparison accurate", "Energy flow explained", "Diagram clear"]
          },
          {
            id: "intermediate-bio-03",
            title: "DNA, RNA, Mitosis, and Meiosis",
            sourceTopic: "Cell reproduction and protein synthesis; genetics",
            objectives: ["Describe DNA and RNA roles", "Separate mitosis from meiosis", "Explain why chromosomes matter"],
            vocabulary: ["DNA", "RNA", "chromosome", "gene", "mitosis", "meiosis", "gamete", "mutation"],
            lesson: "DNA stores inherited information. RNA helps use that information to build proteins. Mitosis makes body cells for growth and repair. Meiosis makes sex cells with half the chromosome number. Mixing them up is a classic student trap; do not step on that rake.",
            examples: ["Mitosis produces two genetically similar body cells.", "Meiosis produces gametes with half the chromosome number."],
            homework: ["Draw a Venn diagram for mitosis and meiosis.", "Define gene, chromosome, and mutation.", "Explain why gametes need half the chromosomes.", "Summarize DNA to RNA to protein."],
            rubric: ["Mitosis/meiosis separated", "Vocabulary accurate", "Chromosome reasoning clear", "Protein synthesis summarized"]
          },
          {
            id: "intermediate-bio-04",
            title: "Genetics and Punnett Squares",
            sourceTopic: "Introduction to genetics",
            objectives: ["Identify dominant and recessive alleles", "Use a Punnett square", "Predict simple inheritance outcomes"],
            vocabulary: ["allele", "dominant", "recessive", "genotype", "phenotype", "homozygous", "heterozygous"],
            lesson: "Genetics studies inherited traits. Alleles are gene versions. Dominant alleles can show with one copy. Recessive alleles usually show only when two copies are present. Punnett squares organize possible offspring genotypes.",
            examples: ["Tt is heterozygous.", "tt is homozygous recessive.", "A Tt x Tt cross can produce TT, Tt, and tt."],
            homework: ["Complete three Punnett squares.", "Define genotype and phenotype.", "Explain dominant vs recessive.", "Write genotype ratios and phenotype ratios."],
            rubric: ["Punnett squares correct", "Ratios accurate", "Terms defined", "Reasoning shown"]
          },
          {
            id: "intermediate-chem-01",
            title: "Atomic Structure and Periodic Table",
            sourceTopic: "Atomic theory and periodic table",
            objectives: ["Identify protons, neutrons, and electrons", "Use atomic number", "Read basic periodic table information"],
            vocabulary: ["proton", "neutron", "electron", "atomic number", "mass number", "isotope", "periodic table"],
            lesson: "Atoms contain protons, neutrons, and electrons. The atomic number equals the number of protons and identifies the element. The periodic table is not wall art; it is a map of matter.",
            examples: ["Carbon has atomic number 6, so it has 6 protons.", "An isotope has the same protons but different neutrons."],
            homework: ["Identify protons for ten elements.", "Calculate neutrons from mass number and atomic number.", "Explain what an isotope is.", "Draw a simple atom model."],
            rubric: ["Atomic numbers used correctly", "Neutron calculations shown", "Isotope explanation clear", "Atom model labeled"]
          },
          {
            id: "intermediate-chem-02",
            title: "Chemical Bonding and Molecular Shape",
            sourceTopic: "Bonding and VSEPR theory",
            objectives: ["Compare ionic and covalent bonds", "Explain valence electrons", "Identify simple molecular shapes"],
            vocabulary: ["ionic bond", "covalent bond", "valence electron", "molecule", "ion", "VSEPR", "polar"],
            lesson: "Atoms bond to become more stable. Ionic bonding transfers electrons and forms ions. Covalent bonding shares electrons. VSEPR helps predict molecular shape based on electron group repulsion.",
            examples: ["Sodium chloride involves ionic bonding.", "Water has covalent bonds and a bent shape."],
            homework: ["Sort ten substances as ionic or covalent.", "Draw Lewis dots for simple atoms.", "Explain why water is bent.", "Define valence electron."],
            rubric: ["Bond type correct", "Lewis dots reasonable", "Shape explanation accurate", "Vocabulary precise"]
          },
          {
            id: "intermediate-chem-03",
            title: "Chemical Reactions and Equations",
            sourceTopic: "Chemical reactions and equations",
            objectives: ["Identify signs of chemical reaction", "Balance simple equations", "Classify reaction types"],
            vocabulary: ["reactant", "product", "coefficient", "subscript", "synthesis", "decomposition", "combustion"],
            lesson: "Chemical equations show reactants becoming products. Coefficients balance equations; subscripts belong to formulas and should not be randomly changed. That is chemistry vandalism.",
            examples: ["2H2 + O2 -> 2H2O is balanced.", "Rusting, burning, bubbling, and color change can signal reactions."],
            homework: ["Balance five simple equations.", "List four signs of a reaction.", "Define reactant and product.", "Explain why subscripts are not changed when balancing."],
            rubric: ["Equations balanced", "Signs accurate", "Terms defined", "Subscript rule explained"]
          },
          {
            id: "intermediate-chem-04",
            title: "Acids, Bases, and Stoichiometry Basics",
            sourceTopic: "Acids, bases, and chemical calculations",
            objectives: ["Use pH to classify acids and bases", "Define mole concept", "Solve simple mole-mass reasoning"],
            vocabulary: ["acid", "base", "pH", "neutral", "mole", "molar mass", "stoichiometry"],
            lesson: "Acids usually have pH below 7, bases above 7, and neutral substances around 7. Stoichiometry uses balanced equations to connect amounts of substances. It is ratio thinking with lab goggles on.",
            examples: ["pH 3 is acidic.", "pH 11 is basic.", "A balanced equation gives mole ratios."],
            homework: ["Classify ten pH values.", "Find molar mass for simple compounds.", "Use one balanced equation to identify mole ratios.", "Explain why balancing matters before stoichiometry."],
            rubric: ["pH classification correct", "Molar mass steps shown", "Mole ratios identified", "Balancing importance explained"]
          }
        ]
      }
    },
    {
      id: "advanced",
      title: "Advanced Level",
      gradeBand: "College Prep / Health Science Extension",
      sourceBooks: [
        {
          title: "Everything You Need to Ace Biology in One Big Fat Notebook",
          role: "Biology review before advanced work",
          sourceUse: "Cells, genetics, body systems, microbiology, ecology, and evolution review"
        },
        {
          title: "Everything You Need to Ace Chemistry in One Big Fat Notebook",
          role: "Chemistry review before advanced work",
          sourceUse: "Atomic theory, reactions, acids/bases, bonding, and calculations review"
        },
        {
          title: "Basic & Clinical Pharmacology",
          role: "Advanced health-science extension",
          sourceUse: "Drug receptors, pharmacodynamics, pharmacokinetics, metabolism, toxicology, drug interactions, and therapeutic classes"
        }
      ],
      unit: {
        id: "advanced-bio-chem-health",
        title: "Advanced Biology, Chemistry, Research, and Health Science",
        testTitle: "Advanced Bio-Chem Health Science Mastery Test",
        requiredTestQuestions: 40,
        lessons: [
          {
            id: "advanced-bio-01",
            title: "Molecular Biology and Protein Synthesis",
            sourceTopic: "DNA/RNA, protein synthesis, and molecular biology",
            objectives: ["Explain transcription", "Explain translation", "Connect genes to proteins"],
            vocabulary: ["nucleotide", "codon", "mRNA", "tRNA", "ribosome", "transcription", "translation"],
            lesson: "Molecular biology explains how cells use genetic instructions. DNA is transcribed into RNA. RNA is translated into protein. Proteins then perform many cell functions, from structure to enzymes to signaling.",
            examples: ["A codon is a three-base sequence that can code for an amino acid.", "Ribosomes read mRNA during translation."],
            homework: ["Transcribe a short DNA sequence into mRNA.", "Translate sample codons using a codon chart.", "Explain how a mutation can affect a protein.", "Draw the flow DNA -> RNA -> protein."],
            rubric: ["Transcription correct", "Translation correct", "Mutation effect explained", "Central dogma diagram clear"]
          },
          {
            id: "advanced-bio-02",
            title: "Enzymes, Metabolism, and Homeostasis",
            sourceTopic: "Enzymes, chemical reactions, metabolism, and body systems",
            objectives: ["Describe enzyme action", "Explain activation energy", "Connect metabolism to homeostasis"],
            vocabulary: ["enzyme", "substrate", "active site", "activation energy", "metabolism", "feedback loop", "homeostasis"],
            lesson: "Enzymes speed reactions by lowering activation energy. Body systems use feedback loops to keep internal conditions stable. Metabolism is the total set of chemical reactions that build and break molecules in living systems.",
            examples: ["Temperature and pH can affect enzyme shape and function.", "Insulin and glucagon help regulate blood glucose."],
            homework: ["Draw enzyme-substrate binding.", "Explain why high heat can denature enzymes.", "Describe one negative feedback loop.", "Connect metabolism to energy balance."],
            rubric: ["Enzyme model accurate", "Denaturation explained", "Feedback loop correct", "Metabolism connection clear"]
          },
          {
            id: "advanced-bio-03",
            title: "Microbiology, Disease, and Immunity",
            sourceTopic: "Bacteria, viruses, disease, and immune system",
            objectives: ["Compare bacteria and viruses", "Explain infection basics", "Describe immune defense layers"],
            vocabulary: ["pathogen", "bacterium", "virus", "antigen", "antibody", "innate immunity", "adaptive immunity"],
            lesson: "Bacteria are living cells. Viruses are not cells and must use host machinery to replicate. The immune system uses barriers, innate responses, and adaptive responses to recognize and respond to threats.",
            examples: ["Antibiotics target bacteria, not viruses.", "Antibodies help recognize specific antigens."],
            homework: ["Create a bacteria vs virus chart.", "Explain why antibiotics do not cure viral infections.", "Draw three immune defense layers.", "Summarize antigen-antibody recognition."],
            rubric: ["Comparison accurate", "Antibiotic reasoning correct", "Defense layers organized", "Immune vocabulary used"]
          },
          {
            id: "advanced-chem-01",
            title: "Chemical Equilibrium and Thermodynamics",
            sourceTopic: "Advanced chemical reactions, equilibrium, and energy",
            objectives: ["Explain dynamic equilibrium", "Use Le Chatelier reasoning", "Connect energy changes to reaction behavior"],
            vocabulary: ["equilibrium", "reversible reaction", "enthalpy", "entropy", "exothermic", "endothermic", "Le Chatelier's principle"],
            lesson: "At equilibrium, forward and reverse reactions continue at equal rates. Conditions such as concentration, temperature, and pressure can shift equilibrium. Thermodynamics helps explain energy changes and reaction direction.",
            examples: ["Adding reactant can shift equilibrium toward products.", "An exothermic reaction releases heat."],
            homework: ["Predict shifts for three equilibrium scenarios.", "Classify reactions as endothermic or exothermic from data.", "Explain dynamic equilibrium in plain language.", "Write one real-world equilibrium example."],
            rubric: ["Shift predictions correct", "Energy classification accurate", "Equilibrium explanation clear", "Example relevant"]
          },
          {
            id: "advanced-chem-02",
            title: "Solutions, Concentration, and Toxicology Thinking",
            sourceTopic: "Solutions, dose, toxicology, and chemical safety",
            objectives: ["Calculate basic concentration", "Explain dose-response thinking", "Connect chemical exposure to safety"],
            vocabulary: ["solution", "solute", "solvent", "molarity", "dose", "toxicity", "exposure", "risk"],
            lesson: "Toxicology depends on substance, dose, exposure route, and time. A chemical's danger cannot be judged by name alone. Concentration and dose help determine actual risk. This is where sloppy thinking goes to retire.",
            examples: ["Molarity is moles of solute per liter of solution.", "High exposure can change risk even for common substances."],
            homework: ["Calculate simple molarity from moles and liters.", "Compare hazard and risk.", "Explain why dose matters.", "Make a safety label for a household chemical without exaggeration."],
            rubric: ["Calculation correct", "Hazard/risk difference clear", "Dose reasoning accurate", "Safety label balanced"]
          },
          {
            id: "advanced-health-01",
            title: "Pharmacodynamics: Receptors and Drug Effects",
            sourceTopic: "Drug receptors and pharmacodynamics",
            objectives: ["Define pharmacodynamics", "Compare agonists and antagonists", "Explain dose-response relationship"],
            vocabulary: ["drug", "receptor", "agonist", "antagonist", "potency", "efficacy", "dose-response"],
            lesson: "Pharmacodynamics studies what drugs do to the body. Drugs often work by binding receptors. Agonists activate receptors. Antagonists block receptor activity. Dose-response curves help compare effect as dose changes.",
            examples: ["An agonist can mimic a natural signaling molecule.", "An antagonist can block a signal from activating a receptor."],
            homework: ["Draw agonist vs antagonist action.", "Define potency and efficacy.", "Interpret a simple dose-response graph.", "Explain why more dose is not always better."],
            rubric: ["Agonist/antagonist correct", "Terms defined", "Graph interpretation sound", "Safety reasoning included"]
          },
          {
            id: "advanced-health-02",
            title: "Pharmacokinetics: ADME and Drug Metabolism",
            sourceTopic: "Pharmacokinetics, pharmacodynamics, dosing, and biotransformation",
            objectives: ["Define pharmacokinetics", "Explain ADME", "Describe why metabolism affects dosing"],
            vocabulary: ["absorption", "distribution", "metabolism", "excretion", "half-life", "clearance", "bioavailability"],
            lesson: "Pharmacokinetics studies what the body does to a drug: absorption, distribution, metabolism, and excretion. Half-life and clearance affect how long a drug remains active and how often doses may be given in clinical settings.",
            examples: ["Liver enzymes often metabolize drugs.", "Kidney function can affect excretion for some drugs."],
            homework: ["Define each ADME step.", "Explain half-life with a simple example.", "Describe why liver or kidney changes can matter.", "Make an ADME flowchart."],
            rubric: ["ADME steps correct", "Half-life explained", "Organ relevance clear", "Flowchart logical"]
          },
          {
            id: "advanced-research-01",
            title: "Scientific Research, Data, and Claims",
            sourceTopic: "Lab reports, evaluating results, case studies, and scientific reasoning",
            objectives: ["Read a scientific claim critically", "Identify evidence quality", "Separate correlation from causation"],
            vocabulary: ["peer review", "sample size", "control", "correlation", "causation", "bias", "replication"],
            lesson: "Advanced science requires checking claims, not just repeating them. Strong evidence uses controls, adequate samples, transparent methods, and replication. Correlation means two things move together; causation means one actually produces the other.",
            examples: ["A small study may be useful but not final.", "A correlation between two variables does not automatically prove cause."],
            homework: ["Find a science headline and identify the claim.", "List what evidence would be needed to support it.", "Explain one possible confounder.", "Write a fair conclusion based only on available evidence."],
            rubric: ["Claim identified", "Evidence standard clear", "Confounder reasonable", "Conclusion not exaggerated"]
          }
        ]
      }
    }
  ]
};
