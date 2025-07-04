"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { gsap } from "gsap";
// Add spinner import
import { ImSpinner2 } from "react-icons/im";

// Expanded FAQ_DATA with more categories and subcategories
const FAQ_DATA = [
	{
		category: "General",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "What is Plugin?",
				answer: "Plugin is Africa’s trusted service marketplace—connecting customers with skilled professionals online, offline & on-demand.",
			},
			{
				title: "How do I join Plugin?",
				answer: "Simply sign up on our web or mobile app and follow the onboarding steps.",
			},
			{
				title: "When is Plugin launching?",
				answer: "Plugin launches August 2025. Join our waitlist to get early access and updates.",
			},
			{
				title: "Which countries does Plugin serve?",
				answer: "Plugin is launching across major African cities, with plans to expand continent-wide.",
			},
		],
	},
	{
		category: "Payments & Security",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "What payment methods are supported?",
				answer: "We support cards, bank transfer, USSD, and multi-currency payments.",
			},
			{
				title: "Is my payment secure?",
				answer: "Yes, all payments are protected by escrow and encrypted for your safety.",
			},
			{
				title: "How does escrow work?",
				answer: "Your payment is held securely until the service is delivered and approved.",
			},
			{
				title: "Can I pay in my local currency?",
				answer: "Yes, Plugin supports multi-currency payments for your convenience.",
			},
		],
	},
	{
		category: "Service Categories",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "What services can I find on Plugin?",
				answer: "Plugin offers 20+ categories: tech, fashion, repairs, legal, wellness, events, power, home services, education, logistics, beauty, and more.",
			},
			{
				title: "How are service providers matched?",
				answer: "Our platform matches you with verified professionals based on your needs, location, and preferences.",
			},
			{
				title: "Can I book services offline?",
				answer: "Yes, Plugin supports both online and offline bookings, including USSD access.",
			},
		],
	},
	{
		category: "Vendors & Professionals",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "How do I become a vendor?",
				answer: "Register as a vendor, complete your profile, and submit verification documents.",
			},
			{
				title: "How are vendors verified?",
				answer: "All vendors undergo strict KYC and background checks before approval.",
			},
			{
				title: "How do I get paid as a vendor?",
				answer: "Vendors receive payments directly to their bank or mobile wallet after job completion and approval.",
			},
			{
				title: "Can I offer multiple services?",
				answer: "Yes, vendors can list multiple services and manage them from their dashboard.",
			},
		],
	},
	{
		category: "Plugin4Good (Social Impact)",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "What is Plugin4Good?",
				answer: "Plugin4Good is our social impact arm, training and empowering underserved Africans for a better future.",
			},
			{
				title: "How many people has Plugin4Good helped?",
				answer: "Over 300 trained, 100+ empowered, and 80+ families supported so far.",
			},
			{
				title: "How can I support Plugin4Good?",
				answer: "You can donate, volunteer, or partner with us. Visit the Plugin4Good section for more info.",
			},
		],
	},
	{
		category: "How It Works",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "How do I book a service?",
				answer: "Browse categories, match with a provider, book & pay, then rate your experience.",
			},
			{
				title: "Can I rate and review providers?",
				answer: "Yes, after each service you can rate and leave feedback to help others.",
			},
			{
				title: "How do I join the waitlist?",
				answer: "Click 'Join Waitlist' on the homepage and enter your email to get early access.",
			},
		],
	},
	{
		category: "Support",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "How do I contact support?",
				answer: "You can reach us via live chat, email, or our 24/7 hotline.",
			},
			{
				title: "Where can I report an issue?",
				answer: "Use the 'Report Issue' button in your dashboard or contact support directly.",
			},
			{
				title: "Is there a help center?",
				answer: "Yes, our Help Center provides guides, tips, and troubleshooting for all users.",
			},
		],
	},
	{
		category: "Founder’s Story",
		icon: <FaQuestionCircle className="text-yellow-400 mr-2" />,
		subcategories: [
			{
				title: "Who founded Plugin?",
				answer: "Plugin was founded by Olamide Kuforiji to unlock Africa’s talent and promote fair, timely work access.",
			},
			{
				title: "What is the founder’s vision?",
				answer: "To create a trusted, inclusive platform that empowers both users and professionals across Africa.",
			},
			{
				title: "Is there a message from the founder?",
				answer: "“We believe in Africa’s talent. Plugin is here to connect, empower, and transform lives.”",
			},
		],
	},
];

const categoryVariants = {
	closed: { borderRadius: "1.5rem" },
	open: { borderRadius: "1.5rem 1.5rem 0.5rem 0.5rem" },
};

const subcatVariants = {
	closed: { height: 0, opacity: 0, marginTop: 0 },
	open: { height: "auto", opacity: 1, marginTop: 12 },
};

