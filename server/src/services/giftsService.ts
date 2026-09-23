import { GIFTS_FILE } from "../paths";
import { readJson } from "../store/jsonStore";
import type { GiftList } from "../types";

export async function listGifts() {
  return readJson<GiftList[]>(GIFTS_FILE, []);
}
