import { useState, useCallback } from "react";
import data from "../data/products.json";

const STORAGE_KEY = "bundle-builder-system-v1";

function lineKey(productId, variantId) {
  return `${productId}:${variantId || "default"}`;
}

function buildSeedQuantities() {
  const quantities = {};
  Object.entries(data.seedSelections || {}).forEach(([productId, variantMap]) => {
    Object.entries(variantMap).forEach(([variantId, qty]) => {
      quantities[lineKey(productId, variantId)] = qty;
    });
  });
  return quantities;
}

function loadInitialQuantities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.quantities) {
        return parsed.quantities;
      }
    }
  } catch {
    // ignore corrupt storage, fall back to seed
  }
  return buildSeedQuantities();
}

function findProduct(productId) {
  for (const step of data.steps) {
    const product = step.products.find((p) => p.id === productId);
    if (product) return { product, step };
  }
  return { product: null, step: null };
}

export function useCart() {
  const [quantities, setQuantities] = useState(loadInitialQuantities);
  const [activeVariant, setActiveVariant] = useState({});
  const [savedAt, setSavedAt] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw).savedAt || null;
    } catch {
      /* noop */
    }
    return null;
  });

  const getQty = useCallback(
    (productId, variantId) => quantities[lineKey(productId, variantId)] || 0,
    [quantities]
  );

  const getActiveVariantId = useCallback(
    (productId) => activeVariant[productId] || null,
    [activeVariant]
  );

  const selectVariant = useCallback((productId, variantId) => {
    setActiveVariant((prev) => ({ ...prev, [productId]: variantId }));
  }, []);

  const setQty = useCallback((productId, variantId, qty) => {
    const { step } = findProduct(productId);
    setQuantities((prev) => {
      const next = { ...prev };
      const key = lineKey(productId, variantId);
      const clamped = Math.max(0, qty);

      if (step && step.singleSelect && clamped > 0) {
        // Only one plan-type product may be active at a time.
        step.products.forEach((p) => {
          if (p.id !== productId) delete next[lineKey(p.id, null)];
        });
      }

      if (clamped === 0) {
        delete next[key];
      } else {
        next[key] = step && step.singleSelect ? 1 : clamped;
      }
      return next;
    });
  }, []);

  const increment = useCallback(
    (productId, variantId) => setQty(productId, variantId, getQty(productId, variantId) + 1),
    [getQty, setQty]
  );

  const decrement = useCallback(
    (productId, variantId) => setQty(productId, variantId, getQty(productId, variantId) - 1),
    [getQty, setQty]
  );

  const saveForLater = useCallback(() => {
    const payload = { quantities, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSavedAt(payload.savedAt);
  }, [quantities]);

  // Build the flat list of selected lines for the review panel / counters.
  const selectedLines = [];
  Object.entries(quantities).forEach(([key, qty]) => {
    if (qty <= 0) return;
    const [productId, variantId] = key.split(":");
    const { product, step } = findProduct(productId);
    if (!product) return;
    const variant =
      variantId !== "default" && product.variants
        ? product.variants.find((v) => v.id === variantId)
        : null;
    selectedLines.push({
      key,
      productId,
      variantId: variantId === "default" ? null : variantId,
      product,
      variant,
      category: step.category,
      qty,
    });
  });

  return {
    quantities,
    getQty,
    getActiveVariantId,
    selectVariant,
    increment,
    decrement,
    setQty,
    selectedLines,
    saveForLater,
    savedAt,
  };
}