export default function Faqs() {
	const [openCategory, setOpenCategory] = useState(null);
	const [openSub, setOpenSub] = useState({});
	const [loadingCategory, setLoadingCategory] = useState(null); // Spinner state for category
	const [loadingSub, setLoadingSub] = useState({}); // Spinner state for subcategory

	// Animate category open/close with GSAP
	const handleCategoryClick = (idx) => {
		if (openCategory === idx) {
			setOpenCategory(null);
			setOpenSub({});
			return;
		}
		setLoadingCategory(idx);
		setTimeout(() => {
			setLoadingCategory(null);
			setOpenCategory(idx);
			setOpenSub({});
			gsap.fromTo(
				`#cat-${idx}`,
				{ scale: 0.97, background: "#222" },
				{ scale: 1, background: "#18181b", duration: 0.4, ease: "power2.out" }
			);
		}, 500);
	};

	const handleSubClick = (catIdx, subIdx) => {
		if (openSub[catIdx] === subIdx) {
			setOpenSub((prev) => ({ ...prev, [catIdx]: null }));
			return;
		}
		setLoadingSub((prev) => ({ ...prev, [catIdx]: subIdx }));
		setTimeout(() => {
			setLoadingSub((prev) => ({ ...prev, [catIdx]: null }));
			setOpenSub((prev) => ({
				...prev,
				[catIdx]: subIdx,
			}));
		}, 500);
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-black via-yellow-50/10 to-yellow-100/10 py-16 px-4">
			<div className="max-w-3xl mx-auto">
				<motion.h1
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="text-4xl md:text-5xl font-bold text-center mb-10 text-yellow-500 pt-12"
				>
					Frequently Asked Questions
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="text-center text-lg text-gray-400 mb-12"
				>
					Browse by category. Click to expand and see answers.
				</motion.p>

				<div className="space-y-6">
					{FAQ_DATA.map((cat, idx) => (
						<motion.div
							key={cat.category}
							id={`cat-${idx}`}
							variants={categoryVariants}
							animate={openCategory === idx ? "open" : "closed"}
							className={`bg-neutral-900/90 border border-yellow-400/30 shadow-lg transition-all duration-300`}
						>
							<button
								className="w-full flex items-center justify-between px-6 py-5 focus:outline-none"
								onClick={() => handleCategoryClick(idx)}
								aria-expanded={openCategory === idx}
								disabled={loadingCategory !== null}
							>
								<div className="flex items-center gap-2 text-xl font-semibold text-yellow-400">
									{cat.icon}
									{cat.category}
								</div>
								<span className="text-yellow-400 flex items-center">
									{loadingCategory === idx ? (
										<ImSpinner2 className="animate-spin" size={22} />
									) : (
										<motion.span
											initial={false}
											animate={{ rotate: openCategory === idx ? 180 : 0 }}
											transition={{ duration: 0.3 }}
										>
											<FaChevronDown size={22} />
										</motion.span>
									)}
								</span>
							</button>
							<AnimatePresence initial={false}>
								{openCategory === idx && (
									<motion.div
										key="subcats"
										variants={subcatVariants}
										initial="closed"
										animate="open"
										exit="closed"
										className="overflow-hidden px-6 pb-4"
									>
										{cat.subcategories.map((sub, subIdx) => (
											<motion.div
												key={sub.title}
												className="my-2"
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.05 * subIdx }}
											>
												<button
													className="flex items-center justify-between w-full py-3 px-3 rounded-lg bg-neutral-800/80 hover:bg-yellow-400/10 text-left transition-all duration-200"
													onClick={() => handleSubClick(idx, subIdx)}
													aria-expanded={openSub[idx] === subIdx}
													disabled={loadingSub[idx] !== undefined && loadingSub[idx] !== null}
												>
													<span className="font-medium text-white flex-1 text-lg">{sub.title}</span>
													<span className="ml-2 flex items-center">
														{loadingSub[idx] === subIdx ? (
															<ImSpinner2 className="animate-spin" />
														) : openSub[idx] === subIdx ? (
															<FaChevronUp className="text-yellow-400" />
														) : (
															<FaChevronDown className="text-yellow-400" />
														)}
													</span>
												</button>
												<AnimatePresence>
													{openSub[idx] === subIdx && (
														<motion.div
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: "auto", opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															transition={{ duration: 0.3 }}
															className="overflow-hidden px-2"
														>
															<div className="py-3 text-gray-300 text-base border-l-4 border-yellow-400 pl-4 bg-neutral-900/70 rounded-b-lg">
																{sub.answer}
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</motion.div>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				{/* Extra Features */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="mt-16 text-center"
				>
					<h3 className="text-2xl font-bold text-yellow-400 mb-2">Still need help?</h3>
					<p className="text-gray-400 mb-4">
						Contact our 24/7 support or <a href="/contact" className="text-yellow-400 underline">submit a ticket</a>.
					</p>
					<a
						href="mailto:hello@plugin.africa"
						className="inline-block px-6 py-3 rounded-full bg-yellow-400 text-black font-bold shadow hover:bg-yellow-500 transition"
					>
						Email Support
					</a>
				</motion.div>
			</div>
		</main>
	);
}