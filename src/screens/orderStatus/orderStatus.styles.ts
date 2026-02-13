import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
  },
  orderNumberBadge: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  orderNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#757575',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 16,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelledIcon: {
    backgroundColor: '#F44336',
  },
  successIconText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
  },
  infoValue: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  timelineContainer: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineLeft: {
    width: 40,
    alignItems: 'center',
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  timelineDotCheck: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  timelineLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineRight: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 20,
  },
  timelineLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  timelineLabelCompleted: {
    color: '#212121',
    fontWeight: '500',
  },
  timelineTime: {
    fontSize: 12,
    color: '#757575',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
});