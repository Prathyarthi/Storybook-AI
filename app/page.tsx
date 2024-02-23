import ExploreStories from "@/components/ExploreStories";
import Header from "@/components/Header";
import StoryWriter from "@/components/StoryWriter";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          <div>
            <ExploreStories />
          </div>
          <StoryWriter />
        </section>
      </main>
    </>
  );
}
