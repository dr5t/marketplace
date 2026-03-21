import React from 'react';
import Image from 'next/image';

interface ArtisanSpotlightProps {
  name: string;
  image: string;
  bio: string;
}

const ArtisanSpotlight = ({ name, image, bio }: ArtisanSpotlightProps) => {
  return (
    <div className="bg-[#fffcf7] rounded-3xl p-6 flex items-start gap-6 border border-stone-100 shadow-sm">
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative border-2 border-white shadow-md">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Made with Heart</p>
        <h4 className="font-headline text-lg font-bold text-primary mb-2">Made by {name}</h4>
        <p className="text-sm text-stone-600 leading-relaxed italic">
          "{bio}"
        </p>
      </div>
    </div>
  );
};

export default ArtisanSpotlight;
