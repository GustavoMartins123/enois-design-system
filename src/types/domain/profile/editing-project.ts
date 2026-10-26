import type { ProjectInput } from "./project-input.js";

/** Projeto em edição no gerenciador (id presente = edição). */
export type EditingProject = (ProjectInput & { id?: string }) | null;
