import { runUIAudit } from "./UIAuditAgent.js";
import { runLogicAudit } from "./LogicAgent.js";
import { verifyFeatureMatrix } from "./FeatureMatrixAgent.js";
import { runLearningSimulation } from "./LearningSimulationAgent.js";
import { runProofGatekeeper } from "./ProofGatekeeper.js";
import fs from "fs";

(async function runGuruWrapper() {
  console.log("🟢 Guru Governance Wrapper started...");

  const uiAudit = await runUIAudit();
  const logicAudit = await runLogicAudit();
  const matrixAudit = await verifyFeatureMatrix();
  const learningSimulation = await runLearningSimulation();

  const allPassed = uiAudit.passed && logicAudit.passed && matrixAudit.passed && learningSimulation.passed;

  const proof = {
    timestamp: new Date().toISOString(),
    uiAudit,
    logicAudit,
    matrixAudit,
    learningSimulation,
    finalApproval: allPassed ? "✅ Approved — All Systems Pass" : "❌ Not Approved — Fix Required"
  };

  fs.writeFileSync("guru_proof.json", JSON.stringify(proof, null, 2));

  if (!allPassed) {
    console.error("❌ Governance Blocked: You must fix audits before final output or push.");
    process.exit(1);
  }

  await runProofGatekeeper(proof);
})();

