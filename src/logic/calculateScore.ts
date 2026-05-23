type CalculateScoreParams = {
    isCorrect: boolean;
    answered: boolean;
    responseTime: number;
    maxTime: number;
};

export const calculateScore = ({
    isCorrect,
    answered,
    responseTime,
    maxTime,
}: CalculateScoreParams) => {
    if (!answered) {
        return -50;
    }

    if (!isCorrect) {
        return -30;
    }

    const fastLimit = maxTime * 0.75;

    if (responseTime <= fastLimit) {
        return 100;
    }

    return 70;
};