// sanity/actions/TranslateAction.ts
import { useState } from "react";
import { EarthGlobeIcon } from "@sanity/icons";

export function TranslateAction(props: any) {
  const { id, draft, published } = props;
  const [isTranslating, setIsTranslating] = useState(false);
  const doc = draft || published;

  // Only show this button on English documents
  if (doc?.language !== "en") {
    return null;
  }

  return {
    label: isTranslating
      ? "Translating to FR..."
      : "Translate to French (DeepL)",
    icon: EarthGlobeIcon,
    onHandle: async () => {
      setIsTranslating(true);
      try {
        // Point this to your Next.js API URL
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: id, targetLang: "fr" }),
        });

        if (response.ok) {
          alert(
            "Translation successful! You can now switch to the French version.",
          );
        } else {
          alert("Translation failed. Check console for details.");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred during translation.");
      } finally {
        setIsTranslating(false);
      }
    },
  };
}
