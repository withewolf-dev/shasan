import { ref, set, get, update, onValue } from 'firebase/database';
import { database } from '@/config/firebase';
import { firestoreService } from './firestoreService';
import { Game, Player, Constituency } from '@/types/game';

export const gameService = {
  async createGame(hostPlayer: Player): Promise<string> {
    const gameId = Math.random().toString(36).substring(2, 15);
    const constituencies = generateConstituencies();
    
    const gameState: Game = {
      id: gameId,
      players: { [hostPlayer.id]: hostPlayer },
      constituencies,
      currentTurn: hostPlayer.id,
      status: 'waiting',
      winner: null
    };

    await Promise.all([
      set(ref(database, `gameState/${gameId}`), gameState),
      firestoreService.createGameMetadata(gameId, hostPlayer)
    ]);

    return gameId;
  },

  async joinGame(gameId: string, player: Player): Promise<void> {
    const gameRef = ref(database, `gameState/${gameId}/players/${player.id}`);
    await set(gameRef, player);
  },

  async placeVoters(gameId: string, constituencyId: string, playerId: string, count: number): Promise<void> {
    const game = await this.getGame(gameId);
    
    if (game.currentTurn !== playerId) throw new Error('Not your turn');
    if (game.players[playerId].voters < count) throw new Error('Not enough voters');

    const updates: any = {};
    updates[`gameState/${gameId}/constituencies/${constituencyId}/voters/${playerId}`] = 
      (game.constituencies[constituencyId].voters[playerId] || 0) + count;
    updates[`gameState/${gameId}/players/${playerId}/voters`] = 
      game.players[playerId].voters - count;

    await update(ref(database), updates);
    await this.checkConstituencyControl(gameId, constituencyId);
    await this.nextTurn(gameId);
  },

  async checkConstituencyControl(gameId: string, constituencyId: string): Promise<void> {
    const game = await this.getGame(gameId);
    const constituency = game.constituencies[constituencyId];
    
    const totalVoters = Object.values(constituency.voters).reduce((a, b) => a + b, 0);
    if (totalVoters >= constituency.maxVoters) {
      const voterCounts = Object.entries(constituency.voters);
      const winner = voterCounts.reduce((a, b) => 
        (a[1] > b[1] ? a : b))[0];
      
      await set(
        ref(database, `gameState/${gameId}/constituencies/${constituencyId}/controlledBy`),
        winner
      );
    }
  },

  async nextTurn(gameId: string): Promise<void> {
    const game = await this.getGame(gameId);
    const playerIds = Object.keys(game.players);
    const currentIndex = playerIds.indexOf(game.currentTurn);
    const nextIndex = (currentIndex + 1) % playerIds.length;
    
    await set(ref(database, `gameState/${gameId}/currentTurn`), playerIds[nextIndex]);
  },

  watchGame(gameId: string, callback: (game: Game) => void): () => void {
    const gameRef = ref(database, `gameState/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      callback(snapshot.val());
    });
    return unsubscribe;
  },

  async getGame(gameId: string): Promise<Game> {
    const snapshot = await get(ref(database, `gameState/${gameId}`));
    return snapshot.val();
  },

  async endGame(gameId: string, winnerId: string): Promise<void> {
    const game = await this.getGame(gameId);
    game.status = 'finished';
    game.winner = winnerId;

    await Promise.all([
      set(ref(database, `gameState/${gameId}`), game),
      firestoreService.saveGameResults(gameId, game),
      firestoreService.updatePlayerStats(winnerId, true),
      ...Object.keys(game.players)
        .filter(id => id !== winnerId)
        .map(id => firestoreService.updatePlayerStats(id, false))
    ]);
  }
};

function generateConstituencies(): { [key: string]: Constituency } {
  // Generate 5 constituencies with random names
  const constituencies: { [key: string]: Constituency } = {};
  const names = ['North', 'South', 'East', 'West', 'Central'];
  
  names.forEach((name, index) => {
    constituencies[`c${index}`] = {
      id: `c${index}`,
      name,
      voters: {},
      controlledBy: null,
      maxVoters: 10
    };
  });
  
  return constituencies;
} 