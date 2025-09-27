import ChatButtons from "../components/Cards/ChatButtons";
import { useTheme } from "../components/Themetoggel/ThemeProvider";

// ✅ Success Page Component
const Sucessfull = () => {
  // Access global theme (dark/light mode) from context
  const { theme } = useTheme();

  return (
    // Main section → dynamic text color based on theme
    <section className={`${theme ? "text-black" : "text-white"}`}>
      <div className="container">
        {/* Centered container with full height and padding */}
        <div className="font-poppins pt-[70px] sm:pt-[100px] pb-[90px] h-screen flex flex-col justify-center items-center">

          {/* Big "Thank You!" message */}
          <h1 className="text-[53px] sm:text-[100px] font-semibold text-customTeal">
            Thank You!
          </h1>

          {/* Payment review message */}
          <p className="text-center sm:w-[550px]">
            Your payment is under review. We’ll contact you as soon as possible. 
            If you have any questions, feel free to reach out on WhatsApp or Discord.
          </p>

          {/* Social/Contact buttons (WhatsApp, Discord, etc.) */}
          <ChatButtons />
        </div>
      </div>
    </section>
  );
};

export default Sucessfull;
