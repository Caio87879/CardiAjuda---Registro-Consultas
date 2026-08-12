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


  // ESTADOS


  const [tela, setTela] = useState('home');

  const [atendimentos, setAtendimentos] = useState([]);

  // CARREGAR ATENDIMENTOS DO SUPABASE

  useEffect(() => {
    console.log('🔄 Inicializando...');
    console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key carregada:', !!process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
    carregarAtendimentos();
  }, []);


  async function carregarAtendimentos() {

    try {

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
          '❌ Erro ao carregar atendimentos:',
          error
        );

        Alert.alert(
          'Erro de conexão',
          `Falha ao conectar ao banco de dados:\n${error.message}`
        );

        return;
      }


      console.log('✅ Atendimentos carregados:', data?.length || 0);

      setAtendimentos(data || []);

    } catch (erro) {

      console.error('❌ Erro inesperado:', erro);

      Alert.alert(
        'Erro',
        'Falha ao carregar os atendimentos.'
      );
    }
  }

  // ADICIONAR ATENDIMENTO

  async function adicionarAtendimento(
    novoAtendimento
  ) {

    try {

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
          'Erro Supabase:',
          error.message || error
        );

        Alert.alert(
          'Erro ao salvar',
          error.message || 'Não foi possível salvar o atendimento. Verifique sua conexão.'
        );

        return;
      }


      if (!data || data.length === 0) {

        console.error('Nenhum dado retornado do Supabase');

        Alert.alert(
          'Erro',
          'Falha ao obter os dados salvos.'
        );

        return;
      }


      // Adiciona o registro retornado
      // pelo Supabase na lista

      setAtendimentos([
        data[0],
        ...atendimentos,
      ]);


      // Volta para a lista

      setTela('atendimentos');


      Alert.alert(
        'Sucesso',
        'Atendimento registrado com sucesso!'
      );

    } catch (erro) {

      console.error('Erro ao salvar atendimento:', erro);

      Alert.alert(
        'Erro inesperado',
        'Ocorreu um erro ao salvar. Tente novamente.'
      );
    }
  }

  // EXCLUIR ATENDIMENTO
  function excluirAtendimento(id) {

    console.log('📍 FUNÇÃO EXCLUIR CHAMADA! ID:', id, 'Tipo:', typeof id);

    // Teste básico
    console.log('✅ Mostrar alerta...');

    Alert.alert(
      'Excluir atendimento',

      'Deseja realmente excluir este registro?',

      [

        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => console.log('❌ Cancelado'),
        },

        {

          text: 'Excluir',

          style: 'destructive',

          onPress: async () => {

            try {

              console.log('🗑️ Iniciando DELETE para ID:', id);

              const {
                error,
              } = await supabase
                .from('atendimentos')
                .delete()
                .eq('id', id);


              if (error) {

                console.error(
                  '❌ ERRO NO SUPABASE:',
                  error.message || error,
                  'Code:', error.code
                );

                Alert.alert(
                  '❌ ERRO AO EXCLUIR',
                  `Erro: ${error.message || 'Falha desconhecida'}\n\nDica: Verifique se:\n• Tabela tem coluna "id"\n• RLS permite DELETE\n• Você tem permissão`
                );

                return;
              }


              console.log('✅ DELETE SUCESSO!');

              // Remove da tela

              setAtendimentos(
                atendimentos.filter(
                  item => item.id !== id
                )
              );


              Alert.alert(
                '✅ SUCESSO',
                'Atendimento excluído com sucesso!'
              );

            } catch (erro) {

              console.error('❌ ERRO INESPERADO:', erro.message, erro);

              Alert.alert(
                '❌ ERRO INESPERADO',
                `${erro.message || 'Erro desconhecido'}\n\nVerifique o console.`
              );
            }

          },

        },

      ]
    );
  }

  // MOSTRAR DETALHES

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

  // TELA DE NOVO ATENDIMENTO

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

  // TELA DE ATENDIMENTOS

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
            console.log('🗑️ Tentando excluir atendimento:', {
              id: atendimento.id,
              tipo: atendimento.tipo,
              data: atendimento.data,
            });
            excluirAtendimento(atendimento.id);
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

  // HOME PRINCIPAL

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


        <SectionTitle

          title="Resumo"

          subtitle={
            "Visão geral dos seus acompanhamentos"
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
            "Registre novas informações"
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

        <SectionTitle

          title="Últimos registros"

          subtitle={
            "Atividades recentes"
          }

        />


        {atendimentos

          .slice(0, 2)

          .map(
            atendimento => (

              <View

                key={
                  atendimento.id
                }

                style={
                  styles.historyCard
                }

              >

                <TouchableOpacity

                  onPress={() =>
                    abrirDetalhes(
                      atendimento
                    )
                  }

                  style={{flex: 1}}

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
                        atendimento.data
                      }

                      {' às '}

                      {
                        atendimento.horario
                      }

                    </Text>

                  </View>

                </TouchableOpacity>

                <TouchableOpacity

                  onPress={() => {
                    console.log('🗑️ Excluindo do histórico:', atendimento.id);
                    excluirAtendimento(atendimento.id);
                  }}

                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    justifyContent: 'center',
                  }}

                >

                  <Text style={{color: '#B00020', fontSize: 12, fontWeight: '600'}}>
                    ✕
                  </Text>

                </TouchableOpacity>

              </View>

            )
          )
        }

      </ScrollView>

    </SafeAreaView>
  );
}

// ESTILOS

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },


  content: {
    padding: 20,
    paddingBottom: 35,
  },

  // SAUDAÇÃO

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

  // TELA VAZIA

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

  // BOTÃO NOVO
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