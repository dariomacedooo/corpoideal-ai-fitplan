import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
const LOCAL_STORAGE_KEY = "profileAvatarUrl";
export function ProfileAvatarUpload({
  name = "U"
}: {
  name?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    const url = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (url) setPreviewUrl(url);
  }, []);
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
        localStorage.setItem(LOCAL_STORAGE_KEY, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image/")) return;
    handleFile(file);
  };
  const onClick = () => fileInputRef.current?.click();
  return <div className="flex flex-col items-center gap-2">
      <div className="relative group">
        <Avatar className="h-20 w-20 border-4 border-cyan-400 shadow-lg transition-all">
          {previewUrl ? <AvatarImage src={previewUrl} alt={name} /> : <AvatarFallback className="text-orange-400">{name.charAt(0).toUpperCase()}</AvatarFallback>}
        </Avatar>
        <button type="button" aria-label="Alterar foto de perfil" className="absolute bottom-0 right-0 bg-cyan-400 cursor-pointer rounded-full p-2 transition hover:bg-cyan-500 shadow group-hover:scale-110" onClick={onClick}>
          <Camera className="h-4 w-4 text-black" />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
      <span className="text-xs text-white/80">Foto de perfil</span>
    </div>;
}