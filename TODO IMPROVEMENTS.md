# TODO IMPROVEMENTS

> Last updated: 2026-09-05

## Pending Changes

### CNPJ generator/validator alongside CPF
- **Category:** Feature
- **Source:** Competing tools researched (geradordecpf.com, freetool.dev/cpf-generator, geradorcpfcnpj.com.br) commonly bundle CPF + CNPJ in one page.
- **What:** Add a CNPJ tab/section using the same pin-digits-and-generate pattern, with its own check-digit algorithm (different weights, 14 digits).
- **Where:** New `src/lib/cnpj.ts` (mirroring `src/lib/cpf.ts`), new UI section or tab in `App.tsx`.
- **Why:** Same audience (devs/QA testing forms) very often needs both; several competitors lead with "CPF e CNPJ" as a combo.
- **Risk:** Doubles the surface area of the app; needs its own test suite and UI decisions (tabs vs. two stacked panels) that are a product call, not a bug fix.
- **Effort:** Medium

### Bulk generation (generate N CPFs at once)
- **Category:** Feature
- **Source:** Same competitor research - several tools offer "generate 10/50/100 CPFs" as a list or CSV download.
- **What:** A quantity input + "Generate list" action producing N valid CPFs (respecting any pinned digits), with a copy-all or download-as-text option.
- **Where:** `App.tsx` (new UI), reuses `calculateCheckDigits`/`isRepeatedDigits` from `src/lib/cpf.ts`.
- **Why:** Useful for seeding test databases/fixtures instead of clicking "Aleatório" repeatedly.
- **Risk:** New UI flow and export mechanism - worth deciding the output format (plain list vs. CSV vs. JSON) with the user first.
- **Effort:** Medium

### Formatted vs. raw output toggle
- **Category:** Feature
- **Source:** Same competitor research - several tools let you copy either `000.000.000-00` or `00000000000`.
- **What:** A small toggle next to the result switching `generatedCPF`'s display/copy format between formatted and digits-only.
- **Where:** `App.tsx`, near the "CPF Gerado" panel.
- **Why:** Some downstream systems expect the raw 11-digit string, not the punctuated form.
- **Risk:** Low risk, but it's a UI decision (icon vs. label, where it lives) worth a quick nod rather than guessing the design.
- **Effort:** Low

### 11-column digit grid may be cramped on narrow phones
- **Category:** UI-UX
- **Source:** Code read of `App.tsx` - the digit grid uses a fixed `grid-cols-11` regardless of viewport width.
- **What:** Consider a responsive column count (e.g. wrap to two rows under a breakpoint) or smaller gap/padding on mobile.
- **Where:** `src/App.tsx`, the `grid grid-cols-11 gap-2` container.
- **Why:** On very narrow screens (~360px) each box has very little room; still functional but might feel tight to tap.
- **Risk:** Couldn't verify visually without opening a real mobile browser (browser automation is off-limits for this project per prior guidance) - flagging instead of guessing at a fix.
- **Effort:** Low
