import ChatButtons from "../components/Cards/ChatButtons";
import { useTheme } from "../components/Themetoggel/ThemeProvider";

const Sucessfull = () => {
  const { theme } = useTheme();
  return (
      <section className={`${theme ? "text-black" : "text-white"}`}>
        <div className="container">
<div className="font-poppins pt-[70px] justify-center items-center h-screen flex flex-col  sm:pt-[100px] pb-[90px]">

      <h1 className="text-[53px] sm:text-[100px] font-semibold text-customTeal">Thank You!</h1>
      <p className="text-center sm:w-[550px]">Your payment is under review. We’ll contact you as soon as possible. If you have any questions, feel free to reach out on WhatsApp or Discord.</p>
      <ChatButtons/>
      </div>
        </div>
    </section>
  )
}

export default Sucessfull
