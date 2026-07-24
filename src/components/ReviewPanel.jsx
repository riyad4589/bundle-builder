import QuantityStepper from "./QuantityStepper";

const CATEGORY_ORDER = ["Cameras", "Sensors", "Accessories", "Plan"];

function lineName(line) {
  return line.variant ? `${line.product.title} — ${line.variant.label}` : line.product.title;
}

export default function ReviewPanel({ cart }) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    lines: cart.selectedLines.filter((l) => l.category === category),
  })).filter((g) => g.lines.length);

  const total = cart.selectedLines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const preDiscountTotal = cart.selectedLines.reduce(
    (sum, l) => sum + (l.product.comparePrice || l.product.price) * l.qty,
    0
  );
  const savings = Math.max(0, preDiscountTotal - total);
  const itemCount = cart.selectedLines.reduce((sum, l) => sum + l.qty, 0);

  return (
    <aside className="review-panel">
      <h2 className="review-panel__title">Your security system</h2>

      {itemCount === 0 && (
        <p className="review-panel__empty">Add a camera, plan, or sensor to start building your system.</p>
      )}

      {grouped.map((group) => (
        <div className="review-panel__group" key={group.category}>
          <div className="review-panel__group-title">{group.category}</div>
          {group.lines.map((line) => (
            <div className="review-line" key={line.key}>
              <img className="review-line__thumb" src={line.product.image} alt="" />
              <div className="review-line__info">
                <div className="review-line__name">{lineName(line)}</div>
                <div className="review-line__price">
                  {line.product.price === 0 ? "Included" : `$${line.product.price.toFixed(2)}`}
                </div>
              </div>
              <QuantityStepper
                qty={line.qty}
                onIncrement={() => cart.increment(line.productId, line.variantId)}
                onDecrement={() => cart.decrement(line.productId, line.variantId)}
              />
            </div>
          ))}
        </div>
      ))}

      <div className="review-panel__divider" />

      <div className="review-row">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div className="review-guarantee">
        <span className="review-guarantee__badge">✓</span>
        <span>30-day satisfaction guarantee</span>
      </div>

      <div className="review-financing">As low as ${(total / 12).toFixed(2)}/mo with financing</div>

      <div className="review-panel__divider" />

      <div className="review-total-row">
        <span>Total</span>
        <span className="review-total-row__prices">
          {savings > 0 && <span className="price-compare">${preDiscountTotal.toFixed(2)}</span>}
          <span className="review-total-row__amount">${total.toFixed(2)}</span>
        </span>
      </div>

      {savings > 0 && <div className="review-savings">You're saving ${savings.toFixed(2)}</div>}

      <button type="button" className="review-checkout" onClick={() => alert("This is a prototype — checkout is not wired up.")}>
        Checkout
      </button>

      <button type="button" className="review-save-link" onClick={cart.saveForLater}>
        Save my system for later
      </button>
      {cart.savedAt && (
        <div className="review-saved-at">Saved {new Date(cart.savedAt).toLocaleString()}</div>
      )}
    </aside>
  );
}
