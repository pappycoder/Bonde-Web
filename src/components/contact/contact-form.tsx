"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, publicApi } from "@/lib/api";
import { isValidEmail, maxLength, required } from "@/lib/validation";

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof values>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!required(values.name)) {
      setError("Please tell us your name.");
      return;
    }
    if (!isValidEmail(values.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!required(values.message) || !maxLength(values.message, 4000)) {
      setError("Please add a message (up to 4000 characters).");
      return;
    }

    setSubmitting(true);
    try {
      await publicApi.sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        subject: values.subject.trim() || undefined,
        message: values.message.trim(),
      });
      setSent(true);
      toast.success("Message sent — we'll be in touch soon.");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again in a moment.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-6"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-medium">Thanks for reaching out</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your message has landed in our inbox. We usually reply within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={255}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={submitting}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={submitting}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject (optional)</Label>
        <Input
          id="contact-subject"
          name="subject"
          maxLength={255}
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          disabled={submitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={4000}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          disabled={submitting}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "contact-error" : undefined}
        />
      </div>

      {error ? (
        <p id="contact-error" className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
