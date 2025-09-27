import { useState, useEffect } from "react";

const PaymentMethods = ({ value, Paid }) => {
  // localStorage से price get करना
  const price = localStorage.getItem("price");

  // user ने "Paid" button click किया या नहीं
  const [paid, setPaid] = useState(false);

  // जब भी paid state बदले → parent component को Paid callback भेजो
  useEffect(() => {
    Paid(paid);
  }, [paid, Paid]);

  // अलग-अलग payment methods के लिए UI render
  const renderPaymentContent = () => {
    switch (value) {
      // -------- Binance Pay --------
      case "Binance Pay":
        return (
          <>
            <div className="flex flex-col sm:flex-row gap-5">
              <p className="text-base sm:text-lg">
                Scan the QR code via Binance App to pay{" "}
                <span className="text-customTeal">{price}$</span>
              </p>
            </div>
            <div className="p-6 mx-auto mt-3 max-w-[290px] w-full backdrop-blur-sm inline-block bg-white/10 rounded-lg shadow-lg text-center">
              <img className="w-[239px] h-[263px]" src="/Binance_Qr.png" />
            </div>
          </>
        );

      // -------- Bank Transfer --------
      case "Bank Transfer":
        return (
          <>
            <div className="flex flex-col gap-3">
              <h1 className="text-xl sm:text-2xl">
                Send <span className="text-customTeal">{price}$</span> to:
              </h1>
              <div className="flex flex-col gap-2">
                <h4>
                  Bank:{" "}
                  <span className="text-customTeal">
                    Habib Bank Limited (HBL)
                  </span>
                </h4>
                <h4>
                  Account Title:
                  <span className="text-customTeal"> KHIZAR HAYAT</span>
                </h4>
                <h4>
                  Account Number:
                  <span className="text-customTeal"> 17907900779603</span>
                </h4>
                <h4>
                  IBAN:
                  <span className="text-customTeal">
                    {" "}
                    PK HABB 0017907900779603
                  </span>
                </h4>
              </div>
            </div>
          </>
        );

      // -------- JazzCash --------
      case "JazzCash":
        return (
          <>
            <div className="flex flex-col gap-3">
              <h1 className="text-xl">
                Send <span className="text-customTeal">{price}$</span> to:
              </h1>
              <div className="flex flex-col gap-2">
                <h4>
                  Account Title:{" "}
                  <span className="text-customTeal">Khizar Hayat</span>
                </h4>
                <h4>
                  Mobile Number:{" "}
                  <span className="text-customTeal"> 03333705256</span>
                </h4>
              </div>
            </div>
          </>
        );

      // -------- Easypaisa --------
      case "Easypaisa":
        return (
          <>
            <div className="flex flex-col gap-3">
              <h1 className="text-xl">
                Send <span className="text-customTeal">{price}$</span> to:
              </h1>
              <div className="flex flex-col gap-2">
                <h4>
                  Account Title:{" "}
                  <span className="text-customTeal">Khizar Hayat</span>
                </h4>
                <h4>
                  Mobile Number:{" "}
                  <span className="text-customTeal"> 03333705256</span>
                </h4>
              </div>
            </div>
          </>
        );

      // -------- UPI --------
      case "UPI":
        return (
          <>
            <div className="flex flex-col sm:flex-row gap-5">
              <p className="text-base sm:text-lg">
                Scan the QR code via UPI App to pay{" "}
                <span className="text-customTeal">{price}$</span>
              </p>
            </div>
            <div className="p-6 mx-auto mt-3 max-w-[290px] w-full backdrop-blur-sm inline-block bg-white/10 rounded-lg shadow-lg text-center">
              <img className="w-[239px] h-[263px]" src="/Binance_Qr.png" />
            </div>
          </>
        );

      // -------- Fampay --------
      case "Fampay":
        return (
          <>
            <div className="flex flex-col sm:flex-row gap-5">
              <p className="text-base sm:text-lg">
                Scan the QR code via Fampay App to pay{" "}
                <span className="text-customTeal">{price}$</span>
              </p>
            </div>
            <div className="p-6 mx-auto mt-3 max-w-[290px] w-full backdrop-blur-sm inline-block bg-white/10 rounded-lg shadow-lg text-center">
              <img className="w-[239px] h-[263px]" src="/Binance_Qr.png" />
            </div>
          </>
        );

      // -------- Default --------
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading: Current Payment Method */}
      <h1 className="text-2xl sm:text-3xl">{value}</h1>

      {/* Dynamic Payment Details */}
      <div className="flex flex-col">{renderPaymentContent()}</div>

      {/* Paid Button */}
      <button
        onClick={() => setPaid(true)} // paid state ko true karo
        className="py-2 font-medium w-[200px] mx-auto text-base backdrop-blur-sm bg-white/10 rounded-full cursor-pointer text-customTeal"
      >
        Paid
      </button>
    </div>
  );
};

export default PaymentMethods;
