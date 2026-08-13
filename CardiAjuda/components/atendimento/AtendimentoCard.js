import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function AtendimentoCard({
  atendimento,
  onPress,
  onDelete,
}) {
  return (
    <View style={styles.card}>

      <TouchableOpacity
        style={styles.conteudo}
        onPress={onPress}
        activeOpacity={0.8}
      >

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {atendimento.tipo === 'Consulta'
              ? '📅'
              : '🩺'}
          </Text>
        </View>

        <View style={styles.informacoes}>

          <Text style={styles.tipo}>
            {atendimento.tipo}
          </Text>

          <Text style={styles.data}>
            {atendimento.data} • {atendimento.horario}
          </Text>

          <Text style={styles.profissional}>
            {atendimento.profissional}
          </Text>

          <View style={styles.statusContainer}>
            <Text style={styles.status}>
              {atendimento.status}
            </Text>
          </View>

        </View>

        <Text style={styles.seta}>
          ›
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
  style={styles.excluir}
  onPress={() => {
    Alert.alert(
      'TESTE',
      'O botão Excluir foi clicado!'
    );

    console.log(
      'BOTÃO EXCLUIR CLICADO'
    );

    console.log(
      'ID:',
      atendimento.id
    );

    if (onDelete) {
      onDelete();
    }
  }}
>
  <Text style={styles.excluirTexto}>
    Excluir
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,

    overflow: 'hidden',
  },

  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F4FF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  icon: {
    fontSize: 23,
  },

  informacoes: {
    flex: 1,
  },

  tipo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8B008B',
    marginBottom: 4,
  },

  data: {
    fontSize: 12,
    color: '#161515',
    marginBottom: 3,
  },

  profissional: {
    fontSize: 12,
    color: '#161515',
  },

  statusContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F4FF',
    borderRadius: 10,

    paddingHorizontal: 8,
    paddingVertical: 3,

    marginTop: 6,
  },

  status: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8B008B',
  },

  seta: {
    fontSize: 30,
    color: '#8B008B',
    marginLeft: 8,
  },

  excluir: {
    borderTopWidth: 1,
    borderTopColor: '#EEF1F3',
    alignItems: 'center',
    paddingVertical: 8,
  },

  excluirTexto: {
    color: '#B00020',
    fontSize: 12,
    fontWeight: '600',
  },

});