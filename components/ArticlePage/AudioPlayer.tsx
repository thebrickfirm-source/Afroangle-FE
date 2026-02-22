// components/AudioPlayer.tsx

type Dict = {
  articles: {
    audio: {
      listen: string;
      noAudio: string;
      notSupported: string;
    };
  };
};

interface AudioPlayerProps {
  src: string;
  dict: Dict;
}

export default function AudioPlayer({ src, dict }: AudioPlayerProps) {
  const { audio } = dict.articles;

  if (!src)
    return (
      <div className="py-4 w-full mx-auto">
        <span className="text-black/70 text-sm text-center">
          {audio.noAudio}
        </span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto lg:px-8 py-6">
      <h3 className="text-sm text-center uppercase mb-2">{audio.listen}</h3>
      <audio
        controls
        preload="auto"
        className="w-full h-12"
        controlsList="nodownload"
      >
        <source src={src} type="audio/mpeg" />
        {audio.notSupported}
      </audio>
    </div>
  );
}
