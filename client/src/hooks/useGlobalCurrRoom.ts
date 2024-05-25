import { useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { useImmer } from 'use-immer';

export function useCurrRoom() {
  const [currRoomState, setCurrRoomState] = useImmer({
    currentRoomId: '',
    currentOrganizationId: '',
    rooms: {} as Record<string, Room>,
  });

  const setCurrRoom = useCallback(
    (roomId: string) => {
      setCurrRoomState((draft) => {
        draft.currentRoomId = roomId;
      });
    },
    [setCurrRoomState],
  );

  const setCurrOrgan = useCallback(
    (organizationId: string) => {
      setCurrRoomState((draft) => {
        draft.currentOrganizationId = organizationId;
      });
    },
    [setCurrRoomState],
  );

  const setRooms = useCallback(
    (rooms: Room[]) => {
      setCurrRoomState((draft) => {
        draft.rooms = Object.fromEntries(
          rooms.map((item) => [item.roomId, item]),
        );
      });
    },
    [setCurrRoomState],
  );

  const currRoom = currRoomState.rooms[currRoomState.currentRoomId];
  const roomList = currRoomState.rooms;

  const reset = useCallback(() => {
    setCurrRoomState(() => {
      return {
        currentId: '',
        currentOrganizationId: '',
        rooms: {} as Record<string, Room>,
      };
    });
  }, [setCurrRoomState]);

  return { roomList, currRoom, setCurrRoom, setCurrOrgan, setRooms, reset };
}

const CurrRoomContainer = createContainer(useCurrRoom);

const useGlobalCurrRoom = CurrRoomContainer.useContainer;

export { useGlobalCurrRoom, CurrRoomContainer };
