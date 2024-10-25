import { iFeature } from "@/pages/apps/stores/features/[featureId]";
import { fetchOrganizationByNameOrBaseUrl, iClient } from "@/service/client.service";
import { fetchAllFeatures } from "@/service/features.service";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ClientContextType {
  clientInfo: iClient | null;
  features: iFeature[];
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [clientInfo, setClientInfo] = useState<iClient | null>(null);
  const [features,setFeatures] = useState<iFeature[]>([])

  useEffect(() => {
    const fetchClientInfo = async () => {
      const client = await fetchOrganizationByNameOrBaseUrl();
      setClientInfo(client);
    };

    const fetchFeatures = async () => {
      const features = await fetchAllFeatures();
      setFeatures(features);
    }
    
    fetchClientInfo();
    fetchFeatures();
  }, []);
  console.log(clientInfo,'<---client info is here')

  return (
    <ClientContext.Provider value={{ clientInfo,features }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
