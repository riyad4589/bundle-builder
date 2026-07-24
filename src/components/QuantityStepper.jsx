export default function QuantityStepper({ qty, onIncrement, onDecrement, disabled }) {
  return (
    <div className={`stepper ${disabled ? "stepper--disabled" : ""}`}>
      <button
        type="button"
        className="stepper__btn"
        onClick={onDecrement}
        disabled={disabled || qty <= 0}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="stepper__value">{qty}</span>
      <button
        type="button"
        className="stepper__btn"
        onClick={onIncrement}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
