import { EventManager } from '../lib/EventManager';

export const toastEventManager = new EventManager();

export function toast(text, type = 'default') {
  toastEventManager.emit('toast', { type, text });
}
