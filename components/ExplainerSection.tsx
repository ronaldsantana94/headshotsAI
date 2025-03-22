import blur from "/public/blur.png";
import example from "/public/example.png";
import result from "/public/result.png";

export default function ExplainerSection() {
  return (
    <div className="w-full max-w-6xl mt-16 p-8 rounded-xl bg-muted/60 backdrop-blur-md shadow-md space-y-12 border border-border">
      <h2 className="text-4xl font-extrabold text-center text-foreground mb-8 tracking-tight">
        How It Works
      </h2>

      {/* Step 1 */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-xl font-bold text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-full w-10 h-10 flex items-center justify-center shadow-inner">
            1
          </div>
          <h3 className="text-2xl font-semibold text-foreground dark:text-zinc-100">
            Upload your images
          </h3>
        </div>
        <p className="text-base text-muted-foreground text-center">
          Upload 4+ high-quality selfies: front-facing, 1 person in frame, no
          glasses or hats.
        </p>
        <img
          src={example.src}
          alt="Upload example"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto border border-zinc-800"
        />
      </div>

      {/* Step 2 */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-xl font-bold text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-full w-10 h-10 flex items-center justify-center shadow-inner">
            2
          </div>
          <h3 className="text-2xl font-semibold text-foreground dark:text-zinc-100">
            Our AI gets to work
          </h3>
        </div>
        <p className="text-base text-muted-foreground text-center">
          The AI magic takes ~20 minutes. You'll get an email when it's ready!
        </p>
        <img
          src={blur.src}
          alt="AI processing"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto border border-zinc-800"
        />
      </div>

      {/* Step 3 */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-xl font-bold text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-full w-10 h-10 flex items-center justify-center shadow-inner">
            3
          </div>
          <h3 className="text-2xl font-semibold text-foreground dark:text-zinc-100">
            Get amazing headshots
          </h3>
        </div>
        <p className="text-base text-muted-foreground text-center">
          Once your model is trained, we’ll generate stunning headshots just for you.
        </p>
        <img
          src={result.src}
          alt="Final result"
          className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 mx-auto border border-zinc-800"
        />
      </div>
    </div>
  );
}