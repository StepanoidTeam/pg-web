import { wsUrl } from '../config';

// todo(vmyshko): temporary solution, since Izya sends dirty json-like string with time prefix

function fixWsJson(message = '') {
  if (message.startsWith('{')) {
    return message;
  }

  return message.substring(message.indexOf('{'));
}

class PgWebSocket {
  ws = null;
  isConnected = false;

  reducer(message) {
    const [
      {},
      { setPlayerColor, setPlayerIsDone, setUserJoin, setUserLeave },
    ] = this.globals;

    switch (message.BroadcastReason) {
      case '/api/game/changecolor': {
        const [board] = message.PlayerBoards;
        setPlayerColor(board);
        break;
      }
      case '/api/game/toggleready': {
        const [board] = message.PlayerBoards;
        setPlayerIsDone(board);
        break;
      }
      case '/api/room/join': {
        // todo(vmyshko): this is izya's server shit, need to get new board here
        const [user] = message.Users;
        setUserJoin(user);
        break;
      }
      case '/api/room/leave': {
        // todo(vmyshko): same reason same entity - different data. fuckin izya...
        if (!message.Users) return;

        const [user] = message.Users;
        setUserLeave(user);
        break;
      }
      default: {
        console.warn('unhandled reason', message.BroadcastReason, message);
      }
    }
  }

  async connect(globals) {
    this.globals = globals;
    const [{ authToken }, { setOnline }] = globals;

    const wsMarker = '🌐ws:';
    const wsDebug = event => {
      switch (event.type) {
        case 'message': {
          const message = JSON.parse(fixWsJson(event.data) || null);
          console.debug(wsMarker, event.type, message);

          this.reducer(message);

          break;
        }

        case 'close': {
          setOnline(false);
          console.debug(wsMarker, event.type, event.data);
          break;
        }

        default: {
          console.debug(wsMarker, event.type, event);
        }
      }
    };

    await new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);

      this.ws.addEventListener('open', data => {
        this.isConnected = true;
        resolve(data);
        wsDebug(data);
      });

      this.ws.addEventListener('message', wsDebug);
      this.ws.addEventListener('close', wsDebug);
    });

    this.send({
      AuthToken: authToken,
      Type: 'AUTHSTATUS',
    });
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  disconnect() {
    this.ws.close();
  }
}

export const ws = new PgWebSocket();
