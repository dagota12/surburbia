import { FC, JSX } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import React from "react";
import Skater from "./Skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();
  const skater = await client.getAllByType("skater");
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Heading as="h2" className="mb-8 text-center text-white">
        <PrismicText field={slice.primary.heading} />
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {skater.map((skater, index) => (
          <React.Fragment key={skater.id}>
            <Skater skater={skater} index={index} />
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
