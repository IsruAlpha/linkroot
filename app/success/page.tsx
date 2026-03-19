import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRightIcon } from "lucide-react";

export default function SuccessPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
			<div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
				<div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
					<CheckIcon className="size-8 text-emerald-500" strokeWidth={2.5} />
				</div>

				<h1 className="mt-6 font-outfit text-2xl font-semibold tracking-tight md:text-3xl">
					Payment successful
				</h1>
				<p className="mt-2 text-muted-foreground">
					You&apos;re now on the Pro plan. Enjoy all the premium features!
				</p>

				<div className="mt-8 flex items-center gap-3">
					<Button asChild variant="outline">
						<a href="/">Back to home</a>
					</Button>
					<Button asChild>
						<a href="/dashboard">
							Go to dashboard <ArrowRightIcon data-icon="inline-end" />
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
