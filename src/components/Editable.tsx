import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { useContent } from '@/src/contexts/ContentContext';

interface EditableProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  multiline?: boolean;
}

export function Editable({ id, className, children, as: Tag = 'span', multiline = false }: EditableProps) {
  const { isEditing, content, updateContent } = useContent();
  const [localValue, setLocalValue] = React.useState<string>('');

  // Find the content for this ID
  const value = content[id] || (typeof children === 'string' ? children : '');

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newValue = e.currentTarget.innerText;
    if (newValue !== value) {
      updateContent(id, newValue);
    }
  };

  if (!isEditing) {
    return <Tag className={className}>{value || children}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={cn(
        className,
        'outline-none focus:ring-2 focus:ring-primary/50 transition-all rounded-sm px-1 -mx-1',
        'hover:bg-primary/5 cursor-text'
      )}
    >
      {localValue}
    </Tag>
  );
}

interface EditableImageProps {
  id: string;
  className?: string;
  src: string;
  alt: string;
}

export function EditableImage({ id, className, src, alt }: EditableImageProps) {
  const { isEditing, content, updateContent } = useContent();
  const value = content[id] || src;

  const handleClick = () => {
    if (!isEditing) return;
    const newSrc = window.prompt('Enter image URL:', value);
    if (newSrc && newSrc !== value) {
      updateContent(id, newSrc);
    }
  };

  return (
    <div className="relative group">
      <img
        src={value}
        alt={alt}
        className={cn(className, isEditing && 'cursor-pointer hover:opacity-80 transition-opacity')}
        onClick={handleClick}
        referrerPolicy="no-referrer"
      />
      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          <div className="bg-primary text-on-primary px-3 py-1 text-xs font-bold rounded-full shadow-lg">
            Click to Change Image
          </div>
        </div>
      )}
    </div>
  );
}
