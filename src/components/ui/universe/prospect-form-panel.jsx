// src/components/ui/universe/prospect-form-panel.jsx
import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import { useFormReveal } from "../../logic/universe/use-form-reveal";
import "../general/animations/form-shimmer.css";

const FORM_FIELDS = [
  {
    name: "companyName",
    label: "Nom de l'entreprise",
    placeholder: "Nom de l'entreprise",
    type: "text",
  },
  {
    name: "sector",
    label: "Secteur d'activite",
    placeholder: "Secteur d'activite",
    type: "text",
  },
  {
    name: "goal",
    label: "Objectif principal",
    placeholder: "Objectif principal",
    type: "text",
  },
  {
    name: "target",
    label: "Cible",
    placeholder: "Cible",
    type: "text",
  },
  {
    name: "budget",
    label: "Budget mensuel",
    placeholder: "Budget mensuel",
    type: "text",
  },
  {
    name: "notes",
    label: "Message / Notes",
    placeholder: "Message / Notes",
    type: "textarea",
    rows: 4,
  },
];

const STAGGER_MS = 120;
const LOADING_BASE_MS = 620;
const LOADING_STEP_MS = 80;
const MAX_LOADING_MS = 900;

const inputClasses =
  "w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-[15px] leading-relaxed text-white/80 placeholder:text-white/30 focus:border-sky-300/50 focus:ring-2 focus:ring-sky-400/20 focus:outline-none transition";

const FieldRow = React.memo(function FieldRow({
  field,
  index,
  value,
  status,
  onChange,
}) {
  const statusClass =
    status === "ready"
      ? "form-field-ready"
      : status === "loading"
      ? "form-field-loading"
      : "form-field-pending";
  const shimmerStyle = {
    "--shimmer-delay": `${index * 120}ms`,
    "--shimmer-duration": `${1.65 + index * 0.06}s`,
    "--shimmer-size": `${220 + index * 12}% 100%`,
    "--shimmer-start": `${-150 - index * 8}%`,
    "--shimmer-end": `${230 + index * 10}%`,
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[11px] uppercase tracking-[0.24em] text-white/45">
        {field.label}
      </label>
      <div className={cn("form-field", statusClass)}>
        <div className="form-field-skeleton" style={shimmerStyle} />
        {field.type === "textarea" ? (
          <textarea
            value={value}
            onChange={onChange}
            rows={field.rows}
            className={cn(inputClasses, "form-field-input min-h-[150px] resize-none")}
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            value={value}
            onChange={onChange}
            className={cn(inputClasses, "form-field-input h-[54px]")}
            placeholder={field.placeholder}
          />
        )}
      </div>
    </div>
  );
});

export default function ProspectFormPanel({ className, isActive = false }) {
  const [formState, setFormState] = useState({
    companyName: "",
    sector: "",
    goal: "",
    target: "",
    budget: "",
    notes: "",
  });
  const fieldStatus = useFormReveal(FORM_FIELDS, isActive, {
    staggerMs: STAGGER_MS,
    loadingBaseMs: LOADING_BASE_MS,
    loadingStepMs: LOADING_STEP_MS,
    maxLoadingMs: MAX_LOADING_MS,
  });

  function handleChange(field) {
    return (event) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-9 rounded-[32px] border border-white/10 bg-black/60 p-8 sm:p-10 backdrop-blur-xl",
        "shadow-[0_0_40px_rgba(255,120,120,0.08)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-white">Formulaire de prospection</h3>
          <p className="text-sm leading-relaxed text-white/55">
            Verifie et complete les informations avant envoi.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        {FORM_FIELDS.map((field, index) => (
          <FieldRow
            key={field.name}
            field={field}
            index={index}
            value={formState[field.name]}
            status={fieldStatus[field.name]}
            onChange={handleChange(field.name)}
          />
        ))}
      </div>

      <button
        type="button"
        disabled
        className="mt-auto rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-5 py-3.5 text-sm font-semibold text-white/60 shadow-[0_0_18px_rgba(255,120,120,0.08)] transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        Envoyer
      </button>
    </div>
  );
}
