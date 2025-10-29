import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { LazyYouTubePlayer } from "@/components/LazyYoutubePlayer";
import { clsx } from "clsx";
import Image from "next/image";

const MASK_CLASSES =
  "mask-[url(/video-mask.png)] mask-alpha mask-[center_center] [mask-repeate:no-repeate] mask-size-[100%_100%] bg-black";
/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Video Reel</h2>
      <div className="relative aspect-video">
        {/* mask */}
        <div
          className={clsx(
            MASK_CLASSES,
            "absolute inset-0 bg-brand-lime translate-x-3 translate-y-3"
          )}
        />
        <div
          className={clsx(
            MASK_CLASSES,
            "absolute inset-0 bg-white translate-x-1 translate-y-1"
          )}
        />
        {/* <div
          className={clsx(
            MASK_CLASSES,
            "absolute inset-0 bg-white translate-x-2 -translate-y-2"
          )}
        /> */}

        <div className={clsx(MASK_CLASSES, "absolute inset-0")}>
          {/* video */}
          {/* <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} /> */}
          {/* overlay */}

          <Image
            src={"/image-texture.png"}
            alt=""
            fill
            className="pointer-events-none object-cover opacity-80"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;
