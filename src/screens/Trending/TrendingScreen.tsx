import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/utils/theme';
import { useTrending } from '@/hooks/useTrending';
import { useFilterStore } from '@/stores/filterStore';
import { formatViews, formatGrowth, formatCurrency } from '@/utils/formatters';
import { SkeletonCard } from '@/components/ui';
import { TrendCategory } from '@/types/trending.types';

const FILTERS = ['Tất cả', 'Thời trang', 'Mỹ phẩm', 'Đồ ăn', 'Gia dụng', 'Phụ kiện'];
const CATEGORY_MAP: (TrendCategory | null)[] = [null, 'fashion', 'beauty', 'food', 'home', 'gadget'];

const CATEGORY_LABELS: Record<TrendCategory, string> = {
  all: 'Tất cả',
  fashion: 'Thời trang',
  beauty: 'Mỹ phẩm',
  food: 'Đồ ăn & thức uống',
  home: 'Đồ gia dụng',
  gadget: 'Phụ kiện điện tử',
};

export function TrendingScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const selectedCategory = useFilterStore((s) => s.selectedCategory);
  const setCategory = useFilterStore((s) => s.setCategory);
  const { trends, isLoading } = useTrending();

  const activeFilter = CATEGORY_MAP.indexOf(selectedCategory);

  const filteredTrends = search.trim()
    ? trends.filter((t) => t.name.toLowerCase().includes(search.trim().toLowerCase()))
    : trends;

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
          <Text style={styles.headerTitle}>Trending Products</Text>
          <View style={styles.headerSub}>
            <Text style={styles.headerTime}>Cập nhật lúc 09:41 · </Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search */}
        <Animated.View entering={FadeInUp.delay(80).duration(400)} style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={Colors.textSub} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm sản phẩm, niche..."
            placeholderTextColor={Colors.textSub}
            value={search}
            onChangeText={setSearch}
          />
        </Animated.View>

        {/* Filters */}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          entering={FadeInUp.delay(120).duration(400)}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((filter, idx) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setCategory(CATEGORY_MAP[idx])}
              style={[styles.filterChip, activeFilter === idx && styles.filterChipActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterChipText, activeFilter === idx && styles.filterChipTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* Product cards */}
        <View style={styles.cardList}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredTrends.map((trend, index) => {
                const rankBg = trend.rank === 1 ? '#FEF3C7' : '#F3F4F6';
                const rankColor = trend.rank === 1 ? '#D97706' : '#6B7280';
                return (
                  <Animated.View key={trend.id} entering={FadeInUp.delay(160 + index * 80).duration(400)}>
                    <TouchableOpacity style={styles.productCard} activeOpacity={0.85}>
                      <View style={styles.pcTop}>
                        <View style={[styles.rankBadge, { backgroundColor: rankBg }]}>
                          <Text style={[styles.rankText, { color: rankColor }]}>#{trend.rank}</Text>
                        </View>
                        <View style={[styles.pcImg, { backgroundColor: trend.bgColor ?? Colors.primaryBg }]}>
                          <Text style={styles.pcEmoji}>{trend.icon ?? '📦'}</Text>
                        </View>
                        <View style={styles.pcInfo}>
                          <Text style={styles.pcName} numberOfLines={2}>{trend.name}</Text>
                          <Text style={styles.pcCat}>{CATEGORY_LABELS[trend.category]}</Text>
                          <Text style={styles.pcPrice}>{formatCurrency(trend.price ?? 0)}</Text>
                        </View>
                      </View>
                      <View style={styles.pcStats}>
                        <StatCell value={formatViews(trend.videoCount)} label="Video" />
                        <View style={styles.statDivider} />
                        <StatCell value={formatViews(trend.views)} label="Lượt xem" />
                        <View style={styles.statDivider} />
                        <StatCell
                          value={formatGrowth(trend.growth)}
                          label="Tăng trưởng"
                          color={trend.growth >= 0 ? Colors.success : Colors.danger}
                        />
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
        </View>
      </ScrollView>
    </View>
  );
}

function StatCell({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statVal, color ? { color } : {}]}>{value}</Text>
      <Text style={styles.statLbl}>{label}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTime: {
    fontSize: FontSize.bodySm,
    color: 'rgba(255,255,255,0.7)',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,185,129,0.2)',
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  liveText: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    color: Colors.success,
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

  filterRow: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.medium,
    color: Colors.textSub,
  },
  filterChipTextActive: {
    color: Colors.white,
  },

  cardList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  productCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    padding: Spacing.lg,
    ...Shadow.card,
  },
  pcTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  rankBadge: {
    minWidth: 36,
    height: 28,
    borderRadius: Radius.chip,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  rankText: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.bold,
  },
  pcImg: {
    width: 52,
    height: 52,
    borderRadius: Radius.listItem,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pcEmoji: {
    fontSize: 28,
  },
  pcInfo: { flex: 1 },
  pcName: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: 3,
  },
  pcCat: {
    fontSize: FontSize.caption,
    color: Colors.textSub,
    marginBottom: 3,
  },
  pcPrice: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },

  pcStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statVal: {
    fontSize: FontSize.titleSm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  statLbl: {
    fontSize: 11,
    color: Colors.textSub,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
});
