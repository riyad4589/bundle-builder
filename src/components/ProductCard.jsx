import QuantityStepper from "./QuantityStepper";

export default function ProductCard({ product, cart, singleSelect }) {
  const hasVariants = Boolean(product.variants && product.variants.length);
  const activeVariantId = hasVariants
    ? cart.getActiveVariantId(product.id) || product.variants[0].id
    : null;
  const qty = cart.getQty(product.id, activeVariantId);
  const selected = qty > 0;

  return (
    <div className={`product-card ${selected ? "product-card--selected" : ""}`}>
      {product.badge && <span className="product-card__badge">{product.badge}</span>}
      <div className="product-card__media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__desc">{product.description}</p>
        <a className="product-card__link" href={product.learnMoreUrl}>
          Learn More
        </a>

        {hasVariants && (
          <div className="variant-row" role="radiogroup" aria-label={`${product.title} color`}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`variant-chip ${activeVariantId === v.id ? "variant-chip--active" : ""}`}
                onClick={() => cart.selectVariant(product.id, v.id)}
                title={v.label}
              >
                <span className="variant-chip__swatch" style={{ background: v.swatch }} />
                <span className="variant-chip__label">{v.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="product-card__footer">
          <div className="product-card__price">
            {product.comparePrice ? (
              <span className="price-compare">${product.comparePrice.toFixed(2)}</span>
            ) : null}
            <span className="price-active">
              {product.price === 0 ? "Included" : `$${product.price.toFixed(2)}`}
            </span>
          </div>
          <QuantityStepper
            qty={qty}
            onIncrement={() => cart.increment(product.id, activeVariantId)}
            onDecrement={() => cart.decrement(product.id, activeVariantId)}
            disabled={singleSelect && qty > 0}
          />
        </div>
      </div>
    </div>
  );
}
