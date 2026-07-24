import ProductCard from "./ProductCard";
import { StepIcon, ChevronIcon } from "./Icons";

export default function Step({ step, index, total, isOpen, onToggle, onNext, cart, isLast }) {
  const distinctSelected = step.products.filter((p) => {
    if (p.variants) {
      return p.variants.some((v) => cart.getQty(p.id, v.id) > 0);
    }
    return cart.getQty(p.id, null) > 0;
  }).length;

  return (
    <section className={`step ${isOpen ? "step--open" : ""}`}>
      <button
        type="button"
        className="step__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="step__header-left">
          <span className="step__icon">
            <StepIcon name={step.icon} />
          </span>
          <div>
            <div className="step__eyebrow">STEP {index + 1} OF {total}</div>
            <div className="step__title">{step.title}</div>
          </div>
        </div>
        <div className="step__header-right">
          {isOpen ? (
            <span className="step__count">{distinctSelected} selected</span>
          ) : (
            <span className="step__count step__count--muted">{distinctSelected} selected</span>
          )}
          <ChevronIcon open={isOpen} />
        </div>
      </button>

      {isOpen && (
        <div className="step__body">
          <div className="step__grid">
            {step.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                singleSelect={Boolean(step.singleSelect)}
              />
            ))}
          </div>
          {!isLast && (
            <button type="button" className="step__next" onClick={onNext}>
              Next: {nextLabel(index, total)}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function nextLabel(index, total) {
  const labels = ["Choose your plan", "Choose your sensors", "Add extra protection", "Review your system"];
  return labels[index] || "Continue";
}
