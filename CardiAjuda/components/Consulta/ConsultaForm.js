import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';


export default function ConsultaForm({
  onSave,
  onCancel,
}) {

  const [paciente, setPaciente] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [profissional, setProfissional] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [motivo, setMotivo] = useState('');
  const [observacoes, setObservacoes] = useState('');


  function salvar() {

    console.log(
      'Botão salvar consulta clicado'
    );

    console.log(
      'Campos:',
      {
        paciente,
        data,
        horario,
        profissional,
        especialidade,
        motivo,
      }
    );


    if (
      !paciente ||
      !data ||
      !horario ||
      !profissional ||
      !especialidade ||
      !motivo
    ) {

      alert(
        'Preencha todos os campos obrigatórios.'
      );

      return;
    }


    const novaConsulta = {

      id: Date.now().toString(),

      paciente,

      data,

      horario,

      profissional,

      especialidade,

      motivo,

      observacoes,

    };


    console.log(
      'Enviando consulta:',
      novaConsulta
    );


    onSave(
      novaConsulta
    );
  }


  return (

    <ScrollView

      style={styles.container}

      contentContainerStyle={
        styles.content
      }

      showsVerticalScrollIndicator={
        false
      }

    >

      {/* VOLTAR */}

      <TouchableOpacity
        onPress={onCancel}
      >

        <Text
          style={styles.voltar}
        >
          ‹ Voltar
        </Text>

      </TouchableOpacity>


      {/* TÍTULO */}

      <Text
        style={styles.titulo}
      >
        Nova consulta
      </Text>


      <Text
        style={styles.subtitulo}
      >
        Registre os dados da consulta realizada.
      </Text>


      {/* PACIENTE */}

      <Text
        style={styles.label}
      >
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

      <Text
        style={styles.label}
      >
        Data *
      </Text>


      <TextInput

        style={styles.input}

        placeholder="Ex: 20/08/2026"

        placeholderTextColor="#999"

        value={data}

        onChangeText={setData}

      />


      {/* HORÁRIO */}

      <Text
        style={styles.label}
      >
        Horário *
      </Text>


      <TextInput

        style={styles.input}

        placeholder="Ex: 14:30"

        placeholderTextColor="#999"

        value={horario}

        onChangeText={setHorario}

      />


      {/* PROFISSIONAL */}

      <Text
        style={styles.label}
      >
        Profissional *
      </Text>


      <TextInput

        style={styles.input}

        placeholder="Nome do profissional"

        placeholderTextColor="#999"

        value={profissional}

        onChangeText={setProfissional}

      />


      {/* ESPECIALIDADE */}

      <Text
        style={styles.label}
      >
        Especialidade *
      </Text>


      <TextInput

        style={styles.input}

        placeholder="Ex: Cardiologia"

        placeholderTextColor="#999"

        value={especialidade}

        onChangeText={
          setEspecialidade
        }

      />


      {/* MOTIVO */}

      <Text
        style={styles.label}
      >
        Motivo da consulta *
      </Text>


      <TextInput

        style={styles.input}

        placeholder="Informe o motivo da consulta"

        placeholderTextColor="#999"

        value={motivo}

        onChangeText={setMotivo}

      />


      {/* OBSERVAÇÕES */}

      <Text
        style={styles.label}
      >
        Observações
      </Text>


      <TextInput

        style={[
          styles.input,
          styles.observacoes,
        ]}

        placeholder="Observações da consulta..."

        placeholderTextColor="#999"

        value={observacoes}

        onChangeText={
          setObservacoes
        }

        multiline

      />


      {/* SALVAR */}

      <TouchableOpacity

        style={styles.salvar}

        onPress={salvar}

        activeOpacity={0.8}

      >

        <Text
          style={styles.salvarTexto}
        >
          Salvar consulta
        </Text>

      </TouchableOpacity>


      {/* CANCELAR */}

      <TouchableOpacity

        style={styles.cancelar}

        onPress={onCancel}

      >

        <Text
          style={styles.cancelarTexto}
        >
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


  observacoes: {
    height: 110,

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