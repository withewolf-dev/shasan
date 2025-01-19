import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { Game, Player, DecisionCard } from '@/types/game';

export const firestoreService = {
  async createGameMetadata(gameId: string, hostPlayer: Player): Promise<void> {
    await setDoc(doc(firestore, 'games', gameId), {
      host: hostPlayer.id,
      players: [hostPlayer.id],
      startTime: new Date().toISOString(),
      winner: null,
      status: 'waiting'
    });
  },

  async updatePlayerStats(playerId: string, isWinner: boolean): Promise<void> {
    const playerRef = doc(firestore, 'players', playerId);
    const playerDoc = await getDoc(playerRef);

    if (playerDoc.exists()) {
      await updateDoc(playerRef, {
        totalGames: (playerDoc.data().totalGames || 0) + 1,
        totalWins: (playerDoc.data().totalWins || 0) + (isWinner ? 1 : 0),
        lastPlayed: new Date().toISOString()
      });
    } else {
      await setDoc(playerRef, {
        totalGames: 1,
        totalWins: isWinner ? 1 : 0,
        lastPlayed: new Date().toISOString()
      });
    }
  },

  async saveGameResults(gameId: string, game: Game): Promise<void> {
    await setDoc(doc(firestore, 'gameResults', gameId), {
      winner: game.winner,
      players: game.players,
      constituencies: game.constituencies,
      endTime: new Date().toISOString()
    });
  },

  async getPlayerStats(playerId: string): Promise<{
    totalGames: number;
    totalWins: number;
    lastPlayed: string;
  } | null> {
    const playerDoc = await getDoc(doc(firestore, 'players', playerId));
    return playerDoc.exists() ? playerDoc.data() as any : null;
  },

  async getDecisionCards(): Promise<DecisionCard[]> {
    const querySnapshot = await getDocs(collection(firestore, 'decisionCards'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DecisionCard[];
  }
}; 