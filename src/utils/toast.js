import { EventManager } from '../lib/EventManager';

export const toastEventManager = new EventManager();

export function toast({ text, duration, type = 'default' }) {
  toastEventManager.emit('toast', { type, text, duration });
}
