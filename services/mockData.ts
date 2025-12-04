import { User, QRCode, ApiKey, Subscription } from '../types';

export const currentUser: User = {
  uid: 'user_123456',
  nome: 'Ricardo Silva',
  email: 'ricardo@qrflex.com',
  plano: 'business',
  data_registro: '2023-01-15T10:00:00Z',
  pais: 'Portugal',
  foto_perfil: 'https://picsum.photos/200',
  qr_count: 24
};

export const mockQRCodes: QRCode[] = [
  {
    qr_id: 'qr_001',
    owner_uid: 'user_123456',
    tipo: 'link',
    destino_original: 'https://qrflex.com/pricing',
    destino_encurtado: 'https://qrf.lx/p/99a2',
    premium: true,
    data_criacao: '2023-10-01',
    scans: 12450,
    design: {
      cor: '#2563eb',
      fundo: '#ffffff',
      resolucao: 'high',
      moldura: 'classic'
    }
  },
  {
    qr_id: 'qr_002',
    owner_uid: 'user_123456',
    tipo: 'whatsapp',
    destino_original: 'wa.me/351999999999',
    premium: false,
    data_criacao: '2023-10-05',
    scans: 342,
    design: {
      cor: '#000000',
      fundo: '#ffffff',
      resolucao: 'medium'
    }
  },
  {
    qr_id: 'qr_003',
    owner_uid: 'user_123456',
    tipo: 'wifi',
    destino_original: 'WIFI:S:MyGuestWifi;T:WPA;P:password;;',
    premium: true,
    data_criacao: '2023-10-20',
    scans: 890,
    design: {
      cor: '#ea580c',
      fundo: '#fff7ed',
      resolucao: 'vector'
    }
  }
];

export const mockApiKeys: ApiKey[] = [
  {
    uid: 'user_123456',
    key: 'sk_live_51M...92a',
    limite_mensal: 10000,
    uso_atual: 4521,
    label: 'Production App',
    created_at: '2023-09-01'
  },
  {
    uid: 'user_123456',
    key: 'sk_test_42K...11x',
    limite_mensal: 1000,
    uso_atual: 12,
    label: 'Staging Environment',
    created_at: '2023-09-15'
  }
];

export const mockSubscription: Subscription = {
  uid: 'user_123456',
  plano: 'business',
  status: 'active',
  data_inicio: '2023-10-01',
  data_fim: '2023-11-01',
  stripe_customer_id: 'cus_N12345',
  stripe_subscription_id: 'sub_X98765',
  amount: 49.99
};

// Data for Charts
export const dailyScansData = [
  { name: 'Mon', scans: 400 },
  { name: 'Tue', scans: 300 },
  { name: 'Wed', scans: 550 },
  { name: 'Thu', scans: 450 },
  { name: 'Fri', scans: 700 },
  { name: 'Sat', scans: 900 },
  { name: 'Sun', scans: 850 },
];

export const deviceData = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 25 },
  { name: 'Tablet', value: 10 },
];

export const qrTypeData = [
  { name: 'Link', value: 45 },
  { name: 'WiFi', value: 20 },
  { name: 'WhatsApp', value: 15 },
  { name: 'Location', value: 10 },
  { name: 'Others', value: 10 },
];

export const geoData = [
  { country: 'Portugal', scans: 1200 },
  { country: 'Brazil', scans: 950 },
  { country: 'USA', scans: 400 },
  { country: 'Spain', scans: 210 },
  { country: 'France', scans: 180 },
];