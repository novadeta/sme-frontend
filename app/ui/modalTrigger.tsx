'use client';
import { useState } from 'react';
import Modal from '@/app/ui/modal';
import { Button } from './button';
import SummarizeContent from './modalSummarize';
import ContactformContent from './modalAddContact';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  source: 'layout' | 'page';
}

export default function ModalTriggerClient({source, children}: ButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const renderContent = () => {
    if (source === 'layout') return <ContactformContent/>;
    if (source === 'page') return <SummarizeContent />;
    return null;
  };

  return (
    <div className="mt-4">
      <Button 
      onClick={() => setShowModal(true)}
                className="w-[120px] flex mt-[-16px] bg-green-400">
                    <p className="m-auto">{children}</p>
                </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {renderContent()}
      </Modal>
    </div>
  );
}
