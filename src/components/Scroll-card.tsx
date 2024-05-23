"use client";
import React from "react";
import { StickyScroll } from '../components/aceternityUI/sticky-scroll-reval'
import Image from "next/image";

const content = [
  {
    title: "Recording and Playback",
    description:
      " Recording allows you to capture important moments during a call. Later, you can play back the recording to review content, take notes, or share with others. It’s like having a digital memory of your meeting.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/videoBannerImage.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "High-Quality Video Calls",
    description:
      "High-quality video calls ensure clear communication. Participants can see and hear each other without distractions. It’s like having a face-to-face conversation through your screen.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
      <Image
        src="/images/card-2.jpg"
        width={300}
        height={300}
        className="h-full w-full object-cover"
        alt="linear board demo"
      />
    </div>
    ),
  },
  {
    title: "ScreenShare and Chat,Emoji Reactions",
    description:
      "creensharing lets you show your computer screen to others in the call. It’s useful for presentations, demos, or troubleshooting.Chat lets you send text messages during a call. Use it for quick notes, links, or questions. Emoji reactions allow you to express emotions without typing—like giving a thumbs-up or laughing.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
      <Image
        src="/images/chat.webp"
        width={300}
        height={300}
        className="h-full w-full object-cover"
        alt="linear board demo"
      />
    </div>
    ),
  },
  {
    title: "Latency statistics",
    description:
      "The call latency graph visualizes these delays, helping you understand how responsive your communication is.Quality metrics could include video resolution, audio clarity, and overall user satisfaction.The call latency graph visualizes these delays, helping you understand how responsive your communication is  Lower latency leads to smoother, more responsive calls, ensuring effective communication! 📊📞🌐",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
      <Image
        src="/images/videosdk.avif"
        width={300}
        height={300}
        className="h-full w-full object-cover"
        alt="linear board demo"
      />
    </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
