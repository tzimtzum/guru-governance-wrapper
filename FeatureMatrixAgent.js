import fs from "fs";

export async function verifyFeatureMatrix() {
  // console.log("📋 Feature Matrix Agent running..."); // Disable log to stop static output

  const matrix = JSON.parse(fs.readFileSync("feature_matrix.json", "utf-8"));
  const required = [
    "Shiur Topic",
    "Derech Dropdown",
    "Simcha Tone",
    "Story Audience",
    "Gematria Explanation",
    "Hebrew Keyboard"
  ];

  const missing = required.filter(req => !matrix.includes(req));

  return {
    passed: missing.length === 0,
    present: matrix,
    missing
  };
}



