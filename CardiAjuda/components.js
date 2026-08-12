import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export function Card({ title, value, description, icon, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>

        <Text style={styles.cardValue}>
          {value}
        </Text>

        <Text style={styles.cardDescription}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

export function ActionButton({
  title,
  icon,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.actionIcon}>
        {icon}
      </Text>

      <Text style={styles.actionText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  icon: {
    fontSize: 25,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#161515',
    marginBottom: 3,
  },

  cardValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B008B',
  },

  cardDescription: {
    fontSize: 12,
    color: '#161515',
    marginTop: 2,
  },

  section: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#8B008B',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#161515',
    marginTop: 4,
  },

  actionButton: {
    backgroundColor: '#8B008B',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  actionIcon: {
    fontSize: 20,
    marginRight: 9,
  },

  actionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});