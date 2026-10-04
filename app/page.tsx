import Title from "@/components/Home/Title";
import SubTitle from "@/components/Home/SubTitle";
import ExploreButton from "@/components/Home/ExploreButton";
import Events from "@/components/Home/Events";

export default function Home() {
  return (
    <main>
      <section className="container flex-center flex-col">
        <Title />
        <SubTitle />
        <ExploreButton />
      </section>
      <section className="mt-8 md:mt-16">
        <Events />
      </section>
    </main>
  );
}
