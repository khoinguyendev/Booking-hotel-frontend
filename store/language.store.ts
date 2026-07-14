import { create } from "zustand";

interface LanguageStore{

    language:"vi"|"en";

    setLanguage:(language:"vi"|"en")=>void;

}

export const useLanguageStore=create<LanguageStore>((set)=>({

language:"vi",

setLanguage:(language)=>set({language})

}));