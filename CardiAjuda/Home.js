import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
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


// =====================================================
// HOME
// =====================================================

export default function Home() {


  // ===================================================
  // CONTROLE DA TELA
  // ===================================================

  const [tela, setTela] = useState('home');


  // ===================================================
  // LISTAS
  // ===================================================

  const [atendimentos, setAtendimentos] = useState([]);

  const [consultas, setConsultas] = useState([]);


  // ===================================================
  // CARREGAMENTO
  // ===================================================

  const [carregando, setCarregando] = useState(true);


  // ===================================================
  // EXCLUSÃO
  // ===================================================

  const [excluindo, setExcluindo] = useState(false);


  // ===================================================
  // CARREGAR AO ABRIR
  // ===================================================

  useEffect(() => {

    carregarDados();

  }, []);


  // ===================================================
  // CARREGAR DADOS
  // ===================================================

  async function carregarDados() {

    console.log('================================');
    console.log('CARREGANDO DADOS...');
    console.log('================================');


    setCarregando(true);


    // =================================================
    // ATENDIMENTOS
    // =================================================

    const {
      data: dadosAtendimentos,
      error: erroAtendimentos,
    } = await supabase

      .from('atendimentos')

      .select('*')

      .order(
        'created_at',
        {
          ascending: false,
        }
      );


    if (erroAtendimentos) {

      console.log(
        'ERRO AO CARREGAR ATENDIMENTOS:',
        erroAtendimentos
      );

      Alert.alert(
        'Erro',
        erroAtendimentos.message ||
        'Não foi possível carregar os atendimentos.'
      );

      setAtendimentos([]);

    } else {

      console.log(
        'ATENDIMENTOS CARREGADOS:',
        dadosAtendimentos
      );


      const lista =
        (dadosAtendimentos || []).map(
          item => ({

            ...item,

            origem: 'atendimento',

            tipo: 'Triagem',

          })
        );


      setAtendimentos(lista);
    }


    // =================================================
    // CONSULTAS
    // =================================================

    console.log('================================');
    console.log('CARREGANDO CONSULTAS...');
    console.log('================================');


    const {
      data: dadosConsultas,
      error: erroConsultas,
    } = await supabase

      .from('consultas')

      .select('*')

      .order(
        'created_at',
        {
          ascending: false,
        }
      );


    if (erroConsultas) {

      console.log(
        'ERRO AO CARREGAR CONSULTAS:',
        erroConsultas
      );

      Alert.alert(
        'Erro',
        erroConsultas.message ||
        'Não foi possível carregar as consultas.'
      );

      setConsultas([]);

    } else {

      console.log(
        'CONSULTAS CARREGADAS:',
        dadosConsultas
      );


      const lista =
        (dadosConsultas || []).map(
          item => ({

            ...item,

            origem: 'consulta',

            tipo: 'Consulta',

          })
        );


      setConsultas(lista);
    }


    setCarregando(false);


    console.log(
      'CARREGAMENTO FINALIZADO'
    );
  }


  // ===================================================
  // HISTÓRICO
  // ===================================================

  const historico = [

    ...atendimentos,

    ...consultas,

  ].sort(

    (a, b) => {

      const dataA =
        new Date(a.created_at || 0);

      const dataB =
        new Date(b.created_at || 0);

      return dataB - dataA;

    }

  );


  // ===================================================
  // SALVAR TRIAGEM
  // ===================================================

  async function adicionarAtendimento(
    novoAtendimento
  ) {

    console.log('================================');
    console.log('SALVANDO TRIAGEM');
    console.log('================================');


    const dados = {

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
        novoAtendimento.observacoes || null,

    };


    console.log(
      'Dados enviados:',
      dados
    );


    const {
      data,
      error,
    } = await supabase

      .from('atendimentos')

      .insert([dados])

      .select()

      .single();


    if (error) {

      console.log(
        'ERRO AO SALVAR TRIAGEM:',
        error
      );


      Alert.alert(
        'Erro ao salvar',
        error.message ||
        'Não foi possível salvar a triagem.'
      );


      return;
    }


    console.log(
      'TRIAGEM SALVA:',
      data
    );


    setAtendimentos(
      prev => [

        {
          ...data,

          origem: 'atendimento',

          tipo: 'Triagem',

        },

        ...prev,

      ]
    );


    Alert.alert(
      'Sucesso',
      'Triagem registrada com sucesso!'
    );


    setTela('atendimentos');
  }


  // ===================================================
  // SALVAR CONSULTA
  // ===================================================

  async function adicionarConsulta(
    novaConsulta
  ) {

    console.log('================================');
    console.log('SALVANDO CONSULTA');
    console.log('================================');


    const dados = {

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
        novaConsulta.observacoes || null,

    };


    console.log(
      'Dados enviados:',
      dados
    );


    const {
      data,
      error,
    } = await supabase

      .from('consultas')

      .insert([dados])

      .select()

      .single();


    if (error) {

      console.log(
        'ERRO AO SALVAR CONSULTA:',
        error
      );


      Alert.alert(
        'Erro ao salvar',
        error.message ||
        'Não foi possível salvar a consulta.'
      );


      return;
    }


    console.log(
      'CONSULTA SALVA:',
      data
    );


    setConsultas(
      prev => [

        {
          ...data,

          origem: 'consulta',

          tipo: 'Consulta',

        },

        ...prev,

      ]
    );


    Alert.alert(
      'Sucesso',
      'Consulta registrada com sucesso!'
    );


    setTela('atendimentos');
  }


  // ===================================================
  // EXCLUIR REGISTRO
  // ===================================================

  async function excluirRegistro(
    registro
  ) {

    console.log('================================');
    console.log('EXCLUIR REGISTRO CHAMADO');
    console.log('ID:', registro.id);
    console.log('TIPO:', registro.tipo);
    console.log('ORIGEM:', registro.origem);
    console.log('================================');


    if (!registro) {

      console.log(
        'ERRO: registro não existe'
      );

      return;
    }


    if (!registro.id) {

      console.log(
        'ERRO: registro não possui ID'
      );

      Alert.alert(
        'Erro',
        'Este registro não possui um ID válido.'
      );

      return;
    }


    if (excluindo) {

      console.log(
        'Já existe uma exclusão em andamento.'
      );

      return;
    }


    setExcluindo(true);


    try {

      // =============================================
      // EXCLUIR TRIAGEM
      // =============================================

      if (
        registro.origem ===
        'atendimento'
      ) {

        console.log(
          'EXCLUINDO DA TABELA: atendimentos'
        );


        const {
          data,
          error,
        } = await supabase

          .from('atendimentos')

          .delete()

          .eq(
            'id',
            registro.id
          )

          .select();


        console.log(
          'RESPOSTA DA EXCLUSÃO:',
          {
            data,
            error,
          }
        );


        if (error) {

          console.log(
            'ERRO AO EXCLUIR TRIAGEM:',
            error
          );


          Alert.alert(
            'Erro ao excluir',
            error.message ||
            'Não foi possível excluir a triagem.'
          );


          return;
        }


        console.log(
          'TRIAGEM EXCLUÍDA COM SUCESSO!'
        );


        setAtendimentos(

          prev =>

            prev.filter(
              item =>
                item.id !==
                registro.id
            )

        );


        Alert.alert(
          'Sucesso',
          'Triagem excluída com sucesso!'
        );


        return;
      }


      // =============================================
      // EXCLUIR CONSULTA
      // =============================================

      if (
        registro.origem ===
        'consulta'
      ) {

        console.log(
          'EXCLUINDO DA TABELA: consultas'
        );


        const {
          data,
          error,
        } = await supabase

          .from('consultas')

          .delete()

          .eq(
            'id',
            registro.id
          )

          .select();


        console.log(
          'RESPOSTA DA EXCLUSÃO:',
          {
            data,
            error,
          }
        );


        if (error) {

          console.log(
            'ERRO AO EXCLUIR CONSULTA:',
            error
          );


          Alert.alert(
            'Erro ao excluir',
            error.message ||
            'Não foi possível excluir a consulta.'
          );


          return;
        }


        console.log(
          'CONSULTA EXCLUÍDA COM SUCESSO!'
        );


        setConsultas(

          prev =>

            prev.filter(
              item =>
                item.id !==
                registro.id
            )

        );


        Alert.alert(
          'Sucesso',
          'Consulta excluída com sucesso!'
        );


        return;
      }


      console.log(
        'ERRO: origem desconhecida:',
        registro.origem
      );


      Alert.alert(
        'Erro',
        'Não foi possível identificar o tipo do registro.'
      );

    }

    catch (erro) {

      console.log(
        'ERRO INESPERADO AO EXCLUIR:',
        erro
      );


      Alert.alert(
        'Erro',
        erro.message ||
        'Ocorreu um erro inesperado.'
      );

    }

    finally {

      setExcluindo(false);

    }
  }


  // ===================================================
  // DETALHES
  // ===================================================

  function abrirDetalhes(
    registro
  ) {

    if (
      registro.origem ===
      'atendimento'
    ) {

      Alert.alert(

        'Atendimento de triagem',

        `Paciente: ${registro.paciente}

Data: ${registro.data}

Horário: ${registro.horario}

Profissional: ${registro.profissional}

Queixa principal:
${registro.queixa_principal}

Classificação:
${registro.classificacao}

Observações:
${registro.observacoes || 'Nenhuma'}`

      );


      return;
    }


    Alert.alert(

      'Consulta',

      `Paciente: ${registro.paciente}

Data: ${registro.data}

Horário: ${registro.horario}

Profissional: ${registro.profissional}

Especialidade:
${registro.especialidade}

Motivo:
${registro.motivo}

Observações:
${registro.observacoes || 'Nenhuma'}`

    );
  }


  // ===================================================
  // TELA DE TRIAGEM
  // ===================================================

  if (
    tela ===
    'novoAtendimento'
  ) {

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


  // ===================================================
  // TELA DE CONSULTA
  // ===================================================

  if (
    tela ===
    'novaConsulta'
  ) {

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


  // ===================================================
  // HISTÓRICO
  // ===================================================

  if (
    tela ===
    'atendimentos'
  ) {

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
            Consultas e atendimentos de triagem
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

          {carregando ? (

            <View
              style={styles.carregando}
            >

              <ActivityIndicator
                size="large"
                color="#8B008B"
              />

              <Text
                style={styles.carregandoTexto}
              >
                Carregando registros...
              </Text>

            </View>

          ) : historico.length === 0 ? (

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
                Cadastre uma consulta ou uma
                triagem para começar seu histórico.
              </Text>

            </View>

          ) : (

            historico.map(
              registro => (

                <AtendimentoCard

                  key={
                    `${registro.origem}-${registro.id}`
                  }

                  atendimento={
                    registro
                  }

                  onPress={() =>
                    abrirDetalhes(
                      registro
                    )
                  }

                  onDelete={() =>
                    excluirRegistro(
                      registro
                    )
                  }

                />

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

            disabled={excluindo}

          >

            <Text
              style={
                styles.novoButtonTexto
              }
            >
              🩺 Nova triagem
            </Text>

          </TouchableOpacity>


          {/* NOVA CONSULTA */}

          <TouchableOpacity

            style={
              styles.consultaButton
            }

            onPress={() =>
              setTela(
                'novaConsulta'
              )
            }

            disabled={excluindo}

          >

            <Text
              style={
                styles.consultaButtonTexto
              }
            >
              📅 Nova consulta
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>

    );
  }


  // ===================================================
  // HOME PRINCIPAL
  // ===================================================

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
            Acompanhe suas consultas e
            atendimentos de triagem de forma
            simples e organizada.
          </Text>

        </View>


        {/* RESUMO */}

        <SectionTitle

          title="Resumo"

          subtitle="Visão geral dos seus registros"

        />


        <Card

          title="Triagens"

          value={
            String(
              atendimentos.length
            )
          }

          description="Atendimentos de triagem"

          icon="🩺"

          onPress={() =>
            setTela(
              'atendimentos'
            )
          }

        />


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
              'atendimentos'
            )
          }

        />


        <Card

          title="Total"

          value={
            String(
              historico.length
            )
          }

          description="Registros no histórico"

          icon="📋"

          onPress={() =>
            setTela(
              'atendimentos'
            )
          }

        />


        {/* AÇÕES */}

        <SectionTitle

          title="Ações rápidas"

          subtitle="Registre novas informações"

        />


        <ActionButton

          title="Atendimento de triagem"

          icon="🩺"

          onPress={() =>
            setTela(
              'novoAtendimento'
            )
          }

        />


        <ActionButton

          title="Nova consulta"

          icon="📅"

          onPress={() =>
            setTela(
              'novaConsulta'
            )
          }

        />


        <ActionButton

          title="Ver histórico"

          icon="📋"

          onPress={() =>
            setTela(
              'atendimentos'
            )
          }

        />


        {/* ÚLTIMOS REGISTROS */}

        <SectionTitle

          title="Últimos registros"

          subtitle="Atividades recentes"

        />


        {historico
          .slice(0, 3)
          .map(
            registro => (

              <TouchableOpacity

                key={
                  `home-${registro.origem}-${registro.id}`
                }

                style={
                  styles.historyCard
                }

                onPress={() =>
                  abrirDetalhes(
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

                    {
                      registro.origem ===
                      'consulta'
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
                      registro.origem ===
                      'consulta'
                        ? 'Consulta'
                        : 'Triagem'
                    }

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

                </View>


                <Text
                  style={
                    styles.historyArrow
                  }
                >
                  ›
                </Text>

              </TouchableOpacity>

            )
          )}


        {historico.length === 0 && (

          <View
            style={styles.semHistorico}
          >

            <Text
              style={
                styles.semHistoricoTexto
              }
            >
              Nenhum registro recente.
            </Text>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>

  );
}


// =====================================================
// ESTILOS
// =====================================================

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

    maxWidth: 500,

  },


  // ==========================================
  // HISTÓRICO
  // ==========================================

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


  historyArrow: {

    fontSize: 28,

    color: '#8B008B',

    marginLeft: 8,

  },


  semHistorico: {

    padding: 20,

    alignItems: 'center',

  },


  semHistoricoTexto: {

    color: '#777',

    fontSize: 13,

  },


  // ==========================================
  // CABEÇALHO
  // ==========================================

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


  // ==========================================
  // CARREGANDO
  // ==========================================

  carregando: {

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 35,

    alignItems: 'center',

    marginBottom: 20,

  },


  carregandoTexto: {

    marginTop: 12,

    fontSize: 13,

    color: '#555',

  },


  // ==========================================
  // VAZIO
  // ==========================================

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


  // ==========================================
  // BOTÃO TRIAGEM
  // ==========================================

  novoButton: {

    backgroundColor: '#8B008B',

    borderRadius: 14,

    height: 54,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 5,

    marginBottom: 10,

  },


  novoButtonTexto: {

    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: 'bold',

  },


  // ==========================================
  // BOTÃO CONSULTA
  // ==========================================

  consultaButton: {

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#8B008B',

    borderRadius: 14,

    height: 54,

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 10,

  },


  consultaButtonTexto: {

    color: '#8B008B',

    fontSize: 15,

    fontWeight: 'bold',

  },

});