import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, Content } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch((e) => {
    console.log(e);
    notFound();
  });

  const slices = bundleTextAndImageSlices(page.data.slices);

  return (
    <SliceZone
      slices={slices}
      components={{
        ...components,
        text_and_image_bundle: ({
          slice,
        }: SliceComponentProps<TextAndImageBundleSlice>) => (
          <div className="stack">
            {/* stack items */}
            <SliceZone slices={slice.items} components={components} />
          </div>
        ),
      }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

interface TextAndImageBundleSlice {
  id: string;
  slice_type: "text_and_image_bundle";
  items: Content.TextAndImageSlice[];
}

function bundleTextAndImageSlices(
  slices: Content.HomepageDocumentDataSlicesSlice[]
) {
  const res: (
    | Content.HomepageDocumentDataSlicesSlice
    | TextAndImageBundleSlice
  )[] = [];

  for (const slice of slices) {
    if (slice.slice_type !== "text_and_image") {
      res.push(slice);
      continue;
    }
    const bundle = res.at(-1);
    if (bundle && bundle.slice_type === "text_and_image_bundle") {
      bundle.items.push(slice);
    } else {
      res.push({
        id: `${slice.id}-bundle`,
        slice_type: "text_and_image_bundle",
        items: [slice],
      });
    }
  }
  return res;
}
