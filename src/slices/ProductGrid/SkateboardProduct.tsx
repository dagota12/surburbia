import { ButtonLink } from "@/components/Button";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

import { FaStar } from "react-icons/fa6";
import { Scribble } from "./Scribble";

const VERTICAL_LINE_CLASSES = `absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400`;
const HORIZONTAL_LINE_CLASSES = `-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400`;

async function getDominantColor(url: string) {
  const palletURL = new URL(url);

  palletURL.searchParams.set("palette", "json");
  const res = await fetch(palletURL);
  const data = await res.json();

  return (
    data.dominant_colors.vibrant?.hex || data.dominant_colors.vibrant_light?.hex
  );
}

type Props = {
  id: string;
};

const SkateboardProduct = async ({ id }: Props) => {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);
  const price = isFilled.number(product.data.price)
    ? `$${(product.data.price / 100).toFixed(2)}`
    : "N/A";

  const dominantColor = isFilled.image(product.data.image)
    ? await getDominantColor(product.data.image.url)
    : undefined;
  return (
    <div className="group relative w-full mx-auto max-w-72 px-8 pt-4">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, `left-4 `)} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, `right-4 `)} />
      <HorizontalLine className={clsx(HORIZONTAL_LINE_CLASSES)} />

      <div className="flex items-center justify-between text-sm md:text-2xl">
        <span>{price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400" /> 67
        </span>
      </div>

      <div className="-mb-1 overflow-hidden py-4 flex justify-center">
        <Scribble
          className="absolute inset-0 w-full h-full "
          color={dominantColor}
        />
        <PrismicNextImage
          field={product.data.image}
          alt=""
          width={150}
          className="mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>

      <HorizontalLine className={clsx(HORIZONTAL_LINE_CLASSES)} />
      <h3 className="my-2 text-center font-sans leading-tight">
        {product.data.name}
      </h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink field={product.data.customizer_link}>Customize</ButtonLink>
      </div>
    </div>
  );
};

export default SkateboardProduct;
