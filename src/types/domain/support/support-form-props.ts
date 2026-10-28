import type { SupportFormValues } from "./support-form-values.js";

export type SupportFormProps = {
  /** Pre-filled contact e-mail (the signed-in user's), when there is one. */
  defaultContactEmail?: string;
  /** Uploads the attachment and returns its address; `null` when it failed. */
  onUploadImage: (file: File) => Promise<string | null>;
  /** Opens the ticket; resolves `null` when sent, or the error message to show. */
  onSubmit: (values: SupportFormValues) => Promise<string | null>;
};
