import React from 'react';

const EmergencyCard = ({ service }) => {
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
    <div className="bg-primary border-2 border-primary-foreground/20 rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow text-primary-foreground w-full h-full">
      <div className="flex justify-between items-start mb-1">
        <span className="bg-primary-foreground text-primary text-xs px-1.5 py-0.5 rounded-full font-medium">
          {service.category}
        </span>
      </div>
      
      <h3 className="font-semibold text-primary-foreground mb-1 text-sm leading-tight">{service.name}</h3>
      
      <div className="mb-2">
        <p className="text-base font-bold text-primary-foreground mb-1">{service.phone}</p>
        <p className="text-xs text-primary-foreground/70 leading-tight">{service.address}</p>
      </div>
      
      <div className="flex gap-1">
        <button
          onClick={handleCallClick}
          className="flex-1 bg-primary-foreground text-primary py-1 px-2 rounded text-xs font-medium hover:bg-primary-foreground/90 transition-colors"
        >
          📞 Call
        </button>
        
        <button
          id={`copy-${service.phone}`}
          onClick={handleCopyClick}
          className="bg-primary/90 text-primary-foreground py-1 px-2 rounded hover:bg-primary transition-colors text-xs"
        >
          📋
        </button>
      </div>
    </div>
  );
};

export default EmergencyCard;