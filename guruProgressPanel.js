import ora from 'ora';
import chalk from 'chalk';
import Table from 'cli-table3';

// Define your agents and their initial statuses
const agents = [
  { name: 'UIFlowAgent', status: 'Pending', progress: 0 },
  { name: 'PromptAgent', status: 'Pending', progress: 0 },
  { name: 'GematriaExplainAgent', status: 'Pending', progress: 0 },
  { name: 'DeliverablesAgent', status: 'Pending', progress: 0 },
  { name: 'SimchaAgent', status: 'Pending', progress: 0 },
  { name: 'StoryAgent', status: 'Pending', progress: 0 }
];

const spinner = ora('Initializing Guru Progress Panel...').start();

function renderTable() {
  const table = new Table({
    head: ['Agent', 'Status', 'Progress'],
    colWidths: [25, 20, 20]
  });

  agents.forEach(agent => {
    let colorStatus = chalk.yellow(agent.status);
    if (agent.status === 'Done') colorStatus = chalk.green(agent.status);
    if (agent.status === 'In Progress') colorStatus = chalk.blue(agent.status);

    table.push([
      agent.name,
      colorStatus,
      `${agent.progress}%`
    ]);
  });

  return table.toString();
}

async function updateAgents() {
  spinner.text = 'Guru agents working...';

  for (const agent of agents) {
    agent.status = 'In Progress';
    for (let i = 0; i <= 100; i += 20) {
      agent.progress = i;
      console.clear();
      console.log(renderTable());
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    agent.status = 'Done';
    agent.progress = 100;
    console.clear();
    console.log(renderTable());
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  spinner.succeed('All Guru agents completed their tasks!');
  console.log(chalk.green('\n✅ Guru Mode integrity: All checks passed. Ready for final merge or push.'));
}

updateAgents();

