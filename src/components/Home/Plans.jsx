import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../Themetoggel/ThemeProvider";
import { Link } from "react-router-dom";

const Plans = () => {
  const { theme } = useTheme(); // dark/light theme state

  // ✅ Pricing Plans Data
  const data = [
    {
      title: "7 Days Power",
      discription:
        "Fast start. Perfect for short missions, testing, or short bursts of power.",
      icon: "https://lottie.host/embed/9f9a0e74-765a-4998-a257-9ab54443cf44/WtfcalzUpe.lottie",
      discountprice: "7.99",
      price: "5.99",
      path: "buy",
    },
    {
      title: "30 Days Control",
      discription:
        "Full month of unlimited domination. Boost your workflow to the max.",
      icon: "https://lottie.host/embed/ad72cd50-eec3-48c9-9932-571a3851956c/B465yOLcDK.lottie",
      discountprice: "15.99",
      price: "9.99",
      path: "buy",
    },
    {
      title: "60 Days Mastery",
      discription:
        "2X the power, 2X the domination. No limits for 60 days.",
      icon: "https://lottie.host/embed/4fa0ea7a-031e-4eef-be9b-839b48e91f24/MzPGGcdIxh.lottie",
      discountprice: "20.99",
      price: "15.99",
      path: "buy",
    },
    {
      title: "Permanent",
      discription:
        "Buy once. Rule forever. One-time payment for infinite power.",
      icon: "https://lottie.host/embed/4a1410af-af51-41f1-87d1-1f52e98f9043/sVXhScRP6D.lottie",
      discountprice: "45.99",
      price: "29.99",
      path: "buy",
    },
  ];

  return (
    <>
      {/* ✅ Flex wrapper for all plans */}
      <div
        className={`${
          theme ? "text-black" : "text-white"
        } flex flex-col  gap-10 sm:gap-10 sm:justify-between`}
      >
        <div className="flex justify-between gap-10 sm:gap-0 sm:flex-row flex-col">
        {data.map((item, index) => {
          // ✅ LocalStorage setter (on plan select)
          function handelocal() {
            localStorage.setItem("price", item.price);
            localStorage.setItem("title", item.title);
          }

          return (
            <Link
              to={item.path}
              key={index + item.title}
              onClick={() => handelocal()}
              className={`relative z-0 ${
                !theme
                  ? "shadow-sm shadow-white text-white"
                  : "shadow-sm shadow-black text-black"
              } backdrop-blur-lg rounded-2xl p-6 border border-white/10 
              overflow-hidden transition-all duration-300 
              hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between`}
            >
              {/* 🔹 Light gradient overlay */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* 🔹 Icon + Price Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="md:w-16 w-14 h-14 md:h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6 relative">
                 

                  {/* Main Plan Icon (size conditional on index) */}
                  {index === 2 ? (
                    <iframe title="data1" src={item.icon}></iframe>
                  ) : (
                    <iframe
                      title="data2"
                      className="w-10 h-10"
                      src={item.icon}
                    ></iframe>
                  )}
                </div>

                {/* Price Section */}
                <span
                  className="flex gap-2 font-inter font-bold"
                  data-aos="fade-up-left"
                  data-aos-duration="1500"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div
                    className={`flex items-end ${
                      !theme ? "text-white" : "text-black "
                    }`}
                  >
                    {/* Original Price (striked) */}
                    <span className="line-through text-lg ">
                      {item.discountprice}
                    </span>
                    <span className="text-xs pb-1">$</span>
                  </div>

                  {/* Discount Price */}
                  <div className="text-customTeal text-2xl">
                    <span>{item.price}</span>
                    <span className="text-xs">$</span>
                  </div>
                </span>
              </div>

              {/* 🔹 Title + Description */}
              <div>
                <p
                  className="text-lg font-semibold uppercase tracking-wider text-customTeal mb-2"
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
          );
        })}</div> 
        
  <iframe className="max-w-[800px] w-full h-[300px]  sm:h-[500px] rounded-xl mx-auto" src="https://www.youtube.com/embed/CP14pexrFso?si=-nQJ8nIpId3xRcVg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


      </div>
    </>
  );
};

export default Plans;
