import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
function Testimonials() {

  
  return (
    <Carousel
      showThumbs={false}
      showIndicators={false}
      showArrows={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      className="bg-gradient-to-b from-[#F24747] to-[#c69f41] py-28 max-h-[403.19px] text-white font-OpenSans text-[26px] "
    >
      <div className="block">
        <h1 className="text-[26px]">
          {" "}
          I bought my first car from Gurex, and the whole process was smooth
        </h1>
        <div className="flex justify-center ">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <div className="">
          <div className=" w-20 mx-auto pt-4 justify-center">
            {/* <img
              className=" relative rounded-full h-24 w-24 mx-auto object-cover "
              src="https://cdn.discordapp.com/attachments/800718490750418967/1087492595959205928/pexels-andrea-piacquadio-733872.jpg"
            /> */}
          </div>
        </div>

        {/* First slide */}
      </div>

      <div className="block">
        <h1 className="text-[26px]">
          {" "}
          Just a great experience overall. Gurex was extremely easy to use!
        </h1>
        <div className="flex justify-center ">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>

        <div className="w-20 mx-auto pt-4 justify-center">
          {/* <img
            className="relative rounded-full h-24 w-24 mx-auto object-cover"
            src="https://cdn.discordapp.com/attachments/800718490750418967/1087492784237330432/pexels-andrea-piacquadio-874158.jpg"
          /> */}
        </div>

        {/* Second slide */}
      </div>
    </Carousel>
  );
}

export default Testimonials;
