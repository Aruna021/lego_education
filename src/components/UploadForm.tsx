import React, { useState, useRef } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Sparkles, Loader2, Image as ImageIcon } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function UploadForm() {
  const { addCreation } = useApp();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setErrorMessage("");

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Ой! Пожалуйста, выберите корректный файл изображения (JPG, PNG или WebP).");
      return;
    }

    // Validate size (~8MB)
    const maxSize = 8 * 1024 * 1024; // 8MB
    if (file.size > maxSize) {
      setErrorMessage("Ого! Этот файл превышает 8 МБ. Пожалуйста, сожмите изображение.");
      return;
    }

    setImageFile(file);

    // Create Base64 Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemovePreview = () => {
    setImageFile(null);
    setImagePreview("");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!imagePreview) {
      setErrorMessage("Обязательно добавьте фотографию вашей поделки LEGO!");
      return;
    }
    if (!title.trim()) {
      setErrorMessage("Придумайте название для вашей поделки!");
      return;
    }

    // Simulate Server Latency for visual polish
    setIsUploading(true);
    setTimeout(() => {
      addCreation(title.trim(), caption.trim(), displayName.trim(), imagePreview);
      
      // Reset State
      setTitle("");
      setCaption("");
      setDisplayName("");
      setImageFile(null);
      setImagePreview("");
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-6" id="upload-form-widget">
      
      {/* Intro Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-lego-blue text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 fill-lego-yellow text-lego-yellow" />
          <span>Анонимная публикация поделок</span>
        </div>
        <h3 className="font-display font-black text-xl text-slate-800 tracking-tight">
          Поделитесь шедевром класса!
        </h3>
        <p className="text-gray-500 text-xs">
          Вход не требуется! Просто перетащите фотографию вашей робототехнической поделки или классной модели, чтобы опубликовать её в нашей глобальной галерее.
        </p>
      </div>

      <form onSubmit={handleUploadSubmit} className="space-y-5">
        
        {/* Error Alert Bar */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 font-medium">
            <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Drag & Drop File Zone */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
            Фотография поделки <span className="text-lego-red">*</span>
          </label>
          
          {!imagePreview ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 relative group overflow-hidden ${
                isDragActive
                  ? "border-lego-blue bg-lego-blue/5"
                  : "border-gray-200 hover:border-lego-blue hover:bg-slate-50"
              }`}
              id="drag-and-drop-zone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="File Upload Input"
              />
              
              <div className="p-3 bg-slate-100 group-hover:bg-lego-blue/15 text-slate-500 group-hover:text-lego-blue rounded-full transition-all">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-700">
                  Перетащите фотографию сюда
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  или <span className="text-lego-blue hover:underline font-bold">выберите из папки</span> (JPG, PNG, WebP до 8 МБ)
                </p>
              </div>

              {/* Little stud grid details in the background for lego feel */}
              <div className="absolute top-2 left-2 flex gap-1 opacity-20">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              </div>
              <div className="absolute bottom-2 right-2 flex gap-1 opacity-20">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-slate-50 group flex flex-col justify-center items-center p-4">
              {/* Photo preview block */}
              <img
                src={imagePreview}
                alt="Upload preview"
                className="max-h-64 object-contain rounded-xl shadow-xs"
              />
              
              {/* Overrides */}
              <button
                type="button"
                onClick={handleRemovePreview}
                className="absolute top-6 right-6 bg-slate-900/85 hover:bg-lego-red text-white p-2 rounded-full shadow-md transition-all scale-95 hover:scale-105 active:scale-95"
                title="Удалить"
                aria-label="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>Фотография успешно выбрана</span>
              </div>
            </div>
          )}
        </div>

        {/* Input: Creation Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
            Название поделки <span className="text-lego-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="например: Умный конвейер, Сафари DUPLO..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-lego-blue outline-none transition-all"
            id="creation-title-input"
          />
        </div>

        {/* Input: Display name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
            Имя создателя для отображения
          </label>
          <input
            type="text"
            placeholder="например: Лиам и Данила (4 класс), Робо-клуб"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={isUploading}
            className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-lego-blue outline-none transition-all"
            id="creation-name-input"
          />
        </div>

        {/* Input: Caption / Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
            История вашей поделки
          </label>
          <textarea
            rows={4}
            placeholder="Какие кубики вы использовали? Какой код или датчики работают? Поделитесь опытом вашего класса!"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={isUploading}
            className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-lego-blue outline-none transition-all resize-none"
            id="creation-caption-input"
          />
        </div>

        {/* Submit action CTA */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-lego-blue hover:bg-lego-blue-dark disabled:bg-slate-300 text-white font-display font-black py-4 rounded-full shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Публикация в облако...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              <span>Опубликовать поделку в галерее</span>
            </>
          )}
        </button>

      </form>

    </div>
  );
}
