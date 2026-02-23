"use client";

import OpinionSubmissionModal from "../common/SubmitOpinionPiece";

type Dict = {
  about: {
    pageTitle: string;
    heading: string;
    body: string;
    submission: {
      title: string;
      intro: string;
      strongStoryTitle: string;
      strongStoryBody: string;
      readyToPitch: string;
    };
  };
  common: {
    buttons: {
      close: string;
      sendToEditors: string;
      clickHere: string;
    };
    seo: {
      about: {
        title: string;
      };
    };
    forms: {
      name: string;
      email: string;
      placeholders: {
        name: string;
        email: string;
      };
    };
    errors: {
      required: string;
      invalidEmail: string;
      submissionFailed: string;
      fileInvalid: string;
      fileTooLarge: string;
    };
  };
  footer: {
    links: {
      submitOpinion: string;
    };
  };
  opinionSubmission: {
    modal: {
      form: {
        title: string;
        description: string;
        fileHint: string;
      };
      success: {
        title: string;
        description: string;
      };
    };
  };
};

interface AboutPageProps {
  dict: Dict;
}

const AboutPageContent = ({ dict }: AboutPageProps) => {
  const { about, common } = dict;

  return (
    <main className="scroll-smooth">
      <section className="w-full max-w-screen-xl mx-auto lg:pt-16 pt-6 lg:pr-10 lg:pl-16 px-4">
        <header className="max-w-5xl">
          <h1 className="lg:text-4xl text-2xl uppercase text-primary-red tracking-wider mb-4">
            {about.pageTitle}
          </h1>

          <p className="lg:text-xl font-secondary mb-6">{about.body}</p>

          <div className="border-l-4 border-primary-red/70 pl-4 py-2 mb-10">
            <p className="text-lg lg:text-xl font-medium">{about.heading}</p>
          </div>
        </header>

        <div className="space-y-4 lg:space-y-8 max-w-6xl">
          {/* LEFT — ABOUT */}
          <div>
            <div className="rounded-md border border-neutral-200 bg-white p-6 lg:p-8 space-y-5">
              <h2 className="text-xl lg:text-2xl font-semibold">
                {common.seo.about.title}
              </h2>

              <p className="text-base lg:text-lg font-secondary leading-relaxed">
                {about.body}
              </p>
            </div>
          </div>

          {/* RIGHT — SUBMISSIONS */}
          <div id="submit-piece" className="scroll-mt-16">
            <div className="rounded-md border border-neutral-200 bg-white p-6 lg:p-8 space-y-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  {about.submission.title}
                </h2>

                <p className="text-base lg:text-lg font-secondary leading-relaxed">
                  {about.submission.intro}
                </p>
              </div>

              <div className="rounded-md bg-neutral-50 border border-neutral-200 p-5">
                <h3 className="text-lg font-semibold mb-2">
                  {about.submission.strongStoryTitle}
                </h3>
                <p className="text-base font-secondary leading-relaxed">
                  {about.submission.strongStoryBody}
                </p>
              </div>

              <div className="text-base lg:text-lg font-secondary">
                {about.submission.readyToPitch}
                <OpinionSubmissionModal
                  trigger={
                    <span className="text-primary-green underline">
                      {common.buttons.clickHere}
                    </span>
                  }
                  dict={dict}
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
