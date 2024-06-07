import Container from "../../../Components/Container";
import badgeA from "../../../assets/badges-a.png";
import badgeB from "../../../assets/badges-b.png";
import badgeC from "../../../assets/badges-c.png";
import badgeD from "../../../assets/badges-d.png";

const RelationShip = () => {
  return (
    <Container>
      <div className="md:mb-[60px] mb-20 lg:mb-[100px]">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="font-openSans text-[#e60072] mb-3 md:mb-6 lg:mb-7 leading-7">
            WE MAKE RELATIONSHIPS
          </p>
          <h3 className="lg:text-[40px] md:text-4xl text-3xl font-poppins text-titleClr leading-[52px] font-semibold">
            Ranked <span className="text-[#e60072]">as #1</span> Top Web & App
            <br className="hidden lg:inline-block" /> Development Companies
          </h3>
        </div>
        <div className="grid grid-cols-1 mt-8 lg:mt-16 md:mt-10 text-center md:grid-cols-2 lg:grid-cols-4 justify-center items-center">
          <div className="flex space-y-2 flex-col justify-center items-center">
            <img className="w-[229px] h-[167px]" src={badgeA} alt="" />
            <p className="text-desClr max-w-[w-[229px]] font-openSans">
              ABC DEF Industry Leader
            </p>
          </div>
          <div className="flex space-y-2 flex-col justify-center items-center">
            <img className="w-[229px] h-[167px]" src={badgeB} alt="" />
            <p className="text-desClr max-w-[w-[229px]] font-openSans">
              Best eCommerce <br /> Development Company
            </p>
          </div>
          <div className="flex space-y-2 flex-col justify-center items-center">
            <img className="w-[229px] h-[167px]" src={badgeC} alt="" />
            <p className="text-desClr max-w-[w-[229px]] font-openSans">
              ABC DEF High Performer <br /> Winner
            </p>
          </div>
          <div className="flex space-y-2 flex-col justify-center items-center">
            <img className="w-[229px] h-[167px]" src={badgeD} alt="" />
            <p className="text-desClr max-w-[w-[229px]] font-openSans">
              Top App Developer <br /> 2019-20
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RelationShip;
