import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlanType } from '../data/mockData';

interface UserContextType {
  userPlan: PlanType;
  setUserPlan: (plan: PlanType) => void;
  upgradeToPro: () => void;
  upgradeToLifer: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');

  const upgradeToPro = () => setUserPlan('pro');
  const upgradeToLifer = () => setUserPlan('lifer');

  return (
    <UserContext.Provider value={{ userPlan, setUserPlan, upgradeToPro, upgradeToLifer }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
