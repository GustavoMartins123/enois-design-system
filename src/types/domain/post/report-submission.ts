export type ReportSubmission<T extends string = string> = {
  reason: T;
  description?: string;
};
