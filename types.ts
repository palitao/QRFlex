// Firestore Collection: users
export interface User {
  uid: string;
  nome: string;
  email: string;
  plano: 'free' | 'pro' | 'business';
  data_registro: string; // ISO Date
  pais: string;
  foto_perfil?: string;
  qr_count?: number; // Enforced by Cloud Functions/Backend
}

// Firestore Collection: qr_codes
export interface QRCode {
  qr_id: string;
  owner_uid: string;
  tipo: 'link' | 'texto' | 'whatsapp' | 'wifi' | 'email' | 'localizacao' | 'vcard';
  destino_original: string;
  destino_encurtado?: string;
  premium: boolean;
  data_criacao: string;
  scans: number; // Augmented for UI
  design: {
    cor: string;
    fundo: string;
    gradiente?: string;
    logo_url?: string;
    moldura?: string;
    resolucao: 'low' | 'medium' | 'high' | 'vector';
  };
}

// Firestore Collection: stats
export interface Stat {
  qr_id: string;
  timestamp: string;
  pais: string;
  dispositivo: 'mobile' | 'desktop' | 'tablet';
  navegador: string;
  ip_hash: string;
  qr_owner_uid?: string; // Denormalized for security rules
}

// Firestore Collection: subscriptions
export interface Subscription {
  uid: string;
  plano: 'free' | 'pro' | 'business';
  status: 'active' | 'canceled' | 'past_due';
  data_inicio: string;
  data_fim: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  amount: number; // Visual helper
}

// Firestore Collection: api_keys
export interface ApiKey {
  uid: string;
  key: string;
  limite_mensal: number;
  uso_atual: number;
  label: string;
  created_at: string;
}

// KPI Types for Dashboard
export interface KpiMetric {
  label: string;
  value: string | number;
  change: number; // Percentage
  trend: 'up' | 'down' | 'neutral';
}