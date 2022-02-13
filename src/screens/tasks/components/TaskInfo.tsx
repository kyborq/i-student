import moment from 'moment';
import React, { useState } from 'react';
import { View } from 'react-native';
import { CalendarForm } from '../../../components/calendar/form/CalendarForm';
import { InfoLine } from '../../../components/InfoLine';
import { ModalView } from '../../../components/modals/ModalView';
import { TSubject } from '../../../redux/subjectsSlice';
import { TTask } from '../../../redux/tasksSlice';
import { getTimeOfTime } from '../../timer/timerUtils';

type Props = {
  task: TTask;
  subject?: TSubject;
  onShowSubject?: (id: string) => void;
  onSetTimer?: (id: string) => void;
  onSetDeadline?: (date: string) => void;
};

export const TaskInfo = ({
  task,
  subject,
  onShowSubject,
  onSetTimer,
  onSetDeadline,
}: Props) => {
  const [dateModal, setDateModal] = useState(false);
  const currentDate = moment().format('DD.MM.YYYY');

  const handleShowSubject = () => {
    onShowSubject && onShowSubject(subject?.id || '');
  };

  const handleSetTimer = () => {
    onSetTimer && onSetTimer(task.id);
  };

  const handleToggleModal = () => {
    setDateModal(!dateModal);
  };

  const handleSetDeadline = (date: string) => {
    onSetDeadline && onSetDeadline(date);
    handleToggleModal();
  };

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
        label="Срок выполнения"
        text={(!!task.deadline && task.deadline) || 'Не установлен'}
        disabled={task.completed}
        onPress={handleToggleModal}
      />

      <InfoLine
        icon="time"
        label="Самоконтроль"
        text={`${getTimeOfTime(task.spended, task.estimate)}`}
        disabled={task.completed}
        onPress={handleSetTimer}
      />

      <ModalView visible={dateModal} onClose={handleToggleModal}>
        <CalendarForm
          date={task.deadline || currentDate}
          onSelectDate={handleSetDeadline}
        />
      </ModalView>
    </View>
  );
};
