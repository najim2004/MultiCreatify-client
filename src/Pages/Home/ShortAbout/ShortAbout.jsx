import Container from "../../../Components/Container";

const ShortAbout = () => {
  return (
    <Container>
      <div className="flex flex-col md:my-[60px] my-20 lg:my-[100px] items-center">
        <p className="font-openSans text-[#e60072] mb-3 md:mb-6 lg:mb-7 leading-7">
          WE ARE CREATIVE AGENCY
        </p>
        <h3 className="md:text-4xl text-3xl text-center lg:text-[45px] font-poppins font-semibold leading-[57px] text-[#050748]">
          <span className="text-[#e91e63]">Top-rated</span> Web And Mobile App
          <br /> Development Company
        </h3>
        <p className="text-[#6a6a8e] text-lg font-openSans leading-7 my-10 max-w-[970px] text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry.
        </p>
        <h3 className="text-center md:text-3xl text-2xl lg:text-[34px] font-poppins font-semibold leading-[46px] text-[#050748]">
          Big Ideas, creative people, new technology.
        </h3>
        <p className="text-[#6a6a8e] text-lg font-openSans leading-7 mt-10 max-w-[970px] text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's specimen book. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    </Container>
  );
};

export default ShortAbout;
