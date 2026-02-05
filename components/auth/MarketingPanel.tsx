import Image from "next/image";

export default function MarketingPanel() {
	return (
		<section className="flex w-full items-center">
			<div className="relative w-full overflow-hidden rounded-[32px] shadow-[0_25px_55px_rgba(5,10,25,0.55)]">
				<Image
					src="/left-frame.svg"
					alt="NetworkX preview"
					width={708}
					height={646}
					className="h-auto w-full object-contain"
					priority
				/>
			</div>
		</section>
	);
}
