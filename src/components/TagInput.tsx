import { useState, KeyboardEvent } from 'react';
import { Input } from './ui/input';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder: string;
  maxTags?: number;
}

export default function TagInput({ tags, setTags, placeholder, maxTags = 10 }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput) && tags.length < maxTags) {
      setTags([...tags, trimmedInput]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2.5 min-h-[40px]">
        {tags.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-100/80 to-blue-100/80 text-purple-700 border border-purple-200/50"
          >
            <span className="text-sm">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-purple-200/50 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={placeholder}
          className="rounded-xl border-slate-200 h-12"
          disabled={tags.length >= maxTags}
        />
        <p className="text-xs text-slate-400">
          {tags.length}/{maxTags} tags • Press Enter or comma to add
        </p>
      </div>
    </div>
  );
}
