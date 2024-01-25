//import { isTest } from "@/lib/constants";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const TRANSITIONS = {
	DURATION: 0.5,
	EASE: [0.32, 0.72, 0, 1],
};

function Modal({ children }) {
	return (
		<Dialog
			open={true}
			static
			className="fixed inset-0 z-10"
			
			initialFocus={1}
		>
			<Dialog.Overlay
				as={motion.div}
				variants={{
					open: {
						opacity: 1,
						transition: {
							ease: TRANSITIONS.EASE,
							duration: TRANSITIONS.DURATION,
						},
					},
					closed: {
						opacity: 0,
						transition: {
							ease: TRANSITIONS.EASE,
							duration: TRANSITIONS.DURATION,
						},
					},
				}}
				initial="closed"
				animate="open"
				exit="closed"
				onAnimationStart={(variant) => {
					if (variant === "open") {
						set(document.documentElement, {
							background: "black",
							height: "100vh",
						});
						set(document.body, { position: "fixed", inset: "0" });
						set(document.querySelector("header"), { position: "absolute" });
						set(document.querySelector("#__next"), {
							borderRadius: "8px",
							overflow: "hidden",
							transform:
								"scale(0.93) translateY(calc(env(safe-area-inset-top) + 8px))",
							transformOrigin: "top",
							transitionProperty: "transform",
							transitionDuration: `${TRANSITIONS.DURATION}s`,
							transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(
								","
							)})`,
						});
					} else {
						reset(document.querySelector("#__next"), "transform");
					}
				}}
				onAnimationComplete={(variant) => {
					if (variant === "closed") {
						reset(document.documentElement);
						reset(document.body);
						reset(document.querySelector("header"));
						reset(document.querySelector("#__next"));
					}
				}}
				className="fixed inset-0 bg-black/40"
			/>

			{/*
        Modal window.
        
        The pointer-events-none class is needed because we cover the screen, so we can 
        use y: 100% to animate the full height in. We re-enable pointer-events on the first
        child element below.
      */}
			<div className="fixed inset-x-0 bottom-0 pointer-events-none top-safe-top">
				<motion.div
					initial={{ y: "100%" }}
					animate={{
						y: 0,
						transition: {
							ease: TRANSITIONS.EASE,
							duration: TRANSITIONS.DURATION,
						},
					}}
					exit={{
						y: "100%",
						transition: {
							ease: TRANSITIONS.EASE,
							duration: TRANSITIONS.DURATION,
						},
					}}
					className="absolute inset-x-0 top-0 bottom-0 mt-4 overflow-y-auto bg-white shadow-xl pointer-events-auto rounded-t-xl"
				>
					{children}
				</motion.div>
			</div>
		</Dialog>
	);
}

function ModalTitle(props) {
	return <Dialog.Title as="h3" {...props} />;
}

Modal.Title = ModalTitle;

export default Modal;

let cache = new Map();

function set(el, styles) {
	let originalStyles = {};

	Object.entries(styles).forEach(([key, value]) => {
		originalStyles[key] = el.style[key];
		el.style[key] = value;
	});

	cache.set(el, originalStyles);
}

function reset(el, prop) {
	let originalStyles = cache.get(el);

	if (prop) {
		el.style[prop] = originalStyles[prop];
	} else {
		Object.entries(originalStyles).forEach(([key, value]) => {
			el.style[key] = value;
		});
	}
}
