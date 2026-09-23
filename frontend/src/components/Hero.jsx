import { useRef, useEffect } from 'react'
import gsap from 'gsap' 
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ImageCollage, { imagePieces } from './ImageCollage'
import heroImage from '../assets/heroImage.jpg'

gsap.registerPlugin(ScrollTrigger, SplitText)

const Hero = () => {
  const wrapperRef = useRef(null)
  const heroTextRef = useRef(null)
  const navRef = useRef(null)
  const taglineRef = useRef(null)
  const taglineWindowRef = useRef(null)
  const descRef = useRef(null)
  const descWindowRef = useRef(null)
  const scrollHintRef = useRef(null)
  const collageRef = useRef(null)

  const piecesRef = useRef([])
  const overlayTextRef = useRef(null)
  const label1Ref = useRef(null)
  const label2Ref = useRef(null)


  useEffect(() => {
    let ctx = gsap.context(() => {

        //text ko split kiya aur mask diya
        const heroSplit = new SplitText(heroTextRef.current, { 
            type: 'chars',
            mask: 'chars'
        })
        const taglineSplit = new SplitText(taglineRef.current, {
            type: 'lines, words',
            mask: 'lines, words',
        })
        const descSplit = new SplitText(descRef.current, {
            type: 'lines, words',
            mask: 'lines, words'
        })


        //set initial state to hidden
        gsap.set(heroSplit.chars, { opacity: 0, yPercent: 100 })
        gsap.set(taglineSplit.words, {opacity: 0, yPercent: 100 })
        gsap.set(descSplit.words, {opacity: 0, yPercent: 100 })
        gsap.set(scrollHintRef.current, {opacity: 0 })


        //set initial hidden state for image pieces
        imagePieces.forEach((piece, i) => {
            gsap.set(piecesRef.current[i], {
                x: `${piece.startX}vw`,
                y: `${piece.startY}vw`,
                scale: piece.scale,
                rotate: piece.rotate,
                filter: `blur(${piece.blur}px)`,
                opacity: 0,
            })
        })
        gsap.set(overlayTextRef.current, { opacity: 0, y: 20 })
        gsap.set(label1Ref.current, { opacity: 0, y: 20 })
        gsap.set(label2Ref.current, { opacity: 0, y: 20 })


        //load animation
        const entranceTl = gsap.timeline({ delay: 0.5})
        entranceTl
            .to(heroSplit.chars, {
                opacity: 1,
                yPercent: 0,
                duration: 2,
                stagger: 0.08,
                ease: 'power4.out',
            })
            .to(taglineSplit.words, {
                opacity: 1,
                yPercent: 0,
                duration: 2,
                stagger: 0.1,
                ease: 'power4.out',
            }, '<')
            .to(descSplit.words, {
                opacity: 1,
                yPercent: 0,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power4.out'
            }, '<0.3')
            .to(scrollHintRef.current, {
                opacity:1,
                duration: 0.5,
            })


        //scroll animation (hero)

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top top',
                end: '+=4500',
                scrub: 1,
                pin: true,
                // markers: true, 
            }
        })

        //phase 1 -> Hero shrink + tagline aur desc upr move.
        scrollTl.to(heroTextRef.current, {
            top: '2.5rem',
            left: '4.4rem',
            fontSize: '2.6rem',
            duration: 1,
            ease: 'none',
        }, 0)
        .to(navRef.current, {
            opacity: 1,
            duration: 1,
            ease: 'none',
        }, 0)
        .to(scrollHintRef.current, { opacity:0, duration: 1 , ease: 'none'}, 0)
        .to(taglineWindowRef.current, {top: '14vh', duration:1, ease: 'none'}, 0)
        .to(descWindowRef.current, {top: '16vh', duration:1, ease: 'none'}, 0)

        //phase2 pieces starts emerging one by one
        imagePieces.forEach((piece, i) => {
            scrollTl.to(piecesRef.current[i], {
                x:0,
                y:0,
                scale:1,
                rotate: 1,
                filter: 'blur(0px)',
                opacity: 1,
                duration: piece.duration,
                ease: 'power2.out'
            }, piece.startTime)
        })

        //phase3 - final click.. hero image comes to life
        scrollTl.to(piecesRef.current, {
            x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)',
            opacity:1, duration: 0.5, ease: 'none',
        }, 5.5)

        //phase 4 - overlay text fade in
        scrollTl
        .to(overlayTextRef.current, { opacity:1 , y: 0, duration: 0.8, ease: 'power2.out'}, 5.3)
        .to(label1Ref.current, { opacity:1 , y: 0, duration: 0.8, ease: 'power2.out'}, 5.5)
        .to(label2Ref.current, { opacity:1 , y: 0, duration: 0.8, ease: 'power2.out'}, 5.7)

        // phase 5 - hero text exits
        .to(taglineSplit.lines, {
          yPercent: -100,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.in',
        }, 6.5)
        .to(descSplit.lines, {
          yPercent: -100,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.in',
        }, 6.5)
        .to(collageRef.current, {
          yPercent: -25,
          scale: 1.3,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.in',
        }, 6.5)
        .to(
        [heroTextRef.current, navRef.current],
        {
            yPercent: -120,
            opacity: 0,
            duration: 0.9,
            ease: 'power4.in',
        },
        6.5
        )

    }, wrapperRef)


    return () => ctx.revert() 
  }, [])



  return (
    <section
      ref={wrapperRef}
      className="relative h-screen"
    >
        <div className="relative h-screen overflow-hidden bg-[#0f0f0f] text-[#e4e4e4] px-20 py-16">

        <nav
          ref={navRef}
          className="absolute top-10 left-20 right-20 flex justify-end opacity-0"
        >
          <div className="flex gap-10 text-sm tracking-widest">
            <span>[SCAN]</span>
            <span>[DISCOVER]</span>
            <span>[WARDROBE]</span>
            <span>[PROFILE]</span>
          </div>
        </nav>

        <h1
          ref={heroTextRef}
          className="absolute top-[5vh] left-15 text-[20vw] font-normal leading-none tracking-tight"
        >
          CLØSET AI
        </h1>

        <p
          ref={scrollHintRef}
          className="absolute top-[85%] left-7/8 -translate-x-1/2 -translate-y-1/2 text-xs tracking-[2px] animate-blink"
        >
          [SCROLL DOWN]
        </p>

        <div
        ref={taglineWindowRef}
        className="absolute top-[68vh] left-20 max-w-[55%] overflow-hidden"
        >
          <h2
            ref={taglineRef}
            className="text-[3.5vw] font-tagline font-normal"
          >
            Discover your style <br />
            Create what comes next.
          </h2>
        </div>
        

        <div
          ref={descWindowRef}
          className="absolute top-[70vh] right-20 max-w-75 overflow-hidden"
        >
          <p
            ref={descRef}
            className="text-sm font-mono opacity-70 text-right"
          >
            ClosetAI builds personal style <br />
            around the clothes you own, <br />
            helping you discover what to wear <br />
            and make your wardrobe feel new.
          </p>
        </div>

        {/* image collage container  */}
        <div
        ref={collageRef}
        className='absolute left-1/2 -translate-x-1/2'
        style={{ top: '38vh', width: '60vw', height: '30vw'}}
        >
            <ImageCollage piecesRef={piecesRef} imageUrl={heroImage} />

            <div
            ref={overlayTextRef}
            className='absolute inset-0 flex items-center justify-center pointer-events-none'
            >
              <h2 className="text-white text-6xl font-light tracking-tighter">
                CLOSET AI
              </h2>
            </div>

            <div
                ref={label1Ref}
                className="absolute text-sm max-w-45 leading-snug"
                style={{ left: '-14vw', top: '35%' }}
            >We turn your closet into your identity.
            </div>

            <div
                ref={label2Ref}
                className="absolute text-sm max-w-[50] leading-snug text-right"
                style={{ right: '-16vw', bottom: '10%' }}
            >AI Styling, Outfit Match,<br />Digital Wardrobe, Discover
            </div>
        </div>
    </div>
    </section>
  )
}

export default Hero