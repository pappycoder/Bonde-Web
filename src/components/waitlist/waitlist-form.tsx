"use client";

import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, publicApi } from "@/lib/api";
import { isValidEmail } from "@/lib/validation";

type WaitlistFormProps = {
  /** Where the signup came from, stored on the row (e.g. `waitlist-page`). */
  source?: string;
};

/**
 * Email-only waitlist capture for the pre-launch page. Posts to the public
 * backend (`POST /api/waitlist`) and renders the inline error / success states.
 */
export function WaitlistForm({ source = "waitlist-page" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ alreadyJoined: boolean } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      const response = await publicApi.joinWaitlist({
        email: email.trim().toLowerCase(),
        source,
      });
      setResult({ alreadyJoined: response.alreadyJoined });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <FadeIn className="w-full max-w-[420px]">
        <div
          className="flex w-full flex-col items-center gap-2 rounded-xl border border-waitlist-border bg-waitlist-surface p-5 text-center shadow-lg shadow-waitlist-accent/10"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="size-8 text-waitlist-accent" aria-hidden />
          <h3 className="text-base font-semibold text-white">
            {result.alreadyJoined ? "You're already on the waitlist!" : "You're on the waitlist!"}
          </h3>
          <p className="text-xs text-waitlist-muted">
            {result.alreadyJoined
              ? "This email is already registered — we'll be in touch as soon as early access opens up."
              : "We'll notify you as soon as early access opens up for Bonde."}
          </p>
        </div>
      </FadeIn>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[420px] flex-col items-stretch gap-3.5"
      noValidate
    >
      <div className="relative w-full">
        <Label htmlFor="waitlist-email" className="sr-only">
          Email address
        </Label>
        <Mail
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-waitlist-muted"
          aria-hidden
        />
        <Input
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          placeholder="Enter your mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "waitlist-error" : undefined}
          className="h-auto rounded-xl border-waitlist-border bg-waitlist-surface py-4 pr-4 pl-12 text-sm text-white shadow-inner placeholder:text-waitlist-muted focus-visible:border-waitlist-accent focus-visible:ring-0 dark:bg-waitlist-surface"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="group h-auto w-full justify-center gap-2 rounded-xl bg-waitlist-accent py-4 text-sm font-semibold text-white shadow-lg shadow-waitlist-accent/30 hover:bg-waitlist-accent-hover focus-visible:border-waitlist-accent focus-visible:ring-waitlist-accent/40"
      >
        {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        <span>{submitting ? "Joining…" : "Join the waitlist"}</span>
        {submitting ? null : (
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        )}
      </Button>

      {error ? (
        <p id="waitlist-error" className="mt-1 text-left text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : (
        <p className="text-xs text-waitlist-muted">
          We&apos;ll only email you about Bonde. No spam, unsubscribe any time.
        </p>
      )}
    </form>
  );
}
