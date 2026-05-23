const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T>(array: T[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const generateChoices = (correctAnswer: number) => {
  const choices = new Set<number>();

  choices.add(correctAnswer);

  while (choices.size < 4) {
    const offset = getRandomNumber(-10, 10);
    const fakeAnswer = correctAnswer + offset;

    if (fakeAnswer !== correctAnswer && fakeAnswer >= 0) {
      choices.add(fakeAnswer);
    }
  }

  return shuffleArray(Array.from(choices));
};