import {
  Car,
  Home,
  Laptop,
  Sofa,
  Bike,
  Cpu,
} from 'lucide-react';

export const categories = [
  {
    slug: 'cars',
    label: 'Cars',
    singular: 'Car',
    icon: Car,
    filters: [
      {
        key: 'make',
        label: 'Make',
        type: 'select',
        attributeKey: 'make',
        options: ['Toyota', 'BMW', 'Tesla', 'Honda', 'Mazda', 'Ford', 'Mercedes-Benz', 'Suzuki', 'Nissan', 'Volkswagen', 'Hyundai'],
      },
      {
        key: 'transmission',
        label: 'Transmission',
        type: 'select',
        attributeKey: 'transmission',
        options: ['Automatic', 'Manual'],
      },
      {
        key: 'fuel_type',
        label: 'Fuel Type',
        type: 'select',
        attributeKey: 'fuel_type',
        options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      },
      {
        key: 'body_type',
        label: 'Body Type',
        type: 'select',
        attributeKey: 'body_type',
        options: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pickup', 'Minivan'],
      },
    ],
    specFields: [
      { key: 'year', label: 'Year', attributeKey: 'year', format: 'text' },
      { key: 'mileage', label: 'Mileage', attributeKey: 'mileage', format: 'mileage' },
      { key: 'fuel_type', label: 'Fuel', attributeKey: 'fuel_type' },
      { key: 'transmission', label: 'Transmission', attributeKey: 'transmission' },
      { key: 'body_type', label: 'Body', attributeKey: 'body_type' },
      { key: 'engine_size', label: 'Engine', attributeKey: 'engine_size' },
    ],
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    singular: 'Property',
    icon: Home,
    filters: [
      {
        key: 'property_type',
        label: 'Property Type',
        type: 'select',
        attributeKey: 'property_type',
        options: ['Apartment', 'Villa', 'House', 'Commercial', 'Land'],
      },
      {
        key: 'bedrooms',
        label: 'Bedrooms',
        type: 'select',
        attributeKey: 'bedrooms',
        options: ['0', '1', '2', '3', '4', '5'],
      },
      {
        key: 'furnished',
        label: 'Furnished',
        type: 'select',
        attributeKey: 'furnished',
        options: ['true', 'false'],
      },
    ],
    specFields: [
      { key: 'property_type', label: 'Type', attributeKey: 'property_type' },
      { key: 'bedrooms', label: 'Bedrooms', attributeKey: 'bedrooms' },
      { key: 'bathrooms', label: 'Bathrooms', attributeKey: 'bathrooms' },
      { key: 'area_sqm', label: 'Area', attributeKey: 'area_sqm', format: 'area' },
      { key: 'furnished', label: 'Furnished', attributeKey: 'furnished' },
      { key: 'floor', label: 'Floor', attributeKey: 'floor' },
    ],
  },
  {
    slug: 'electronics',
    label: 'Electronics',
    singular: 'Electronic',
    icon: Laptop,
    filters: [
      {
        key: 'brand',
        label: 'Brand',
        type: 'select',
        attributeKey: 'brand',
        options: ['Apple', 'Samsung', 'Sony', 'Dell', 'LG', 'HP', 'Lenovo'],
      },
    ],
    specFields: [
      { key: 'brand', label: 'Brand', attributeKey: 'brand' },
      { key: 'model', label: 'Model', attributeKey: 'model' },
      { key: 'storage', label: 'Storage', attributeKey: 'storage' },
      { key: 'ram', label: 'RAM', attributeKey: 'ram' },
      { key: 'screen_size', label: 'Screen', attributeKey: 'screen_size' },
      { key: 'warranty', label: 'Warranty', attributeKey: 'warranty' },
    ],
  },
  {
    slug: 'furniture',
    label: 'Furniture',
    singular: 'Furniture',
    icon: Sofa,
    filters: [
      {
        key: 'type',
        label: 'Type',
        type: 'select',
        attributeKey: 'type',
        options: ['Sofa', 'Dining Set', 'Bed', 'Bedroom Set', 'Sectional Sofa', 'Table', 'Chair'],
      },
      {
        key: 'material',
        label: 'Material',
        type: 'select',
        attributeKey: 'material',
        options: ['Wood', 'Fabric', 'Leather', 'MDF Wood', 'Metal', 'Oak Wood'],
      },
    ],
    specFields: [
      { key: 'type', label: 'Type', attributeKey: 'type' },
      { key: 'material', label: 'Material', attributeKey: 'material' },
      { key: 'color', label: 'Color', attributeKey: 'color' },
      { key: 'seats', label: 'Seats', attributeKey: 'seats' },
      { key: 'dimensions', label: 'Dimensions', attributeKey: 'dimensions' },
    ],
  },
  {
    slug: 'motorcycles',
    label: 'Motorcycles',
    singular: 'Motorcycle',
    icon: Cpu,
    filters: [
      {
        key: 'brand',
        label: 'Brand',
        type: 'select',
        attributeKey: 'brand',
        options: ['Honda', 'Yamaha', 'Vespa', 'Suzuki', 'Kawasaki'],
      },
      {
        key: 'engine_cc',
        label: 'Engine',
        type: 'select',
        attributeKey: 'engine_cc',
        options: ['125cc', '150cc', '155cc', '250cc', '400cc', '600cc'],
      },
    ],
    specFields: [
      { key: 'brand', label: 'Brand', attributeKey: 'brand' },
      { key: 'model', label: 'Model', attributeKey: 'model' },
      { key: 'year', label: 'Year', attributeKey: 'year' },
      { key: 'mileage', label: 'Mileage', attributeKey: 'mileage', format: 'mileage' },
      { key: 'engine_cc', label: 'Engine', attributeKey: 'engine_cc' },
      { key: 'color', label: 'Color', attributeKey: 'color' },
    ],
  },
  {
    slug: 'bicycles',
    label: 'Bicycles',
    singular: 'Bicycle',
    icon: Bike,
    filters: [
      {
        key: 'brand',
        label: 'Brand',
        type: 'select',
        attributeKey: 'brand',
        options: ['Trek', 'Giant', 'Specialized', 'Cannondale', 'Scott'],
      },
      {
        key: 'wheel_size',
        label: 'Wheel Size',
        type: 'select',
        attributeKey: 'wheel_size',
        options: ['24 inch', '26 inch', '27.5 inch', '28 inch', '29 inch'],
      },
    ],
    specFields: [
      { key: 'brand', label: 'Brand', attributeKey: 'brand' },
      { key: 'model', label: 'Model', attributeKey: 'model' },
      { key: 'wheel_size', label: 'Wheels', attributeKey: 'wheel_size' },
      { key: 'gears', label: 'Gears', attributeKey: 'gears' },
      { key: 'color', label: 'Color', attributeKey: 'color' },
    ],
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);

export const allConditions = ['New', 'Used', 'Certified Pre-Owned', 'Refurbished', 'Like New'];
export const allSellerTypes = ['Dealer', 'Broker', 'Private', 'Agent', 'Company'];
