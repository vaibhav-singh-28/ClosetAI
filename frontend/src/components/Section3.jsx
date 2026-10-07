import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import discover01 from "../assets/discover-img-01.jpeg";
import discover02 from "../assets/discover-img-02.jpeg";
import discover03 from "../assets/discover-img-03.jpeg";
import discover04 from "../assets/discover-img-04.jpeg";
import discover05 from "../assets/discover-img-05.jpeg";
import discover06 from "../assets/discover-img-06.jpeg";
import discover07 from "../assets/discover-img-07.jpeg";
import discover08 from "../assets/discover-img-08.jpeg";

gsap.registerPlugin(ScrollTrigger, SplitText);

const discoverLooks = {
  columnOne: [
    {
      id: 1,
      image: discover01,
      title: "Casual Everyday",
      saves: 124,
    },
    {
      id: 2,
      image: discover02,
      title: "Smart Casual",
      saves: 89,
    },
  ],

  columnTwo: [
    {
      id: 3,
      image: discover03,
      title: "Minimal Layers",
      saves: 98,
    },
    {
      id: 4,
      image: discover04,
      title: "Minimal Comfort",
      saves: 221,
    },
    {
      id: 5,
      image: discover05,
      title: "Coffee Fits",
      saves: 142,
    },
  ],

  columnThree: [
    {
      id: 6,
      image: discover06,
      title: "City Chic",
      saves: 132,
    },
    {
      id: 7,
      image: discover07,
      title: "Street Layers",
      saves: 176,
    },
    {
      id: 8,
      image: discover08,
      title: "Summer Vibes",
      saves: 103,
    },
  ],
};

const DiscoverCard = ({ look, cardRef }) => {
  return (
    <button
      ref={cardRef}
      type="button"
      className="group relative block w-full overflow-hidden rounded-lg text-left"
    >
      {/* Image */}
      <img
        src={look.image}
        alt={look.title}
        className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
      />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Card information */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="text-sm font-normal text-white">
            {look.title}
          </p>

          <p className="mt-1 text-xs text-white/60">
            {look.saves} saves
          </p>
        </div>

        {/* Bookmark */}
        <span className="flex h-7 w-7 items-center justify-center text-lg text-white">
          ♡
        </span>
      </div>
    </button>
  );
};

