export const DIFFICULTIES = [
  {
    id: "easy",
    label: "Fácil",
    description: "Operaciones simples con más tiempo.",
    timePerQuestion: 10,
  },
  {
    id: "medium",
    label: "Medio",
    description: "Operaciones intermedias con tiempo moderado.",
    timePerQuestion: 7,
  },
  {
    id: "hard",
    label: "Difícil",
    description: "Operaciones más complejas con menos tiempo.",
    timePerQuestion: 5,
  },
] as const;

export const GAME_MODES = [
  {
    id: "classic",
    label: "Clásico",
    description: "Ingresás directamente el resultado.",
  },
  {
    id: "true_false",
    label: "Verdadero / Falso",
    description: "Indicás si el resultado mostrado es correcto.",
  },
  {
    id: "multiple_choice",
    label: "Multiple choice",
    description: "Elegís una opción entre cuatro respuestas.",
  },
  {
    id: "time_attack",
    label: "Contrarreloj",
    description: "Respondés continuamente hasta fallar o quedarte sin tiempo.",
  },
] as const;

export const QUESTION_OPTIONS = [5, 10, 15, 20] as const;