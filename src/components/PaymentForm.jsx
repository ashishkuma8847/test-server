import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";

// ✅ Validation schema with Yup
const PaymentSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  transactionId: Yup.string(),
  whatsapp: Yup.string(),
  files: Yup.mixed().required("Payment proof is required"),
});

const PaymentForm = ({ theme, selectedpaid }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const Plan =
    typeof window !== "undefined" ? localStorage.getItem("title") : null;
  const Price =
    typeof window !== "undefined" ? localStorage.getItem("price") : null;

  // ✅ Upload images to imgbb
  const uploadImages = async (files) => {
    const API_KEY = "8fde1ea6a0bc5fb0cde18eb19bd3673f";
    const uploaded = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${API_KEY}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (res.data.success) {
          uploaded.push(res.data.data.url);
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        setError("Image upload failed!");
      }
    }
    return uploaded;
  };

  // ✅ Form submit handler
  const handleSubmit = async (values, { resetForm }) => {
    if (!images.length) {
      toast.error("⚠️ Please upload a payment proof");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        image: images[0],
        plan: Plan,
        price: Price,
        email: values.email,
        whatsapp: values.whatsapp,
        transactionId: values.transactionId,
      };

      // Post to your backend function
      const response = await axios.post("/api/upload", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Payment Proof Uploaded Successfully!");
        resetForm();
        setImages([]);
      }
    } catch (err) {
      console.error("Client error:", err);
      toast.error("❌ Error sending payment proof");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col max-w-[600px] w-full mx-auto gap-9 ${
        selectedpaid ? "block" : "hidden"
      }`}
    >
      <Toaster position="top-center" />

      <Formik
        initialValues={{
          transactionId: "",
          email: "",
          whatsapp: "",
          files: null,
        }}
        validationSchema={PaymentSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-5">
            <Field
              name="transactionId"
              type="text"
              placeholder="Transaction ID"
              className="w-full px-4 py-3 rounded-lg border bg-transparent border-[#12BBB6]/50"
            />
            <ErrorMessage
              name="transactionId"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border bg-transparent border-[#12BBB6]/50"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />

            <Field
              name="whatsapp"
              type="text"
              placeholder="WhatsApp Number"
              className="w-full px-4 py-3 rounded-lg border bg-transparent border-[#12BBB6]/50"
            />
            <ErrorMessage
              name="whatsapp"
              component="p"
              className="text-red-500 text-sm"
            />

            {/* File Upload */}
            <div>
              <label className="text-lg mb-2">Payment Proof</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = e.target.files;
                  setFieldValue("files", files);
                  if (files.length > 0) {
                    setLoading(true);
                    const uploaded = await uploadImages(files);
                    setImages(uploaded);
                    setLoading(false);
                  }
                }}
                className="w-full file:bg-customTeal file:border-none file:rounded-lg file:px-4 file:py-2 font-poppins file:text-white"
              />
              <ErrorMessage
                name="files"
                component="p"
                className="text-red-500 text-sm"
              />
              <p className="text-sm text-gray-500 mt-2">Max file size: 4 MB</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#12BBB6] text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Submit Payment"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
