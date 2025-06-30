export async function runProofGatekeeper(proof) {
  console.log("✅ Final Proof Gatekeeper checking...");

  if (proof.finalApproval !== "✅ Approved — All Systems Pass") {
    throw new Error("❌ Proof Gatekeeper Blocked: Proof file indicates failures.");
  }

  console.log("🟢 Proof Gatekeeper Passed. Ready for push or merge.");
}

