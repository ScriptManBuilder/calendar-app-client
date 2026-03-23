import { useState, useRef, useEffect } from 'react';
import type { Task } from '../../types';
import {
  TaskFormWrapper,
  TaskInput,
  LabelPicker,
  LabelOption,
  FormActions,
  FormButton,
} from '../../assets/styles/task.styles';

const LABEL_COLORS = [
  '#61bd4f',
  '#f2d600',
  '#ff9f1a',
  '#eb5a46',
  '#c377e0',
  '#0079bf',
];

interface TaskFormProps {
  task?: Task;
  onSubmit: (title: string, labels: string[]) => void;
  onCancel: () => void;
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title ?? '');
  const [labels, setLabels] = useState<string[]>(task?.labels ?? []);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleLabel = (color: string) => {
    setLabels((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed, labels);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') onCancel();
  };

  return (
    <TaskFormWrapper onClick={(e) => e.stopPropagation()}>
      <TaskInput
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter task title…"
      />
      <LabelPicker>
        {LABEL_COLORS.map((color) => (
          <LabelOption
            key={color}
            $color={color}
            $selected={labels.includes(color)}
            onClick={() => toggleLabel(color)}
            aria-label={`Toggle ${color} label`}
          />
        ))}
      </LabelPicker>
      <FormActions>
        <FormButton $variant="primary" onClick={handleSubmit}>
          {task ? 'Save' : 'Add'}
        </FormButton>
        <FormButton $variant="secondary" onClick={onCancel}>
          Cancel
        </FormButton>
      </FormActions>
    </TaskFormWrapper>
  );
};
