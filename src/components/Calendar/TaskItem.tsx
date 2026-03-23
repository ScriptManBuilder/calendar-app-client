import React from 'react';
import type { Task } from '../../types';
import {
  TaskCard,
  LabelsRow,
  LabelBadge,
  TaskTitle,
  TaskActions,
  TaskActionBtn,
} from '../../assets/styles/task.styles';

interface TaskItemProps {
  task: Task;
  index: number;
  isDragging: boolean;
  onDelete: (taskId: string) => void;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  onDragOverItem: (e: React.DragEvent, index: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem = ({
  task,
  index,
  isDragging,
  onDelete,
  onDragStart,
  onDragEnd,
  onDragOverItem,
  onEdit,
}: TaskItemProps) => (
  <TaskCard
    $isDragging={isDragging}
    draggable
    onDragStart={(e) => {
      e.dataTransfer.effectAllowed = 'move';
      onDragStart(task);
    }}
    onDragEnd={onDragEnd}
    onDragOver={(e) => onDragOverItem(e, index)}
    onClick={() => onEdit(task)}
  >
    {task.labels.length > 0 && (
      <LabelsRow>
        {task.labels.map((color, i) => (
          <LabelBadge key={i} $color={color} />
        ))}
      </LabelsRow>
    )}
    <TaskTitle>{task.title}</TaskTitle>
    <TaskActions>
      <TaskActionBtn
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task._id);
        }}
        title="Delete"
      >
        ✕
      </TaskActionBtn>
    </TaskActions>
  </TaskCard>
);
