// The Dog Reviews the Mailman — entry program.
// Writes one funny one-line review a dog gives the mailman
// (under 200 characters) to /output/entry.txt.
// The joke: five stars for consistency — same time, same bag, same refusal
// to come inside and play — and the review ends on the dog's split verdict:
// a professional, respected and hated in the same breath.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 200;

class DogReview {
  private readonly stars = "Five stars for consistency.";
  private readonly routine = "Same time, same bag, same refusal to come in and play.";
  private readonly verdict = "A professional. I respect it. I hate it.";

  review(): string {
    return `${this.stars} ${this.routine} ${this.verdict}`;
  }

  assertValid(text: string): void {
    const n = [...text].length;
    if (n < 1 || n >= LIMIT) {
      throw new Error(`review fails the under-${LIMIT} character gate (${n})`);
    }
    if (text.includes("\n")) {
      throw new Error("review must be a single line");
    }
    // It must be a review: it opens with a star rating.
    if (!/^Five stars/.test(text)) {
      throw new Error("review must open with its star rating");
    }
    // The mailman's visit is the routine: same time, same bag.
    if (!/Same time, same bag/.test(text)) {
      throw new Error("review must name the mailman's routine");
    }
    // The dog's voice ends on the split verdict: respect, then hate.
    if (!/I respect it\. I hate it\.$/.test(text)) {
      throw new Error("review must end on the dog's split verdict");
    }
  }
}

const review = new DogReview();
const line = review.review();
review.assertValid(line);
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), line, "utf8");
console.log(`wrote ${[...line].length} chars to ${join(dir, "entry.txt")}`);
