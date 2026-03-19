import { LogoCloud } from "@/components/logo-cloud"; // @efferd/logo-cloud-3

export function LogosSection() {
	return (
		<section className="relative space-y-4 pt-6 pb-10">
			<h2 className="font-outfit text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
				For All Your <span className="text-foreground">Socials</span>
			</h2>
			<div className="relative z-10 mx-auto max-w-4xl">
				<LogoCloud />
			</div>
		</section>
	);
}
