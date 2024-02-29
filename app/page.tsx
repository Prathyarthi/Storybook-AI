import ExploreStories from "@/components/ExploreStories";
import Header from "@/components/Header";
import StoryWriter from "@/components/StoryWriter";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <section className="">
          <StoryWriter />
        </section>
      </main>
      <div className="m-8">
        <ExploreStories />
      </div>
    </>
  );
}
