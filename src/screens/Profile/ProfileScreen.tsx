import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/utils/theme';

const MENU_SECTIONS = [
  {
    title: 'Tài khoản',
    items: [
      { icon: '⚡', label: 'Nâng cấp Business', bg: Colors.primaryBg, badge: 'HOT', danger: false },
      { icon: '🔔', label: 'Cảnh báo xu hướng', bg: '#D1FAE5', badge: null, danger: false },
      { icon: '🎯', label: 'Niche quan tâm', bg: '#FEF3C7', badge: null, danger: false },
    ],
  },
  {
    title: 'Cài đặt',
    items: [
      { icon: '📊', label: 'Xuất báo cáo CSV', bg: '#E0E7FF', badge: null, danger: false },
      { icon: '🔑', label: 'API Key', bg: '#FEE2E2', badge: null, danger: false },
      { icon: '⚙️', label: 'Cài đặt thông báo', bg: '#F3F4F6', badge: null, danger: false },
    ],
  },
  {
    title: 'Hỗ trợ',
    items: [
      { icon: '💬', label: 'Liên hệ hỗ trợ', bg: '#D1FAE5', badge: null, danger: false },
      { icon: '📖', label: 'Hướng dẫn sử dụng', bg: '#FEF3C7', badge: null, danger: false },
      { icon: '🚪', label: 'Đăng xuất', bg: '#FEE2E2', badge: null, danger: true },
    ],
  },
];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Profile header with gradient */}
        <LinearGradient
          colors={['#7C3AED', '#5B21B6', '#4C1D95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.profileHeader, { paddingTop: insets.top + Spacing.xl }]}
        >
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
            <View style={styles.avatarOnline} />
          </View>
          <Text style={styles.profileName}>Nguyen Chi</Text>
          <Text style={styles.profileRole}>Affiliate Marketer · TikTok Shop</Text>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>⚡ Pro Plan · 99k/tháng</Text>
          </View>
        </LinearGradient>

        {/* Stats row */}
        <Animated.View entering={FadeInUp.delay(80).duration(400)} style={styles.statsRow}>
          <StatItem value="245" label="Hashtag" />
          <View style={styles.statDivider} />
          <StatItem value="1.2K" label="Sản phẩm" />
          <View style={styles.statDivider} />
          <StatItem value="18" label="Cảnh báo" />
        </Animated.View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section, sectionIdx) => (
          <Animated.View
            key={section.title}
            entering={FadeInUp.delay(140 + sectionIdx * 80).duration(400)}
            style={styles.menuSection}
          >
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIdx) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                    <View style={[styles.menuIcon, { backgroundColor: item.bg }]}>
                      <Text style={styles.menuEmoji}>{item.icon}</Text>
                    </View>
                    <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                      {item.label}
                    </Text>
                    {item.badge && (
                      <View style={styles.hotBadge}>
                        <Text style={styles.hotBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={item.danger ? Colors.danger : Colors.textSub}
                    />
                  </TouchableOpacity>
                  {itemIdx < section.items.length - 1 && <View style={styles.itemDivider} />}
                </React.Fragment>
              ))}
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  profileHeader: {
    alignItems: 'center',
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  avatarOnline: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileName: {
    fontSize: FontSize.heading,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: FontSize.bodySm,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: Spacing.md,
  },
  planBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  planBadgeText: {
    fontSize: FontSize.bodySm,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    paddingVertical: Spacing.lg,
    ...Shadow.cardSm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.title,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSize.caption,
    color: Colors.textSub,
    fontWeight: FontWeight.medium,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },

  menuSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  menuSectionTitle: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
    color: Colors.textSub,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    ...Shadow.cardSm,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
    minHeight: 52,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuEmoji: {
    fontSize: 18,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  menuLabelDanger: {
    color: Colors.danger,
  },
  hotBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  hotBadgeText: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    color: '#D97706',
  },
  itemDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 52 + Spacing.md,
  },
});
