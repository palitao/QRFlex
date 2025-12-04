import React from 'react';
import { FileCode, Database, Shield, Activity, Lock, CloudLightning } from 'lucide-react';

const CodeBlock = ({ label, code }: { label: string, code: string }) => (
  <div className="mb-6 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
      <FileCode size={14} className="text-blue-500" />
      {label}
    </div>
    <pre className="bg-slate-900 text-slate-50 p-4 text-xs overflow-x-auto font-mono leading-relaxed">
      {code}
    </pre>
  </div>
);

export const ArchitectureDocs = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Shield className="text-emerald-500" />
          Segurança & Regras Firestore
        </h2>
        <p className="text-slate-600 mb-8">
          Abaixo estão definidas as regras de segurança críticas para garantir a integridade dos dados, 
          controle de acesso baseado em planos (SaaS) e proteção contra escritas não autorizadas.
        </p>

        <CodeBlock 
          label="firestore.rules"
          code={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // --- FUNÇÕES AUXILIARES ---
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Busca dados do usuário para verificar plano e cotas
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    // --- REGRAS POR COLEÇÃO ---

    // 1. Users
    match /users/{userId} {
      allow read: if isOwner(userId);
      // Usuário não pode alterar seu próprio plano ou status manualmente (Apenas Backend)
      allow update: if isOwner(userId) 
        && (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['plano', 'status', 'qr_count']));
    }

    // 2. QR Codes
    match /qr_codes/{qrId} {
      // LEITURA PÚBLICA: Necessário para que o QR funcione ao ser escaneado por qualquer pessoa
      allow read: if true; 

      // CRIAÇÃO: Restrita ao dono E verifica limite do plano Free
      allow create: if isAuthenticated() 
        && request.resource.data.owner_uid == request.auth.uid
        && (
          // Se plano não é free, permite criação
          getUserData().plano != 'free' 
          || 
          // Se é free, verifica se contagem é menor que o limite (ex: 5)
          getUserData().qr_count < 5
        );

      // UPDATE/DELETE: Apenas o dono pode editar ou excluir
      allow update, delete: if isOwner(resource.data.owner_uid);
    }

    // 3. Stats / Analytics
    match /stats/{statId} {
      // Apenas o dono do QR relacionado pode ver as estatísticas
      allow read: if isOwner(resource.data.qr_owner_uid); 
      
      // APENAS SERVIDOR: Bloqueia escrita via Client SDK. 
      // O Backend (FastAPI) usa a Admin SDK (Service Account) que ignora estas regras.
      allow write: if false; 
    }
    
    // 4. API Keys
    match /api_keys/{keyId} {
      // Leitura permitida para o dono (para ver no dashboard)
      allow read: if isOwner(resource.data.uid);
      
      // Escrita/Geração bloqueada publicamente; apenas Backend via rota /api/create
      allow write: if false; 
    }
  }
}`} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                 <Lock size={16} /> Limite do Plano Free
              </h4>
              <p className="text-sm text-amber-700">
                 A regra em `qr_codes` utiliza `get()` para ler o documento do usuário e verificar `plano` e `qr_count` antes de autorizar a criação. Isso impede que usuários Free criem QRs ilimitados manipulando requisições.
              </p>
           </div>
           <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                 <Activity size={16} /> Server-Side Analytics
              </h4>
              <p className="text-sm text-blue-700">
                 A coleção `stats` tem `allow write: if false`, o que significa que nenhum cliente Web/Mobile pode inserir dados falsos. Apenas o backend (FastAPI) autenticado como Admin pode registrar scans.
              </p>
           </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8 flex items-center gap-3">
          <Database className="text-purple-500" />
          Schema & Dados
        </h2>
        
        <CodeBlock 
          label="Modelos de Dados (Typescript Interface)"
          code={`// User Collection
interface User {
  uid: string;
  plano: 'free' | 'pro' | 'business';
  qr_count: number; // Incrementado via Backend/Cloud Function
  status: 'active' | 'suspended';
}

// Stats Collection (Analytics)
interface Stat {
  id: string;
  qr_id: string;
  qr_owner_uid: string; // Desnormalizado para permitir regra de leitura 'isOwner'
  ip_hash: string;
  user_agent: string;
  country: string;
  timestamp: FirebaseFirestore.Timestamp;
}`} 
        />

        <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8 flex items-center gap-3">
          <CloudLightning className="text-orange-500" />
          FastAPI Integration
        </h2>

        <CodeBlock 
          label="main.py (Backend Controller)"
          code={`from fastapi import FastAPI, Depends, HTTPException
from firebase_admin import firestore

app = FastAPI()
db = firestore.client()

@app.post("/generate")
def generate_qr(payload: QRRequest, user = Depends(auth_middleware)):
    user_ref = db.collection('users').document(user['uid'])
    user_doc = user_ref.get().to_dict()
    
    # 1. Validação de Lógica de Negócio (Redundância de Segurança)
    if user_doc['plano'] == 'free' and user_doc['qr_count'] >= 5:
        raise HTTPException(403, "Upgrade required")

    # 2. Criação do QR e Upload
    # ... logic ...
    
    # 3. Transaction: Salva QR e Incrementa Contador
    transaction = db.transaction()
    @firestore.transactional
    def create_in_transaction(transaction, qr_data):
        transaction.set(db.collection('qr_codes').document(), qr_data)
        transaction.update(user_ref, {"qr_count": firestore.Increment(1)})
    
    create_in_transaction(transaction, new_qr_data)
    return {"status": "created"}

@app.get("/r/{short_id}")
def redirect_handler(short_id: str, request: Request):
    # 1. Busca Destino
    qr_doc = db.collection('qr_codes').where('destino_encurtado', '==', short_id).get()
    
    # 2. Registra Stat (Server-Side Write)
    # Como usamos Admin SDK, a regra 'allow write: if false' é ignorada aqui.
    db.collection('stats').add({
        "qr_id": qr_doc.id,
        "qr_owner_uid": qr_doc.get('owner_uid'),
        "timestamp": firestore.SERVER_TIMESTAMP,
        "ip_hash": hash_ip(request.client.host)
    })
    
    return RedirectResponse(qr_doc.get('destino_original'))`} 
        />

      </div>
    </div>
  );
};