import { Button } from "@sanity/ui";
import { DownloadIcon } from "@sanity/icons";
import { useFormValue } from "sanity";

export const FileDownload = (props: any) => {
  // Get the file structure from the document
  const fileUpload = useFormValue(["fileUpload"]) as any;

  // Only render if a file actually exists
  if (!fileUpload?.asset?._ref) {
    return <em>No file uploaded yet.</em>;
  }

  // Convert Sanity asset reference to a direct download URL
  // Format: file-assetId-extension
  const ref = fileUpload.asset._ref;
  const [_file, id, extension] = ref.split("-");
  const downloadUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;

  return (
    <Button
      as="a"
      href={`${downloadUrl}?dl=`} // ?dl= forces a download in most browsers
      target="_blank"
      rel="noopener noreferrer"
      text="Download Submission"
      icon={DownloadIcon}
      tone="primary"
      mode="ghost"
      fontSize={1}
      padding={3}
      style={{ width: "100%" }}
    />
  );
};
