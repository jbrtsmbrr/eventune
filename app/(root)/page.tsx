import NewsCard from "@/components/common/NewsCard";
import { Button } from "@/components/ui/button";
import Banner from "./Banner";
import TrendingCard from "@/components/common/TrendingCard";

export default function Home() {
  return <div>
    <Banner />

    <div className="p-8 h-fit">
      <h1 className="text-6xl font-extrabold text-center uppercase my-10">
        Trending <span className="text-purple-600">Artists</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 min-h-full place-items-center">
        <TrendingCard name="loonie" imageUrl="/assets/images/trending/loonie.jpg" />
        <TrendingCard name="Mayonnaise" imageUrl="/assets/images/trending/mayonnaise.jpg" />
        <TrendingCard name="dilaw" imageUrl="/assets/images/trending/dilaw.jpg" />
        <TrendingCard name="toneejay" imageUrl="/assets/images/trending/toneejay.jpg" />
        <TrendingCard name="lola amour" imageUrl="/assets/images/trending/lola-amour.jpg" />
        <TrendingCard name="sunkissed lola" imageUrl="/assets/images/trending/sunkissed-lola.jpg" />
      </div>
    </div>
    <div className="p-8 h-screen">
      <h1 className="text-6xl font-extrabold text-center uppercase my-10">
        Latest <span className="text-purple-600">events</span>
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
        <Button className="hover:bg-black hover:bg-opacity-10 text-black text-opacity-50 hover:text-opacity-100 bg-transparent rounded-none border-2 hover:border-gray-800 border-gray-400 uppercase p-6 px-12 tracking-wide transition-all duration-500 ease-in-out">View all</Button>
      </div>
    </div>
  </div>
}
