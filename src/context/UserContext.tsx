import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlanType } from '../data/mockData';

export interface FormData {
  idea: string;
  problem: string;
  icp: string;
  role: string;
  hours: string;
  budget: number;
  skill: number;
  audience: string;
}

interface UserContextType {
  userPlan: PlanType;
  setUserPlan: (plan: PlanType) => void;
  upgradeToPro: () => void;
  upgradeToLifer: () => void;
  formData: FormData | null;
  setFormData: (data: FormData | null) => void;
  reportPayload: any;
  setReportPayload: (payload: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [reportPayload, setReportPayload] = useState<any>(null);

  const upgradeToPro = () => setUserPlan('pro');
  const upgradeToLifer = () => setUserPlan('lifer');

  return (
    <UserContext.Provider value={{ 
      userPlan, 
      setUserPlan, 
      upgradeToPro, 
      upgradeToLifer,
      formData,
      setFormData,
      reportPayload,
      setReportPayload
    }}>
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
