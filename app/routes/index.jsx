import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { useState } from "react";

import { useOptionalUser } from "~/utils";
import { getDaoPassages, getPunctuation } from "../models/dao.server";

export async function loader({ request }) {
  const passages = getDaoPassages();
  const punctuation = getPunctuation();
  return json({ passages, punctuation });
}

export default function Index() {
  const { passages, punctuation } = useLoaderData();
  const { hi, lo } = {
    lo: 0,
    hi: passages.length,
  };
  console.log(lo, hi, hi);
  return (
    <>
      <nav></nav>
      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 py-8">
            {passages.slice(lo, hi).map(({ passage, index }) => {
              return (
                <div key={index} className="py-2 text-2xl">
                  <h1>{index + 1}</h1>
                  <Passage
                    passage={passage}
                    punctuation={punctuation}
                    prefix={index}
                  />
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-16 max-w-7xl text-center"></div>
          <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8"></div>
        </div>
      </main>
    </>
  );
}

function Passage({ passage, punctuation, prefix }) {
  const characters = passage.split("");
  const charactersFinal = [];
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    if (punctuation.includes(char)) {
      charactersFinal.push(char);
    } else {
      const id = `passage-${prefix}-${i}`;

      if (char.trim() === "") {
        continue;
      }
      charactersFinal.push(<Char char={char} id={id} key={id} />);
    }
  }

  return <div>{charactersFinal}</div>;
}

function Char({ char, id }) {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    console.log("entering", char);
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
    console.log("leaving", char);
  };

  return (
    <span
      key={id}
      className="hover:text-green-500 selection:text-white selection:bg-green-500 relative"
      id={id}
      data-charid={id}
      data-chartype="ideogram"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {char}
      {isHovered && (
        <span className="absolute bottom-7 p-4 bg-white z-10 border-gray-100 border rounded-md text-black">
          Definition for {char}
        </span>
      )}
    </span>
  );
}
