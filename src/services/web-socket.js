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

  async connect(authToken) {
    const wsMarker = '🌐ws:';
    const wsDebug = event => {
      switch (event.type) {
        case 'message': {
          const message = fixWsJson(event.data);
          console.log(wsMarker, event.type, JSON.parse(message || null));
          break;
        }

        default: {
          console.log(wsMarker, event.type, event);
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
