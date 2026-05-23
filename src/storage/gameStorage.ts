import AsyncStorage from "@react-native-async-storage/async-storage";

const GAME_HISTORY_KEY = "@calculo_mental_history";

export type GameResult = {
  id: string;
  date: string;
  score: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  answered: number;
  totalPlayed: number;
  totalConfigured: number;
  accuracy: number;
  averageTime: number;
  difficulty: string;
  mode: string;
};

export const getGameHistory = async (): Promise<GameResult[]> => {
  try {
    const data = await AsyncStorage.getItem(GAME_HISTORY_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return [];
  }
};

export const saveGameResult = async (result: GameResult) => {
  try {
    const currentHistory = await getGameHistory();

    const updatedHistory = [result, ...currentHistory];

    await AsyncStorage.setItem(
      GAME_HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error("Error al guardar resultado:", error);
  }
};

export const clearGameHistory = async () => {
  try {
    await AsyncStorage.removeItem(GAME_HISTORY_KEY);
  } catch (error) {
    console.error("Error al limpiar historial:", error);
  }
};

export const getBestScore = async () => {
  try {
    const history = await getGameHistory();

    if (history.length === 0) {
      return null;
    }

    return history.reduce((best, current) => {
      return current.score > best.score ? current : best;
    }, history[0]);
  } catch (error) {
    console.error("Error al obtener mejor puntaje:", error);
    return null;
  }
};