import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import AtendimentoCard from './components/atendimento/AtendimentoCard';
import AtendimentoForm from './components/atendimento/AtendimentoForm';

export default function App() {

  const [tela, setTela] = useState('lista');

  const [atendimentos, setAtendimentos] = useState([
    {
      id: '1',
      tipo: 'Consulta médica',
      data: '05/08/2026',
      horario: '14:30',
      profissional: 'Dr. João Silva',
      observacoes: 'Acompanhamento de rotina.',
      status: 'Concluído',
    },

    {
      id: '2',
      tipo: 'Acompanhamento',
      data: '22/08/2026',
      horario: '10:00',
      profissional: 'Dra. Maria Oliveira',
      observacoes: 'Acompanhamento da pressão arterial.',
      status: 'Agendado',
    },
  ]);

  const [atendimentoSelecionado, setAtendimentoSelecionado] =
    useState(null);

  function adicionarAtendimento(novoAtendimento) {
    setAtendimentos([
      ...atendimentos,
      novoAtendimento,
    ]);

    setTela('lista');
  }

  function abrirDetalhes(atendimento) {
    setAtendimentoSelecionado(atendimento);
    setTela('detalhes');
  }

  function excluirAtendimento(id) {
    Alert.alert(
      'Excluir atendimento',
      'Deseja realmente excluir este atendimento?',
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
                (item) => item.id !== id
              )
            );
          },
        },
      ]
    );
  }

  // -------------------------
  // TELA DE NOVO ATENDIMENTO
  // -------------------------

  if (tela === 'novo') {
    return (
      <SafeAreaView style={styles.safe}>
        <AtendimentoForm
          onSave={adicionarAtendimento}
          onCancel={() => setTela('lista')}
        />
      </SafeAreaView>
    );
  }

  // -------------------------
  // TELA DE DETALHES
  // -------------------------

  if (tela === 'detalhes' && atendimentoSelecionado) {

    const atendimento = atendimentoSelecionado;

    return (
      <SafeAreaView style={styles.safe}>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.detalhesContainer}
        >

          <TouchableOpacity
            onPress={() => setTela('lista')}
          >
            <Text style={styles.voltar}>
              ‹ Voltar
            </Text>
          </TouchableOpacity>

          <View style={styles.headerDetalhes}>

            <View style={styles.iconGrande}>
              <Text style={styles.iconGrandeTexto}>
                🩺
              </Text>
            </View>

            <Text style={styles.tituloDetalhes}>
              {atendimento.tipo}
            </Text>

            <View style={styles.statusDetalhes}>
              <Text style={styles.statusTexto}>
                {atendimento.status}
              </Text>
            </View>

          </View>

          <View style={styles.infoBox}>

            <Text style={styles.infoTitulo}>
              Data
            </Text>

            <Text style={styles.infoTexto}>
              {atendimento.data}
            </Text>

          </View>

          <View style={styles.infoBox}>

            <Text style={styles.infoTitulo}>
              Horário
            </Text>

            <Text style={styles.infoTexto}>
              {atendimento.horario}
            </Text>

          </View>

          <View style={styles.infoBox}>

            <Text style={styles.infoTitulo}>
              Profissional
            </Text>

            <Text style={styles.infoTexto}>
              {atendimento.profissional}
            </Text>

          </View>

          <View style={styles.infoBox}>

            <Text style={styles.infoTitulo}>
              Observações
            </Text>

            <Text style={styles.infoTexto}>
              {atendimento.observacoes || 'Nenhuma observação registrada.'}
            </Text>

          </View>

        </ScrollView>

      </SafeAreaView>
    );
  }


  // TELA PRINCIPAL

  return (
    <SafeAreaView style={styles.safe}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>

          <View>
            <Text style={styles.pequenoTitulo}>
              CardiaJuda
            </Text>

            <Text style={styles.titulo}>
              Consultas e
              {'\n'}
              Acompanhamentos
            </Text>
          </View>

          <View style={styles.usuario}>
            <Text style={styles.usuarioTexto}>
              👤
            </Text>
          </View>

        </View>

        {atendimentos.length > 0 && (
          <>
            <Text style={styles.secaoTitulo}>
              Próximo atendimento
            </Text>

            <TouchableOpacity
              style={styles.proximoCard}
              onPress={() =>
                abrirDetalhes(atendimentos[0])
              }
              activeOpacity={0.8}
            >

              <View style={styles.proximoIcon}>
                <Text style={styles.proximoEmoji}>
                  🩺
                </Text>
              </View>

              <View style={{ flex: 1 }}>

                <Text style={styles.proximoTipo}>
                  {atendimentos[0].tipo}
                </Text>

                <Text style={styles.proximoData}>
                  {atendimentos[0].data}
                  {' • '}
                  {atendimentos[0].horario}
                </Text>

                <Text style={styles.proximoProfissional}>
                  {atendimentos[0].profissional}
                </Text>

              </View>

              <Text style={styles.seta}>
                ›
              </Text>

            </TouchableOpacity>
          </>
        )}

        {/* HISTÓRICO */}

        <Text style={styles.secaoTitulo}>
          Histórico
        </Text>

        {atendimentos.length === 0 ? (

          <View style={styles.vazio}>

            <Text style={styles.vazioEmoji}>
              📋
            </Text>

            <Text style={styles.vazioTitulo}>
              Nenhum atendimento
            </Text>

            <Text style={styles.vazioTexto}>
              Seus atendimentos aparecerão aqui.
            </Text>

          </View>

        ) : (

          atendimentos.map((atendimento) => (

            <AtendimentoCard
              key={atendimento.id}
              atendimento={atendimento}
              onPress={() =>
                abrirDetalhes(atendimento)
              }
              onDelete={() =>
                excluirAtendimento(atendimento.id)
              }
            />

          ))

        )}

        {/* BOTÃO NOVO ATENDIMENTO */}

        <TouchableOpacity
          style={styles.novoButton}
          onPress={() => setTela('novo')}
          activeOpacity={0.8}
        >

          <Text style={styles.novoButtonTexto}>
            ＋ Novo atendimento
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },

  pequenoTitulo: {
    fontSize: 15,
    color: '#8B008B',
    fontWeight: '600',
    marginBottom: 7,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#202020',
    lineHeight: 34,
  },

  usuario: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7E5F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  usuarioTexto: {
    fontSize: 23,
  },

  secaoTitulo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 13,
    marginTop: 5,
  },

  proximoCard: {
    backgroundColor: '#8B008B',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  proximoIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  proximoEmoji: {
    fontSize: 25,
  },

  proximoTipo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  proximoData: {
    color: '#F9DDF1',
    fontSize: 14,
    marginBottom: 4,
  },

  proximoProfissional: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  seta: {
    color: '#FFFFFF',
    fontSize: 32,
    marginLeft: 10,
  },

  novoButton: {
    height: 56,
    backgroundColor: '#8B008B',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  novoButtonTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  voltar: {
    fontSize: 17,
    color: '#8B008B',
    fontWeight: '600',
    marginBottom: 25,
  },

  detalhesContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  headerDetalhes: {
    alignItems: 'center',
    marginBottom: 30,
  },

  iconGrande: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F7E5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  iconGrandeTexto: {
    fontSize: 36,
  },

  tituloDetalhes: {
    fontSize: 25,
    fontWeight: '700',
    color: '#202020',
    textAlign: 'center',
    marginBottom: 10,
  },

  statusDetalhes: {
    backgroundColor: '#F7E5F2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusTexto: {
    color: '#8B008B',
    fontWeight: '600',
  },

  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0DDE0',
    padding: 18,
    marginBottom: 12,
  },

  infoTitulo: {
    color: '#777777',
    fontSize: 13,
    marginBottom: 6,
  },

  infoTexto: {
    color: '#222222',
    fontSize: 16,
    lineHeight: 23,
  },

  vazio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0DDE0',
    marginBottom: 20,
  },

  vazioEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },

  vazioTexto: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },

});