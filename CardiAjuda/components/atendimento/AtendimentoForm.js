import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';


export default function AtendimentoForm({
  onSave,
  onCancel,
}) {

  const [paciente, setPaciente] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [profissional, setProfissional] = useState('');
  const [queixaPrincipal, setQueixaPrincipal] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [observacoes, setObservacoes] = useState('');


  // =========================
  // FORMATAÇÃO DA DATA
  // =========================

  function alterarData(texto) {

    let valor = texto.replace(/\D/g, '');

    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }

    if (valor.length >= 5) {

      valor =
        valor.substring(0, 2) +
        '/' +
        valor.substring(2, 4) +
        '/' +
        valor.substring(4);

    } else if (valor.length >= 3) {

      valor =
        valor.substring(0, 2) +
        '/' +
        valor.substring(2);

    }

    setData(valor);
  }


  // =========================
  // FORMATAÇÃO DO HORÁRIO
  // =========================

  function alterarHorario(texto) {

    let valor = texto.replace(/\D/g, '');

    if (valor.length > 4) {
      valor = valor.substring(0, 4);
    }

    if (valor.length >= 3) {

      valor =
        valor.substring(0, 2) +
        ':' +
        valor.substring(2);

    }

    setHorario(valor);
  }


  // =========================
  // SALVAR
  // =========================

  function salvar() {

    console.log('Botão salvar triagem clicado');

    console.log('Dados:', {
      paciente,
      data,
      horario,
      profissional,
      queixaPrincipal,
      classificacao,
      observacoes,
    });


    if (
      !paciente ||
      !data ||
      !horario ||
      !profissional ||
      !queixaPrincipal ||
      !classificacao
    ) {

      alert(
        'Preencha todos os campos obrigatórios.'
      );

      return;
    }


    if (data.length !== 10) {

      alert(
        'Digite a data no formato DD/MM/AAAA.'
      );

      return;
    }


    if (horario.length !== 5) {

      alert(
        'Digite o horário no formato HH:MM.'
      );

      return;
    }


    const novoAtendimento = {

      tipo: 'Triagem',

      paciente,

      data,

      horario,

      profissional,

      queixa_principal: queixaPrincipal,

      classificacao,

      observacoes,

    };


    console.log(
      'Enviando triagem:',
      novoAtendimento
    );


    onSave(novoAtendimento);
  }


  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* VOLTAR */}

      <TouchableOpacity
        onPress={onCancel}
      >

        <Text style={styles.voltar}>
          ‹ Voltar
        </Text>

      </TouchableOpacity>


      {/* TÍTULO */}

      <Text style={styles.titulo}>
        Atendimento de triagem
      </Text>


      <Text style={styles.subtitulo}>
        Registre os dados do atendimento de triagem.
      </Text>


      {/* TIPO */}

      <Text style={styles.label}>
        Tipo
      </Text>


      <View style={styles.tipoContainer}>

        <Text style={styles.tipoIcon}>
          🩺
        </Text>

        <Text style={styles.tipoTexto}>
          Triagem
        </Text>

      </View>


      {/* PACIENTE */}

      <Text style={styles.label}>
        Paciente *
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Nome do paciente"
        placeholderTextColor="#999"
        value={paciente}
        onChangeText={setPaciente}
      />


      {/* DATA */}

      <Text style={styles.label}>
        Data *
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Ex: 20/08/2026"
        placeholderTextColor="#999"
        value={data}
        onChangeText={alterarData}
        keyboardType="numeric"
        maxLength={10}
      />


      {/* HORÁRIO */}

      <Text style={styles.label}>
        Horário *
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Ex: 14:30"
        placeholderTextColor="#999"
        value={horario}
        onChangeText={alterarHorario}
        keyboardType="numeric"
        maxLength={5}
      />


      {/* PROFISSIONAL */}

      <Text style={styles.label}>
        Profissional *
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Nome do profissional"
        placeholderTextColor="#999"
        value={profissional}
        onChangeText={setProfissional}
      />


      {/* QUEIXA PRINCIPAL */}

      <Text style={styles.label}>
        Queixa principal *
      </Text>


      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        placeholder="Descreva a queixa principal"
        placeholderTextColor="#999"
        value={queixaPrincipal}
        onChangeText={setQueixaPrincipal}
        multiline
      />


      {/* CLASSIFICAÇÃO */}

      <Text style={styles.label}>
        Classificação *
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Classificação da triagem"
        placeholderTextColor="#999"
        value={classificacao}
        onChangeText={setClassificacao}
      />


      {/* OBSERVAÇÕES */}

      <Text style={styles.label}>
        Observações
      </Text>


      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        placeholder="Observações do atendimento..."
        placeholderTextColor="#999"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />


      {/* SALVAR */}

      <TouchableOpacity
        style={styles.salvar}
        onPress={salvar}
        activeOpacity={0.8}
      >

        <Text style={styles.salvarTexto}>
          Salvar triagem
        </Text>

      </TouchableOpacity>


      {/* CANCELAR */}

      <TouchableOpacity
        style={styles.cancelar}
        onPress={onCancel}
      >

        <Text style={styles.cancelarTexto}>
          Cancelar
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  voltar: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8B008B',
    marginBottom: 25,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#8B008B',
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 14,
    color: '#161515',
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B008B',
    marginBottom: 8,
  },

  tipoContainer: {
    height: 54,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#DCE3E8',
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  tipoIcon: {
    fontSize: 22,
    marginRight: 10,
  },

  tipoTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B008B',
  },

  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE3E8',
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#222222',
    marginBottom: 18,
  },

  textArea: {
    height: 100,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  salvar: {
    height: 54,
    backgroundColor: '#8B008B',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  salvarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  cancelar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelarTexto: {
    color: '#8B008B',
    fontSize: 15,
    fontWeight: '600',
  },

});