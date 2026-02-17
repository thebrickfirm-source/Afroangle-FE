"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { CloseIcon } from "@sanity/icons";

// --- Types ---
type OpinionModalProps = {
  trigger?: React.ReactNode; // Optional custom button to open the modal
};

// Define the shape of our form values
type FormValues = {
  name: string;
  email: string;
  file: FileList;
};

export default function OpinionSubmissionModal({ trigger }: OpinionModalProps) {
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
      reset();
    }, 300);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus("loading");
    const file = data.file?.[0]; // File
    // Use FormData for uploads
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (file) formData.append("file", file);

    const response = await fetch("/api/sanity/submit-piece", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      setStatus("success");
      reset();
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
          <div className="slant-bottom-right p-px bg-primary-green w-full">
            <button className="slant-bottom-right w-full py-4 pr-8 pl-6 leading-none bg-white text-primary-green font-secondary transition-colors hover:bg-primary-green hover:text-white">
              Submit an Opinion Piece
            </button>
          </div>
        )}
      </div>

      {/* 2. Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          {/* 3. Modal Content */}
          <div className="bg-white w-full max-w-xl relative shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center py-12 px-5 md:px-12 max-h-[90vh] overflow-y-auto">
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
                <h2 className="font-primary font-bold text-xl uppercase tracking-widest mb-8 text-black">
                  Submission Received
                </h2>

                {/* Success Graphic */}
                <Image
                  src="/digest_success.svg" // Replace with your generic success icon if needed
                  alt="Success"
                  width={60}
                  height={60}
                  className="mb-8 w-full"
                />

                <p className="font-secondary font-light text-black mb-8 max-w-md leading-snug">
                  Thank you for your submission. Our editors will review your
                  piece and get back to you shortly via email.
                </p>

                <button
                  onClick={handleClose}
                  className="w-40 bg-primary-green text-white py-3 px-6 flex items-center justify-center gap-3 hover:bg-[#0a3a24] transition-colors group"
                >
                  <span className="font-primary font-light text-lg tracking-wider">
                    Close
                  </span>
                  <CloseIcon className="text-[#FF9696]" fontSize={24} />
                </button>
              </div>
            ) : (
              /* --- STATE 2: SUBMISSION FORM VIEW --- */
              <div className="w-full flex flex-col items-center">
                <h2 className="font-primary font-bold text-xl uppercase tracking-widest mb-6 leading-snug text-black">
                  Become an Afroangle Writer. <br /> Submit your opinion piece
                </h2>

                {/* Graphic Card */}
                {/* Note: Ensure you have an image for 'Opinion Piece' or fallback to the previous one */}
                <div className="mb-8 relative">
                  <Image
                    src="/opinion_piece.svg" // Placeholder: You'll need to export this asset from Figma
                    alt="Opinion Piece"
                    width={300}
                    height={150}
                    className="w-full h-auto"
                  />
                </div>

                <p className="font-secondary text-black mb-8 max-w-sm leading-relaxed text-sm">
                  Send your opinion piece here and let our editors go through it
                  and get back to you.
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
                  {/* FILE UPLOAD (PDF/DOCX) */}
                  <div className="w-full text-left">
                    <input
                      type="file"
                      disabled={status === "loading"}
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      {...register("file", {
                        required: "Please upload a PDF or DOC file",
                        validate: {
                          fileType: (files) => {
                            const file = files?.[0];
                            if (!file) return "Please upload a file";

                            const allowedTypes = [
                              "application/pdf",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ];

                            const allowedExt = [".pdf", ".docx", ".doc"];
                            const name = file.name?.toLowerCase() || "";
                            const hasAllowedExt = allowedExt.some((ext) =>
                              name.endsWith(ext),
                            );

                            if (
                              !allowedTypes.includes(file.type) &&
                              !hasAllowedExt
                            ) {
                              return "Only PDF or DOC files are allowed";
                            }

                            // Optional: max size (e.g. 10MB)
                            const MAX_SIZE = 5 * 1024 * 1024;
                            if (file.size > MAX_SIZE)
                              return "File must be 5MB or less";

                            return true;
                          },
                        },
                      })}
                      className={`w-full bg-[#f4f4f4] border ${
                        errors.file ? "border-red-500" : "border-[#e5aeae]"
                      } text-gray-800 p-4 outline-none focus:border-[#d32f2f] focus:ring-1 focus:ring-[#d32f2f] transition-all file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100`}
                    />
                    {errors.file && (
                      <span className="text-red-500 text-xs mt-1 block pl-1">
                        {String(errors.file.message)}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-1 pl-1">
                      Accepted formats: PDF, DOCX (max 10MB)
                    </p>
                  </div>
                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary-green text-white py-4 px-6 mt-4 flex items-center justify-center hover:bg-[#0a3a24] transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span className="font-primary text-lg font-light tracking-wide">
                      {status === "loading"
                        ? "Uploading..."
                        : "Send to Afroangle Editors"}
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
