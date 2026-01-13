import { useEffect, useRef, useState } from "react";

export function useFormReveal(fields, isActive, options = {}) {
  const {
    staggerMs = 120,
    loadingBaseMs = 520,
    loadingStepMs = 70,
    maxLoadingMs = 900,
  } = options;
  const [fieldStatus, setFieldStatus] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = "pending";
      return acc;
    }, {});
  });
  const timeoutsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    timeoutsRef.current.forEach((timer) => clearTimeout(timer));
    timeoutsRef.current = [];

    setFieldStatus(
      fields.reduce((acc, field) => {
        acc[field.name] = "pending";
        return acc;
      }, {})
    );

    fields.forEach((field, index) => {
      const delay = index * staggerMs;
      const loadingMs = Math.min(maxLoadingMs, loadingBaseMs + index * loadingStepMs);
      const loadingTimer = setTimeout(() => {
        setFieldStatus((prev) => ({ ...prev, [field.name]: "loading" }));
      }, delay);
      const readyTimer = setTimeout(() => {
        setFieldStatus((prev) => ({ ...prev, [field.name]: "ready" }));
      }, delay + loadingMs);

      timeoutsRef.current.push(loadingTimer, readyTimer);
    });

    return () => {
      timeoutsRef.current.forEach((timer) => clearTimeout(timer));
      timeoutsRef.current = [];
    };
  }, [fields, isActive, staggerMs, loadingBaseMs, loadingStepMs, maxLoadingMs]);

  return fieldStatus;
}
