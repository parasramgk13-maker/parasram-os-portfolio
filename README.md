# PARASRAM.OS — Personal Portfolio

A responsive, OS-inspired portfolio for Parasram Gaikwad. The site is built as a static website with HTML, CSS, vanilla JavaScript and a Three.js hero scene. Its visual direction uses a dark interface with neon blue and purple accents.

## Included sections
- **About Me:** personal introduction, education and current interests.
- **Skills / Tech Superpowers:** programming, web, database and exploration areas.
- **Projects / Achievements:** AI Travel Planner, E-Pizza, Arduino sensor experiments and this portfolio.
- **Learning journey:** AWS Student Builder Campus Leader community work, internship experience and education.
- **Future Me Lab:** a working four-stage interactive career roadmap.
- **Visitor terminal:** a second interactive feature with a visible hint. Type `help`, or try `funfact`, `superpower`, `journey` and `futurelab`.

## AI Travel Planner project preview
`assets/ai-travel-planner-desktop.jpg` is the desktop screenshot supplied by the portfolio owner. It shows the AI Travel Planner interface running locally at `localhost:5000`. It is used as a project preview, not represented as a publicly deployed demo. The project description is limited to the screenshot and the technologies listed in the owner's existing portfolio (Python, HTML, CSS and JavaScript); exact AI capabilities and repository URL still need confirmation.

## Run locally
1. Extract the ZIP.
2. Open this folder in Visual Studio Code.
3. Start the VS Code Live Server extension from `index.html`, or run any static local web server in this folder.
4. Open the local URL shown by the server.

The Three.js hero loads from jsDelivr, so the 3D scene requires an internet connection. The rest of the site is static. No API keys or backend secrets are included.

## Deploy with AWS Amplify Hosting
This is a static website and does not need a build step.

1. Create a GitHub repository for this portfolio and push the contents of this folder to its root.
2. In the AWS Console, open **AWS Amplify** and choose **Host web app**.
3. Connect GitHub, authorize access, and select the portfolio repository and branch.
4. Review the included `amplify.yml`. It publishes the repository root without a framework build command.
5. Save and deploy. Wait for Amplify to report a successful deployment, then open the generated `https://...amplifyapp.com` URL.
6. Test the website on desktop and mobile, including the 3D hero, navigation, terminal commands, Future Me Lab stage buttons, project dialog and contact links.

**Deployment status:** not yet deployed. No AWS account access or GitHub repository connection was provided in this task, so this package does not claim a live AWS URL or successful AWS deployment.

## Hackathon submission preparation
The hackathon requires a public Amplify URL, a GitHub repository link, screenshots of the portfolio and AWS setup, AWS services used, and a write-up of learnings and challenges. The site source and AI Travel Planner project screenshot are included. After deployment, add the actual public URL, repository URL, and genuine AWS Console screenshots to the submission. Do not claim AWS services were used until deployment is complete.

### Suggested project description (edit after deployment)
PARASRAM.OS is my personal developer portfolio, built to share my story as an Information Technology student, the skills I am developing, and projects I have worked on. Its creative feature, Future Me Lab, is an interactive four-stage career roadmap that lets visitors explore the goals I am working toward. A visitor terminal adds a playful way to discover facts about my learning journey. I built the site as a responsive static website and plan to host it globally with AWS Amplify Hosting.

## Before publishing
- Confirm all biography, education and experience details.
- Add the exact GitHub repository URL for each project if available.
- Confirm the AI Travel Planner's actual AI features before making feature claims.
- Add a real public demo URL only after deploying the relevant project.
- Add real screenshots from AWS Amplify after deployment.
- Never commit AWS access keys, passwords or tokens.
