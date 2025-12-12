import React from 'react';
import { User, CreditCard, Settings, LogOut, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export const AccountPage = () => {
  const { userPlan } = useUser();

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold text-white">Account Settings</h1>

      {/* Profile Header */}
      <Card className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
          <User className="w-10 h-10 text-slate-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Founder User</h2>
          <p className="text-slate-400">founder@example.com</p>
          <div className="mt-2">
            <Badge variant={userPlan === 'free' ? 'default' : 'neon'}>
              {userPlan === 'free' ? 'Tourist Plan' : userPlan === 'lifer' ? 'Lifetime Access' : 'Pro Plan'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Saved Reports */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Saved Reports</h3>
        {userPlan === 'free' ? (
          <Card className="text-center py-12 border-dashed border-slate-700">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-4">Upgrade to Pro to save your report history.</p>
            <Link to="/pricing"><Button>View Plans</Button></Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex items-center justify-between p-4 hover:border-slate-600 transition-colors">
                <div>
                  <h4 className="font-semibold text-white">Tinder for Co-founders</h4>
                  <p className="text-xs text-slate-500">Generated on Nov 25, 2025</p>
                </div>
                <div className="flex items-center gap-4">
                   <Badge variant="success">GO HARD</Badge>
                   <Link to="/report/12345"><Button variant="ghost" size="sm">View</Button></Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Settings Links */}
      <Card className="divide-y divide-slate-800">
        <div className="py-4 flex items-center justify-between first:pt-0">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-slate-400" />
            <span className="text-slate-200">Billing & Subscription</span>
          </div>
          <Button variant="ghost" size="sm">Manage</Button>
        </div>
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="text-slate-200">Preferences</span>
          </div>
          <Button variant="ghost" size="sm">Edit</Button>
        </div>
        <div className="py-4 flex items-center justify-between last:pb-0">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Sign Out</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountPage;