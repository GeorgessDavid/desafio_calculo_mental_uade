import AsyncStorage from "@react-native-async-storage/async-storage";

import { Difficulty } from "../logic/generateOperation";
import { GameMode } from "../types/game";

const GAME_HISTORY_KEY = "@calculo_mental_history";
const MAX_HISTORY_ITEMS = 50;

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
  difficulty: Difficulty;
  mode: GameMode;
};

export const getGameHistory = async (): Promise<GameResult[]> => {
  try {
    const data = await AsyncStorage.getItem(GAME_HISTORY_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as GameResult[];
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return [];
  }
};

const saveHistory = async (history: GameResult[]) => {
  await AsyncStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(history));
};

export const saveGameResult = async (result: GameResult) => {
  try {
    const currentHistory = await getGameHistory();

    const updatedHistory = [result, ...currentHistory].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    await saveHistory(updatedHistory);
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

export const getBestScore = async (): Promise<GameResult | null> => {
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