import React from 'react';

interface ContactInfoProps {
  icon: string;
  title: string;
  content: React.ReactNode;
}

const ContactInfo = ({ icon, title, content }: ContactInfoProps) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-primary bg-opacity-10 rounded-full p-3 mt-1">
        <span className="material-icons text-white">{icon}</span>
      </div>
      <div>
        <h4 className="font-heading font-medium text-neutral-800 mb-1">{title}</h4>
        <div className="text-neutral-600">{content}</div>
      </div>
    </div>
  );
};

export default ContactInfo;
