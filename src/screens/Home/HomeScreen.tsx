import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/utils/theme';
import { useTrending } from '@/hooks/useTrending';
import { useUserStore } from '@/stores/userStore';
import { formatViews, formatGrowth, formatCurrency } from '@/utils/formatters';
import { Skeleton, SkeletonCard } from '@/components/ui';
import { TrendItem } from '@/types/trending.types';

const { width: SCREEN_W } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { icon: '🔍', label: 'Tìm Xu Hướng', bg: Colors.primaryBg },
  { icon: '📊', label: 'Phân Tích', bg: '#D1FAE5' },
  { icon: '🏷️', label: 'Hashtag', bg: '#FEF3C7' },
  { icon: '⚡', label: 'Cảnh Báo', bg: '#FEE2E2' },
];

function getTrendBadge(trend: TrendItem): { label: string; isHot: boolean } {
  if (trend.growth > 100) return { label: '🔥 Hot', isHot: true };
  if (trend.isLive) return { label: 'Mới', isHot: false };
  return { label: 'Tăng', isHot: false };
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { trends, isLoading } = useTrending();
  const displayName = useUserStore((s) => s.displayName);
  const avatarInitial = useUserStore((s) => s.avatarInitial);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Gradient header */}
        <LinearGradient
          colors={['#7C3AED', '#5B21B6', '#4C1D95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradHeader, { paddingTop: insets.top + Spacing.md }]}
        >
          {/* Top row: greeting + icons */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Xin chào 👋</Text>
              <Text style={styles.userName}>{displayName}</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={22} color="rgba(255,255,255,0.9)" />
                <View style={styles.notifDot} />
              </TouchableOpacity>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{avatarInitial}</Text>
                <View style={styles.avatarOnline} />
              </View>
            </View>
          </View>

          {/* Stats hero card */}
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Tổng Trending Đang Theo Dõi</Text>
            <Text style={styles.statsBigNum}>🔥 11,356</Text>
            <View style={styles.statsPills}>
              <StatPillItem label="Hashtag Hot" value="245" change="▲ +18 hôm nay" up />
              <StatPillItem label="Sản Phẩm Trending" value="1,204" change="▲ +89 mới" up />
              <StatPillItem label="Video Viral" value="9.9K" change="▼ -2.1%" up={false} />
            </View>
          </View>
        </LinearGradient>

        {/* Quick actions */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity key={action.label} style={styles.qaBtn} activeOpacity={0.7}>
              <View style={[styles.qaIcon, { backgroundColor: action.bg }]}>
                <Text style={styles.qaEmoji}>{action.icon}</Text>
              </View>
              <Text style={styles.qaLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Trending today section */}
        <Animated.View entering={FadeInUp.delay(160).duration(400)}>
          <SectionHeader title="🔥 Trending Hôm Nay" />
        </Animated.View>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          entering={FadeInUp.delay(200).duration(400)}
          contentContainerStyle={styles.trendScroll}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <View key={i} style={styles.trendChipSkeleton}>
                  <Skeleton width={130} height={110} borderRadius={Radius.card} />
                </View>
              ))
            : trends.slice(0, 4).map((trend) => {
                const badge = getTrendBadge(trend);
                return (
                  <TouchableOpacity key={trend.id} style={styles.trendChip} activeOpacity={0.85}>
                    <View style={styles.chipTop}>
                      <Text style={styles.chipIcon}>{trend.icon ?? '📦'}</Text>
                      <View style={[styles.chipBadge, badge.isHot ? styles.chipBadgeHot : styles.chipBadgeTrend]}>
                        <Text style={[styles.chipBadgeText, badge.isHot ? styles.chipBadgeHotText : styles.chipBadgeTrendText]}>
                          {badge.label}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.chipName} numberOfLines={2}>{trend.name}</Text>
                    <Text style={styles.chipViews}>{formatViews(trend.views)} lượt xem</Text>
                    <Text style={[styles.chipGrowth, { color: trend.growth >= 0 ? Colors.success : Colors.danger }]}>
                      {trend.growth >= 0 ? '▲' : '▼'} {formatGrowth(trend.growth)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
        </Animated.ScrollView>

        {/* Top products section */}
        <Animated.View entering={FadeInUp.delay(250).duration(400)}>
          <SectionHeader title="📦 Sản Phẩm Bán Chạy" />
        </Animated.View>

        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.listItemWrapper}>
                <SkeletonCard />
              </View>
            ))
          : trends.map((trend, index) => (
              <Animated.View
                key={trend.id}
                entering={FadeInUp.delay(300 + index * 80).duration(400)}
                style={styles.listItemWrapper}
              >
                <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                  <View style={[styles.liIcon, { backgroundColor: trend.bgColor ?? Colors.primaryBg }]}>
                    <Text style={styles.liEmoji}>{trend.icon ?? '📦'}</Text>
                  </View>
                  <View style={styles.liInfo}>
                    <Text style={styles.liName} numberOfLines={1}>{trend.name}</Text>
                    <Text style={styles.liSub}>{formatViews(trend.videoCount)} video đang dùng</Text>
                  </View>
                  <View style={styles.liRight}>
                    <Text style={styles.liVal}>{formatCurrency(trend.price ?? 0)}</Text>
                    <Text style={[styles.liChg, { color: trend.growth >= 0 ? Colors.success : Colors.danger }]}>
                      {trend.growth >= 0 ? '▲' : '▼'} {formatGrowth(trend.growth)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
      </ScrollView>
    </View>
  );
}

function StatPillItem({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={styles.pillVal}>{value}</Text>
      <Text style={[styles.pillChg, { color: up ? '#86EFAC' : '#FCA5A5' }]}>{change}</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.sectionLink}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  // Header
  gradHeader: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl + 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.bodySm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  userName: {
    fontSize: FontSize.title,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
    borderWidth: 1.5,
    borderColor: '#5B21B6',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: FontSize.titleSm,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  avatarOnline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },

  // Stats card
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.card,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  statsLabel: {
    fontSize: FontSize.caption,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: Spacing.xs,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsBigNum: {
    fontSize: 34,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    marginBottom: Spacing.md,
  },
  statsPills: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  pill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.chip,
    padding: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  pillLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  pillVal: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 1,
  },
  pillChg: {
    fontSize: 9,
    fontWeight: FontWeight.medium,
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.card,
    marginTop: -1,
    ...Shadow.cardSm,
  },
  qaBtn: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  qaIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.listItem,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaEmoji: {
    fontSize: 24,
  },
  qaLabel: {
    fontSize: 11,
    fontWeight: FontWeight.medium,
    color: Colors.text,
    textAlign: 'center',
    maxWidth: 64,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.titleSm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  sectionLink: {
    fontSize: FontSize.bodySm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },

  // Trend chips
  trendScroll: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  trendChip: {
    width: 130,
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    padding: Spacing.md,
    ...Shadow.cardSm,
  },
  trendChipSkeleton: {
    marginRight: Spacing.sm,
  },
  chipTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  chipIcon: {
    fontSize: 24,
  },
  chipBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  chipBadgeHot: {
    backgroundColor: '#FEF3C7',
  },
  chipBadgeTrend: {
    backgroundColor: Colors.primaryBg,
  },
  chipBadgeText: {
    fontSize: 9,
    fontWeight: FontWeight.semibold,
  },
  chipBadgeHotText: {
    color: '#D97706',
  },
  chipBadgeTrendText: {
    color: Colors.primary,
  },
  chipName: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  chipViews: {
    fontSize: FontSize.caption,
    color: Colors.textSub,
    marginBottom: 4,
  },
  chipGrowth: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
  },

  // Product list
  listItemWrapper: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.listItem,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.cardSm,
  },
  liIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.listItem,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liEmoji: {
    fontSize: 22,
  },
  liInfo: {
    flex: 1,
  },
  liName: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: 2,
  },
  liSub: {
    fontSize: FontSize.caption,
    color: Colors.textSub,
  },
  liRight: {
    alignItems: 'flex-end',
  },
  liVal: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  liChg: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
  },
});
