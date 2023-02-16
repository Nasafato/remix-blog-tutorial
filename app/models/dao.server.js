import { DAO, punctuation } from "../consts";

const passages = DAO.trim()
  .split("\n")
  .map((s) => s.trim());

export function getDaoPassage({ index }) {
  const passage = passages[index];
  return {
    index,
    passage,
  };
}

export function getPunctuation() {
  return punctuation;
}

export function getDaoPassages() {
  return passages.map((passage, index) => {
    return {
      passage,
      index,
    };
  });
}
