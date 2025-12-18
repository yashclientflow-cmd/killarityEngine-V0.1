import { Check, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useUser } from '../context/UserContext';

export const PricingPage = () => {
  const { upgradeToPro, upgradeToLifer } = useUser();

  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Simple, Founder-Friendly Pricing</h1>
      <p className="text-slate-400 mb-12">Validate your ideas without breaking the bank.</p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
        {/* Tourist */}
        <Card className="border-slate-800 bg-slate-900/40">
          <h3 className="text-xl font-bold text-white mb-2">Tourist</h3>
          <div className="text-3xl font-bold text-white mb-6">$0</div>
          <p className="text-sm text-slate-400 mb-6">For the curious.</p>
          <Button variant="outline" className="w-full mb-8">Current Plan</Button>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 1 full report</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Days 1–2 of plan</li>
            <li className="flex items-center gap-2 text-slate-500"><X className="w-4 h-4" /> No PDF export</li>
            <li className="flex items-center gap-2 text-slate-500"><X className="w-4 h-4" /> No history</li>
          </ul>
        </Card>

        {/* Founder */}
        <Card className="border-sky-500/50 bg-slate-900 relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Badge variant="neon">Most Popular</Badge>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Founder</h3>
          <div className="text-3xl font-bold text-white mb-6">$5<span className="text-sm font-normal text-slate-500">/mo</span></div>
          <p className="text-sm text-slate-400 mb-6">For serious builders.</p>
          <Button className="w-full mb-8" onClick={upgradeToPro}>Upgrade to Pro</Button>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Unlimited reports</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Full 7-day plans</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Monetization Blueprints</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Export to PDF</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Save history</li>
          </ul>
        </Card>

        {/* Lifer */}
        <Card className="border-purple-500/30 bg-slate-900/40">
          <h3 className="text-xl font-bold text-white mb-2">Lifer</h3>
          <div className="text-3xl font-bold text-white mb-6">$29<span className="text-sm font-normal text-slate-500">/once</span></div>
          <p className="text-sm text-slate-400 mb-6">Pay once, own it forever.</p>
          <Button variant="secondary" className="w-full mb-8" onClick={upgradeToLifer}>Get Lifetime</Button>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> All Pro features forever</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Priority support</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Early access to new models</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
