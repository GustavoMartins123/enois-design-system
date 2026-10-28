import { describe, expect, it } from "vitest";

import { profileMessages } from "../../messages/defaults/profile.js";

import { subListErrors } from "./sub-list-errors.js";

const messages = profileMessages.editProfileDialog;

const fields = [
  { key: "title", label: "Cargo", required: true },
  { key: "company", label: "Empresa", required: true },
  { key: "startDate", label: "Início", type: "date" },
  { key: "endDate", label: "Fim", type: "date" },
];

const experiencia = {
  title: "Analista",
  company: "Empresa",
  startDate: "2022-11-01",
  endDate: "",
};

describe("subListErrors", () => {
  it("recusa encerrar sem data de fim (o backend gravaria como atual)", () => {
    expect(
      subListErrors(
        { fields, form: experiencia, invalidDates: new Set(), currentlyHere: false },
        messages,
      ),
    ).toEqual({ endDate: messages.endDateRequired });
  });

  it("aponta a data que o navegador recusou (31/11 chega como valor vazio)", () => {
    expect(
      subListErrors(
        {
          fields,
          form: experiencia,
          invalidDates: new Set(["endDate"]),
          currentlyHere: false,
        },
        messages,
      ),
    ).toEqual({ endDate: messages.invalidDate });
  });

  it("aceita atual sem data de fim e encerrada com data de fim", () => {
    expect(
      subListErrors(
        { fields, form: experiencia, invalidDates: new Set(), currentlyHere: true },
        messages,
      ),
    ).toEqual({});
    expect(
      subListErrors(
        {
          fields,
          form: { ...experiencia, endDate: "2024-11-30" },
          invalidDates: new Set(),
          currentlyHere: false,
        },
        messages,
      ),
    ).toEqual({});
  });

  it("cobra os campos obrigatórios, ignorando espaço em branco", () => {
    expect(
      subListErrors(
        {
          fields,
          form: { ...experiencia, title: "  ", company: "" },
          invalidDates: new Set(),
          currentlyHere: true,
        },
        messages,
      ),
    ).toEqual({
      title: messages.requiredField,
      company: messages.requiredField,
    });
  });

  it("sem “Atualmente aqui” (certificações), data de fim vazia é permitida", () => {
    expect(subListErrors({ fields, form: experiencia, invalidDates: new Set() }, messages)).toEqual(
      {},
    );
  });

  it("data inválida é apontada mesmo em lista sem “Atualmente aqui”", () => {
    expect(
      subListErrors({ fields, form: experiencia, invalidDates: new Set(["startDate"]) }, messages),
    ).toEqual({ startDate: messages.invalidDate });
  });
});
