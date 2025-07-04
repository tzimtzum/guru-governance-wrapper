// guruWrapper.js

import { startAgents, checkHeartbeat, connectToUTA } from "./guruCore";
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

console.log("🟢 Guru Governance Wrapper started...");

// Create a new progress bar
const progressBar = new cliProgress.SingleBar({
    format: 'Guru Progress |' + colors.cyan('{bar}') + '| {percentage}% || {agent}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

const agents = [
    { name: 'UI Audit Agent', weight: 20 },
    { name: 'Logic Audit Agent', weight: 20 },
    { name: 'Feature Matrix Agent', weight: 20 },
    { name: 'Learning Simulation Agent', weight: 20 },
    { name: 'Proof Gatekeeper', weight: 20 }
];

let progress = 0;
progressBar.start(100, 0, { agent: 'Initializing...' });

(async () => {
    for (const agent of agents) {
        progressBar.update(progress, { agent: `Starting ${agent.name}` });
        await startAgents(agent.name);
        progress += agent.weight;
        progressBar.update(progress, { agent: `${agent.name} Completed` });

        checkHeartbeat(agent.name);
    }

    progressBar.update(100, { agent: 'All agents completed' });
    progressBar.stop();

    console.log("✅ All agents finished. Connecting to UTA...");

    await connectToUTA();

    console.log("🟢 Guru Governance Wrapper fully integrated with UTA. Ready for next commands.");
})();



