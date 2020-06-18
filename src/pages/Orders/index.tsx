import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
// import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
  formattedValue: string;
  thumbnail_url: string;
  extras: Extra[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);
  // const isFocused = useIsFocused();

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const response = await api.get<Food[]>('/orders');

      if (response.data) {
        const ordersData = response.data;

        const formattedOrders = ordersData.map(order => {
          return {
            ...order,
            formattedValue: formatValue(order.total),
          };
        });

        setOrders(formattedOrders);
      }
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>
      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedValue}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
