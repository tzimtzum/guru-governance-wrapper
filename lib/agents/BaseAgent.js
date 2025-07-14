export class BaseAgent {
  constructor({ name, task = "Generic Task", weight = 10, estSeconds = 2 }) {
    this.name = name;
    this.task = task;
    this.weight = weight;
    this.estSeconds = estSeconds;
  }

  async learn() {
    console.log(`📚 ${this.name} is learning context...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async start() {
    console.log(`⚡ ${this.name} starting: ${this.task}`);
    const steps = this.estSeconds * 2;
    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(`✅ ${this.name} completed`);
  }

  async heartbeatCheck() {
    console.log(`❤️ Heartbeat check passed for ${this.name}`);
  }

  async finalize() {
    console.log(`🔒 ${this.name} finalizing and committing results...`);
  }
}
