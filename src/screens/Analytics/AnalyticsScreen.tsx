import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated2, { FadeInUp, FadeInLeft } from 'react-native-reanimated';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/utils/theme';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatViews } from '@/utils/formatters';
import { SkeletonCard } from '@/components/ui';

const { width: SCREEN_W } = Dimensions.get('window');
const CHART_W = SCREEN_W - Spacing.xl * 2 - 32;
const BAR_MAX_H = 100;
const CHART_BAR_COUNT = 7;
const NICHE_COUNT = 4;

const PERIOD_TABS = ['7N', '30N', '3T'];

export function AnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const [activePeriod, setActivePeriod] = useState(0);

  const { summary, chartData, niches, isLoading } = useAnalytics();

  // Fixed-size refs — must match CHART_BAR_COUNT and NICHE_COUNT from mock data
  const barAnims = useRef(Array.from({ length: CHART_BAR_COUNT }, () => new Animated.Value(0))).current;
  const barAnimsB = useRef(Array.from({ length: CHART_BAR_COUNT }, () => new Animated.Value(0))).current;
  const nicheAnims = useRef(Array.from({ length: NICHE_COUNT }, () => new Animated.Value(0))).current;

  useEffect(() => {
    if (isLoading || chartData.length === 0 || niches.length === 0) return;

    barAnims.forEach((a) => a.setValue(0));
    barAnimsB.forEach((a) => a.setValue(0));
    nicheAnims.forEach((a) => a.setValue(0));

    const barAnimations = chartData.slice(0, CHART_BAR_COUNT).map((d, i) =>
      Animated.timing(barAnims[i], { toValue: d.value, duration: 600, delay: i * 60, useNativeDriver: false })
    );
    const barAnimationsB = chartData.slice(0, CHART_BAR_COUNT).map((d, i) =>
      Animated.timing(barAnimsB[i], { toValue: d.secondaryValue ?? 0, duration: 600, delay: i * 60 + 100, useNativeDriver: false })
    );
    const nicheAnimations = niches.slice(0, NICHE_COUNT).map((n, i) =>
      Animated.timing(nicheAnims[i], { toValue: n.pct / 100, duration: 800, delay: 200 + i * 100, useNativeDriver: false })
    );
    Animated.parallel([...barAnimations, ...barAnimationsB, ...nicheAnimations]).start();
  }, [isLoading, chartData, niches]);

  const barW = (CHART_W - 8 * 6) / 7 / 2 - 2;
  const nicheBarW = SCREEN_W - Spacing.xl * 2 - 32;

  const summaryCards = summary
    ? [
        { icon: '📈', value: formatViews(summary.totalViews), label: 'Tổng lượt xem', change: '▲ +23.4%', changeColor: Colors.success },
        { icon: '🏷️', value: String(summary.trendingHashtags), label: 'Hashtag trending', change: '▲ +18 mới', changeColor: Colors.success },
        { icon: '📦', value: formatViews(summary.hotProducts), label: 'Sản phẩm hot', change: '→ Ổn định', changeColor: Colors.warning },
        { icon: '🎬', value: formatViews(summary.viralVideos), label: 'Video viral', change: '▼ -2.1%', changeColor: Colors.danger },
      ]
    : [];

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
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSub}>Biểu đồ xu hướng 7 ngày qua</Text>
        </LinearGradient>

        {/* Summary grid 2x2 */}
        <Animated2.View entering={FadeInUp.delay(80).duration(400)} style={styles.summaryGrid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <View key={i} style={styles.summaryCardSkeleton}>
                  <SkeletonCard />
                </View>
              ))
            : summaryCards.map((card) => (
                <View key={card.label} style={styles.summaryCard}>
                  <Text style={styles.scIcon}>{card.icon}</Text>
                  <Text style={styles.scVal}>{card.value}</Text>
                  <Text style={styles.scLbl}>{card.label}</Text>
                  <Text style={[styles.scChg, { color: card.changeColor }]}>{card.change}</Text>
                </View>
              ))}
        </Animated2.View>

        {/* Bar chart */}
        <Animated2.View entering={FadeInLeft.delay(160).duration(500)} style={styles.analyticsCard}>
          <View style={styles.acHeader}>
            <Text style={styles.acTitle}>Lượt xem / Ngày</Text>
            <View style={styles.periodTabs}>
              {PERIOD_TABS.map((tab, idx) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActivePeriod(idx)}
                  style={[styles.periodTab, activePeriod === idx && styles.periodTabActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.periodTabText, activePeriod === idx && styles.periodTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bars */}
          <View style={styles.barChart}>
            {chartData.slice(0, CHART_BAR_COUNT).map((d, i) => (
              <View key={d.label} style={styles.barGroup}>
                <View style={[styles.barWrap, { height: BAR_MAX_H }]}>
                  <Animated.View
                    style={[
                      styles.bar,
                      styles.barA,
                      { height: barAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0, BAR_MAX_H] }), width: barW },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.bar,
                      styles.barB,
                      { height: barAnimsB[i].interpolate({ inputRange: [0, 1], outputRange: [0, BAR_MAX_H] }), width: barW },
                    ]}
                  />
                </View>
                <Text style={styles.barLbl}>{d.label}</Text>
              </View>
            ))}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>Tuần này</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#C4B5FD', opacity: 0.7 }]} />
              <Text style={styles.legendText}>Tuần trước</Text>
            </View>
          </View>
        </Animated2.View>

        {/* Top niche */}
        <Animated2.View entering={FadeInUp.delay(240).duration(400)} style={styles.analyticsCard}>
          <View style={styles.acHeader}>
            <Text style={styles.acTitle}>Top Niche Tháng Này</Text>
          </View>
          <View style={styles.nicheList}>
            {niches.slice(0, NICHE_COUNT).map((niche, i) => (
              <View key={niche.id} style={styles.nicheRow}>
                <View style={styles.nicheHeader}>
                  <Text style={styles.nicheName}>{niche.icon} {niche.name}</Text>
                  <Text style={styles.nichePct}>{niche.pct}%</Text>
                </View>
                <View style={[styles.nicheBgBar, { width: nicheBarW }]}>
                  <Animated.View
                    style={[
                      styles.nicheFillBar,
                      {
                        width: nicheAnims[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, nicheBarW],
                        }),
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={niche.colors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={StyleSheet.absoluteFill}
                    />
                  </Animated.View>
                </View>
              </View>
            ))}
          </View>
        </Animated2.View>
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

  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  summaryCard: {
    width: (Dimensions.get('window').width - Spacing.xl * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    padding: Spacing.lg,
    ...Shadow.cardSm,
  },
  summaryCardSkeleton: {
    width: (Dimensions.get('window').width - Spacing.xl * 2 - Spacing.sm) / 2,
  },
  scIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  scVal: {
    fontSize: FontSize.heading,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    marginBottom: 2,
  },
  scLbl: {
    fontSize: FontSize.caption,
    color: Colors.textSub,
    marginBottom: 4,
  },
  scChg: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
  },

  analyticsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    margin: Spacing.xl,
    marginBottom: 0,
    padding: Spacing.lg,
    ...Shadow.card,
  },
  acHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  acTitle: {
    fontSize: FontSize.titleSm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.bg,
    borderRadius: Radius.chip,
    padding: 2,
  },
  periodTab: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: Radius.chip - 2,
  },
  periodTabActive: {
    backgroundColor: Colors.primary,
  },
  periodTabText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.medium,
    color: Colors.textSub,
  },
  periodTabTextActive: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },

  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barGroup: {
    alignItems: 'center',
    gap: 4,
  },
  barWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    borderRadius: 4,
  },
  barA: {
    backgroundColor: Colors.primary,
  },
  barB: {
    backgroundColor: '#C4B5FD',
    opacity: 0.7,
  },
  barLbl: {
    fontSize: 10,
    color: Colors.textSub,
    fontWeight: FontWeight.medium,
  },

  legend: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textSub,
    fontWeight: FontWeight.medium,
  },

  nicheList: {
    gap: Spacing.md,
  },
  nicheRow: {
    gap: 5,
  },
  nicheHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nicheName: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  nichePct: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  nicheBgBar: {
    height: 6,
    backgroundColor: Colors.bg,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  nicheFillBar: {
    height: 6,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
});
