import React from 'react';
import { PatronsLeadership } from './PatronsLeadership';

// Re-export for backward compatibility and clean modular imports
export const JudgesMentors: React.FC = () => {
  return <PatronsLeadership />;
};

export default PatronsLeadership;
