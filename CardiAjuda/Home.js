import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { supabase } from './lib/supabase';

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

import ConsultaForm
  from './components/Consulta/ConsultaForm';


export default function Home() {

  // ==========================================
  // CONTROLE DA TELA
  // ==========================================

  const [tela, setTela] = useState('home');


  // ==========================================
  // LISTAS
  // ==========================================

  const [atendimentos, setAtendimentos] =
    useState([]);

  const [consultas, setConsultas] =
    useState([]);


  // ==========================================
  // CARREGAR DADOS
  // ==========================================

  useEffect(() => {

    carregarAtendimentos();

    carregarConsultas();

  }, []);


  // ==========================================
  // CARREGAR TRIAGENS
  // ==========================================

  async function carregarAtendimentos() {

    console.log(
      'Carregando atendimentos...'
    );

    const { data, error } = await supabase
      .from('atendimentos')
      .select('*')
      .order(
        'created_at',
        {
          ascending: false,
        }
      );


    if (error) {

      console.log(
        'Erro ao carregar atendimentos:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar os atendimentos.'
      );

      return;
    }


    console.log(
      'Atendimentos carregados:',
      data
    );


    setAtendimentos(
      data || []
    );
  }


  // ==========================================
  // CARREGAR CONSULTAS
  // ==========================================

  async function carregarConsultas() {

    console.log(
      'Carregando consultas...'
    );

    const { data, error } = await supabase
      .from('consultas')
      .select('*')
      .order(
        'created_at',
        {
          ascending: false,
        }
      );


    if (error) {

      console.log(
        'Erro ao carregar consultas:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar as consultas.'
      );

      return;
    }


    console.log(
      'Consultas carregadas:',
      data
    );


    setConsultas(
      data || []
    );
  }


  // ==========================================
  // ADICIONAR TRIAGEM
  // ==========================================

  async function adicionarAtendimento(
    novoAtendimento
  ) {

    console.log(
      'Salvando triagem:',
      novoAtendimento
    );


    const { data, error } = await supabase

      .from('atendimentos')

      .insert([

        {
          tipo: 'Triagem',

          paciente:
            novoAtendimento.paciente,

          data:
            novoAtendimento.data,

          horario:
            novoAtendimento.horario,

          profissional:
            novoAtendimento.profissional,

          queixa_principal:
            novoAtendimento.queixa_principal,

          classificacao:
            novoAtendimento.classificacao,

          observacoes:
            novoAtendimento.observacoes,
        },

      ])

      .select();


    if (error) {

      console.log(
        'Erro ao salvar triagem:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível salvar a triagem.'
      );

      return;
    }


    console.log(
      'Triagem salva:',
      data
    );


    setAtendimentos(
      [
        data[0],
        ...atendimentos,
      ]
    );


    setTela(
      'atendimentos'
    );
  }


  // ==========================================
  // ADICIONAR CONSULTA
  // ==========================================

  async function adicionarConsulta(
    novaConsulta
  ) {

    console.log(
      'Salvando consulta:',
      novaConsulta
    );


    const { data, error } = await supabase

      .from('consultas')

      .insert([

        {
          paciente:
            novaConsulta.paciente,

          data:
            novaConsulta.data,

          horario:
            novaConsulta.horario,

          profissional:
            novaConsulta.profissional,

          especialidade:
            novaConsulta.especialidade,

          motivo:
            novaConsulta.motivo,

          observacoes:
            novaConsulta.observacoes,
        },

      ])

      .select();


    if (error) {

      console.log(
        'Erro ao salvar consulta:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível salvar a consulta.'
      );

      return;
    }


    console.log(
      'Consulta salva:',
      data
    );


    setConsultas(
      [
        data[0],
        ...consultas,
      ]
    );


    setTela(
      'consultas'
    );
  }


  // ==========================================
  // EXCLUIR TRIAGEM
  // ==========================================

  function excluirAtendimento(
    id
  ) {

    Alert.alert(

      'Excluir triagem',

      'Deseja realmente excluir este registro?',

      [

        {
          text: 'Cancelar',

          style: 'cancel',
        },


        {

          text: 'Excluir',

          style: 'destructive',

          onPress: async () => {

            console.log(
              'Excluindo triagem:',
              id
            );


            const { error } =
              await supabase

                .from('atendimentos')

                .delete()

                .eq(
                  'id',
                  id
                );


            if (error) {

              console.log(
                'Erro ao excluir:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir o registro.'
              );

              return;
            }


            setAtendimentos(

              atendimentos.filter(
                item =>
                  item.id !== id
              )

            );


            console.log(
              'Triagem excluída.'
            );

          },

        },

      ]

    );
  }


  // ==========================================
  // EXCLUIR CONSULTA
  // ==========================================

  function excluirConsulta(
    id
  ) {

    Alert.alert(

      'Excluir consulta',

      'Deseja realmente excluir esta consulta?',

      [

        {
          text: 'Cancelar',

          style: 'cancel',
        },


        {

          text: 'Excluir',

          style: 'destructive',

          onPress: async () => {

            console.log(
              'Excluindo consulta:',
              id
            );


            const { error } =
              await supabase

                .from('consultas')

                .delete()

                .eq(
                  'id',
                  id
                );


            if (error) {

              console.log(
                'Erro ao excluir consulta:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir a consulta.'
              );

              return;
            }


            setConsultas(

              consultas.filter(
                item =>
                  item.id !== id
              )

            );


            console.log(
              'Consulta excluída.'
            );

          },

        },

      ]

    );
  }


  // ==========================================
  // DETALHES DA TRIAGEM
  // ==========================================

  function abrirDetalhesAtendimento(
    atendimento
  ) {

    Alert.alert(

      '🩺 Triagem',

      `Paciente: ${atendimento.paciente}

Data: ${atendimento.data}

Horário: ${atendimento.horario}

Profissional: ${atendimento.profissional}

Queixa principal:
${atendimento.queixa_principal || 'Não informado'}

Classificação:
${atendimento.classificacao || 'Não informado'}

Observações:
${atendimento.observacoes || 'Nenhuma'}`

    );
  }


  // ==========================================
  // DETALHES DA CONSULTA
  // ==========================================

  function abrirDetalhesConsulta(
    consulta
  ) {

    Alert.alert(

      '📅 Consulta',

      `Paciente: ${consulta.paciente}

Data: ${consulta.data}

Horário: ${consulta.horario}

Profissional: ${consulta.profissional}

Especialidade:
${consulta.especialidade}

Motivo:
${consulta.motivo}

Observações:
${consulta.observacoes || 'Nenhuma'}`

    );
  }


  // ==========================================
  // TELA DE NOVA TRIAGEM
  // ==========================================

  if (tela === 'novoAtendimento') {

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


  // ==========================================
  // TELA DE NOVA CONSULTA
  // ==========================================

  if (tela === 'novaConsulta') {

    return (

      <SafeAreaView
        style={styles.container}
      >

        <ConsultaForm

          onSave={
            adicionarConsulta
          }

          onCancel={() =>
            setTela('home')
          }

        />

      </SafeAreaView>

    );
  }


  // ==========================================
  // HOME
  // ==========================================

  if (tela === 'home') {

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

            description="Triagens registradas"

            icon="🩺"

            onPress={() =>
              setTela(
                'atendimentos'
              )
            }

          />


          {/* CONSULTAS */}

          <Card

            title="Consultas"

            value={
              String(
                consultas.length
              )
            }

            description="Consultas registradas"

            icon="📅"

            onPress={() =>
              setTela(
                'consultas'
              )
            }

          />


          {/* ACOMPANHAMENTOS */}

          <Card

            title="Acompanhamentos"

            value="0"

            description={
              'Acompanhamentos ativos'
            }

            icon="❤️"

            onPress={() =>
              Alert.alert(
                'Acompanhamentos',
                'Visualização dos acompanhamentos.'
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


          {/* TRIAGEM */}

          <ActionButton

            title="Registrar atendimento"

            icon="🩺"

            onPress={() =>
              setTela(
                'novoAtendimento'
              )
            }

          />


          {/* CONSULTA */}

          <ActionButton

            title="Registrar consulta"

            icon="📅"

            onPress={() =>
              setTela(
                'novaConsulta'
              )
            }

          />


          {/* HISTÓRICO */}

          <ActionButton

            title="Ver histórico"

            icon="📋"

            onPress={() =>
              setTela(
                'historico'
              )
            }

          />


          {/* ÚLTIMOS REGISTROS */}

          <SectionTitle

            title="Últimos registros"

            subtitle="Atividades recentes"

          />


          {/* ÚLTIMAS TRIAGENS */}

          {atendimentos
            .slice(0, 2)
            .map(
              atendimento => (

                <TouchableOpacity

                  key={
                    `atendimento-${atendimento.id}`
                  }

                  style={
                    styles.historyCard
                  }

                  onPress={() =>
                    abrirDetalhesAtendimento(
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
                      🩺
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
                      Triagem
                    </Text>


                    <Text
                      style={
                        styles.historyDescription
                      }
                    >
                      {atendimento.paciente}
                    </Text>


                    <Text
                      style={
                        styles.historyDate
                      }
                    >
                      {atendimento.data}
                    </Text>

                  </View>

                </TouchableOpacity>

              )
            )}


          {/* ÚLTIMAS CONSULTAS */}

          {consultas
            .slice(0, 2)
            .map(
              consulta => (

                <TouchableOpacity

                  key={
                    `consulta-${consulta.id}`
                  }

                  style={
                    styles.historyCard
                  }

                  onPress={() =>
                    abrirDetalhesConsulta(
                      consulta
                    )
                  }

                >

                  <View
                    style={
                      styles.historyIcon
                    }
                  >

                    <Text>
                      📅
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
                      Consulta
                    </Text>


                    <Text
                      style={
                        styles.historyDescription
                      }
                    >
                      {consulta.paciente}
                    </Text>


                    <Text
                      style={
                        styles.historyDate
                      }
                    >
                      {consulta.data}
                    </Text>

                  </View>

                </TouchableOpacity>

              )
            )}

        </ScrollView>

      </SafeAreaView>
    );
  }


  // ==========================================
  // HISTÓRICO GERAL
  // ==========================================

  if (tela === 'historico') {

    const registros = [

      ...atendimentos.map(
        item => ({
          ...item,

          registroTipo:
            'Triagem',

          registroId:
            `atendimento-${item.id}`,
        })
      ),


      ...consultas.map(
        item => ({
          ...item,

          registroTipo:
            'Consulta',

          registroId:
            `consulta-${item.id}`,
        })
      ),

    ];


    return (

      <SafeAreaView
        style={styles.container}
      >

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
            Histórico
          </Text>


          <Text
            style={styles.listaSubtitulo}
          >
            Consultas e triagens
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

          {registros.length === 0 ? (

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
                Cadastre uma triagem ou consulta
                para começar seu histórico.
              </Text>

            </View>

          ) : (

            registros.map(
              registro => (

                <View
                  key={
                    registro.registroId
                  }
                >

                  {/* TRIAGEM */}

                  {registro.registroTipo ===
                  'Triagem' ? (

                    <AtendimentoCard

                      atendimento={
                        registro
                      }

                      onPress={() =>
                        abrirDetalhesAtendimento(
                          registro
                        )
                      }

                      onDelete={() =>
                        excluirAtendimento(
                          registro.id
                        )
                      }

                    />

                  ) : (

                    /* CONSULTA */

                    <View
                      style={
                        styles.consultaCard
                      }
                    >

                      <TouchableOpacity

                        style={
                          styles.consultaConteudo
                        }

                        onPress={() =>
                          abrirDetalhesConsulta(
                            registro
                          )
                        }

                      >

                        <View
                          style={
                            styles.historyIcon
                          }
                        >

                          <Text>
                            📅
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
                            Consulta
                          </Text>


                          <Text
                            style={
                              styles.historyDescription
                            }
                          >
                            {registro.paciente}
                          </Text>


                          <Text
                            style={
                              styles.historyDate
                            }
                          >
                            {registro.data}
                            {' • '}
                            {registro.horario}
                          </Text>


                          <Text
                            style={
                              styles.historyDescription
                            }
                          >
                            {registro.especialidade}
                          </Text>

                        </View>


                        <Text
                          style={
                            styles.seta
                          }
                        >
                          ›
                        </Text>

                      </TouchableOpacity>


                      <TouchableOpacity

                        style={
                          styles.excluir
                        }

                        onPress={() =>
                          excluirConsulta(
                            registro.id
                          )
                        }

                      >

                        <Text
                          style={
                            styles.excluirTexto
                          }
                        >
                          Excluir
                        </Text>

                      </TouchableOpacity>

                    </View>

                  )}

                </View>

              )
            )

          )}


          {/* NOVA TRIAGEM */}

          <TouchableOpacity

            style={
              styles.novoButton
            }

            onPress={() =>
              setTela(
                'novoAtendimento'
              )
            }

          >

            <Text
              style={
                styles.novoButtonTexto
              }
            >
              ＋ Nova triagem
            </Text>

          </TouchableOpacity>


          {/* NOVA CONSULTA */}

          <TouchableOpacity

            style={
              styles.novoButtonSecundario
            }

            onPress={() =>
              setTela(
                'novaConsulta'
              )
            }

          >

            <Text
              style={
                styles.novoButtonSecundarioTexto
              }
            >
              ＋ Nova consulta
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    );
  }


  // ==========================================
  // LISTA DE TRIAGENS
  // ==========================================

  if (tela === 'atendimentos') {

    return (

      <SafeAreaView
        style={styles.container}
      >

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
            Atendimentos
          </Text>


          <Text
            style={styles.listaSubtitulo}
          >
            Triagens registradas
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
                🩺
              </Text>


              <Text
                style={styles.vazioTitulo}
              >
                Nenhuma triagem
              </Text>


              <Text
                style={styles.vazioTexto}
              >
                Cadastre um atendimento
                para começar.
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
                    abrirDetalhesAtendimento(
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

            style={
              styles.novoButton
            }

            onPress={() =>
              setTela(
                'novoAtendimento'
              )
            }

          >

            <Text
              style={
                styles.novoButtonTexto
              }
            >
              ＋ Nova triagem
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    );
  }


  // ==========================================
  // LISTA DE CONSULTAS
  // ==========================================

  if (tela === 'consultas') {

    return (

      <SafeAreaView
        style={styles.container}
      >

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
            Consultas
          </Text>


          <Text
            style={styles.listaSubtitulo}
          >
            Consultas registradas
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

          {consultas.length === 0 ? (

            <View
              style={styles.vazio}
            >

              <Text
                style={styles.vazioIcon}
              >
                📅
              </Text>


              <Text
                style={styles.vazioTitulo}
              >
                Nenhuma consulta
              </Text>


              <Text
                style={styles.vazioTexto}
              >
                Cadastre uma consulta
                para começar.
              </Text>

            </View>

          ) : (

            consultas.map(
              consulta => (

                <View

                  key={
                    consulta.id
                  }

                  style={
                    styles.consultaCard
                  }

                >

                  <TouchableOpacity

                    style={
                      styles.consultaConteudo
                    }

                    onPress={() =>
                      abrirDetalhesConsulta(
                        consulta
                      )
                    }

                  >

                    <View
                      style={
                        styles.historyIcon
                      }
                    >

                      <Text>
                        📅
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
                        Consulta
                      </Text>


                      <Text
                        style={
                          styles.historyDescription
                        }
                      >
                        {consulta.paciente}
                      </Text>


                      <Text
                        style={
                          styles.historyDate
                        }
                      >
                        {consulta.data}
                        {' • '}
                        {consulta.horario}
                      </Text>


                      <Text
                        style={
                          styles.historyDescription
                        }
                      >
                        {consulta.especialidade}
                      </Text>

                    </View>


                    <Text
                      style={
                        styles.seta
                      }
                    >
                      ›
                    </Text>

                  </TouchableOpacity>


                  <TouchableOpacity

                    style={
                      styles.excluir
                    }

                    onPress={() =>
                      excluirConsulta(
                        consulta.id
                      )
                    }

                  >

                    <Text
                      style={
                        styles.excluirTexto
                      }
                    >
                      Excluir
                    </Text>

                  </TouchableOpacity>

                </View>

              )
            )

          )}


          <TouchableOpacity

            style={
              styles.novoButtonSecundario
            }

            onPress={() =>
              setTela(
                'novaConsulta'
              )
            }

          >

            <Text
              style={
                styles.novoButtonSecundarioTexto
              }
            >
              ＋ Nova consulta
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    );
  }


  return null;
}


// ==========================================
// ESTILOS
// ==========================================

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


  // =====================================
  // HISTÓRICO
  // =====================================

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


  // =====================================
  // LISTA
  // =====================================

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


  // =====================================
  // VAZIO
  // =====================================

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


  // =====================================
  // BOTÃO PRINCIPAL
  // =====================================

  novoButton: {
    backgroundColor: '#8B008B',

    borderRadius: 14,

    height: 54,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 5,

    marginBottom: 12,
  },


  novoButtonTexto: {
    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: 'bold',
  },


  // =====================================
  // BOTÃO SECUNDÁRIO
  // =====================================

  novoButtonSecundario: {
    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#8B008B',

    borderRadius: 14,

    height: 54,

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 12,
  },


  novoButtonSecundarioTexto: {
    color: '#8B008B',

    fontSize: 15,

    fontWeight: 'bold',
  },


  // =====================================
  // CONSULTA
  // =====================================

  consultaCard: {
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


  consultaConteudo: {
    flexDirection: 'row',

    alignItems: 'center',

    padding: 15,
  },


  seta: {
    fontSize: 30,

    color: '#8B008B',

    marginLeft: 8,
  },


  // =====================================
  // EXCLUIR
  // =====================================

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