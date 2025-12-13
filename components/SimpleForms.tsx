import React, { useState } from 'react';
import { Listing, Category } from '../types';
import { ActionButton, Input, Select, Checkbox } from './UI';
import { ArrowLeft } from 'lucide-react';

interface SimpleFormProps {
  type: 'MEAT' | 'DAIRY';
  onBack: () => void;
  onSubmit: (listing: Partial<Listing>) => void;
}

export const SimpleForm: React.FC<SimpleFormProps> = ({ type, onBack, onSubmit }) => {
  const [product, setProduct] = useState(type === 'MEAT' ? 'Говядина' : 'Молоко коровье');
  const [format, setFormat] = useState('Свежее');
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = () => {
    if (!price || !amount || !contactPhone) return alert('Заполните обязательные поля');
    
    const listing: Partial<Listing> = {
      type,
      price: parseFloat(price),
      priceUnit: type === 'MEAT' ? 'кг' : 'литр',
      location,
      hasDelivery: false, // simplified for MVP
      contact: { name: contactName, phone: contactPhone, time: 'Любое' },
      description: `${product} • ${format} • ${amount} ${type === 'MEAT' ? 'кг' : 'л'}`,
      meat: type === 'MEAT' ? {
        meatType: product,
        format: format,
        weight: parseFloat(amount),
        isFrozen: false,
        packaging: 'Пакет'
      } : undefined,
      dairy: type === 'DAIRY' ? {
        productType: product,
        volume: parseFloat(amount),
        period: 'DAY',
        container: 'Банка'
      } : undefined
    };
    onSubmit(listing);
  };

  const meatOptions = ['Говядина', 'Баранина', 'Конина', 'Верблюжатина', 'Курица'];
  const dairyOptions = ['Молоко коровье', 'Молоко козье', 'Кумыс', 'Шубат', 'Сметана', 'Масло', 'Курт'];

  return (
    <div className="pb-24">
       <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold ml-2">
            {type === 'MEAT' ? 'Продажа мяса' : 'Молочная продукция'}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <Select 
          label="Продукт"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          options={(type === 'MEAT' ? meatOptions : dairyOptions).map(o => ({value: o, label: o}))}
        />

        <Input 
          label={type === 'MEAT' ? "Тип разделки / Состояние" : "Тара / Упаковка"}
          placeholder={type === 'MEAT' ? "Например: Туша, Мякоть" : "Например: 5л баклажка"}
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label={type === 'MEAT' ? "Вес (кг)" : "Объем (литров)"}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input 
            label="Цена (₸)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Input 
             label="Местоположение"
             value={location}
             onChange={(e) => setLocation(e.target.value)}
        />
         <div className="border-t pt-4 mt-4">
             <Input 
               label="Ваше имя"
               value={contactName}
               onChange={(e) => setContactName(e.target.value)}
             />
             <Input 
               label="Телефон"
               type="tel"
               value={contactPhone}
               onChange={(e) => setContactPhone(e.target.value)}
             />
           </div>
        
        <div className="pt-4">
            <ActionButton onClick={handleSubmit}>Опубликовать</ActionButton>
        </div>
      </div>
    </div>
  );
};
