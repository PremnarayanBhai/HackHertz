import React from 'react';
import { SponsorshipDeckModal } from './SponsorshipDeckModal';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({ 
  isOpen, 
  onClose,
  initialSlide = 1 
}) => {
  return (
    <SponsorshipDeckModal
      isOpen={isOpen}
      onClose={onClose}
      initialSlide={initialSlide}
    />
  );
};

export default SponsorModal;
