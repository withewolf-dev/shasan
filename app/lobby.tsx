import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { gameService } from "@/services/gameService";
import { useAuth } from "@/context/auth";
import { Game, Player } from "@/types/game";

export default function LobbyScreen() {
  const { user } = useAuth();
  const [gameId, setGameId] = useState<string | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (gameId) {
      return gameService.watchGame(gameId, (updatedGame) => {
        setGame(updatedGame);
        if (updatedGame.status === "playing") {
          router.replace({
            pathname: "/(tabs)/game/[id]" as any,
            params: { id: gameId },
          });
        }
      });
    }
  }, [gameId]);

  const createGame = async () => {
    const player = {
      id: user!.user.id,
      name: user!.user.name,
      resources: 10,
      voters: 5,
    };
    const newGameId = await gameService.createGame(player as Player);
    setGameId(newGameId);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Game Lobby</ThemedText>
      {!gameId ? (
        <TouchableOpacity style={styles.button} onPress={createGame}>
          <ThemedText>Create New Gamee</ThemedText>
        </TouchableOpacity>
      ) : (
        <ThemedText>Game ID: {gameId}</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
});
