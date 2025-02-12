import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Star, Plus, FadersHorizontal, ThumbsUp } from 'phosphor-react-native';
import { StoreAvaliationsData } from '../../components/UserData/StoresAvaliations';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/CustomText';
import ReviewCard from '../../components/Review/ReviewCard';

const mockReviews = [
  ...Array(15).fill({ rating: 5 }),
  ...Array().fill({ rating: 4 }),
  ...Array().fill({ rating: 3 }),
  ...Array().fill({ rating: 2 }),
  ...Array().fill({ rating: 1 }),
];

const countRatings = (rating) =>
  mockReviews.filter((r) => r.rating === rating).length;

const totalReviews = mockReviews.length;

const ratingPercentages = {
  5: 100,
  4: 80,
  3: 50,
  2: 55,
  1: 20,
};

// Renderizar estrelas
const renderStars = (rating) => {
  return (
    <View style={styles.starsContainer}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={24}
          weight={i < rating ? 'fill' : 'regular'}
          color="#F5C330"
        />
      ))}
    </View>
  );
};

const RatingBar = ({ rating }) => {
  return (
    <View style={styles.ratingBarRow}>
      <View style={styles.ratingBarInfo}>
        <Star size={18} weight="fill" color="#F5C330" />
        <CustomText style={styles.ratingNumber}>{rating}</CustomText>
      </View>
      <View style={styles.ratingBarContainer}>
        <View
          style={[
            styles.ratingBarFill,
            { width: `${ratingPercentages[rating]}%` },
          ]}
        />
      </View>
      <CustomText style={styles.ratingCount}>{countRatings(rating)}</CustomText>
    </View>
  );
};

const StoreReview = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomText fontSize={22} variant="bold" style={styles.title}>
          Avaliações dos clientes
        </CustomText>

        <View style={styles.ratingContainer}>
          <CustomText fontSize={56} variant="bold">
            4,9
          </CustomText>
          <View>
            {renderStars(4)}
            <CustomText style={styles.reviewCount}>
              {totalReviews} avaliações
            </CustomText>
          </View>
        </View>

        <View style={styles.ratingOverview}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <RatingBar key={rating} rating={rating} />
          ))}
        </View>

        <Pressable
          style={styles.reviewButton}
          onPress={() => navigation.navigate('AvaliationStoreScreen')}
        >
          <CustomText variant="bold">
            <Plus size={16} /> Escrever avaliação
          </CustomText>
        </Pressable>

        <View style={{ marginTop: 50 }}>
          <View style={styles.textAvaliation}>
            <CustomText fontSize={22} variant="bold" style={styles.title}>
              Avaliações
            </CustomText>
            <Pressable>
              <FadersHorizontal />
            </Pressable>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Pressable style={styles.buttonFilterAvaliation}>
            <CustomText variant="bold" color="#A8A8A8">
              Maiores notas
            </CustomText>
          </Pressable>
          <Pressable style={styles.buttonFilterAvaliation}>
            <CustomText variant="bold" color="#A8A8A8">
              Menores notas
            </CustomText>
          </Pressable>
        </View>
      </View>

      {/* Cards das avaliações */}
      <View style={styles.reviewList}>
        {StoreAvaliationsData.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>
    </ScrollView>
  );
};

export default StoreReview;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  reviewCount: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 16,
    marginTop: 4,
  },
  ratingOverview: {
    marginVertical: 8,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingBarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  ratingNumber: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#000',
  },
  ratingCount: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 25,
    textAlign: 'right',
  },
  reviewButton: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    alignItems: 'center',
  },
  textAvaliation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  buttonFilterAvaliation: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
});