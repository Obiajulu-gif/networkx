import Image from "next/image";

export default function DashboardPreview() {
	return (
		<div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-white/15 bg-[#0d121a] shadow-[0_18px_40px_rgba(5,10,20,0.45)]">
			<Image
				src="/left-frame.svg"
				alt="NetworkX dashboard preview"
				fill
				className="object-cover"
				sizes="(min-width: 1024px) 520px, 90vw"
				priority
			/>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
		</div>
	);
}
