import Plans from "../components/Home/Plans"
import { useTheme } from "../components/Themetoggel/ThemeProvider";

const Home = () => {
      const { theme } = useTheme();

  return (
    <>
      <section className={`${theme ? "text-black" : "text-white"}`}>
      <div className="container ">
        <div className="pt-[70px] sm:pt-[100px] pb-[90px] flex flex-col gap-9 font-poppins">
          <div className="flex flex-col  gap-2 ">
             <h1  data-aos="fade-right" data-aos-delay="200" className="text-3xl sm:text-4xl font-semibold">Ou<span className=" text-customTeal">r Plans</span></h1> 
             <p data-aos="fade-right" data-aos-delay="400" className="text-base sm:text-xl font-medium">Choose the power that matches your mission. Step in, conquer, and repeat.</p>
          </div>
          <Plans/>
        </div>
      </div>
      </section>
    </>
  )
}

export default Home
