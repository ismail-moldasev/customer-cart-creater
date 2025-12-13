import React from 'react';
import { Listing } from '../types';
import { MapPin, Phone, MessageCircle, Star, Truck } from 'lucide-react';
import { SPECIES_ICONS } from '../constants';

interface ListingCardProps {
  listing: Listing;
  onSave: (id: string) => void;
  isSaved: boolean;
  isOwner?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onSave, isSaved, isOwner }) => {
  const handleWhatsApp = () => {
    const text = `Здравствуйте, я по поводу объявления: ${listing.description}`;
    const url = `https://wa.me/${listing.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${listing.contact.phone}`);
  };

  // Icon Logic
  let Icon = '📦';
  if (listing.type === 'LIVESTOCK' && listing.livestock) {
    Icon = SPECIES_ICONS[listing.livestock.species] || '🐄';
  } else if (listing.type === 'MEAT') {
    Icon = '🥩';
  } else if (listing.type === 'DAIRY') {
    Icon = '🥛';
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 relative overflow-hidden">
      {/* Header Band */}
      <div className={`absolute top-0 left-0 w-2 h-full ${listing.type === 'LIVESTOCK' ? 'bg-amber-400' : listing.type === 'MEAT' ? 'bg-red-400' : 'bg-blue-400'}`}></div>
      
      <div className="pl-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{Icon}</span>
            <div>
              <h3 className="font-bold text-lg leading-tight text-gray-900">{listing.description}</h3>
              <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                <MapPin size={12} />
                {listing.location}
              </div>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onSave(listing.id); }}
            className={`p-2 rounded-full ${isSaved ? 'text-yellow-400 bg-yellow-50' : 'text-gray-300 bg-gray-50'}`}
          >
            <Star fill={isSaved ? "currentColor" : "none"} size={20} />
          </button>
        </div>

        {/* Details Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {listing.livestock && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-medium">
              {listing.livestock.quantity} голов
            </span>
          )}
          {listing.meat && (
             <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-medium">
             {listing.meat.weight} кг
           </span>
          )}
          {listing.hasDelivery && (
             <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm flex items-center gap-1">
             <Truck size={12}/> Доставка
           </span>
          )}
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
          <span className="font-bold text-xl text-emerald-700">
            {listing.price.toLocaleString()} ₸ <span className="text-sm text-gray-500 font-normal">/ {listing.priceUnit}</span>
          </span>
          
          <div className="flex gap-2">
             {!isOwner && (
               <>
                <button onClick={handleCall} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                  <Phone size={20} />
                </button>
                <button onClick={handleWhatsApp} className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200">
                  <MessageCircle size={20} />
                </button>
               </>
             )}
             {isOwner && (
               <span className="text-sm text-gray-400 self-center">Ваше объявление</span>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
