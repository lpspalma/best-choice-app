import { ROUND_LABELS_PT } from "../../constants/rounds";

export function getRoundLabel(round: string) {
  return ROUND_LABELS_PT[round] ?? round;
}
