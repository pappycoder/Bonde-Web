"use client";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, publicApi } from "@/lib/api";
import { isValidEmail, isValidPhone, normalizePhone } from "@/lib/validation";

type WaitlistFormProps = {
  /** Where the signup came from, stored on the row (e.g. `waitlist-page`). */
  source?: string;
};

/**
 * Contact-details waitlist capture for the pre-launch page. Posts to the public
 * backend (`POST /api/waitlist`) and renders the inline error / success states.
 */
export function WaitlistForm({ source = "waitlist-page" }: WaitlistFormProps) {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [invalidField, setInvalidField] = useState<keyof typeof fields | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ alreadyJoined: boolean } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInvalidField(null);
    const invalid = (["firstName", "lastName", "email", "phone"] as const).find(
      (field) => {
        const value = fields[field].trim();
        if (field === "email")
          return !isValidEmail(value) || value.length > 254;
        if (field === "phone") return !isValidPhone(value);
        return !value || value.length > 255;
      },
    );
    if (invalid) {
      const messages = {
        firstName: "Please enter your first name (up to 255 characters)",
        lastName: "Please enter your last name (up to 255 characters)",
        email: "Please enter a valid email address",
        phone:
          "Please enter a phone number with 7–15 digits, with an optional country code",
      };
      setError(messages[invalid]);
      setInvalidField(invalid);
      (
        event.currentTarget.elements.namedItem(
          invalid,
        ) as HTMLInputElement | null
      )?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await publicApi.joinWaitlist({
        firstName: fields.firstName.trim(),
        lastName: fields.lastName.trim(),
        phone: normalizePhone(fields.phone),
        email: fields.email.trim().toLowerCase(),
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
            {result.alreadyJoined
              ? "You're already on the waitlist!"
              : "You're on the waitlist!"}
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
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {(
          [
            {
              name: "firstName",
              label: "First name",
              type: "text",
              autoComplete: "given-name",
              icon: User,
              maxLength: 255,
            },
            {
              name: "lastName",
              label: "Last name",
              type: "text",
              autoComplete: "family-name",
              icon: User,
              maxLength: 255,
            },
            {
              name: "email",
              label: "Email address",
              type: "email",
              autoComplete: "email",
              icon: Mail,
              maxLength: 254,
            },
            {
              name: "phone",
              label: "Phone number",
              type: "tel",
              autoComplete: "tel",
              icon: Phone,
              maxLength: 64,
            },
          ] as const
        ).map((field) => (
          <div
            key={field.name}
            className={
              field.name === "email" || field.name === "phone"
                ? "sm:col-span-2"
                : undefined
            }
          >
            <Label
              htmlFor={`waitlist-${field.name}`}
              className="mb-2 block text-left text-xs text-waitlist-muted"
            >
              {field.label}
            </Label>
            <div className="relative w-full">
              <field.icon
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-waitlist-muted"
                aria-hidden
              />
              <Input
                id={`waitlist-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                maxLength={field.maxLength}
                placeholder={field.label}
                value={fields[field.name]}
                onChange={(event) =>
                  setFields({ ...fields, [field.name]: event.target.value })
                }
                disabled={submitting}
                required
                aria-invalid={invalidField === field.name || undefined}
                aria-describedby={
                  invalidField === field.name ? "waitlist-error" : undefined
                }
                className="h-auto min-w-0 rounded-xl border-waitlist-border bg-waitlist-surface py-4 pr-4 pl-12 text-sm text-white shadow-inner placeholder:text-waitlist-muted focus-visible:border-waitlist-accent focus-visible:ring-0 dark:bg-waitlist-surface"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="group h-auto w-full justify-center gap-2 rounded-xl bg-waitlist-accent py-4 text-sm font-semibold text-white shadow-lg shadow-waitlist-accent/30 hover:bg-waitlist-accent-hover focus-visible:border-waitlist-accent focus-visible:ring-waitlist-accent/40"
      >
        {submitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : null}
        <span>{submitting ? "Joining…" : "Join the waitlist"}</span>
        {submitting ? null : (
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        )}
      </Button>

      {error ? (
        <p
          id="waitlist-error"
          className="mt-1 text-left text-xs text-red-400"
          role="alert"
        >
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
