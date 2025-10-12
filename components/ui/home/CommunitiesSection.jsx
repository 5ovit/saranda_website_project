import Image from "next/image"
import { twJoin } from "tailwind-merge";
import { getAllCommunities } from "@/lib/cmsdata";
import CTAButton from "../CTAButton";


export default async function CommunitiesSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const communities_section_id = "communities_section_id"
  const communities = await getAllCommunities({imgDimensions: false});

  return <>
    <section
      id={communities_section_id}
      className={twJoin(
        "flex justify-center items-center p-1 min-h-[100vh]",
        className
      )}
      {...props}
    >
      <div
        className={twJoin(
          `green-glass-container w-full lg:w-8/10 max-md:min-h-full
          min-h-[80vh] py-[4rem] px-[2rem]`,
          innerClassName
        )}
        {...innerProps}
      >
        <h2 className="text-center self-center mb-[2rem]">
          Our Communities
        </h2>
        <div className="
          mx-auto w-full max-w-[120ch]
        ">
          {communities.map((card, index) => <CommunityCard
            card={card}
            key={index}
          />)}
        </div>
      </div>
    </section>
  </>
}


function CommunityCard({
  card,
  className = "",
  ...props
}) {
  return <div
    className={twJoin(
      `grid sm:grid-cols-[min(100%,18rem)_auto] p-[2rem] gap-[1rem] border-2
      rounded-2xl border-neutral-light hover:border-secondary mb-[4rem]
      hover:shadow-[0_0_.5rem_.2rem] hover:inset-shadow-[0_0_.5rem_.2rem]
      shadow-white/10 inset-shadow-white/10`,
      className
    )}
    {...props}
  >
    <div className="relative w-full aspect-square rounded-xl overflow-clip">
      <Image
        {...card.img}
        alt="Community Poster"
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
      />
    </div>
    <div>
      <h3>{card.title}</h3>
      <p className="mt-[0.5ch] mb-[2ch]">
        {card.description}
      </p>
      <CTAButton href={`/community/${card.slug}`}>Community Page</CTAButton>
    </div>
  </div>
}