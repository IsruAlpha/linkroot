"use client";

import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { CheckoutLink } from "@convex-dev/polar/react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type PricingPlan = {
	name: string;
	price: string;
	period?: string;
	description: string;
	href?: string;
	polarKey?: string;
	featuresTitle: string;
	features: string[];
	isPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
	{
		name: "STARTER",
		price: "Free",
		description: "Everything you need to get started",
		featuresTitle: "FREE, FOREVER:",
		features: [
			"Unlimited links",
			"Social media icons",

			"Linkroot branding",
		],
		href: "#",
	},
	{
		name: "PRO",
		isPopular: true,
		polarKey: "pro",
		price: "$5",
		period: "month",
		description: "For creators who want more",
		featuresTitle: "EVERYTHING IN STARTER, PLUS:",
		features: [
			"Remove Linkroot branding",
			"Custom colors & fonts",
			"Create chatbot ",
			"AI Powered",
		],
	},
];

export function PricingSection() {
	return (
		<section className="mx-auto min-h-screen max-w-5xl place-content-center border-x border-border/30 py-4">
			<div className="relative">
				<FullWidthDivider position="top" className="opacity-40" />
				<FullWidthDivider position="bottom" className="opacity-40" />

				<div className="grid grid-cols-1 gap-px bg-border/60 md:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col bg-background p-8 md:col-span-2">
						<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
							PRICING
						</p>
						<h1 className="font-outfit font-bold text-3xl leading-tight md:text-5xl">
							Pricing that doesn't suck
						</h1>
					</div>

					{pricingPlans.map((plan) => (
						<PricingCard key={plan.name} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}
function PricingCard({ plan }: { plan: PricingPlan }) {
	const { user } = useAuth();
	const convexUser = useQuery(api.users.getMe);
	const polarUser = useQuery(api.users.getMeForPolar);
	const polarProductIds = useQuery(api.polar.getProductIds);
	const signUpUrl = "/sign-up?return_to=/pricing";
	
	const isLoggedIn = !!user;
	const isPro = !!convexUser?.isPro;
	const hasEmail = !!polarUser?.email;
	const polarProductId = (plan.polarKey && polarProductIds) 
		? (polarProductIds as any)[plan.polarKey] 
		: undefined;

	return (
		<div className="flex flex-col bg-background *:px-4 *:py-6">
			<div className="border-b border-border/60">
				<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
					{plan.name}
				</p>
				<div className="mb-2 flex items-baseline gap-2">
					<h2 className="font-bold text-4xl">{plan.price}</h2>
					{plan.period && (
						<span className="text-muted-foreground text-xs">
							/ {plan.period}
						</span>
					)}
				</div>
				<p className="mb-8 line-clamp-1 text-muted-foreground">
					{plan.description}
				</p>

				{!isLoggedIn ? (
					<Button
						asChild
						className="w-full"
						variant={plan.isPopular ? "default" : "outline"}
					>
						<a href={signUpUrl}>Get started</a>
					</Button>
				) : plan.polarKey ? (
					/* This is the PRO plan */
					isPro ? (
						<Button
							className="w-full"
							variant="outline"
							disabled
						>
							Current plan
						</Button>
					) : !hasEmail ? (
						<Button
							asChild
							className="w-full"
							variant={plan.isPopular ? "default" : "outline"}
						>
							<a href="/dashboard">Add email first</a>
						</Button>
					) : polarProductId ? (
						<CheckoutLink polarApi={api.polar} productIds={[polarProductId]} className="w-full" lazy>
							<Button
								className="w-full"
								variant={plan.isPopular ? "default" : "outline"}
							>
								Get started
							</Button>
						</CheckoutLink>
					) : (
						<Button
							className="w-full"
							variant={plan.isPopular ? "default" : "outline"}
							disabled
						>
							Loading...
						</Button>
					)
				) : (
					/* This is the STARTER plan */
					<Button
						className="w-full"
						variant="outline"
						disabled
					>
						{!isPro ? "Current plan" : "Basic member"}
					</Button>
				)}
			</div>

			<div className="space-y-3 text-muted-foreground text-sm">
				<p className="mb-6 text-xs uppercase">{plan.featuresTitle}</p>

				{plan.features.map((feature) => (
					<p
						className="flex items-center gap-2 text-foreground/80"
						key={feature}
					>
						<CheckIcon className="size-4" />
						{feature}
					</p>
				))}
			</div>
		</div>
	);
}
