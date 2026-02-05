import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: number;
};

export default function Logo({ className = "", size = 26 }: LogoProps) {
  return (
		<div className={`flex items-center justify-center ${className ?? ""}`}>
			<Image
				src="/networkx-logo.png"
				alt="NetworkX.ai"
				width={181}
				height={44}
				className="h-8 w-auto"
				priority
			/>
		</div>
	);
}
