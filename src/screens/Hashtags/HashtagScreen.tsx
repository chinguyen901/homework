import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/utils/theme';

const { width: SCREEN_W } = Dimensions.get('window');
const BAR_MAX_W = SCREEN_W - Spacing.xl * 2 - 48;

const HASHTAGS = [
  { rank: '01', tag: '#vaymaxiboho', views: '24.5M lượt xem', change: '▲ +127%', barPct: 0.92, isNew: false },
  { rank: '02', tag: '#mypchamhangquoc', views: '18.2M lượt xem', change: '▲ +89%', barPct: 0.75, isNew: false },
  { rank: '03', tag: '#amthucviral', views: '31.0M lượt xem', change: '✦ Mới bùng', barPct: 1.0, isNew: true },
  { rank: '04', tag: '#trangtriphong', views: '12.8M lượt xem', change: '▲ +62%', barPct: 0.58, isNew: false },
  { rank: '05', tag: '#affiliateviet', views: '9.4M lượt xem', change: '▲ +41%', barPct: 0.45, isNew: false },
  { rank: '06', tag: '#tiktokviral2024', views: '8.1M lượt xem', change: '▲ +35%', barPct: 0.38, isNew: false },
  { rank: '07', tag: '#shopviet', views: '6.5M lượt xem', change: '✦ Mới', barPct: 0.28, isNew: true },
];

const TIME_TABS = ['Hôm nay', 'Tuần này', 'Tháng này'];

export function HashtagScreen() {
  const insets = useSafeAreaInsets();
  const [activeTime, setActiveTime] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#5B21B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + Spacing.md }]}
        >
          <Text style={styles.headerTitle}>Hashtag Analyzer</Text>
          <Text style={styles.headerSub}>Top hashtag đang viral trên TikTok</Text>
        </LinearGradient>

        {/* Search */}
        <Animated.View entering={FadeInUp.delay(80).duration(400)} style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={Colors.textSub} />
          <TextInput
            style={styles.searchInput}
            placeholder="#hashtag_cần_tìm..."
            placeholderTextColor={Colors.textSub}
            value={search}
            onChangeText={setSearch}
          />
        </Animated.View>

        {/* Time tabs */}
        <Animated.View entering={FadeInUp.delay(120).duration(400)} style={styles.timeTabs}>
          {TIME_TABS.map((tab, idx) => (
            <TouchableOpacity
              key={tab}
              style={[styles.timeTab, activeTime === idx && styles.timeTabActive]}
              onPress={() => setActiveTime(idx)}
              activeOpacity={0.7}
            >
              <Text style={[styles.timeTabText, activeTime === idx && styles.timeTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Hashtag rows */}
        <View style={styles.hashList}>
          {HASHTAGS.map((h, index) => (
            <Animated.View key={h.tag} entering={FadeInUp.delay(160 + index * 70).duration(400)}>
              <TouchableOpacity style={styles.hashRow} activeOpacity={0.7}>
                <View style={styles.hrTop}>
                  <View style={styles.hrLeft}>
                    <Text style={styles.hrRank}>{h.rank}</Text>
                    <View>
                      <Text style={styles.hrTag}>{h.tag}</Text>
                      <Text style={styles.hrViews}>{h.views}</Text>
                    </View>
                  </View>
                  <Text style={[styles.hrChange, h.isNew ? styles.hrChangeNew : styles.hrChangeUp]}>
                    {h.change}
                  </Text>
                </View>
                {/* Progress bar */}
                <View style={styles.barBg}>
                  <LinearGradient
                    colors={h.isNew ? ['#A78BFA', '#7C3AED'] : ['#7C3AED', '#5B21B6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: BAR_MAX_W * h.barPct }]}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: FontSize.heading,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: FontSize.bodySm,
    color: 'rgba(255,255,255,0.7)',
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
    height: 44,
    gap: Spacing.sm,
    ...Shadow.cardSm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.text,
  },

  timeTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  timeTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: Radius.chip,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: 'center',
  },
  timeTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeTabText: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.medium,
    color: Colors.textSub,
  },
  timeTabTextActive: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },

  hashList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xs,
  },
  hashRow: {
    backgroundColor: Colors.card,
    borderRadius: Radius.listItem,
    padding: Spacing.md,
    ...Shadow.cardSm,
  },
  hrTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  hrLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  hrRank: {
    fontSize: FontSize.title,
    fontWeight: FontWeight.extrabold,
    color: Colors.primaryLight,
    width: 32,
  },
  hrTag: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: 2,
  },
  hrViews: {
    fontSize: FontSize.caption,
    color: Colors.textSub,
  },
  hrChange: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
  },
  hrChangeUp: {
    color: Colors.success,
  },
  hrChangeNew: {
    color: Colors.primary,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },

  barBg: {
    height: 6,
    backgroundColor: Colors.bg,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    borderRadius: Radius.full,
  },
});
