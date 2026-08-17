import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


export default function AtendimentoCard({
  atendimento,
  onPress,
  onDelete,
}) {

  function excluir() {

    console.log('================================');
    console.log('BOTÃO EXCLUIR CLICADO');
    console.log('ID:', atendimento.id);
    console.log('TIPO:', atendimento.tipo);
    console.log('ORIGEM:', atendimento.origem);
    console.log('ONDELETE EXISTE:', !!onDelete);
    console.log('================================');


    if (!onDelete) {

      console.log(
        'ERRO: onDelete não foi recebido!'
      );

      return;
    }


    console.log(
      'CHAMANDO ONDELETE...'
    );


    onDelete();


    console.log(
      'ONDELETE FOI CHAMADO'
    );
  }


  return (

    <View style={styles.card}>

      {/* =========================================
          CONTEÚDO DO REGISTRO
      ========================================= */}

      <TouchableOpacity
        style={styles.conteudo}
        onPress={onPress}
        activeOpacity={0.8}
      >

        {/* ÍCONE */}

        <View style={styles.iconContainer}>

          <Text style={styles.icon}>

            {atendimento.tipo === 'Consulta'
              ? '📅'
              : '🩺'}

          </Text>

        </View>


        {/* INFORMAÇÕES */}

        <View style={styles.informacoes}>

          <Text style={styles.tipo}>

            {atendimento.tipo || 'Registro'}

          </Text>


          <Text style={styles.paciente}>

            {atendimento.paciente || 'Paciente não informado'}

          </Text>


          <Text style={styles.data}>

            {atendimento.data || '--/--/----'}

            {' • '}

            {atendimento.horario || '--:--'}

          </Text>


          <Text style={styles.profissional}>

            {atendimento.profissional ||
              'Profissional não informado'}

          </Text>


          {/* STATUS */}

          <View style={styles.statusContainer}>

            <Text style={styles.status}>

              {atendimento.status || 'Registrado'}

            </Text>

          </View>

        </View>


        {/* SETA */}

        <Text style={styles.seta}>
          ›
        </Text>

      </TouchableOpacity>


      {/* =========================================
          BOTÃO EXCLUIR
      ========================================= */}

      <TouchableOpacity

        style={styles.excluir}

        onPress={excluir}

        activeOpacity={0.7}

      >

        <Text style={styles.excluirTexto}>
          Excluir
        </Text>

      </TouchableOpacity>

    </View>
  );
}


// =====================================================
// ESTILOS
// =====================================================

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


  paciente: {

    fontSize: 13,

    fontWeight: '600',

    color: '#222222',

    marginBottom: 3,
  },


  data: {

    fontSize: 12,

    color: '#161515',

    marginBottom: 3,
  },


  profissional: {

    fontSize: 12,

    color: '#555555',
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

    justifyContent: 'center',

    paddingVertical: 10,

    backgroundColor: '#FFFFFF',
  },


  excluirTexto: {

    color: '#B00020',

    fontSize: 13,

    fontWeight: '600',
  },

});