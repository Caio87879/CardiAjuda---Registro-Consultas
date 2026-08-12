import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Header({
  userName = 'Usuário',
  onNotificationPress,
}) {
  return (
    <View style={styles.header}>

      <View style={styles.brandContainer}>

        <View style={styles.logo}>
          <Text style={styles.logoText}>
            C
          </Text>
        </View>

        <View>
          <Text style={styles.brand}>
            CardiAjuda
          </Text>

          <Text style={styles.subtitle}>
            Saúde e acompanhamento
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.notification}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Text style={styles.notificationIcon}>
          🔔
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF1',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#8B008B',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B008B',
  },

  subtitle: {
    fontSize: 11,
    color: '#161515',
    marginTop: 2,
  },

  notification: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F6F8',

    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationIcon: {
    fontSize: 20,
  },

});