/** Por que a pessoa ainda não pode publicar vaga. */
export type JobReputationGate = {
  minReputation: number;
  reputation: number;
  missing: number;
};
