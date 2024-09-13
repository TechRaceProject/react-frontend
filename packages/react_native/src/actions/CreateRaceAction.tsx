import { SendRaceModeCommand } from '../commands/SendRaceModeCommand';
import socket from '../socket.config';

export const startRace = (raceId: number) => {
  if (socket.readyState === WebSocket.OPEN) {
    SendRaceModeCommand([raceId, 1]);
  } else {
    console.error(
        "WebSocket n'est pas ouvert. État actuel:",
        socket.readyState
    );
  }
};

export const stopRace = (raceId: number) => {
  if (socket.readyState === WebSocket.OPEN) {
    SendRaceModeCommand([raceId, 0]);
  } else {
    console.error(
        "WebSocket n'est pas ouvert. État actuel:",
        socket.readyState
    );
  }
};

export const checkAndStartRace = (
    joystickPosition: { x: number; y: number },
    raceId: number,
    raceStartedOnce: boolean,
    setRaceStartedOnce: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
      !raceStartedOnce &&
      (joystickPosition.x !== 0 || joystickPosition.y !== 0)
  ) {
    startRace(raceId);
    setRaceStartedOnce(true);
  }
};
