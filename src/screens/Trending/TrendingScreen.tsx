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

const FILTERS = ['Tất cả', 'Thời trang', 'Mỹ phẩm', 'Đồ ăn', 'Gia dụng', 'Phụ kiện'];

const PRODUCTS = [
  {
    rank: 1,
    icon: '👗', bg: Colors.primaryBg,
    name: 'Váy Maxi Boho Mùa Hè 2024', cat: 'Thời trang nữ', price: '245.000đ',
    videos: '12.4K', views: '2.4M', growth: '+127%', up: true,
    rankBg: '#FEF3C7', rankColor: '#D97706',
  },
  {
    rank: 2,
    icon: '💄', bg: '#D1FAE5',
    name: 'Son Tint Hàn Quốc 3CE #Rose', cat: 'Mỹ phẩm', price: '189.000đ',
    videos: '8.9K', views: '1.8M', growth: '+89%', up: true,
    rankBg: '#F3F4F6', rankColor: '#6B7280',
  },
  {
    rank: 3,
    icon: '🍜', bg: '#FEF3C7',
    name: 'Mì Cay Buldak 2x Spicy', cat: 'Đồ ăn & thức uống', price: '55.000đ',
    videos: '21K', views: '3.1M', growth: '+203%', up: true,
    rankBg: '#F3F4F6', rankColor: '#6B7280',
  },
  {
    rank: 4,
    icon: '📱', bg: '#E0E7FF',
    name: 'Ốp Lưng Magsafe iPhone 15', cat: 'Phụ kiện điện tử', price: '120.000đ',
    videos: '5.6K', views: '990K', growth: '+45%', up: true,
    rankBg: '#F3F4F6', rankColor: '#6B7280',
  },
  {
    rank: 5,
    icon: '🏠', bg: '#FEE2E2',
    name: 'Đèn LED RGB Trang Trí Phòng', cat: 'Đồ gia dụng', price: '85.000đ',
    videos: '4.2K', views: '780K', growth: '-5%', up: false,
    rankBg: '#F3F4F6', rankColor: '#6B7280',
  },
];

export function TrendingScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState(0);
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
              onPress={() => setActiveFilter(idx)}
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
          {PRODUCTS.map((p, index) => (
            <Animated.View key={p.name} entering={FadeInUp.delay(160 + index * 80).duration(400)}>
              <TouchableOpacity style={styles.productCard} activeOpacity={0.85}>
                <View style={styles.pcTop}>
                  <View style={[styles.rankBadge, { backgroundColor: p.rankBg }]}>
                    <Text style={[styles.rankText, { color: p.rankColor }]}>#{p.rank}</Text>
                  </View>
                  <View style={[styles.pcImg, { backgroundColor: p.bg }]}>
                    <Text style={styles.pcEmoji}>{p.icon}</Text>
                  </View>
                  <View style={styles.pcInfo}>
                    <Text style={styles.pcName} numberOfLines={2}>{p.name}</Text>
                    <Text style={styles.pcCat}>{p.cat}</Text>
                    <Text style={styles.pcPrice}>{p.price}</Text>
                  </View>
                </View>
                <View style={styles.pcStats}>
                  <StatCell value={p.videos} label="Video" />
                  <View style={styles.statDivider} />
                  <StatCell value={p.views} label="Lượt xem" />
                  <View style={styles.statDivider} />
                  <StatCell value={p.growth} label="Tăng trưởng" color={p.up ? Colors.success : Colors.danger} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
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
