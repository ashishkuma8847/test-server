import Plans from "../components/Home/Plans"
import { useTheme } from "../components/Themetoggel/ThemeProvider";

// ✅ Home Component
const Home = () => {
  // Access the global theme context (light/dark mode)
  const { theme } = useTheme();

  return (
    <>
      {/* Main section of the Home page, applying dynamic text color based on theme */}
      <section className={`${theme ? "text-black" : "text-white"}`}>
        <div className="container ">
          {/* Page spacing & font setup */}
          <div className="pt-[70px] sm:pt-[100px] pb-[90px] flex flex-col gap-9 font-poppins">

            {/* Heading & Subheading */}
            <div className="flex flex-col gap-2">
              {/* Main heading with animation (AOS) */}
              <h1 
                data-aos="fade-right" 
                data-aos-delay="200" 
                className="text-3xl sm:text-4xl font-semibold"
              >
                Ou<span className=" text-customTeal">r Plans</span>
              </h1> 

              {/* Subheading with delayed fade animation */}
              <p 
                data-aos="fade-right" 
                data-aos-delay="400" 
                className="text-base sm:text-xl font-medium"
              >
                Choose the power that matches your mission. Step in, conquer, and repeat.
              </p>
            </div>

            {/* Plans Component → Displays available subscription/payment plans */}
            <Plans/>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
