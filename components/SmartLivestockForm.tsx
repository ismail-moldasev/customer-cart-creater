import React, { useState, useEffect } from 'react';
import { Listing, Species, Gender, AgeUnit } from '../types';
import { ActionButton, Input, Select, Checkbox } from './UI';
import { SPECIES_LABELS } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface SmartLivestockFormProps {
  onBack: () => void;
  onSubmit: (listing: Partial<Listing>) => void;
}

export const SmartLivestockForm: React.FC<SmartLivestockFormProps> = ({ onBack, onSubmit }) => {
  const [step, setStep] = useState<1 | 2>(1); // 1 = Form, 2 = Preview

  // Form State
  const [species, setSpecies] = useState<Species>('CATTLE');
  const [gender, setGender] = useState<Gender>('FEMALE');
  const [age, setAge] = useState<number>(2);
  const [ageUnit, setAgeUnit] = useState<AgeUnit>('YEARS');
  const [breedCategory, setBreedCategory] = useState<string>('Корова');
  
  // Dynamic extras
  const [quantity, setQuantity] = useState<number>(1);
  const [isPregnant, setIsPregnant] = useState(false);
  const [withOffspring, setWithOffspring] = useState(false);
  const [isCastrated, setIsCastrated] = useState(false);
  const [isBreeding, setIsBreeding] = useState(false);
  
  // Common details
  const [price, setPrice] = useState<string>('');
  const [priceUnit, setPriceUnit] = useState<'голова' | 'кг'>('голова');
  const [location, setLocation] = useState('');
  const [hasDelivery, setHasDelivery] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // --- Smart Logic / Rules Engine ---
  
  // Reset category when species changes
  useEffect(() => {
    const defaults: Record<Species, string> = {
      CATTLE: 'Корова', SHEEP: 'Матка', GOAT: 'Коза', HORSE: 'Кобыла', CAMEL: 'Самка', OTHER: 'Животное'
    };
    setBreedCategory(defaults[species]);
  }, [species]);

  const getCategories = () => {
    switch(species) {
      case 'CATTLE': return ['Телёнок', 'Бычок', 'Тёлка', 'Корова', 'Бык-производитель'];
      case 'SHEEP': return ['Ягнёнок', 'Матка', 'Баран', 'Валух'];
      case 'HORSE': return ['Жеребёнок', 'Тай', 'Кунан', 'Кобыла', 'Жеребец'];
      default: return ['Молодняк', 'Взрослая особь'];
    }
  };

  const showPregnantField = gender === 'FEMALE' && ((ageUnit === 'YEARS' && age >= 1) || (ageUnit === 'MONTHS' && age > 10));
  const showOffspringField = gender === 'FEMALE' && ageUnit === 'YEARS' && age >= 2;
  const showCastratedField = gender === 'MALE';
  const showBreedingField = gender === 'MALE' && ((ageUnit === 'YEARS' && age >= 1) || (ageUnit === 'MONTHS' && age > 10));

  // ----------------------------------

  const handlePreview = () => {
    if (!price || !location || !contactPhone) {
      alert('Заполните обязательные поля (Цена, Локация, Телефон)');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = () => {
    const listing: Partial<Listing> = {
      type: 'LIVESTOCK',
      price: parseFloat(price),
      priceUnit,
      location,
      hasDelivery,
      contact: {
        name: contactName,
        phone: contactPhone,
        time: 'Любое'
      },
      description: `${SPECIES_LABELS[species]} • ${breedCategory} • ${age} ${ageUnit === 'YEARS' ? 'г.' : 'мес.'}`,
      livestock: {
        species,
        breedCategory,
        gender,
        age,
        ageUnit,
        quantity,
        isPregnant: showPregnantField ? isPregnant : false,
        withOffspring: showOffspringField ? withOffspring : false,
        isCastrated: showCastratedField ? isCastrated : false,
        isBreeding: showBreedingField ? isBreeding : false,
        hasVetDocs: true, // simplified
        hasTags: true // simplified
      }
    };
    onSubmit(listing);
  };

  if (step === 2) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <button onClick={() => setStep(1)} className="p-2 -ml-2 text-gray-600"><ArrowLeft /></button>
          <h2 className="text-2xl font-bold ml-2">Предпросмотр</h2>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-grow">
          <div className="text-4xl mb-4">{SPECIES_LABELS[species].split(' ')[0]}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{breedCategory}</h1>
          <p className="text-lg text-gray-600 mb-4">{age} {ageUnit === 'YEARS' ? 'лет' : 'мес'} • {gender === 'MALE' ? 'Самец' : 'Самка'}</p>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">Количество</span>
              <span className="font-medium">{quantity} голов</span>
            </div>
            {showPregnantField && isPregnant && (
              <div className="flex justify-between border-b py-2">
                <span className="text-gray-500">Стельность</span>
                <span className="text-emerald-600 font-bold">Да</span>
              </div>
            )}
            {showOffspringField && withOffspring && (
               <div className="flex justify-between border-b py-2">
               <span className="text-gray-500">С приплодом</span>
               <span className="text-emerald-600 font-bold">Да</span>
             </div>
            )}
             <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">Цена</span>
              <span className="font-bold text-xl">{parseInt(price).toLocaleString()} ₸ / {priceUnit}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">Локация</span>
              <span className="font-medium text-right">{location}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
             <p className="text-sm text-gray-500 mb-1">Продавец</p>
             <p className="font-bold">{contactName}</p>
             <p className="text-emerald-600">{contactPhone}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 pb-6">
          <ActionButton onClick={handleFinalSubmit}>Опубликовать</ActionButton>
          <ActionButton onClick={() => setStep(1)} variant="outline">Редактировать</ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold ml-2">Параметры скота</h2>
      </div>

      <div className="space-y-6">
        {/* Step 1: Basic Bio */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-emerald-800 mb-4">1. Вид и параметры</h3>
          
          <Select 
            label="Вид животного"
            value={species}
            onChange={(e) => setSpecies(e.target.value as Species)}
            options={Object.keys(SPECIES_LABELS).map(k => ({ value: k, label: SPECIES_LABELS[k as Species] }))}
          />

          <div className="grid grid-cols-2 gap-4">
             <Select 
              label="Пол"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              options={[{value: 'MALE', label: 'Самец'}, {value: 'FEMALE', label: 'Самка'}]}
            />
            <Select 
              label="Категория"
              value={breedCategory}
              onChange={(e) => setBreedCategory(e.target.value)}
              options={getCategories().map(c => ({value: c, label: c}))}
            />
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-grow">
               <Input 
                  label="Возраст"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
               />
            </div>
            <div className="mb-4">
               <div className="flex bg-gray-100 rounded-lg p-1">
                 <button onClick={() => setAgeUnit('MONTHS')} className={`px-3 py-2 rounded-md text-sm font-bold ${ageUnit === 'MONTHS' ? 'bg-white shadow' : 'text-gray-500'}`}>Мес.</button>
                 <button onClick={() => setAgeUnit('YEARS')} className={`px-3 py-2 rounded-md text-sm font-bold ${ageUnit === 'YEARS' ? 'bg-white shadow' : 'text-gray-500'}`}>Лет</button>
               </div>
            </div>
          </div>
        </section>

        {/* Step 2: Smart Dynamic Fields */}
        <section className="bg-emerald-50 p-4 rounded-2xl shadow-sm border border-emerald-100">
          <h3 className="text-lg font-bold text-emerald-800 mb-4">2. Детали (Умные поля)</h3>
          
          <Input 
            label="Количество голов"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          {showPregnantField && (
            <Checkbox 
              label="Стельная / Беременная?"
              checked={isPregnant}
              onChange={(e) => setIsPregnant(e.target.checked)}
            />
          )}

          {showOffspringField && (
            <Checkbox 
              label="Продается с молодняком?"
              checked={withOffspring}
              onChange={(e) => setWithOffspring(e.target.checked)}
            />
          )}
          
          {showCastratedField && (
             <Checkbox 
             label="Кастрирован?"
             checked={isCastrated}
             onChange={(e) => setIsCastrated(e.target.checked)}
           />
          )}

          {showBreedingField && (
            <Checkbox 
              label="Племенной (на племя)?"
              checked={isBreeding}
              onChange={(e) => setIsBreeding(e.target.checked)}
            />
          )}

          <Checkbox label="Вет. справка / паспорт есть" checked readOnly />
        </section>

        {/* Step 3: Price & Contact */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
           <h3 className="text-lg font-bold text-emerald-800 mb-4">3. Цена и Контакты</h3>
           
           <div className="flex gap-4 items-end">
              <div className="flex-grow">
                <Input 
                  label="Цена"
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4 w-1/3">
                 <select 
                   value={priceUnit} 
                   onChange={(e) => setPriceUnit(e.target.value as any)}
                   className="w-full p-3 rounded-xl border bg-gray-50"
                  >
                   <option value="голова">за гол.</option>
                   <option value="кг">за кг</option>
                 </select>
              </div>
           </div>

           <Input 
             label="Местоположение (Город/Район)"
             value={location}
             onChange={(e) => setLocation(e.target.value)}
             placeholder="Например: Шымкент, Сайрам"
           />

           <Checkbox 
             label="Есть доставка?"
             checked={hasDelivery}
             onChange={(e) => setHasDelivery(e.target.checked)}
           />
           
           <div className="border-t pt-4 mt-4">
             <Input 
               label="Ваше имя"
               value={contactName}
               onChange={(e) => setContactName(e.target.value)}
             />
             <Input 
               label="Телефон / WhatsApp"
               type="tel"
               value={contactPhone}
               onChange={(e) => setContactPhone(e.target.value)}
               placeholder="+7 7.."
             />
           </div>
        </section>

        <ActionButton onClick={handlePreview}>Далее</ActionButton>
      </div>
    </div>
  );
};
