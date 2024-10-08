"use client";
import "regenerator-runtime/runtime";
import TextArea from "../components/inputs/TextArea";
import { ChangeEvent, useState } from "react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import LanguageSelector from '@/components/inputs/LanguageSelector' 
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/categoryLinks";

import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import { rtfToText } from "@/utils/rtfToText";
import LinkPast from "@/components/inputs/LinkPaste";
import FileUpload from "@/components/inputs/FileUpload";
import useTranslate from "@/hooks/useTranslate";
export default function Home() {
  //  states
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");
  const [languages] = useState<string[]>([
    "English",
    "Arabic",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ]);
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayBack = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
          {" "}
        </div>

        <div className="relative overflow-hidden h-scren">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center ">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
                Talk<span className="text-[#f87315]">Flow</span>
              </h1>
              <p className="mt-3 text-neutral-400">
                TalkFlow: Bridging Voices, Connecting worlds
              </p>
              {/*  text area */}
              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 p-2 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20 overflow-hidden">
                    <TextArea
                      id={"source-language"}
                      value={sourceText}
                      placeholder="Source Language"
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setSourceText(e.target.value)
                        
                      }
                    />
                    <div className="flex flex-row justify-between w-full bg-neutral-900">
                      <span className="cursor-pointer flex space-x-2 flex-row text-gray-400">
                        <SpeechRecognitionComponent
                          setSourceText={setSourceText}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayBack(sourceText)}
                        />
                        {/* file upload component */}
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPast handleLinkPaste={handleLinkPaste} />
                      </span>

                      <span className="text-sm pr-4 text-gray-400">
                        {sourceText.length} / 2000
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20 overflow-hidden">
                    <TextArea
                      id={"target-language"}
                      value={targetText}
                      onChange={() => {}}
                      placeholder={"Target Language"}
                    />
                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer flex space-x-2 items-center flex-row ">
                        <LanguageSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume
                          className="text-gray-400"
                          size={22}
                          onClick={() => handleAudioPlayBack(targetText)}
                        />
                      </span>
                      <div className="text-gray-500 flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && (
                          <span className="text-xs text-green-500">
                            Copied!
                          </span>
                        )}
                        <IconThumbUp size={22} />
                        <IconThumbDown size={22} />
                        <IconStar
                          size={22}
                          onClick={handleFavorite}
                          className={favorite ? "text-yellow-500" : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <SvgDecorations />
              </div>
              <CategoryLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
