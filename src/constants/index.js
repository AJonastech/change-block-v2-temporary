import EMPA1 from "../../public/assets/6801972f48246e41cf8f14062a7be104.png";
import EMPA2 from "../../public/assets/d2bc26423822e9bfdb7643d99ad81a02.png";
import EAI from "../../public/assets/aae5bcbec3e8d3af2aa39b5168351c51.png";
import CB from "../../public/assets/c46d82c8e5ea86df0a7395ed132be53d.png";
import RISKGPT from "../../public/assets/image-2.png";
import RecommenderGPT from "../../public/assets/Recommender-GPT.png";

// export const BACKEND_HOST = 'http://35.246.51.171:8000'
//export const BACKEND_HOST = "https://cbinternaltools.com";
//export const BACKEND_HOST_FOR_LAST_2 = "https://gpt-kx2x2r36ga-lm.a.run.app";
//export const FRONTEND_HOST = process.env.REACT_APP_FRONTEND_HOST;
// export const FRONTEND_HOST = "http://localhost:3000";

const APPS = [
  {
    img: EMPA1,
    name: "EMPA Scanner",
    desc: "Quickly assesses your project's potential for Environmental Market Positioning Analysis (EMPA), guiding your sustainability journey.",
    text: "Hi there! Looking to gauge your project's potential for an EMPA? Whether it's assessing your sustainability goals, project size, or regulatory concerns, I'll guide you through.",
    cards: [
      {
        heading: "Generate",
        text: "EMPA Report on electricity distribution",
      },
      {
        heading: "Create",
        text: "EMPA for a Climatetech business",
      },
      {
        heading: "Start",
        text: "EMPA Analysis for waste cleaning programs",
      },
      {
        heading: "Generate",
        text: "EMPA for Sustainable Agriculture Projects",
      },
    ],
  },
  {
    img: EMPA2,
    name: "EMPA Chatbot",
    desc: "Streamlining EMPA processes, guiding you through data collection, analysis, and report generation effortlessly.",
    text: "Hi there! Ready to optimize your EMPA journey? From data collection to analysis and report generation, I've got you covered. Let's streamline your environmental market positioning analysis together.",
    cards: [
      {
        heading: "Show examples",
        text: "of EMPA reports Climatetech businesses in Nigeria",
      },
      {
        heading: "Write emails",
        text: "to assist with client acquisition of EMPA projects",
      },
      {
        heading: "Critically Analyse",
        text: "EMPA reports on waste cleaning programs",
      },
      {
        heading: "Generate",
        text: "EMPA for Sustainable Agriculture Projects",
      },
    ],
  },
  {
    img: EAI,
    name: "EAI Generator",
    desc: "Automates the creation of Environmental Asset Identifier reports, saving time and ensuring accuracy in assessment.",
    text: "Hi there! Need to document your environmental projects? Creates unique Environmental Asset Identifiers (EAIs) and detailed JSON structures, ensuring transparency and traceability for your carbon credit projects.",
    cards: [
      {
        heading: "Generate",
        text: "EAI for carbon emission projects",
      },
      {
        heading: "Run an assessment",
        text: "on the EAI for waste recycling projects",
      },
      {
        heading: "Critically Analyse",
        text: "EAI reports on waste cleaning programs",
      },
      {
        heading: "Highlight",
        text: "the competence of EAI on degeneration",
      },
    ],
  },

  {
    img: CB,
    name: "CB Policy",
    desc: "Get comprehensive solution for navigating complex environmental regulations and ensuring compliance effortlessly.",
    text: "Hi there! Do you need to understand policies, compliance checks, or navigating regulatory frameworks for your business, I'm here to assist.  Share your queries, and I'll provide the guidance you need.",
    cards: [
      {
        heading: "Optimize",
        text: "the strategies of a Climatetech business",
      },
      {
        heading: "Learn More About",
        text: "the intricacies of waste recycling policies",
      },
      {
        heading: "Explore",
        text: "the opportunities in restrategizing",
      },
      {
        heading: "Generate Insights",
        text: "from the policies of a Climatetech business",
      },
    ],
  },
  {
    img: RISKGPT,
    name: "Risk GPT",
    desc: "Identify, analyze, and evaluate risk factors, ensuring sustainability projects, businesses, and strategies stay resilient.",
    text: "Hi there! Need to document your environmental projects? Creates unique Environmental Asset Identifiers (EAIs) and detailed JSON structures, ensuring transparency and traceability for your carbon credit projects.",
    cards: [
      {
        heading: "Generate",
        text: "EAI for carbon emission projects",
      },
      {
        heading: "Run an assessment",
        text: "on the EAI for waste recycling projects",
      },
      {
        heading: "Critically Analyse",
        text: "EAI reports on waste cleaning programs",
      },
      {
        heading: "Highlight",
        text: "the competence of EAI on degeneration",
      },
    ],
  },
  {
    img: RecommenderGPT,
    name: "Recommender GPT",
    desc: "Tailored recommendations on methodology, pricing, sub-sector, registry, project verifiers aligning with your project's requirements.",
    text: "Hi there! Looking to streamline your project information gathering process? Whether it's data collection, analysis, or report generation.",
    cards: [
      {
        heading: "Generate",
        text: "project info for a Climatetech company",
      },
      {
        heading: "Analyze",
        text: "the project info attached for corrections",
      },
      {
        heading: "Explore",
        text: "the traditional style of writing project info",
      },
      {
        heading: "Create",
        text: "project info for a Climatetech company",
      },
    ],
  },
];

export default APPS;
