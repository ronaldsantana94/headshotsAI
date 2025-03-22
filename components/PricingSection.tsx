import Link from "next/link";
import { Button } from "./ui/button";

export default function PricingSection() {
  return (
    <div className="w-full max-w-6xl mt-16 mb-16 p-8 rounded-xl space-y-12">
      <h2 className="text-4xl font-extrabold text-center text-foreground tracking-tight">
        Pricing
      </h2>

      <div className="flex flex-wrap justify-center gap-8 items-stretch">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-muted border border-border rounded-2xl p-6 w-full sm:w-[300px] shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground text-center">
                {option.title}
              </h3>
              <p className="text-xl font-bold text-center text-primary">
                {option.price}
              </p>
              <p className="text-sm text-muted-foreground text-center">
                {option.description}
              </p>
              <ul className="space-y-2 pl-4 pt-2">
                {option.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 text-center">
              <Link href="/login">
                <Button className="w-full">{option.buttonText}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pricingOptions = [
  {
    title: "Starter",
    price: "1 Credit",
    description: "Perfect for individuals looking to enhance their online presence.",
    features: ["4 AI Headshots"],
    buttonText: "Choose Starter",
  },
  {
    title: "Basic",
    price: "3 Credits",
    description: "Ideal for professionals requiring frequent updates to their profiles.",
    features: ["12 AI Headshots"],
    buttonText: "Choose Basic",
  },
  {
    title: "Premium",
    price: "5 Credits",
    description: "The best value with unlimited possibilities.",
    features: ["20 AI Headshots"],
    buttonText: "Choose Premium",
  },
];