const Section3 = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const labelTextRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  const buttonRef = useRef(null);

  const cardRefs = useRef([]);

  const featuredCardRef = useRef(null);
  const featuredImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------------------------------------------
      // TEXT SPLITS
      // ---------------------------------------------

      const headingSplit = new SplitText(headingRef.current, {
        type: "lines, words",
        mask: "lines, words",
      });

      const labelSplit = new SplitText(labelTextRef.current, {
        type: "lines, words",
        mask: "lines, words",
      });

      const paragraphSplit = new SplitText(paragraphRef.current, {
        type: "lines, words",
        mask: "lines, words",
      });

      // ---------------------------------------------
      // INITIAL STATES
      // ---------------------------------------------

      // Whole section content starts slightly below
      // and rises into place.
      gsap.set(contentRef.current, {
        y: 90,
        scale: 0.985,
      });

      // Text
      gsap.set(labelSplit.words, {
        opacity: 0,
        yPercent: 100,
      });

      gsap.set(headingSplit.words, {
        opacity: 0,
        yPercent: 100,
      });

      gsap.set(paragraphSplit.words, {
        opacity: 0,
        yPercent: 100,
      });

      // CTA
      gsap.set(buttonRef.current, {
        clipPath: "inset(100% 100% 0% 0%)",
        scale: 0.95,
        transformOrigin: "bottom left",
      });

      // Center cards
      gsap.set(cardRefs.current, {
        opacity: 0,
        y: 70,
        scale: 0.98,
      });

      // Right side
      gsap.set(featuredCardRef.current, {
        opacity: 0,
        y: 45,
        scale: 0.96,
      });

      gsap.set(featuredImageRef.current, {
        scale: 1.08,
      });

      // ---------------------------------------------
      // SECTION 3 ENTRANCE
      // ---------------------------------------------

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 20%",
          scrub: 1,
        },
      });

      entranceTl

        // ---------------------------------------------
        // Whole section pull-up
        // ---------------------------------------------

        .to(
          contentRef.current,
          {
            y: 0,
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
          },
          0
        )

        // ---------------------------------------------
        // Label
        // ---------------------------------------------

        .to(
          labelSplit.words,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.1
        )

        // ---------------------------------------------
        // Heading
        // ---------------------------------------------

        .to(
          headingSplit.words,
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.15
        )

        // ---------------------------------------------
        // Description
        // ---------------------------------------------

        .to(
          paragraphSplit.words,
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            stagger: 0.06,
            ease: "power4.out",
          },
          0.4
        )

        // ---------------------------------------------
        // CTA
        // ---------------------------------------------

        .to(
          buttonRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.75
        )

        // ---------------------------------------------
        // CENTER CARDS
        // ---------------------------------------------

        .to(
          cardRefs.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
          },
          0.15
        )

        // ---------------------------------------------
        // RIGHT FEATURED LOOK
        // ---------------------------------------------

        .to(
          featuredCardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          0.3
        )

        .to(
          featuredImageRef.current,
          {
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          0.3
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-[#0d0d0d] text-white"
    >
      <div
        ref={contentRef}
        className="grid min-h-screen grid-cols-[1.2fr_2fr_1fr] gap-8 px-16 py-12"
      >
        {/* ---------------------------------------------
            LEFT
        --------------------------------------------- */}

        <div className="flex flex-col">
          {/* Section label */}
          <div className="flex items-center gap-5 pt-8">
            <span className="text-xs text-gray-400">
              02
            </span>

            <div className="h-px w-20 bg-gray-600"></div>

            <span
              ref={labelTextRef}
              className="text-[10px] tracking-[0.25em] text-gray-400"
            >
              DISCOVER
            </span>
          </div>

          {/* Main content */}
          <div className="mt-16">
            <h2
              ref={headingRef}
              className="max-w-xl text-6xl font-normal leading-[1.08] tracking-tight"
            >
              Find a look.
              <br />
              Make it yours.
            </h2>

            <p
              ref={paragraphRef}
              className="mt-8 max-w-md text-lg leading-relaxed text-gray-400"
            >
              Explore outfit ideas, styles and aesthetics.
              <br />
              See what you like and create similar looks
              <br />
              using your own wardrobe.
            </p>

            <button
              ref={buttonRef}
              className="mt-8 flex w-52 items-center justify-between rounded-md bg-[#f2f0ed] px-6 py-4 text-black transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="text-sm">
                Explore Looks
              </span>

              <span className="text-xl">
                →
              </span>
            </button>
          </div>

          {/* Popular styles */}
          <div className="mt-auto pb-2">
            <p className="mb-5 text-[10px] tracking-[0.25em] text-gray-400">
              POPULAR STYLES
            </p>

            <div className="flex max-w-md flex-wrap gap-3">
              {[
                "All",
                "Casual",
                "Minimal",
                "Streetwear",
                "Smart",
                "Vintage",
                "Athleisure",
                "Monochrome",
              ].map((style, index) => (
                <button
                  key={style}
                  className={`
                    rounded-md
                    border
                    px-4
                    py-2.5
                    text-xs
                    transition-colors
                    duration-300
                    ${
                      index === 0
                        ? "border-white bg-[#f2f0ed] text-black"
                        : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                    }
                  `}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------
            CENTER
        --------------------------------------------- */}

        <div className="grid grid-cols-3 items-start gap-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {discoverLooks.columnOne.map((look) => (
              <DiscoverCard
                key={look.id}
                look={look}
                cardRef={(el) => {
                  cardRefs.current[look.id - 1] = el;
                }}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {discoverLooks.columnTwo.map((look) => (
              <DiscoverCard
                key={look.id}
                look={look}
                cardRef={(el) => {
                  cardRefs.current[look.id - 1] = el;
                }}
              />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            {discoverLooks.columnThree.map((look) => (
              <DiscoverCard
                key={look.id}
                look={look}
                cardRef={(el) => {
                  cardRefs.current[look.id - 1] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------
            RIGHT
        --------------------------------------------- */}

        <div className="pt-20">
          <div
            ref={featuredCardRef}
            className="rounded-xl border border-white/10 bg-[#151515] p-5"
          >
            {/* Selected look image */}
            <div className="overflow-hidden rounded-lg bg-[#242424]">
              <img
                ref={featuredImageRef}
                src={discover03}
                alt="Minimal Layers"
                className="block h-auto w-full object-cover"
              />
            </div>

            {/* Look information */}
            <div className="mt-5 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-normal">
                  Minimal Layers
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  98 saves
                </p>
              </div>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center text-xl text-white"
              >
                ♡
              </button>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-white/10"></div>

            {/* CTA */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md bg-[#f2f0ed] px-5 py-3.5 text-sm text-black transition-transform duration-300 hover:scale-[1.01]"
            >
              <span>
                Build This Look
              </span>

              <span className="text-xl">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;