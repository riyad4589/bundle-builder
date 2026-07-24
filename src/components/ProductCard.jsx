import QuantityStepper from "./QuantityStepper";

export default function ProductCard({ product, cart, singleSelect }) {
  const hasVariants = Boolean(product.variants && product.variants.length);
  const activeVariantId = hasVariants
    ? cart.getActiveVariantId(product.id) || product.variants[0].id
    : null;
  const activeVariant = hasVariants
    ? product.variants.find((v) => v.id === activeVariantId)
    : null;
  const titleToShow = (activeVariant && activeVariant.title) || product.title;
  const priceToShow = (activeVariant && activeVariant.price !== undefined) ? activeVariant.price : product.price;
  const comparePriceToShow = (activeVariant && activeVariant.comparePrice !== undefined) ? activeVariant.comparePrice : product.comparePrice;
  const imageToShow = (activeVariant && activeVariant.image) || product.image;
  const qty = cart.getQty(product.id, activeVariantId);
  const selected = qty > 0;

  return (
    <div className={`product-card ${selected ? "product-card--selected" : ""}`}>
      {product.badge && <span className="product-card__badge">{product.badge}</span>}
      {imageToShow && (
        <div className="product-card__media">
          <img src={imageToShow} alt={titleToShow} loading="lazy" />
        </div>
      )}
      <div className="product-card__body">
        <h3 className="product-card__title">{titleToShow}</h3>
        {product.eyebrow && <div className="product-card__eyebrow">{product.eyebrow}</div>}
        {product.description && <p className="product-card__desc">{product.description}</p>}
        {product.features && (
          <ul className="product-card__features">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        )}
        <a className="product-card__link" href={product.learnMoreUrl}>
          Learn More
        </a>

        {hasVariants && (
          <div className="variant-row" role="radiogroup" aria-label={`${titleToShow} color`}>
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
            {comparePriceToShow ? (
              <span className="price-compare">${comparePriceToShow.toFixed(2)}</span>
            ) : null}
            <span className="price-active">
              {priceToShow === 0 ? "Included" : `$${priceToShow.toFixed(2)}`}
              {product.priceSuffix || (product.id.startsWith("plan") && priceToShow > 0 ? "/mo" : "")}
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
