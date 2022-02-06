import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { InfoLine } from '../../../components/InfoLine';
import { TSubject } from '../../../redux/subjectsSlice';
import { TTask } from '../../../redux/tasksSlice';
import { getTimeOfTime, getTimeString } from '../../timer/timerUtils';

type Props = {
  task: TTask;
  subject?: TSubject;
  onShowSubject?: (id: string) => void;
  onSetTimer?: (id: string) => void;
};

export const TaskInfo = ({
  task,
  subject,
  onShowSubject,
  onSetTimer,
}: Props) => {
  const currentDate = moment().format('DD.MM.YYYY');

  const handleShowSubject = () => {
    onShowSubject && onShowSubject(subject?.id || '');
  };

  const handleSetTimer = () => {
    onSetTimer && onSetTimer(task.id);
  };

  const timerExists = task.spended && task.estimate;

  return (
    <View>
      <InfoLine
        icon="textInfo"
        label="Название задачи"
        text={task.title}
        disabled={task.completed}
      />
      {!!subject?.title && (
        <InfoLine
          icon="book"
          label="Предмет"
          text={subject?.title}
          disabled={task.completed}
          onPress={handleShowSubject}
        />
      )}

      <InfoLine
        icon="calendar"
        label="Дата"
        text={'Функция не реализована'}
        disabled={task.completed}
        onPress={() => {}}
      />

      <InfoLine
        icon="time"
        label="Таймер"
        text={
          (!timerExists && 'Не установлен') ||
          `${getTimeOfTime(task.spended, task.estimate)}`
        }
        disabled={task.completed}
        onPress={handleSetTimer}
      />
    </View>
  );
};
