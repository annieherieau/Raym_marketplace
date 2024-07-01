import { atom } from "jotai";
import { loadCookie } from "./utils";
// Atom utilisateur
export const unknownUser = {
  email: null,
  id: null,
  token: null,
  isAdmin: false,
};
export const userAtom = atom(loadCookie() ? loadCookie() : unknownUser);
export const isAuthAtom = atom((get) =>
  get(userAtom).id && get(userAtom).token ? true : false
);
export const updateCartAtom = atom(false);
export const openCartAtom = atom(false);

// atom Alertes et erreurs
export const emptyNotice = { title: null, message: null, onClose: null };
export const noticeAtom = atom(emptyNotice);

// Darktheme
export const themeAtom = atom("light");
