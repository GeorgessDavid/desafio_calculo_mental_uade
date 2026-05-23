export type Difficulty = "easy" | "medium" | "hard";

export type MathOperation = {
  question: string;
  answer: number;
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateOperation = (difficulty: Difficulty): MathOperation => {
  let operators: string[] = [];
  let min = 1;
  let max = 10;

  if (difficulty === "easy") {
    operators = ["+", "-"];
    min = 1;
    max = 20;
  }

  if (difficulty === "medium") {
    operators = ["+", "-", "*"];
    min = 1;
    max = 50;
  }

  if (difficulty === "hard") {
    operators = ["+", "-", "*", "/"];
    min = 1;
    max = 100;
  }

  const operator = operators[getRandomNumber(0, operators.length - 1)];

  let a = getRandomNumber(min, max);
  let b = getRandomNumber(min, max);

  if (operator === "+") {
    return {
      question: `${a} + ${b}`,
      answer: a + b,
    };
  }

  if (operator === "-") {
    if (b > a) {
      [a, b] = [b, a];
    }

    return {
      question: `${a} - ${b}`,
      answer: a - b,
    };
  }

  if (operator === "*") {
    return {
      question: `${a} × ${b}`,
      answer: a * b,
    };
  }

  // División exacta para evitar decimales
  b = getRandomNumber(1, 10);
  const result = getRandomNumber(1, 10);
  a = b * result;

  return {
    question: `${a} ÷ ${b}`,
    answer: result,
  };
};