import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

import whiteTshirt from "../assets/white-tshirt.jpeg";
import beigePant from "../assets/beige-pant.jpeg";
import blackBag from "../assets/black-bag.jpeg";
import blackCap from "../assets/black-cap.jpeg";
import blackJacket from "../assets/black-jacket.jpeg";
import blackPant from "../assets/black-pant.jpeg";
import blackShoes from "../assets/black-shoes.jpeg";
import blackSweatshirt from "../assets/black-sweatshirt.jpeg";
import blueJeans from "../assets/blue-jeans.jpeg";
import creamShirt from "../assets/cream-shirt.jpeg";
import oliveJeans from "../assets/olive-jeans.jpeg";
import whiteSneakers from "../assets/white-sneakers.jpeg";


const clothes = [
  whiteTshirt,
  blackSweatshirt,
  creamShirt,
  blackJacket,

  blueJeans,
  blackPant,
  beigePant,
  oliveJeans,

  whiteSneakers,
  blackShoes,
  blackBag,
  blackCap,
];

const outfits = [
  {
    name: "Clean Everyday",
    top: whiteTshirt,
    bottom: blackPant,
    shoes: whiteSneakers,
  },
  {
    name: "Casual Layers",
    top: creamShirt,
    bottom: blueJeans,
    shoes: blackShoes,
  },
  {
    name: "Relaxed Street",
    top: blackSweatshirt,
    bottom: beigePant,
    shoes: whiteSneakers,
  },
];



const Section2 = () => {

  const [currentOutfit, setCurrentOutfit] = useState(0);

  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const labelTextRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const wardrobeRef = useRef(null);
  const outfitRef = useRef(null);
  

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentOutfit((currentOutfit) => (currentOutfit + 1) % outfits.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

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

    gsap.set(headingSplit.words, {
      opacity: 0,
      yPercent: 100,
    });

    gsap.set(labelSplit.words, {
      opacity: 0,
      yPercent: 100,
    });

    gsap.set(paragraphSplit.words, {
      opacity: 0,
      yPercent: 100,
    });

    gsap.set(wardrobeRef.current, {
      clipPath: "inset(100% 100% 0% 0%)",
      scale: 0.95,
      transformOrigin: "bottom left",
    });

    gsap.set(outfitRef.current, {
      clipPath: "inset(100% 100% 0% 0%)",
      scale: 0.95,
      transformOrigin: "bottom left",
    });

    gsap.set(buttonRef.current, {
      clipPath: "inset(100% 100% 0% 0%)",
      scale: 0.95,
      transformOrigin: "bottom left",
    });


    // ---------------------------------------------
    // SECTION 2 ENTRANCE
    // ---------------------------------------------

    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top -20%",
        scrub: 1,
      },
    });

    entranceTl
      .to(
        labelSplit.words,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
        0
      )
      .to(
        headingSplit.words,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
        0
      )
      .to(
        wardrobeRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 6,
          ease: "power2.out",
        },
        0
      )
      .to(
        outfitRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 6,
          ease: "power2.out",
        },
        1.5
      )
      .to(
        paragraphSplit.words,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.5,
          stagger: 0.06,
          ease: "power4.out",
        },
        1.5
      )
      .to(
        buttonRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        1.5
      );


  // ---------------------------------------------
// SECTION 2 EXIT
// ---------------------------------------------

const exitTl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 40%",
    end: "top -60%",
    scrub: 1,
  },
});

