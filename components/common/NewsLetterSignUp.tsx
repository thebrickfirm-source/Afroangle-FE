"use client";

import React, { useState } from "react";
import Image from "next/image";
// import { X } from "lucide-react";
import { CloseIcon } from "@sanity/icons";
import { useForm, SubmitHandler } from "react-hook-form";

// --- Types ---
type NewsletterModalProps = {
  trigger?: React.ReactNode; // Optional custom button to open the modal
};

// Define the shape of our form values
type FormValues = {
  name: string;
  email: string;
};

// --- Mock API Service ---
const subscribeToNewsletter = async (data: FormValues): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Subscribing:", data);
      resolve(true);
    }, 1500); // Simulate network delay
  });
};

export default function NewsletterModal({ trigger }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // --- React Hook Form Setup ---
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // --- Handlers ---
  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after a short delay so the user doesn't see it flicker
    setTimeout(() => {
      setStatus("idle");
      reset(); // Resets form values and errors
    }, 300);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus("loading");

    // Call API
    const success = await subscribeToNewsletter(data);

    if (success) {
      setStatus("success");
      reset(); // Clear form after successful submission
    } else {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  // --- Render ---
  return (
    <>
      {/* 1. Trigger Button */}
      <div onClick={handleOpen} className="inline-block cursor-pointer">
        {trigger || (
          <button className="bg-primary-green py-4 pl-8 pr-6 text-white slant-top-left leading-none">
            Get the monthly digest
          </button>
        )}
      </div>

      {/* 2. Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          {/* 3. Modal Content */}
          <div className="bg-white w-full max-w-136 relative shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center pb-12 pt-14 px-8 md:px-18">
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-6 flex items-center gap-2 text-sm font-light tracking-widest text-black hover:opacity-70 transition-opacity"
            >
              close
              <CloseIcon className="text-[#d32f2f]" fontSize={22} />
            </button>

            {/* --- STATE 1: SUCCESS VIEW --- */}
            {status === "success" ? (
              <div className="w-full flex flex-col items-center fade-in duration-300">
                <h2 className="font-bold font-primary text-xl md:text-2xl uppercase tracking-widest mb-8 text-black">
                  You’re a Subscriber Now
                </h2>

                {/* Graphic Card */}
                <Image
                  src="/digest_success.svg"
                  alt="Success"
                  width={250}
                  height={250}
                  className="mb-8 w-full"
                />

                <p className="font-secondary font-light text-black mb-8 max-w-sm leading-relaxed">
                  Check your email for limited free articles, news alerts,
                  select newsletters, podcasts and some daily games.
                </p>

                <button
                  onClick={handleClose}
                  className="w-40 bg-primary-green text-white py-4 px-6 flex items-center justify-center gap-3 hover:bg-[#0a3a24] transition-colors group"
                >
                  <span className="font-primary font-light text-lg tracking-wider">
                    Close
                  </span>
                  <CloseIcon className="text-[#FF9696]" fontSize={22} />
                </button>
              </div>
            ) : (
              /* --- STATE 2: SIGNUP FORM VIEW --- */
              <div className="w-full flex flex-col items-center">
                <h2 className="font-bold text-xl md:text-2xl text-black font-primary uppercase tracking-widest mb-8 leading-tight">
                  Journalism that explains <br /> Africa to the world
                </h2>

                {/* Graphic Card */}
                <Image
                  src="/digest_form.svg"
                  alt="Newsletter Digest"
                  width={120}
                  height={120}
                  className="mb-8 w-full"
                />
                <p className="font-secondary font-light text-black mb-8 max-w-sm text-sm">
                  Gain access to limited free articles, news alerts, select
                  newsletters, podcasts and some daily games.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  {/* NAME INPUT */}
                  <div className="w-full text-left">
                    <input
                      type="text"
                      placeholder="Your name..."
                      disabled={status === "loading"}
                      {...register("name", { required: "Name is required" })}
                      className={`w-full bg-[#f4f4f4] border ${
                        errors.name ? "border-red-500" : "border-[#e5aeae]"
                      } text-gray-800 p-4 outline-none focus:border-[#d32f2f] focus:ring-1 focus:ring-[#d32f2f] transition-all placeholder:text-gray-400`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1 block pl-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* EMAIL INPUT */}
                  <div className="w-full text-left">
                    <input
                      type="email"
                      placeholder="Your email..."
                      disabled={status === "loading"}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full bg-[#f4f4f4] border ${
                        errors.email ? "border-red-500" : "border-[#e5aeae]"
                      } text-gray-800 p-4 outline-none focus:border-[#d32f2f] focus:ring-1 focus:ring-[#d32f2f] transition-all placeholder:text-gray-400`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1 block pl-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary-green text-white py-4 px-6 mt-4 flex items-center justify-between hover:bg-[#0a3a24] transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span className="font-primary text-lg tracking-wide">
                      {status === "loading"
                        ? "Processing..."
                        : "Get the monthly digest"}
                    </span>
                    <span className="font-secondary text-xs tracking-widest text-[#a5d6a7] group-hover:text-white transition-colors uppercase">
                      Free
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
