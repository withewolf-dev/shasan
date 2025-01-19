export interface Player {
  id: string;
  name: string;
  resources: number;
  voters: number;
}

export interface Constituency {
  id: string;
  name: string;
  voters: {
    [playerId: string]: number;
  };
  controlledBy: string | null;
  maxVoters: number;
}

export interface Game {
  id: string;
  players: { [key: string]: Player };
  constituencies: { [key: string]: Constituency };
  currentTurn: string;
  status: 'waiting' | 'playing' | 'finished';
  winner: string | null;
}

export interface DecisionOption {
  id: string;
  text: string;
  effect: {
    funds?: number;
    trust?: number;
  };
}

export interface DecisionCard {
  id: string;
  question: string;
  options: DecisionOption[];
} 