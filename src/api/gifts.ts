import { apiFetch } from "./client";

export type GiftList = {
  id: string;
  title: string;
  store: string;
  url: string;
  description: string;
};

export function fetchGifts() {
  return apiFetch<{ gifts: GiftList[] }>("/api/gifts");
}
