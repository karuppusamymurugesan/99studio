gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const splitTypes = document.querySelectorAll(".reveal-type");

  gsap.set(splitTypes, { color: "rgba(255, 255, 255, 0.3)" });
  splitTypes.forEach((char, i) => {
    const result = Splitting({ target: char, by: "words" });

    gsap.fromTo(
      result[0].words,
      { color: "rgba(255, 255, 255, 0.3)" },
      {
        color: "rgba(255, 255, 255, 1)",
        duration: 0.6,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: char,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
        onComplete: () => {
          result[0].words[result[0].words.length - 1].classList.add(
            "strike-through"
          );

          const additionalWord = document.createElement("span");
          additionalWord.textContent = "^people";
          additionalWord.classList.add("additional-word");
          additionalWord.style.position = "relative";
          additionalWord.style.top = "-0.3em";
          additionalWord.style.fontSize = "0.6em";
          additionalWord.style.transform = "rotate10deg)";
          additionalWord.style.display = "inline-block";
          additionalWord.style.color = "yellow";
          additionalWord.style.whiteSpace = "nowrap";
          additionalWord.style.paddingRight = "0.1em";
          additionalWord.style.paddingLeft = "0.1em";
          additionalWord.style.fontFamily = "Comic Sans MS";
          result[0].el.appendChild(additionalWord);

          gsap.fromTo(
            additionalWord,
            { opacity: 0, fontSize: "0.8em", transform: "rotate(10deg)" },
            { opacity: 1, duration: 0.3, delay: 0.1 }
          );
        },
        onReverseComplete: () => {
          result[0].words[result[0].words.length - 1].classList.remove(
            "strike-through"
          );

          const additionalWord = result[0].el.querySelector(".additional-word");
          if (additionalWord) {
            additionalWord.remove();
          }
        },
      }
    );
  });

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
