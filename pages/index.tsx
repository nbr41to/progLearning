import type { NextPage } from "next";
import { Button } from "../src/components/Button";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-2xl text-teal-400">Next.js TailWindCSS Template</h1>
      <Button label="Button" onClick={() => {}}></Button>
    </div>
  );
};

export default Home;
