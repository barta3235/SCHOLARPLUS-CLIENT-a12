
const HeadSubHead = ({heading1,heading2,subHeading}) => {
    return (
        <div className="mx-[5px] md:mx-[50px] mt-[100px] mb-[60px]">
            <h1 className="text-3xl md:text-[43px] mb-[17px] font-medium tracking-wider">{heading1} <span className="border-b-[3px] border-yellow-300">{heading2}</span></h1>
            <h1 className="text-[22px] tracking-wider">{subHeading}</h1>
        </div>
    );
};

export default HeadSubHead;