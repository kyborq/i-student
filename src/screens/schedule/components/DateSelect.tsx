import { add, format, Locale, sub } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../../../components/inputs/IconButton';
import { strings } from '../../../localizations/localization';
import { compareDates } from '../../../utils/date';

type Props = {
  date: Date | number;
  onSelect?: (date: Date | number) => void;
};

export interface ILocaleIterator {
  [key: string]: Locale;
}

export const DateSelect = ({ date, onSelect }: Props) => {
  const currentDate = new Date();

  const locale: ILocaleIterator = {
    en_US: enUS,
    ru_RU: ru,
  };

  const handleNextDay = () => {
    const newDate = add(new Date(date), { days: 1 });
    onSelect && onSelect(newDate);
  };

  const handlePrevDay = () => {
    const newDate = sub(date, { days: 1 });
    onSelect && onSelect(newDate);
  };

  const handleSetToday = () => {
    onSelect && onSelect(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>
          {format(date, 'd MMMM, iiii', {
            locale: locale[strings.getLanguage()],
          })}
        </Text>
      </View>
      {(compareDates(currentDate, date as Date) === -1 ||
        compareDates(currentDate, date as Date) === 1) && (
        <IconButton icon="calendar" onPress={handleSetToday} />
      )}
      <IconButton icon="chevronLeft" onPress={handlePrevDay} />
      <IconButton icon="chevronRight" onPress={handleNextDay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
