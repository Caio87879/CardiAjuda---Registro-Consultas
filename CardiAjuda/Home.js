import React, {
  useState,
  useEffect,
} from 'react';

import { supabase } from './lib/supabase';

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

  // =====================================
  // ESTADOS
  // =====================================

  const [tela, setTela] = useState('home');

  const [atendimentos, setAtendimentos] = useState([]);


  // =====================================
  // CARREGAR ATENDIMENTOS
  // =====================================

  useEffect(() => {
    carregarAtendimentos();
  }, []);


  async function carregarAtendimentos() {

    console.log('📡 Carregando atendimentos...');

    const {
      data,
      error,
    } = await supabase
      .from('atendimentos')
      .select('*')
      .order('created_at', {
        ascending: false,
      });


    if (error) {

      console.error(
        '❌ ERRO AO CARREGAR ATENDIMENTOS:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar os atendimentos.'
      );

      return;
    }


    console.log(
      '✅ ATENDIMENTOS CARREGADOS:',
      data
    );


    setAtendimentos(data || []);
  }


  // =====================================
  // ADICIONAR ATENDIMENTO
  // =====================================

  async function adicionarAtendimento(
    novoAtendimento
  ) {

    console.log(
      '📝 Tentando salvar atendimento:',
      novoAtendimento
    );


    const {
      data,
      error,
    } = await supabase
      .from('atendimentos')
      .insert({
        tipo: novoAtendimento.tipo,
        data: novoAtendimento.data,
        horario: novoAtendimento.horario,
        profissional: novoAtendimento.profissional,
        observacoes: novoAtendimento.observacoes,
        status: novoAtendimento.status,
      })
      .select();


    if (error) {

      console.error(
        '❌ ERRO AO SALVAR:',
        error
      );

      Alert.alert(
        'Erro',
        error.message
      );

      return;
    }


    console.log(
      '✅ ATENDIMENTO SALVO:',
      data
    );


    if (data && data.length > 0) {

      setAtendimentos(
        atual => [
          data[0],
          ...atual,
        ]
      );

    }


    setTela('atendimentos');


    Alert.alert(
      'Sucesso',
      'Atendimento registrado com sucesso!'
    );
  }


  // =====================================
  // EXCLUIR ATENDIMENTO
  // =====================================

