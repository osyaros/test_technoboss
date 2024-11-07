// ws.js
export default class WebSocketService {
  constructor(url, onMessageCallback) {
    this.url = url;
    this.onMessageCallback = onMessageCallback; 
    this.ws = null;
    this.reconnectInterval = 5000; 
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onmessage = (event) => {
      this.onMessageCallback(event.data);
    };

    // Обработчик при закрытии соединения
    this.ws.onclose = (event) => {
      console.log("WebSocket closed", event);
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  reconnect() {
    console.log("Attempting to reconnect...");
    setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }
  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.log("WebSocket is not open");
    }
  }
  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
