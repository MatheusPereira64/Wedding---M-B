import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

export const DATA_DIR = join(here, "..", "data");
export const RSVPS_FILE = join(DATA_DIR, "rsvps.json");
export const GIFTS_FILE = join(DATA_DIR, "gifts.json");
