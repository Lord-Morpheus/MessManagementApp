import { HoverEffect } from "./ui/card-hover-effect";

// eslint-disable-next-line react/prop-types
export function CardHoverEffectDemo({ data }) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={data} />
    </div>
  );
}
