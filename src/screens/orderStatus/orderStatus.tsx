import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, ScrollView,Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { formatCurrency } from '../../utils/orderCalculation';
import PrimaryButton from '../../components/primaryButton/primaryButton';
import { styles } from '../../screens/orderStatus/orderStatus.styles';
import { OrderPaymentService } from '../../services/orderPayementService';

interface OrderStatusStep {
  id: number;
  label: string;
  status: string;
  time: string;
  completed: boolean;
}

export default function OrderStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const orderId = params.orderId as string;
  const orderNumber = params.orderNumber as string;
  const deliveryAddress = params.deliveryAddress as string || '123 Main Street';
  const total = params.total as string;

  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatusStep[]>([
    { id: 1, label: 'Order Placed', status: 'placed', time: '01:03 PM', completed: true },
    { id: 2, label: 'Payment Confirmed', status: 'confirmed', time: '01:03 PM', completed: true },
    { id: 3, label: 'Order Accepted', status: 'accepted', time: '01:03 PM', completed: true },
    { id: 4, label: 'Preparing Order', status: 'preparing', time: '', completed: false },
  ]);

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const loadOrderDetails = async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      const response = await OrderPaymentService.getOrderById(orderId);
      
      if (response.success) {
        setOrderData(response.data);
        updateStatusesFromOrder(response.data.status);
      }
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatusesFromOrder = (currentStatus: string) => {
    const statusOrder = ['placed', 'confirmed', 'accepted', 'preparing', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());
    
    setOrderStatuses(prev => 
      prev.map((status, index) => ({
        ...status,
        completed: index <= currentIndex,
      }))
    );
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: confirmCancelOrder,
        },
      ]
    );
  };

  const confirmCancelOrder = async () => {
    setCancelling(true);

    try {
      console.log('Cancelling order:', orderId);
      
      const response = await OrderPaymentService.updateOrderStatus(orderId, {
        status: 'cancelled',
      });

      if (response.success) {
        Alert.alert(
          'Order Cancelled',
          'Your order has been cancelled successfully.',
          [
            {
              text: 'OK',
              onPress: () => router.push('/'),
            },
          ]
        );
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      Alert.alert(
        'Cancellation Failed',
        error instanceof Error ? error.message : 'Unable to cancel order. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setCancelling(false);
    }
  };

  const getStatusMessage = () => {
    if (!orderData) return 'Payment successful. Your order has been placed';
    
    const status = orderData.status.toLowerCase();
    const messages: { [key: string]: string } = {
      'placed': 'Your order has been placed',
      'confirmed': 'Payment successful. Your order has been placed',
      'accepted': 'Restaurant has accepted your order',
      'preparing': 'Your order is being prepared',
      'delivered': 'Your order has been delivered',
      'cancelled': 'This order has been cancelled',
    };
    
    return messages[status] || 'Your order is being processed';
  };

  const isCancelled = orderData?.status.toLowerCase() === 'cancelled';
  const canCancel = orderData?.status.toLowerCase() !== 'cancelled' && 
                    orderData?.status.toLowerCase() !== 'delivered';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Status</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D32F2F" />
            <Text style={styles.loadingText}>Loading order details...</Text>
          </View>
        ) : (
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Success Message */}
            <View style={styles.successContainer}>
              <View style={[
                styles.successIcon,
                isCancelled && styles.cancelledIcon
              ]}>
                <Text style={styles.successIconText}>
                  {isCancelled ? '✕' : '✓'}
                </Text>
              </View>
              <Text style={styles.successTitle}>
                {isCancelled ? 'Order Cancelled' : 'Order Confirmed!'}
              </Text>
              <Text style={styles.successMessage}>
                {getStatusMessage()}
              </Text>
            </View>

            {/* Order Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order ID: #{orderNumber || '2024'}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Type:</Text>
                <Text style={styles.infoValue}>(2:30 PM) Today</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Delivery:</Text>
                <Text style={styles.infoValue}>{deliveryAddress}</Text>
              </View>
              {orderData && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Total:</Text>
                  <Text style={styles.infoValue}>
                    {formatCurrency(orderData.total)}
                  </Text>
                </View>
              )}
            </View>

            {/* Order Timeline */}
            {!isCancelled && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Timeline</Text>
                <View style={styles.timelineContainer}>
                  {orderStatuses.map((status, index) => (
                    <View key={status.id} style={styles.timelineItem}>
                      <View style={styles.timelineLeft}>
                        <View style={[
                          styles.timelineDot,
                          status.completed && styles.timelineDotCompleted
                        ]}>
                          {status.completed && (
                            <Text style={styles.timelineDotCheck}>✓</Text>
                          )}
                        </View>
                        {index < orderStatuses.length - 1 && (
                          <View style={[
                            styles.timelineLine,
                            status.completed && styles.timelineLineCompleted
                          ]} />
                        )}
                      </View>
                      <View style={styles.timelineRight}>
                        <Text style={[
                          styles.timelineLabel,
                          status.completed && styles.timelineLabelCompleted
                        ]}>
                          {status.label}
                        </Text>
                        {status.time && (
                          <Text style={styles.timelineTime}>{status.time}</Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}

        {/* Cancel Order Button */}
        {canCancel && !loading && (
          <View style={styles.footer}>
            <PrimaryButton 
              title={cancelling ? "Cancelling..." : "Cancel Order"}
              onPress={handleCancelOrder}
              disabled={cancelling}
              loading={cancelling}
            />
          </View>
        )}

        {/* Back to Home Button for Cancelled Orders */}
        {isCancelled && (
          <View style={styles.footer}>
            <PrimaryButton 
              title="Back to Home"
              onPress={() => router.push('/')}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}