import Image from "next/image";
import { profile } from "@/content/site";
import { stagger } from "@/lib/motion";
import { TiltAvatar } from "./TiltAvatar";
import { TypeLoop } from "./TypeLoop";

const rise = "animate-rise stagger";

export function ProfileCard() {
  const { name, handle, avatar, role, tagline, location, skills } = profile;

  return (
    <section aria-labelledby="profile-name" className="relative flex flex-col items-center">
      {/* Avatar sits in the notch, overlapping the panel by half its height */}
      <div className="relative z-10 animate-pop">
        <TiltAvatar src={avatar.src} alt={avatar.alt} />
      </div>

      <div
        className={`mask-notch -mt-25 w-full rounded-panel bg-linear-to-b from-panel-light to-panel-dark pt-34.5 pb-10 ${rise}`}
        style={stagger(1)}
      >
        <hgroup
          className={`flex flex-col items-center gap-stack text-center tracking-title ${rise}`}
          style={stagger(3)}
        >
          <h1 id="profile-name" className="font-display text-title text-shimmer">
            {name}
          </h1>
          <p className="text-handle text-ink-muted">{handle}</p>
        </hgroup>

        <ul className="mx-auto mt-section flex w-fit flex-col gap-stack text-body tracking-meta">
          <li className={`flex items-center gap-1.5 ${rise}`} style={stagger(4)}>
            <span aria-hidden="true" className="inline-block animate-bob">
              {role.emoji}
            </span>
            {role.text}
          </li>
          <li className={`flex items-center gap-1.5 ${rise}`} style={stagger(5)}>
            <span aria-hidden="true" className="inline-block animate-flicker">
              {tagline.emoji}
            </span>
            <TypeLoop phrases={tagline.phrases} />
          </li>
        </ul>

        <p
          className={`mt-section flex items-center justify-center gap-0.75 text-caption tracking-meta ${rise}`}
          style={stagger(6)}
        >
          {/* Map-style "ping" behind the pin */}
          <span className="relative flex size-5.5 items-center justify-center">
            <span className="absolute top-1 size-3 animate-ping rounded-full bg-white/30" />
            <Image src="/icons/ui/map-pin.svg" alt="" width={22} height={22} className="relative" />
          </span>
          <span className="sr-only">Location: </span>
          {location}
        </p>

        {/* Endless skills strip: the list is rendered twice and slides by
            half its width, so the loop is seamless. */}
        <div className={`mt-section overflow-hidden fade-edges ${rise}`} style={stagger(7)}>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-label={copy ? undefined : "Skills"}
                aria-hidden={copy ? true : undefined}
                className="flex shrink-0 gap-2 pr-2"
              >
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-chip border border-line bg-surface px-2.5 py-1 text-caption tracking-meta text-ink-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
