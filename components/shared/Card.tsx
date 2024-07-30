
import { Artwork } from "@/types";
import Link from "next/link";


type CardProps = {
	artwork: Artwork;
}

const Card = (props: CardProps) => {
	const { artwork } = props;

	return (
		<div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
			<Link 
				href={`/artworks/${artwork.id}`}
				style={{backgroundImage: `url(${artwork?.thumbnail?.lqip}&w=${artwork?.thumbnail?.width}&h=${artwork?.thumbnail?.height})`}}
				className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
			/>

			<div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
						<span className="p-semibold-14 line-clamp-2 rounded-full bg-green-100 px-4 py-1 text-green-600">
							{artwork.department_title}
						</span>

						<p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
							{artwork.title}
						</p>


					<div className="flex-between w-full">
						<p className="p-medium-14 md:p-medium-16 text-grey-600">
							Artist: {artwork.artist_display}
						</p>
					</div>
			</div>
		</div>
	)
}

export default Card;

