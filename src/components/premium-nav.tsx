import { Link, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const items = [
  ['/', '⌂', 'Inicio'],
  ['/lessons', '▣', 'Lecciones'],
  ['/games', '🎮', 'Juegos'],
  ['/teacher', '🤖', 'Teacher AI'],
  ['/scan', '▤', 'Mi Tarea'],
  ['/progress', '▥', 'Progreso'],
  ['/profiles', '◉', 'Perfiles'],
] as const;

export function PremiumNav() {
  const pathname = usePathname();

  return (
    <View style={styles.shell}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {items.map(([href, icon, label]) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          const itemStyle = StyleSheet.flatten([styles.item, active ? styles.active : null]);
          const iconStyle = StyleSheet.flatten([styles.icon, active ? styles.activeText : null]);
          const labelStyle = StyleSheet.flatten([styles.label, active ? styles.activeText : null]);

          return (
            <Link key={href} href={href} asChild>
              <Pressable style={itemStyle}>
                <Text style={iconStyle}>{icon}</Text>
                <Text style={labelStyle}>{label}</Text>
              </Pressable>
            </Link>
          );
        })}
        <View style={styles.spacer} />
        <Link href="/search" asChild>
          <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Buscar">
            <Text style={styles.iconButtonText}>⌕</Text>
          </Pressable>
        </Link>
        <Link href="/profiles" asChild>
          <Pressable style={styles.profileButton}><Text style={styles.profileButtonText}>👧🏻</Text></Pressable>
        </Link>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DDEBFF',
    shadowColor: '#6A54FF',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  row: { alignItems: 'center', gap: 6, padding: 7 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10, paddingHorizontal: 13, borderRadius: 16 },
  active: { backgroundColor: '#7B46FF' },
  icon: { color: '#183B78', fontWeight: '900', fontSize: 15 },
  label: { color: '#183B78', fontWeight: '800', fontSize: 12 },
  activeText: { color: '#FFFFFF' },
  spacer: { width: 8 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDF7FF', alignItems: 'center', justifyContent: 'center', borderWidth:1, borderColor:'#DDEAFF' },
  iconButtonText: { color: '#183B78', fontSize: 22, fontWeight: '900' },
  profileButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#12A9FF', alignItems: 'center', justifyContent: 'center' },
  profileButtonText: { fontSize: 20 },
});
