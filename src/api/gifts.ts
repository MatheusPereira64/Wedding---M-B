import giftsData from "../../server/data/gifts.json";
import { apiFetch } from "./client";

export type GiftList = {
  id: string;
  title: string;
  store: string;
  url: string;
  description: string;
};

const staticGifts = giftsData as GiftList[];

/**
 * Em produção (GitHub Pages, sem Express) usa o JSON embutido.
 * Em desenvolvimento tenta a API local e faz fallback para o mesmo JSON.
 */
export async function fetchGifts() {
  if (import.meta.env.PROD) {
    return { gifts: staticGifts };
  }

  try {
    return await apiFetch<{ gifts: GiftList[] }>("/api/gifts");
  } catch {
    return { gifts: staticGifts };
  }
}
