
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
    <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm transition-all">
      {isSyncing ? (
        <Loader2 className="h-4 w-4 animate-spin text-medical-blue" />
      ) : isConnected ? (
        <Database className="h-4 w-4 text-green-500" />
      ) : (
        <WifiOff className="h-4 w-4 text-red-500" />
      )}
      <span className="text-sm font-medium">
        {isSyncing ? 'Syncing...' : isConnected ? 'Connected' : 'Offline'}
      </span>
    </div>
  );
};
