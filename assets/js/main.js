const path = document.querySelector("#logo path");
const percentText = document.querySelector(".percent");
const fill = document.querySelector(".progress-fill");
const statusMsg = document.querySelector(".status");
const button = document.querySelector(".cta");

const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

const state = { value: 0 };

gsap.to(state, {
    value: 100,
    duration: 4,
    ease: "none",

    onUpdate: () => {
        let p = state.value;
        p = Math.min(100, Math.max(0, p));

        const length = path.getTotalLength();

        // SVG
        path.style.strokeDashoffset = length - (length * p) / 100;

        // UI
        percentText.textContent = Math.floor(p) + "%";
        fill.style.width = p + "%";

        if (p > 5) {
            gsap.to(statusMsg, { opacity: 1, y: 0, duration: 0.5 });
        }

        // FIXED STATES (now reliable)
        if (p < 30) {
            statusMsg.textContent = "Initializing system...";
        } else if (p < 45) {
            statusMsg.textContent = "Loading modules...";
        } else if (p < 75) {
            statusMsg.textContent = "Optimizing UI...";
        } else if (p < 90) {
            statusMsg.textContent = "Finalizing...";
        } else {
            statusMsg.textContent = "Success";
        }
    },

    onComplete: () => {
        percentText.textContent = "100%";
        fill.style.width = "100%";

        const tl = gsap.timeline();

        tl.to(button, { opacity: 1, y: 0, duration: 0.5 });

        tl.to(
            ".progress",
            {
                opacity: 0,
                scaleX: 0,
                duration: 0.5,
                ease: "power2.out",
            },
            "-=0.1"
        );

        tl.to(
            ".percent",
            {
                opacity: 1,
                scale: 0.4,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=0.3"
        )
            .to(
                ".percent",
                {
                    opacity: 0,
                    scale: 5,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.3"
            )
            .to(
                ".percent",
                {
                    opacity: 0.9,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.in",
                },
                "-=0.3"
            );
    },
});
