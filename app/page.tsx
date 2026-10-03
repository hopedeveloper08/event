import Title from "@/components/Home/Title";
import SubTitle from "@/components/Home/SubTitle";
import ExploreButton from "@/components/Home/ExploreButton";

export default function Home() {
  return (
    <main className="container flex-center">
      <section className="flex flex-col">
        <Title />
        <SubTitle />
        <ExploreButton />
      </section>
    </main>
  );
}
