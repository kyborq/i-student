import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { strings } from '../../../localizations/localization';
import { PanelButton } from '../../tasks/components/PanelButton';

type Props = {
  all: number;
  archived: number;
  filter?: string;
  onSetFilter?: (fitler: string) => void;
};

export const SubjectsPanel = ({
  all,
  archived,
  filter,
  onSetFilter,
}: Props) => {
  const showAll = () => onSetFilter && onSetFilter('ALL');
  const showArchived = () => onSetFilter && onSetFilter('ARCHIVED');

  return (
    <View style={styles.panel}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        <PanelButton
          title={strings.all}
          selected={filter === 'ALL'}
          onPress={showAll}
          number={all}
        />
        <PanelButton
          title={strings.archived}
          selected={filter === 'ARCHIVED'}
          onPress={showArchived}
          number={archived}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});
