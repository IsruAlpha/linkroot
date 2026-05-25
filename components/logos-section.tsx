import { LogoCloud } from "@/components/logo-cloud"; // @efferd/logo-cloud-3

export function LogosSection() {
	return (
		<section className="relative space-y-5 px-4 pt-10 pb-14 sm:space-y-4 sm:px-0 sm:pt-6 sm:pb-10">
			<h2 className="font-outfit px-2 text-center text-base font-medium tracking-tight text-muted-foreground sm:px-0 sm:text-lg md:text-xl">
				For All Your <span className="text-foreground">Socials</span>
			</h2>
			<div className="relative z-10 mx-auto max-w-4xl rounded-xl border border-border/40 bg-muted/15 px-3 py-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
				<LogoCloud />
			</div>
		</section>
	);
}
