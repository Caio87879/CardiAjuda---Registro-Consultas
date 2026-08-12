import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AtendimentoCard({ atendimento, onPress, onDelete }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🩺</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.tipo}>{atendimento.tipo}</Text>

          <Text style={styles.data}>
            {atendimento.data} • {atendimento.horario}
          </Text>

          <Text style={styles.profissional}>
            {atendimento.profissional}
          </Text>

          <View style={styles.statusContainer}>
            <Text style={styles.status}>{atendimento.status}</Text>
          </View>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0DDE0',
    overflow: 'hidden',
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F7E5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 25,
  },

  info: {
    flex: 1,
  },

  tipo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#202020',
    marginBottom: 5,
  },

  data: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },

  profissional: {
    fontSize: 14,
    color: '#666666',
  },

  statusContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F7E5F2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },

  status: {
    color: '#8B008B',
    fontSize: 12,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 30,
    color: '#8B008B',
    marginLeft: 8,
  },

  deleteButton: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 10,
    alignItems: 'center',
  },

  deleteText: {
    color: '#B00020',
    fontSize: 13,
    fontWeight: '500',
  },
});