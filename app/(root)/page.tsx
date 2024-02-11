import NewsCard from "@/components/common/NewsCard";
import { Button } from "@/components/ui/button";
import Banner from "./Banner";
import TrendingCard from "@/components/common/TrendingCard";
import EventCard from "@/components/common/EventCard";
import { getAllEvents } from "@/lib/database/actions/event.action";
import { IEvent } from "@/lib/types/event";
import BaseButton from "@/components/common/BaseButton";
import Link from "next/link";

export default async function Home() {

  const events: IEvent[] | null = await getAllEvents({ limit: 5 });

  return <div className="bg-[#121212]">
    <Banner />

    <div className="relative left-1/2 -translate-x-1/2 md:p-8 p-14 flex flex-col items-center justify-center bg-[#121212]">
      <h1 className="text-6xl font-extrabold text-center uppercase my-10 text-white">
        Newest <span className="text-purple-600">Events</span>
      </h1>
      {/* <div className="xl:w-3/5 lg:w-4/5 grid lg:p-6 lg:grid-cols-3 md:grid-cols-2 w-full gap-4 sm:w-2/3">
        {events?.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div> */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 ">
        {events?.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      <div className="text-center py-12">
        <Link href="/events">
          <BaseButton>
            View more
          </BaseButton>
        </Link>
      </div>
    </div>

    {/* Trending */}
    <div className="p-8 h-fit">
      <h1 className="text-6xl font-extrabold text-center uppercase my-10 text-white">
        Trending <span className="text-purple-600">Artists</span>
      </h1>
      <div className="grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 min-h-full place-items-center">
        <TrendingCard name="loonie" imageUrl="/assets/images/trending/loonie.jpg" />
        <TrendingCard name="Mayonnaise" imageUrl="/assets/images/trending/mayonnaise.jpg" />
        <TrendingCard name="dilaw" imageUrl="/assets/images/trending/dilaw.jpg" />
        <TrendingCard name="toneejay" imageUrl="/assets/images/trending/toneejay.jpg" />
        <TrendingCard name="lola amour" imageUrl="/assets/images/trending/lola-amour.jpg" />
        <TrendingCard name="sunkissed lola" imageUrl="/assets/images/trending/sunkissed-lola.jpg" />
      </div>
    </div>

    {/* News */}
    <div className="p-8 min-h-screen">
      <h1 className="text-6xl font-extrabold text-center uppercase my-10 text-white">
        Latest <span className="text-purple-600">News</span>
      </h1>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 place-items-center">
        <NewsCard imageUrl="/assets/images/glena-3.jpg" headline="Glena Band had a wonderful concert on Tuesday!" author={{
          name: "Glena",
          imageUrl: "/assets/logos/glena-logo.jpg"
        }} />
        <NewsCard imageUrl="/assets/images/loonie.jpg" headline="Loonie returned to music scene with his album 'Meron Na'" author={{
          name: "Loonie",
          imageUrl: "/assets/logos/loonie-logo.jpg"
        }} />
        <NewsCard imageUrl="/assets/images/mayonnaise jopay.jpg" headline="Band's 20th anniversary tour finale, held last May at the Q.C." author={{
          name: "Mayonnaise",
          imageUrl: "/assets/logos/mayonnaise-logo.jpg"
        }} />
        <NewsCard imageUrl="/assets/images/i-belong-to-the-zoo.jpg" headline="I Belong To The Zoo opened 'It's Showtime' on Monday" author={{
          name: "I belong to the Zoo",
          imageUrl: "/assets/logos/i-belong-to-the-zoo-logo.jpg"
        }} />
        <NewsCard imageUrl="/assets/images/glena-3.jpg" headline="Glena Band had a wonderful concert on Tuesday!" author={{
          name: "Glena",
          imageUrl: "/assets/logos/glena-logo.jpg"
        }} />
      </div>
      <div className="text-center py-12">
        <BaseButton>
          View All
        </BaseButton>
      </div>
    </div>
  </div>
}
