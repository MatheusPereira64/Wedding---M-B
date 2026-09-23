export type RsvpAttending = "yes" | "no";

export type RsvpPayload = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: RsvpAttending;
  notes: string;
};

export type RsvpRecord = RsvpPayload & {
  id: string;
  createdAt: string;
};

export type GiftList = {
  id: string;
  title: string;
  store: string;
  url: string;
  description: string;
};
