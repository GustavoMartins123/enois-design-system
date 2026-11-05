import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MentionTextarea } from "../domain/post/editor/mention-textarea.js";

import { Input } from "./input.js";
import { Textarea } from "./textarea.js";

const components = [
  Input,
  Textarea,
  (props: { className: string }) => (
    <MentionTextarea
      {...props}
      value=""
      onChange={() => undefined}
      mentionResults={[]}
      onMentionQueryChange={() => undefined}
    />
  ),
];

describe("text field typography", () => {
  for (const Component of components) {
    it.each(["xs", "sm"])(
      `keeps compact %s text on desktop and readable text on mobile (${Component.name})`,
      (size) => {
        const html = renderToStaticMarkup(
          <Component className={`h-9 text-${size} md:text-lg text-primary leading-6`} />,
        );
        const classes = html.match(/<(?:input|textarea)[^>]*class="([^"]*)"/)?.[1].split(" ");

        expect(classes).toContain("text-base");
        expect(classes).toContain("md:text-lg");
        expect(classes).toContain("text-primary");
        expect(classes).toContain("leading-6");
        expect(classes).not.toContain(`text-${size}`);
      },
    );

    it(`preserves an explicit larger size (${Component.name})`, () => {
      const html = renderToStaticMarkup(<Component className="text-lg" />);
      expect(html.match(/<(?:input|textarea)[^>]*class="([^"]*)"/)?.[1].split(" ")).toContain(
        "text-lg",
      );
    });
  }

  it("retains the requested compact desktop size", () => {
    const html = renderToStaticMarkup(<Input className="text-xs" />);
    expect(html).toContain("md:text-xs");
    expect(html).not.toContain("md:text-sm");
  });

  it("preserves responsive overrides regardless of their token order", () => {
    const html = renderToStaticMarkup(<Input className="md:text-lg text-xs" />);
    expect(html).toContain("md:text-lg");
    expect(html).not.toContain("md:text-xs");
  });

  it.each(["checkbox", "radio", "range", "color", "file", "hidden", "button", "submit", "reset"])(
    "does not normalize non-text %s inputs",
    (type) => {
      const html = renderToStaticMarkup(<Input type={type} className="text-xs" />);
      expect(html.match(/<input[^>]*class="([^"]*)"/)?.[1].split(" ")).toContain("text-xs");
    },
  );
});
