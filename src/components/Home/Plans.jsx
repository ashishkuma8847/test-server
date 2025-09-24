import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../Themetoggel/ThemeProvider";
import { Link } from "react-router-dom";
const Plans = () => {
    const { theme } = useTheme();

    const data = [
        {
            title: "7 Days Power",
            discription: "Fast start. Perfect for short missions, testing, or short bursts of power.",
            icon: "https://lottie.host/embed/9f9a0e74-765a-4998-a257-9ab54443cf44/WtfcalzUpe.lottie",
            discountprice: "7.99",
            price: "5.99",
            path: "buy",
        },
        {
            title: "30 Days Control",
            discription: "Full month of unlimited domination. Boost your workflow to the max.",
            icon: "https://lottie.host/embed/ad72cd50-eec3-48c9-9932-571a3851956c/B465yOLcDK.lottie",
            discountprice: "15.99",
            price: "9.99",
            path: "buy",

        },
        {
            title: "60 Days Mastery",
            discription: "2X the power, 2X the domination. No limits for 60 days.",
            icon: "https://lottie.host/embed/4fa0ea7a-031e-4eef-be9b-839b48e91f24/MzPGGcdIxh.lottie",
            discountprice: "20.99",
            price: "15.99",
            path: "buy",

        },
        {
            title: "Permanent",
            discription: "Buy once. Rule forever. One-time payment for infinite power.",
            icon: "https://lottie.host/embed/4a1410af-af51-41f1-87d1-1f52e98f9043/sVXhScRP6D.lottie",
            discountprice: "45.99",
            price: "29.99",
            path: "buy",

        }
    ]
    return (
        <>
            <div className={`${theme ? "text-black" : "text-white"} flex flex-col sm:flex-row gap-10 sm:gap-0 sm:justify-between `}>
                {
                    data.map((item, index) => {
                        function handelocal() {
                            localStorage.setItem("price", item.price)
                            localStorage.setItem("title", item.title)
                        }
                        return (
                            <>
                                <Link to={item.path} key={index + item} onClick={() =>handelocal()}
                                    className={`relative z-0  ${!theme ? "shadow-sm shadow-white text-white" : "shadow-sm shadow-black text-black"
                                        } backdrop-blur-lg rounded-2xl p-6 border border-white/10  overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between `}
                                >
                                    <div className="absolute -z-10 inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="md:w-16 w-14 h-14 md:h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                                            <iframe title="data" className="w-[94px] -z-10 absolute -left-5 -top-7 h-[94px]" src="https://lottie.host/embed/49ef9e95-4631-42fe-a4d5-ed8bf3addcfc/YLuZni78Ue.lottie"></iframe>
                                            {
                                                index === 2 ? <iframe title="data1" className="" src={item.icon}></iframe> : <iframe title="data2" className="w-10 h-10" src={item.icon}></iframe>
                                            }


                                        </div>
                                        <span
                                            className=" flex gap-2  font-inter  font-bold "
                                            data-aos="fade-up-left"
                                            data-aos-duration="1500"
                                            data-aos-anchor-placement="top-bottom"
                                        >
                                            <div className={`flex items-end ${!theme ? "text-white" : "text-black "}`}><span className="line-through text-lg ">{item.discountprice}</span ><span className="text-xs pb-1">$</span></div>
                                            <div className="text-customTeal text-2xl "><span>{item.price}</span><span className="text-xs">$</span></div>
                                        </span>
                                    </div>

                                    <div>
                                        <p
                                            className="text-lg font-semibold uppercase tracking-wider text-customTeal  mb-2"
                                            data-aos="fade-up"
                                            data-aos-duration="800"
                                            data-aos-anchor-placement="top-bottom"
                                        >
                                            {item.title}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p
                                                className="text-xs font-medium w-[200px] text-gray-400"
                                                data-aos="fade-up"
                                                data-aos-duration="1000"
                                                data-aos-anchor-placement="top-bottom"
                                            >
                                                {item.discription}
                                            </p>
                                            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )

                    })
                }
            </div>
        </>
    )
}

export default Plans
