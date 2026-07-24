import { useState } from "react";
import data from "./data/products.json";
import { useCart } from "./hooks/useCart";
import Step from "./components/Step";
import ReviewPanel from "./components/ReviewPanel";
import "./App.css";

export default function App() {
  const cart = useCart();
  const [openStep, setOpenStep] = useState(0);

  return (
    <div className="page">
      <div className="layout">
        <div className="builder">
          {data.steps.map((step, index) => (
            <Step
              key={step.id}
              step={step}
              index={index}
              total={data.steps.length}
              isOpen={openStep === index}
              isLast={index === data.steps.length - 1}
              onToggle={() => setOpenStep(openStep === index ? -1 : index)}
              onNext={() => setOpenStep(index + 1)}
              cart={cart}
            />
          ))}
        </div>

        <ReviewPanel cart={cart} />
      </div>
    </div>
  );
}
