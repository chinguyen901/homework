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
import { useHashtags } from '@/hooks/useHashtags';
import { useFilterStore } from '@/stores/filterStore';
import { formatViews, formatGrowth } from '@/utils/formatters';
import { SkeletonCard } from '@/components/ui';

const { width: SCREEN_W } = Dimensions.get('window');
const BAR_MAX_W = SCREEN_W - Spacing.xl * 2 - 48;

const TIME_TABS = ['Hôm nay', 'Tuần này', 'Tháng này'];
const RANGE_MAP = ['1d', '7d', '30d'] as const;

export function HashtagScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const dateRange = useFilterStore((s) => s.dateRange);
  const setDateRange = useFilterStore((s) => s.setDateRange);
  const { hashtags, isLoading } = useHashtags();

  const activeTime = RANGE_MAP.indexOf(dateRange);

  const filteredHashtags = search.trim()
    ? hashtags.filter((h) => h.tag.toLowerCase().includes(search.trim().toLowerCase()))
    : hashtags;

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
              onPress={() => setDateRange(RANGE_MAP[idx])}
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredHashtags.map((h, index) => {
                const rankStr = String(h.rank).padStart(2, '0');
                const changeText = h.isNew ? '✦ Mới bùng' : `▲ ${formatGrowth(h.growth)}`;
                return (
                  <Animated.View key={h.id} entering={FadeInUp.delay(160 + index * 70).duration(400)}>
                    <TouchableOpacity style={styles.hashRow} activeOpacity={0.7}>
                      <View style={styles.hrTop}>
                        <View style={styles.hrLeft}>
                          <Text style={styles.hrRank}>{rankStr}</Text>
                          <View>
                            <Text style={styles.hrTag}>{h.tag}</Text>
                            <Text style={styles.hrViews}>{formatViews(h.views)} lượt xem</Text>
                          </View>
                        </View>
                        <Text style={[styles.hrChange, h.isNew ? styles.hrChangeNew : styles.hrChangeUp]}>
                          {changeText}
                        </Text>
                      </View>
                      {/* Progress bar */}
                      <View style={styles.barBg}>
                        <LinearGradient
                          colors={h.isNew ? ['#A78BFA', '#7C3AED'] : ['#7C3AED', '#5B21B6']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.barFill, { width: BAR_MAX_W * h.progressPct }]}
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
