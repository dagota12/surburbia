import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { ButtonLink } from "@/components/Button";
import clsx from "clsx";
import { SkaterScribble } from "./SkaterScribble";

type Props = {
  skater: Content.SkaterDocument;
  index: number;
};

const colors = [
  "text-brand-blue",
  "text-brand-lime",
  "text-brand-oranage",
  "text-brand-pink",
  "text-brand-purple",
];

const Skater = ({ skater, index }: Props) => {
  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden">
        <PrismicNextImage
          field={skater.data.photo_background}
          width={500}
          alt=""
          imgixParams={{ q: 20 }}
          className="scale-110 transform transform-gpu transition-all duration-1000 group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <SkaterScribble className={clsx("relative", colors[index % 4])} />
        <PrismicNextImage
          field={skater.data.photo_foreground}
          width={500}
          alt=""
          className="transform transform-gpu transition-transform duration-1000 group-hover:scale-110 ease-in-out"
        />
        <div className="relative h-48 w-full place-self-end bg-linear-to-t from-black via-transparent to-transparent" />
        {/* skater name */}
        <h3 className="relative grid place-self-end justify-self-start font-sans p-2 text-brand-gray text-2xl md:text-3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink field={skater.data.customizer_link} size="sm">
        Build Their Board
      </ButtonLink>
    </div>
  );
};

export default Skater;
