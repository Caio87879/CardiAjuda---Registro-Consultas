import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Header from './Header';

import {
  Card,
  SectionTitle,
  ActionButton,
} from './components';

import AtendimentoCard
  from './components/atendimento/AtendimentoCard';

import AtendimentoForm
  from './components/atendimento/AtendimentoForm';


export default function Home() {

  const [tela, setTela] = useState('home');

  const [atendimentos, setAtendimentos] = useState([
    {
      id: '1',
      tipo: 'Atendimento',
      data: '05/08/2026',
      horario: '14:30',
      profissional: 'Dr. João Silva',
      observacoes: 'Acompanhamento de rotina.',
      status: 'Concluído',
    },

    {
      id: '2',
      tipo: 'Consulta',
      data: '22/08/2026',
      horario: '10:00',
      profissional: 'Dra. Maria Oliveira',
      observacoes: 'Consulta de acompanhamento.',
      status: 'Agendado',
    },
  ]);

  // ADICIONAR ATENDIMENTO

  function adicionarAtendimento(
    novoAtendimento
  ) {

    setAtendimentos([
      ...atendimentos,
      novoAtendimento,
    ]);

    setTela('atendimentos');
  }

  // EXCLUIR ATENDIMENTO


  function excluirAtendimento(id) {

    Alert.alert(
      'Excluir atendimento',
      'Deseja realmente excluir este registro?',

      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: () => {

            setAtendimentos(
              atendimentos.filter(
                item => item.id !== id
              )
            );

          },
        },
      ]
    );
  }

  // DETALHES

  function abrirDetalhes(atendimento) {

    Alert.alert(
      atendimento.tipo,

      `Data: ${atendimento.data}
Horário: ${atendimento.horario}
Profissional: ${atendimento.profissional}

Observações:
${atendimento.observacoes || 'Nenhuma'}`

    );
  }

  // TELA DE FORMULÁRIO


  if (tela === 'novo') {

    return (
      <SafeAreaView
        style={styles.container}
      >

        <AtendimentoForm
          onSave={adicionarAtendimento}
          onCancel={() =>
            setTela('home')
          }
        />

      </SafeAreaView>
    );
  }

  // LISTA DE ATENDIMENTOS

  if (tela === 'atendimentos') {

    return (
      <SafeAreaView
        style={styles.container}
      >

        <View style={styles.listaHeader}>

          <TouchableOpacity
            onPress={() =>
              setTela('home')
            }
          >

            <Text style={styles.voltar}>
              ‹ Voltar
            </Text>

          </TouchableOpacity>

          <Text style={styles.listaTitulo}>
            Consultas e atendimentos
          </Text>

          <Text style={styles.listaSubtitulo}>
            Histórico dos registros
          </Text>

        </View>


        <ScrollView
          contentContainerStyle={
            styles.listaContent
          }
          showsVerticalScrollIndicator={false}
        >

          {atendimentos.length === 0 ? (

            <View style={styles.vazio}>

              <Text style={styles.vazioIcon}>
                📋
              </Text>

              <Text style={styles.vazioTitulo}>
                Nenhum registro
              </Text>

              <Text style={styles.vazioTexto}>
                Cadastre um atendimento para
                começar seu histórico.
              </Text>

            </View>

          ) : (

            atendimentos.map(
              atendimento => (

                <AtendimentoCard
                  key={atendimento.id}

                  atendimento={
                    atendimento
                  }

                  onPress={() =>
                    abrirDetalhes(
                      atendimento
                    )
                  }

                  onDelete={() =>
                    excluirAtendimento(
                      atendimento.id
                    )
                  }
                />

              )
            )

          )}


          <TouchableOpacity
            style={styles.novoButton}
            onPress={() =>
              setTela('novo')
            }
          >

            <Text
              style={styles.novoButtonTexto}
            >
              ＋ Novo atendimento
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    );
  }
  // HOME

  return (
    <SafeAreaView
      style={styles.container}
    >

      <Header
        userName="Usuário"

        onNotificationPress={() =>
          Alert.alert(
            'Notificações',
            'Você não possui novas notificações.'
          )
        }
      />


      <ScrollView
        contentContainerStyle={
          styles.content
        }

        showsVerticalScrollIndicator={false}
      >

        {/* SAUDAÇÃO */}

        <View style={styles.welcome}>

          <Text style={styles.welcomeTitle}>
            Olá! 👋
          </Text>

          <Text style={styles.welcomeText}>
            Acompanhe seus registros de saúde
            de forma simples e organizada.
          </Text>

        </View>



        <SectionTitle
          title="Resumo"
          subtitle="Visão geral dos seus acompanhamentos"
        />


        <Card
          title="Atendimentos"
          value={String(atendimentos.length)}
          description="Registros realizados"
          icon="🩺"

          onPress={() =>
            setTela('atendimentos')
          }
        />


        <Card
          title="Consultas"

          value={String(
            atendimentos.filter(
              item =>
                item.tipo === 'Consulta'
            ).length
          )}

          description="Consultas registradas"

          icon="📅"

          onPress={() =>
            setTela('atendimentos')
          }
        />


        <Card
          title="Acompanhamentos"

          value="03"

          description="Acompanhamentos ativos"

          icon="❤️"

          onPress={() =>
            Alert.alert(
              'Acompanhamentos',
              'Visualização dos acompanhamentos ativos.'
            )
          }
        />


        <SectionTitle
          title="Ações rápidas"
          subtitle="Registre novas informações"
        />


        <ActionButton
          title="Registrar atendimento"
          icon="📝"

          onPress={() =>
            setTela('novo')
          }
        />


        <ActionButton
          title="Registrar consulta"
          icon="➕"

          onPress={() =>
            setTela('novo')
          }
        />


        <ActionButton
          title="Ver histórico"
          icon="📋"

          onPress={() =>
            setTela('atendimentos')
          }
        />


        {/* ÚLTIMOS REGISTROS */}

        <SectionTitle
          title="Últimos registros"
          subtitle="Atividades recentes"
        />


        {atendimentos
          .slice(-2)
          .reverse()
          .map(atendimento => (

            <TouchableOpacity
              key={atendimento.id}
              style={styles.historyCard}

              onPress={() =>
                abrirDetalhes(
                  atendimento
                )
              }
            >

              <View
                style={styles.historyIcon}
              >

                <Text>
                  {atendimento.tipo ===
                  'Consulta'
                    ? '📅'
                    : '🩺'}
                </Text>

              </View>


              <View
                style={styles.historyContent}
              >

                <Text
                  style={styles.historyTitle}
                >
                  {atendimento.tipo}
                  {' realizado'}
                </Text>


                <Text
                  style={
                    styles.historyDescription
                  }
                >
                  {atendimento.profissional}
                </Text>


                <Text
                  style={styles.historyDate}
                >
                  {atendimento.data}
                </Text>

              </View>

            </TouchableOpacity>

          ))}

      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  welcome: {
    marginBottom: 25,
  },

  welcomeTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#8B008B',
    marginBottom: 5,
  },

  welcomeText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#161515',
    maxWidth: 330,
  },



  // HISTÓRICO


  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  historyIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,

    backgroundColor: '#E8F4FF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  historyContent: {
    flex: 1,
  },

  historyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8B008B',
  },

  historyDescription: {
    fontSize: 12,
    color: '#161515',
    marginTop: 3,
  },

  historyDate: {
    fontSize: 11,
    color: '#161515',
    marginTop: 5,
  },

  // LISTA

  listaHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF1',
  },

  voltar: {
    color: '#8B008B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },

  listaTitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#8B008B',
  },

  listaSubtitulo: {
    fontSize: 13,
    color: '#161515',
    marginTop: 4,
  },

  listaContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // VAZIO

  vazio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,

    padding: 35,

    alignItems: 'center',

    marginBottom: 20,
  },

  vazioIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B008B',
    marginBottom: 5,
  },

  vazioTexto: {
    fontSize: 13,
    color: '#161515',
    textAlign: 'center',
  },



  // BOTÃO
  
  novoButton: {
    backgroundColor: '#8B008B',
    borderRadius: 14,

    height: 54,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 5,
  },

  novoButtonTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

});