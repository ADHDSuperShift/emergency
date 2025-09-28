import React from 'react';

interface EmergencyService {
  category: string;
  name: string;
  phone: string;
  address: string;
}

interface EmergencyCardProps {
  service: EmergencyService;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ service }) => {
  const handleCallClick = () => {
    window.location.href = `tel:${service.phone}`;
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(service.phone);
      // Show brief success feedback
      const button = document.getElementById(`copy-${service.phone}`);
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
          {service.category}
        </span>
      </div>
      
      <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
      
      <div className="mb-3">
        <p className="text-2xl font-bold text-primary mb-1">{service.phone}</p>
        <p className="text-sm text-muted-foreground">{service.address}</p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleCallClick}
          className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          📞 Call Now
        </button>
        
        <button
          id={`copy-${service.phone}`}
          onClick={handleCopyClick}
          className="bg-muted text-foreground py-2 px-3 rounded-md hover:bg-muted/80 transition-colors"
        >
          📋
        </button>
      </div>
    </div>
  );
};

export default EmergencyCard;