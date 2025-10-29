import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import clsx from "clsx";
import { ButtonLink } from "@/components/Button";
import ParallaxImage from "./ParallaxImage";

declare module "react" {
  interface CSSProperties {
    "--index"?: number | string;
  }
}

/**
 * Props for `TextAndImage`.
 */

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  const theme = slice.primary.theme;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Navey" && "bg-texture bg-brand-navy text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Lime" && "bg-texture bg-brand-lime",
        "sticky top-[calc(var(--index)*2rem)] overflow-hidden"
      )}
      style={{
        "--index": index,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <Heading as="h2" size="lg">
            <PrismicText field={slice.primary.heading} />
          </Heading>

          <div className="max-w-lg text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink
            color={theme === "Lime" ? "orange" : "lime"}
            field={slice.primary.button}
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
        <ParallaxImage
          forgroundImage={slice.primary.forground_image}
          backgroundImage={slice.primary.background_image}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
