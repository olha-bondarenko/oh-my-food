import { Cart } from "./app/shared/models/cart"
import { CartItem } from "./app/shared/models/cart-item"
import { Food } from "./app/shared/models/food"
import { Order } from "./app/shared/models/order"

export const sample_foods: any[] = [
    {
        id:'1',
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        origins: ['italy'],
        stars: 4.5,
        imageUrl: 'assets/food-1.jpeg',
        tags: ['FastFood', 'Pizza', 'Lunch']
    },
    {
        id:'2',
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        favorite: true,
        origins: ['persia', 'middle east', 'china'],
        stars: 4.7,
        imageUrl: 'assets/food-2.jpeg',
        tags: ['SlowFood', 'Lunch']
    },
    {
        id:'3',
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        favorite: false,
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: 'assets/food-3.jpeg',
        tags: ['FastFood', 'Hamburger']
    },
    {
        id:'4',
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        favorite: true,
        origins: ['belgium', 'france'],
        stars: 3.3,
        imageUrl: 'assets/food-4.jpeg',
        tags: ['FastFood', 'Fry']
    },
    {
        id:'5',
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        favorite: false,
        origins: ['india', 'asia'],
        stars: 3.0,
        imageUrl: 'assets/food-5.jpeg',
        tags: ['SlowFood', 'Soup']
    },
    {
        id:'6',
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: 'assets/food-6.jpeg',
        tags: ['FastFood', 'Pizza', 'Lunch']
    }
]

export const sample_tags: any[] = [
    { name: 'All', count: 6 },
    { name: 'FastFood', count: 4 },
    { name: 'Pizza', count: 2 },
    { name: 'Lunch', count: 3 },
    { name: 'SlowFood', count: 2 },
    { name: 'Hamburger', count: 1 },
    { name: 'Fry', count: 1 },
    { name: 'Soup', count: 1 }
]

export const sample_cart_item: any = {
    food: sample_foods[1],
    price: 40,
    quantity: 2
}

export const sample_cart: Cart = {
    items: [sample_cart_item],
    totalCount: 1,
    totalPrice: 20
}

export const sample_order = {
    address: 'test address',
    addressLatLng: {lat: 51.914521, lng: 4.4498882},
    createdAt: '2022-07-31T20:29:24.254Z',
    id: 2,
    items: [sample_cart_item],
    name: 'test',
    status: 'NEW',
    totalPrice: 20,
    updatedAt: '2022-07-31T20:29:24.254Z',
    user: '123',
    paymentId: '123'
}

export const sample_user = {
    address: 'Test address',
    email: 'test@email.com',
    id: '2',
    isAdmin: false,
    name: 'test',
    token: '123'
}

export const sample_register_user = {
    address: 'Test address',
    confirmPassword: '1234567',
    email: 'test@email.com',
    name: 'test',
    password: '1234567'
}

export const sample_basic_cart = {
    items: [],
    totalCount: 0,
    totalPrice: 0
  };