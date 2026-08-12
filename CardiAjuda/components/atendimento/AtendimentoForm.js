import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function AtendimentoForm({ onSave, onCancel }) {
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [profissional, setProfissional] = useState('');
  const [observacoes, setObservacoes] = useState('');

  function salvar() {
    if (!tipo || !data || !horario || !profissional) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoAtendimento = {
      id: Date.now().toString(),
      tipo,
      data,
      horario,
      profissional,
      observacoes,
      status: 'Agendado',
    };

    onSave(novoAtendimento);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <TouchableOpacity onPress={onCancel}>
        <Text style={styles.voltar}>‹ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Novo atendimento</Text>

      <Text style={styles.subtitulo}>
        Registre uma nova consulta ou acompanhamento
      </Text>

      <Text style={styles.label}>Tipo de atendimento *</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Consulta médica"
        placeholderTextColor="#999"
        value={tipo}
        onChangeText={setTipo}
      />

      <Text style={styles.label}>Data *</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 20/08/2026"
        placeholderTextColor="#999"
        value={data}
        onChangeText={setData}
        keyboardType="numbers-and-punctuation"
      />

      <Text style={styles.label}>Horário *</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 14:30"
        placeholderTextColor="#999"
        value={horario}
        onChangeText={setHorario}
        keyboardType="numbers-and-punctuation"
      />

      <Text style={styles.label}>Profissional *</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do profissional"
        placeholderTextColor="#999"
        value={profissional}
        onChangeText={setProfissional}
      />

      <Text style={styles.label}>Observações</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Adicione observações sobre o atendimento..."
        placeholderTextColor="#999"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity
        style={styles.salvarButton}
        onPress={salvar}
        activeOpacity={0.8}
      >
        <Text style={styles.salvarText}>
          Salvar atendimento
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelarButton}
        onPress={onCancel}
      >
        <Text style={styles.cancelarText}>
          Cancelar
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  voltar: {
    fontSize: 17,
    color: '#8B008B',
    fontWeight: '600',
    marginBottom: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 7,
  },

  subtitulo: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D2D0D2',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222222',
    marginBottom: 20,
  },

  textArea: {
    height: 120,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  salvarButton: {
    height: 56,
    backgroundColor: '#8B008B',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  salvarText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  cancelarButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  cancelarText: {
    color: '#8B008B',
    fontSize: 16,
    fontWeight: '600',
  },
});