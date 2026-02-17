"use client";

import React, { useMemo } from "react";
import OpinionSubmissionModal from "../common/SubmitOpinionPiece";

type Props = { locale: string };

const AboutPageContent = ({ locale }: Props) => {
  const copy = useMemo(() => {
    const en = {
      pageTitle: "About Us",
      aboutHeading: "Africa in focus—unfiltered, evolving, plural.",
      aboutTagline:
        "Afroangle is an editorial platform that covers culture, history, politics, history, innovation, the arts and entertainment to showcase Africa’s diversity of voices and narratives.",
      aboutBody:
        "Afroangle is an editorial platform telling the stories that shape contemporary Africa and its global diaspora. We cover culture, history, politics, innovation, the arts and entertainment to explore how African voices are redefining creativity, challenging narratives, and building the future on their own terms. By connecting African history with today's urgent conversations, we reveal the continent's complexity beyond headlines and single narratives. This is Africa in focus: unfiltered, evolving, and plural.",
      submitTitle: "Submit an Opinion piece.",
      submitIntro:
        "Afroangle is looking for original reporting and sharp analysis on African culture, politics, economics, technology, arts, gender, sexuality, and security with a strong focus on underreported stories from Nigeria and across the continent.",
      strongStoryTitle: "What makes a strong Afroangle story?",
      strongStoryBody:
        "Fresh perspectives, rigorous research, and narratives that reveal Africa's complexity beyond stereotypes. Whether you're analyzing historical events, covering breaking news, or exploring emerging voices in arts and entertainment, we want the stories mainstream media overlooks and the commentary they won't publish on the stories they do cover.",
      readyToPitch: "Ready to submit? ",
    };

    return en;
  }, [locale]);

  return (
    <main className="scroll-smooth">
      <section className="w-full max-w-screen-xl mx-auto lg:pt-16 pt-6 lg:pr-10 lg:pl-16 px-4">
        <header className="max-w-5xl">
          <h1 className="lg:text-4xl text-2xl uppercase text-primary-red tracking-wider mb-4">
            {copy.pageTitle}
          </h1>

          <p className="lg:text-xl font-secondary mb-6">{copy.aboutTagline}</p>

          <div className="border-l-4 border-primary-red/70 pl-4 py-2 mb-10">
            <p className="text-lg lg:text-xl font-medium">
              {copy.aboutHeading}
            </p>
          </div>
        </header>

        <div className="space-y-4 lg:space-y-8 max-w-6xl">
          {/* LEFT — ABOUT */}
          <div className="">
            <div className="rounded-md border border-neutral-200 bg-white p-6 lg:p-8 space-y-5">
              <h2 className="text-xl lg:text-2xl font-semibold">
                About Afroangle
              </h2>

              <p className="text-base lg:text-lg font-secondary leading-relaxed">
                {copy.aboutBody}
              </p>
            </div>
          </div>

          {/* RIGHT — SUBMISSIONS */}
          <div id="submit-piece" className="scroll-mt-16">
            <div className="rounded-md border border-neutral-200 bg-white p-6 lg:p-8 space-y-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  {copy.submitTitle}
                </h2>

                <p className="text-base lg:text-lg font-secondary leading-relaxed">
                  {copy.submitIntro}
                </p>
              </div>

              <div className="rounded-md bg-neutral-50 border border-neutral-200 p-5">
                <h3 className="text-lg font-semibold mb-2">
                  {copy.strongStoryTitle}
                </h3>
                <p className="text-base font-secondary leading-relaxed">
                  {copy.strongStoryBody}
                </p>
              </div>

              <div className="text-base lg:text-lg font-secondary">
                {copy.readyToPitch}
                <OpinionSubmissionModal
                  trigger={
                    <span className="text-primary-green underline">
                      Click here
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPageContent;
