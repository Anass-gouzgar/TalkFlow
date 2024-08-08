import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => (
  <span
    className="cursor-pointer rounded-full space-x-1 pl-2
   bg-[#000000] flex items-center flex-row"
  >
    <IconLanguage className="text-gray-400" size={20} />
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="bg-[#000000] flex flex-row rounded-full py-1
       text-gray-400 outline-none "
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  </span>
);

export default LanguageSelector;
