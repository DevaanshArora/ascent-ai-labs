import React from 'react';

interface PolicyProps {
  policyData: Record<string, any>;
}

const PolicyRenderer: React.FC<PolicyProps> = ({ policyData }) => {
  const renderContent = (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div>
          <strong style={{ fontWeight: 'bold' }}>{key.replace(/_/g, ' ')}</strong>
          <div style={{ marginLeft: '20px' }}>
            {Object.entries(value).map(([subKey, subValue]) => renderContent(subKey, subValue))}
          </div>
        </div>
      );
    } else {
      return (
        <p>
          <strong style={{ fontWeight: 'bold' }}>{key.replace(/_/g, ' ')}:</strong> {value}
        </p>
      );
    }
  };

  return (
    <div>
      {Object.entries(policyData).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '20px' }}>
          {renderContent(key, value)}
        </div>
      ))}
    </div>
  );
};

export default PolicyRenderer;
