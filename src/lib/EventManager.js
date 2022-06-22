export class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, handler) {
    if (!this.listeners.get(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(handler);
  }

  emit(event, params) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event).forEach((handler) => {
      handler(params);
    });
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;

    const filtered = listeners.filter((handler) => handler !== listenerToRemove);
    this.listeners.set(event, filtered);
  }
}
