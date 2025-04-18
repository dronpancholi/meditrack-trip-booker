
import { useEffect, useState } from 'react';
import { Database, Loader2, WifiOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const ConnectionIndicator = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsSyncing(true);
        const { error } = await supabase.from("trips").select("id").limit(1);
        setIsConnected(!error);
        setIsSyncing(false);
      } catch (error) {
        setIsConnected(false);
        setIsSyncing(false);
        toast.error("Lost connection to server");
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center">
      <div className={`
        flex items-center gap-2 py-1 px-4 rounded-b-xl shadow-lg backdrop-blur-md transition-all duration-300
        ${isSyncing ? 'bg-medical-blue/20' : isConnected ? 'bg-green-500/20' : 'bg-red-500/20'}
      `}>
        <div className="relative">
          {isSyncing ? (
            <Loader2 className="h-4 w-4 animate-spin text-medical-blue" />
          ) : isConnected ? (
            <Database className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className={`absolute -right-1 -bottom-1 h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
        </div>
        <span className={`text-xs font-medium transition-all duration-300
          ${isSyncing ? 'text-medical-blue' : isConnected ? 'text-green-600' : 'text-red-600'}`}>
          {isSyncing ? 'Syncing...' : isConnected ? 'Connected' : 'Offline'}
        </span>
      </div>
    </div>
  );
};