exitTl

  // Label exits through its clipping window
  .to(
    labelSplit.lines,
    {
      yPercent: -100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power4.in",
    },
    0
  )

  // Heading exits slightly faster
  .to(
    headingSplit.lines,
    {
      yPercent: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.in",
    },
    0
  )

  // Description follows the heading
  .to(
    paragraphSplit.lines,
    {
      yPercent: -100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power4.in",
    },
    0.05
  )

  // Button leaves with the text, slightly later
  .to(
    buttonRef.current,
    {
      yPercent: -25,
      opacity: 0,
      duration: 0.8,
      ease: "power4.in",
    },
    0.15
  )

  // Wardrobe panel starts moving at the same moment
  .to(
    wardrobeRef.current,
    {
      yPercent: -10,
      opacity: 0,
      scale: 1.03,
      duration: 1.4,
      ease: "power2.inOut",
    },
    0
  )

  // AI Outfit panel follows the same motion
  .to(
    outfitRef.current,
    {
      yPercent: -10,
      opacity: 0,
      scale: 1.03,
      duration: 1.4,
      ease: "power2.inOut",
    },
    0
  );

  }, sectionRef);


  return () => ctx.revert();
}, []);

  return (
    <section 
    ref={sectionRef}
    className='min-h-screen bg-[#0d0d0d] text-white'>

        {/* Section Label */}
          <div
          ref={labelRef}
          className='flex items-center gap-4 px-16 pt-20'>
            <span className='text-xs text-gray-400'>01</span>

            <div className='h-px w-16 bg-gray-600'></div>

            <p 
            ref={labelTextRef}
            className='text-[10px] tracking-[0.2em] text-gray-400'>
              YOUR WARDROBE, <br />
              NEW POSSIBILITIES
            </p>
          </div>


          {/* main grid */}
          <div className='grid grid-cols-[1.2fr_1.6fr_1fr] items-stretch gap-6 '>

          {/* left  */}
          <div>
            {/* Main Heading */}
          <h2
          ref={headingRef}
          className='mt-16 pl-16 max-w-xl text-5xl font-normal eading-[1.05] tracking-tight'>
            Same Clothes.<br />
            A fresher you.
          </h2>

          {/* paragraph */}
          <p 
          ref={paragraphRef}
          className='mt-10 pl-16 max-w-lg text-lg leading-relaxed text-gray-400'>
            ClosetAI looks at the clothes you already own < br/>
            and creates outfit combinations that actually <br />
            work for your style, your day, your vibe.
          </p>

          {/* button  */}
          <button 
          ref={buttonRef}
          className='mx-18 mt-8 flex w-50 items-center justify-between bg-white px-6 py-3 text-black rounded'>
            <span>Add Your Clothes</span>
            <span className='text-xl'>→</span>
          </button>
          </div>
          
          {/* middle  */}
          <div className="h-full">
            <div 
            ref={wardrobeRef}
            className='h-full rounded-xl border border-white/10 bg-[#151515] p-5'>
              <div className='flex justify-between items-center'>

                <h3 className='text-xl font-normal'>
                  Your Wardrobe
                </h3>

                <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl'>
                  +
                </button>

              </div>

              {/* Categories */}
              <div className="mt-7 flex gap-6 text-sm text-gray-500">
                <span className="text-white">All</span>
                <span>Tops</span>
                <span>Bottoms</span>
                <span>Outerwear</span>
                <span>Shoes</span>
                <span>Accessories</span>
              </div>

              {/* Clothing grid */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                {clothes.map((item, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-[#242424]">
                  <img
                    src={item}
                    alt="White T-shirt"
                    className="h-full w-full object-contain"
                  />
                </div>
                ))}
              </div>
              
              <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-6">
                    <span className="text-xs tracking-[0.15em] text-gray-400">
                      12 PIECES
                    </span>

                    <span className="h-3 w-px bg-white/20"></span>

                    <span className="text-xs tracking-[0.15em] text-gray-400">
                      3 OUTFITS GENERATED
                    </span>
                  </div>
              </div>
            </div>
          </div>

          {/* right  */}
          <div className="h-full">
            <div
                ref={outfitRef}
                className="h-full"
            >
            <div className="h-full  rounded-xl border border-white/10 bg-[#151515] p-5">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-normal">
                  AI Outfit
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    {String(currentOutfit + 1).padStart(2, "0")} / 03
                  </span>
                  <button 
                    onClick={() =>
                      setCurrentOutfit(
                        (currentOutfit - 1 + outfits.length) % outfits.length
                      )
                    }>
                    <span className="text-lg text-white">←</span>
                  </button>
                  

                  <button onClick={() =>
                    setCurrentOutfit((currentOutfit + 1) % outfits.length)
                  }>
                    <span className="text-lg text-white">→</span>
                  </button>
                  
                </div>
              </div>

              {/* Outfit preview */}
              <div className="mt-5 aspect-3/5 rounded-lg bg-[#292929] overflow-hidden">
                  <div className="mt-5">
                    <h4 className="text-lg text-center">{outfits[currentOutfit].name}</h4>
                  </div>

                <div className="relative w-full h-full">

                  {/* T-shirt */}
                  <img
                    src={outfits[currentOutfit].top}
                    alt="Outfit top"
                    className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[50%] transition-opacity duration-500"
                  />

                  {/* Pants */}
                  <img
                    src={outfits[currentOutfit].bottom}
                    alt="Outfit bottom"
                    className="absolute top-[33%] left-1/2 -translate-x-1/2 w-[68%] transition-opacity duration-500"
                  />

                  {/* Shoes */}
                  <img
                    src={outfits[currentOutfit].shoes}
                    alt="Outfit shoes"
                    className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[40%] transition-opacity duration-500"
                  />

                </div>

              </div>

            </div>
          </div>
          </div>
          </div>
      </section>
  );
};

export default Section2;




