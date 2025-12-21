/**
 * This file defines custom events for authentication status changes.
 * This allows components like the Navbar to listen for login/logout events
 * and update their state accordingly, without relying on URL changes.
 */

export const dispatchAuthChangeEvent = () => {
  window.dispatchEvent(new Event('authChange'));
};