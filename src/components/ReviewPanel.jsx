import QuantityStepper from "./QuantityStepper";

const CATEGORY_ORDER = ["Cameras", "Sensors", "Accessories", "Plan"];

function lineName(line) {
  if (line.variant) {
    return line.variant.title || `${line.product.title} — ${line.variant.label}`;
  }
  return line.product.title;
}

function getLinePrice(line) {
  if (line.variant && line.variant.price !== undefined) {
    return line.variant.price;
  }
  return line.product.price;
}

function getLineComparePrice(line) {
  if (line.variant && line.variant.comparePrice !== undefined) {
    return line.variant.comparePrice;
  }
  return line.product.comparePrice || line.product.price;
}

export default function ReviewPanel({ cart }) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    lines: cart.selectedLines.filter((l) => l.category === category),
  })).filter((g) => g.lines.length);

  const total = cart.selectedLines.reduce((sum, l) => sum + getLinePrice(l) * l.qty, 0);
  const preDiscountTotal = cart.selectedLines.reduce(
    (sum, l) => sum + getLineComparePrice(l) * l.qty,
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
              {((line.variant && line.variant.image) || line.product.image) ? (
                <img className="review-line__thumb" src={(line.variant && line.variant.image) || line.product.image} alt="" />
              ) : (
                <div className="review-line__thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e6eeff' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2557d6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6Z" />
                  </svg>
                </div>
              )}
              <div className="review-line__info">
                <div className="review-line__name">{lineName(line)}</div>
              </div>
              <QuantityStepper
                qty={line.qty}
                onIncrement={() => cart.increment(line.productId, line.variantId)}
                onDecrement={() => cart.decrement(line.productId, line.variantId)}
              />
              <div className="review-line__price-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2', minWidth: '55px' }}>
                {getLineComparePrice(line) !== getLinePrice(line) ? (
                  <span className="price-compare" style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '11px' }}>
                    ${(getLineComparePrice(line) * line.qty).toFixed(2)}
                  </span>
                ) : null}
                <span className="review-line__price">
                  {getLinePrice(line) === 0 ? "Included" : `$${(getLinePrice(line) * line.qty).toFixed(2)}`}
                  {line.product.priceSuffix || (line.productId.startsWith("plan") && getLinePrice(line) > 0 ? "/mo" : "")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="review-panel__divider" />

      <div className="review-row" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="review-shipping-icon-container">
            <img src="/shipping-icon.png" alt="Fast Shipping" className="review-shipping-icon" />
          </div>
          <span>Fast Shipping</span>
        </div>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
          <span className="price-compare" style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '11px' }}>$5.99</span>
          <span style={{ color: '#4e2fd2', fontWeight: '600' }}>FREE</span>
        </span>
      </div>

      <div className="review-financing">As low as ${(total / 12).toFixed(2)}/mo with financing</div>

      <div className="review-panel__divider" />

      <div className="review-total-row" style={{ alignItems: 'center' }}>
        <img src="/100.png" alt="Total" style={{ width: '78px', height: '78px', objectFit: 'contain' }} />
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