async function excluirAtendimento(id) {

  console.log('🗑️ FUNÇÃO EXCLUIR CHAMADA!');
  console.log('ID:', id);
  console.log('TIPO DO ID:', typeof id);

  console.log(
    '📡 Enviando DELETE para o Supabase...'
  );

  try {

    const {
      data,
      error,
    } = await supabase
      .from('atendimentos')
      .delete()
      .eq('id', id)
      .select();


    console.log(
      '📦 RESPOSTA DO SUPABASE:'
    );

    console.log(
      'DATA:',
      data
    );

    console.log(
      'ERROR:',
      error
    );


    // ==============================
    // SE DEU ERRO
    // ==============================

    if (error) {

      console.error(
        '❌ ERRO AO EXCLUIR:',
        error
      );

      Alert.alert(
        'Erro ao excluir',
        error.message
      );

      return;
    }


    // ==============================
    // ATUALIZA A LISTA
    // ==============================

    setAtendimentos(
      atual =>
        atual.filter(
          item => item.id !== id
        )
    );


    console.log(
      '✅ ATENDIMENTO EXCLUÍDO!'
    );


    Alert.alert(
      'Sucesso',
      'Atendimento excluído com sucesso!'
    );

  } catch (erro) {

    console.error(
      '💥 ERRO INESPERADO:',
      erro
    );

    Alert.alert(
      'Erro',
      'Ocorreu um erro ao excluir o atendimento.'
    );

  }
}


  // =====================================
  // DETALHES DO ATENDIMENTO
  // =====================================

  function abrirDetalhes(atendimento) {

    Alert.alert(

      atendimento.tipo,

      `Data: ${atendimento.data}
Horário: ${atendimento.horario}
Profissional: ${atendimento.profissional}

Status: ${atendimento.status}

Observações:
${atendimento.observacoes || 'Nenhuma'}`

    );
  }


  // =====================================
  // TELA DE NOVO ATENDIMENTO
  // =====================================

  if (tela === 'novo') {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <AtendimentoForm

          onSave={
            adicionarAtendimento
          }

          onCancel={() =>
            setTela('home')
          }

        />

      </SafeAreaView>

    );
  }


  // =====================================
  // TELA DE ATENDIMENTOS
  // =====================================

  if (tela === 'atendimentos') {

    return (

      <SafeAreaView
        style={styles.container}
      >

        {/* CABEÇALHO */}

        <View
          style={styles.listaHeader}
        >

          <TouchableOpacity
            onPress={() =>
              setTela('home')
            }
          >

            <Text
              style={styles.voltar}
            >
              ‹ Voltar
            </Text>

          </TouchableOpacity>


          <Text
            style={styles.listaTitulo}
          >
            Consultas e atendimentos
          </Text>


          <Text
            style={styles.listaSubtitulo}
          >
            Histórico dos registros
          </Text>

        </View>


        {/* LISTA */}

        <ScrollView

          contentContainerStyle={
            styles.listaContent
          }

          showsVerticalScrollIndicator={
            false
          }

        >

          {atendimentos.length === 0 ? (

            <View
              style={styles.vazio}
            >

              <Text
                style={styles.vazioIcon}
              >
                📋
              </Text>


              <Text
                style={styles.vazioTitulo}
              >
                Nenhum registro
              </Text>


              <Text
                style={styles.vazioTexto}
              >
                Cadastre um atendimento para
                começar seu histórico.
              </Text>

            </View>

          ) : (

            atendimentos.map(
              atendimento => (

                <AtendimentoCard

                  key={
                    atendimento.id
                  }

                  atendimento={
                    atendimento
                  }

                  onPress={() =>
                    abrirDetalhes(
                      atendimento
                    )
                  }

                  onDelete={() => {

                    console.log(
                      '🗑️ Tentando excluir atendimento:',
                      {
                        id: atendimento.id,
                        tipo: atendimento.tipo,
                        data: atendimento.data,
                      }
                    );


                    excluirAtendimento(
                      atendimento.id
                    );

                  }}

                />

              )
            )

          )}


          {/* NOVO ATENDIMENTO */}

          <TouchableOpacity

            style={
              styles.novoButton
            }

            onPress={() =>
              setTela('novo')
            }

          >

            <Text
              style={
                styles.novoButtonTexto
              }
            >
              ＋ Novo atendimento
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    );
  }


  // =====================================
  // HOME
  // =====================================

  return (

    <SafeAreaView
      style={styles.container}
    >

      {/* HEADER */}

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

        showsVerticalScrollIndicator={
          false
        }

      >

        {/* SAUDAÇÃO */}

        <View
          style={styles.welcome}
        >

          <Text
            style={styles.welcomeTitle}
          >
            Olá! 👋
          </Text>


          <Text
            style={styles.welcomeText}
          >
            Acompanhe seus registros de saúde
            de forma simples e organizada.
          </Text>

        </View>


        {/* RESUMO */}

        <SectionTitle

          title="Resumo"

          subtitle={
            'Visão geral dos seus acompanhamentos'
          }

        />


        {/* ATENDIMENTOS */}

        <Card

          title="Atendimentos"

          value={
            String(
              atendimentos.length
            )
          }

          description="Registros realizados"

          icon="🩺"

          onPress={() =>
            setTela('atendimentos')
          }

        />


        {/* CONSULTAS */}

        <Card

          title="Consultas"

          value={
            String(

              atendimentos.filter(

                item =>
                  item.tipo ===
                  'Consulta'

              ).length

            )
          }

          description="Consultas registradas"

          icon="📅"

          onPress={() =>
            setTela('atendimentos')
          }

        />


        {/* ACOMPANHAMENTOS */}

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


        {/* AÇÕES RÁPIDAS */}

        <SectionTitle

          title="Ações rápidas"

          subtitle={
            'Registre novas informações'
          }

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

          subtitle={
            'Atividades recentes'
          }

        />


        {atendimentos

          .slice(0, 2)

          .map(
            atendimento => (

              <TouchableOpacity

                key={
                  atendimento.id
                }

                style={
                  styles.historyCard
                }

                onPress={() =>
                  abrirDetalhes(
                    atendimento
                  )
                }

              >

                <View
                  style={
                    styles.historyIcon
                  }
                >

                  <Text>

                    {
                      atendimento.tipo ===
                      'Consulta'

                        ? '📅'

                        : '🩺'
                    }

                  </Text>

                </View>


                <View
                  style={
                    styles.historyContent
                  }
                >

                  <Text
                    style={
                      styles.historyTitle
                    }
                  >

                    {
                      atendimento.tipo
                    }

                    {' realizado'}

                  </Text>


                  <Text
                    style={
                      styles.historyDescription
                    }
                  >

                    {
                      atendimento.profissional
                    }

                  </Text>


                  <Text
                    style={
                      styles.historyDate
                    }
                  >

                    {
                      atendimento.data
                    }

                  </Text>

                </View>

              </TouchableOpacity>

            )
          )}

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================
// ESTILOS
// =====================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },


  content: {
    padding: 20,
    paddingBottom: 35,
  },


  // ==============================
  // SAUDAÇÃO
  // ==============================

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


  // ==============================
  // HISTÓRICO
  // ==============================

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


  // ==============================
  // LISTA
  // ==============================

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


  // ==============================
  // VAZIO
  // ==============================

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


  // ==============================
  // BOTÃO
  // ==============================

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