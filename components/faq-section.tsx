import { DecorIcon } from "@/components/ui/decor-icon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		id: "item-1",
		title: "What is Linkroot?",
		content:
			"Linkroot is the modern Linktree platform that lets you share all your socials, content, and links from one beautiful, customizable page.",
	},
	{
		id: "item-2",
		title: "Is Linkroot free to use?",
		content:
			"Yes! You can create and share your link page completely free. Premium features like analytics and custom domains are available on paid plans.",
	},
	{
		id: "item-3",
		title: "Can I customize my page design?",
		content:
			"Absolutely. Choose from dozens of themes, customize colors, fonts, and layouts to match your personal brand. Every page is fully yours to style.",
	},
	{
		id: "item-4",
		title: "Which platforms does Linkroot support?",
		content:
			"Linkroot works with all major platforms: Instagram, TikTok, YouTube, Twitter/X, Spotify, your website, and more. If it has a URL, you can link it.",
	},
	{
		id: "item-5",
		title: "Do I get analytics on my links?",
		content:
			"Yes. Track clicks, views, and visitor locations in real time so you always know which links are performing best.",
	},
	{
		id: "item-6",
		title: "Can I use my own custom domain?",
		content:
			"Yes. On our Pro plan you can connect your own domain so your link page lives at a URL you own, like links.yourbrand.com.",
	},
	{
		id: "item-7",
		title: "How do I get started?",
		content:
			"Just sign up for free, add your links, pick a theme, and share your page. It takes less than two minutes to go live.",
	},
];

export function FAQSection() {
	return (
		<section id="faq" className="mx-auto grid w-full max-w-5xl grid-cols-1 py-12 md:grid-cols-2 lg:py-24">
			<div className="px-4 pt-12 pb-6 md:px-8">
				<div className="space-y-5">
					<h2 className="font-outfit text-balance font-bold text-4xl md:text-6xl lg:font-black">
						Frequently Asked Questions
					</h2>
					<p className="text-muted-foreground">
						Quick answers to common questions about Linkroot. Open any
						question to learn more.
					</p>
					<p className="text-muted-foreground">
						{"Can't find what you're looking for? "}
						<a className="text-primary hover:underline" href="#">
							Contact Us
						</a>
					</p>
				</div>
			</div>
			<div className="relative place-content-center">
				{/* vertical guide line */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 left-3 h-full w-px bg-border"
				/>

				<Accordion collapsible type="single">
					{faqs.map((item) => (
						<AccordionItem
							className="group relative border-b pl-5 first:border-t last:border-b"
							key={item.id}
							value={item.id}
						>
							{/* plus decorator */}
							<DecorIcon className="pointer-events-none absolute -bottom-[5.5px] left-[12.5px] size-2.5 -translate-x-1/2 text-muted-foreground group-last:hidden" />

							<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
								{item.title}
							</AccordionTrigger>

							<AccordionContent className="px-4 pb-4 text-muted-foreground">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
