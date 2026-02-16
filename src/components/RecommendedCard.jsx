import Link from "next/link"

const RecommendedCard = ({ title, subtitle, image, price, offer, link }) => {
    return(
        <Link href={`/${link}`}>
            <div className="block w-[160px] shadow-md hover:shadow-lg transition-all duration-500 ease-out cursor-pointer rounded-[8px] py-[8px]">
                <img className="h-[160px] w-[100%] object-cover" src={image} alt="Phones"/>
                <p className="text-gray-700 font-[300] text-center mt-[10px] text-[15px]">{title}  {subtitle&&subtitle}</p>
                <p className="text-gray-700 font-[500] text-center mt-[10px] text-[18px]">Bif {price}</p>
                {
                    offer && (
                    <p className="text-gray-400 font-[500] text-center  text-[14px]">Bif <s>250,000</s></p>

                    )
                }

            </div>
        </Link>
    )
}

export default RecommendedCard

