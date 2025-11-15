import { useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export default function FileUpload({ files, setFiles }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center cursor-pointer hover:border-purple-300 hover:bg-purple-50/30 transition-all group"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
            <Upload className="w-7 h-7 text-purple-600" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-slate-700 mb-1">Click to upload files</p>
            <p className="text-sm text-slate-400">PDF, DOC, DOCX, PNG, JPG up to 10MB</p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2.5">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
