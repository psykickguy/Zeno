import "dotenv/config";

export const JUDGE0_URL =
  process.env.JUDGE0_URL || "https://judge0-ce.p.rapidapi.com";
export const JUDGE0_KEY = process.env.JUDGE0_KEY || null;

export const languageMap = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
};
