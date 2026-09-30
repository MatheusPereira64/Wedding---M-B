import type { Group, Invite, Side, Summary } from "./types";

const emptyCount = () => ({ total: 0, yes: 0, pending: 0 });

export function summarize(invites: Invite[]): Summary {
  const summary: Summary = {
    total: 0,
    yes: 0,
    no: 0,
    pending: 0,
    responded: 0,
    bySide: { noivo: emptyCount(), noiva: emptyCount() } as Record<Side, ReturnType<typeof emptyCount>>,
    byGroup: { familia: emptyCount(), amigos: emptyCount(), trabalho: emptyCount() } as Record<
      Group,
      ReturnType<typeof emptyCount>
    >,
  };

  for (const invite of invites) {
    for (const guest of invite.guests) {
      summary.total += 1;
      summary[guest.status] += 1;
      for (const bucket of [summary.bySide[invite.side], summary.byGroup[invite.group]]) {
        bucket.total += 1;
        if (guest.status === "yes") bucket.yes += 1;
        if (guest.status === "pending") bucket.pending += 1;
      }
    }
  }
  summary.responded = summary.yes + summary.no;
  return summary;
}

/** Estado agregado de um convite, para filtros e ordenação. */
export function inviteStatus(invite: Invite) {
  const statuses = invite.guests.map((guest) => guest.status);
  return {
    hasPending: statuses.includes("pending"),
    hasYes: statuses.includes("yes"),
    hasNo: statuses.includes("no"),
    lastResponse: invite.guests
      .map((guest) => guest.respondedAt ?? "")
      .sort()
      .at(-1),
  };
}
