
import React, { useState, useEffect } from 'react';
import { Link, MapPin, Mail, Wifi, Type, Download, Share2, Palette, Contact, LayoutTemplate, Check, Smartphone, FileCode, Sparkles, Upload, X, Image as ImageIcon, Settings2, Search, Briefcase, Calendar, User, Wrench, LayoutGrid, Copy, Phone, MessageCircle, MessageSquare, CreditCard, Lock, Clock, AlertTriangle } from 'lucide-react';
import { qrTemplates, QrTemplate } from '../services/templates';

const QR_TYPES = [
  { id: 'link', icon: Link, label: 'Website URL' },
  { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
  { id: 'vcard', icon: Contact, label: 'vCard' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'phone', icon: Phone, label: 'Phone' },
  { id: 'sms', icon: MessageSquare, label: 'SMS' },
  { id: 'payment', icon: CreditCard, label: 'Payment' },
  { id: 'localizacao', icon: MapPin, label: 'Location' },
  { id: 'text', icon: Type, label: 'Plain Text' },
];

const CATEGORY_TABS = [
  { id: 'All', label: 'All', icon: LayoutGrid },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Events', label: 'Events', icon: Calendar },
  { id: 'Personal', label: 'Personal', icon: User },
  { id: 'Utilities', label: 'Utilities', icon: Wrench },
];

const FRAME_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'scan_me', label: 'Scan Me' },
  { id: 'bubble', label: 'Bubble' },
  { id: 'ticket_stub', label: 'Ticket' },
  { id: 'phone', label: 'Phone' },
  { id: 'marker', label: 'Marker' },
  { id: 'polaroid', label: 'Polaroid' },
  { id: 'ribbon', label: 'Ribbon' },
  { id: 'browser', label: 'Browser' },
  { id: 'badge', label: 'ID Badge' },
];

const COLOR_PRESETS = [
  { name: 'Classic Black', color: '#000000' },
  { name: 'Brand Blue', color: '#2563eb' },
  { name: 'Success Green', color: '#16a34a' },
  { name: 'Alert Red', color: '#dc2626' },
  { name: 'Royal Purple', color: '#7c3aed' },
  { name: 'Hot Pink', color: '#db2777' },
  { name: 'Slate Dark', color: '#1e293b' },
  { name: 'Orange Pop', color: '#ea580c' },
];

export const QrGenerator = () => {
  const [selectedType, setSelectedType] = useState('link');
  // inputValue is the final string sent to the API
  const [inputValue, setInputValue] = useState('https://qrflex.com');
  
  // Smart Form States
  const [wifiData, setWifiData] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [vCardData, setVCardData] = useState({ firstName: '', lastName: '', phone: '', email: '', org: '', url: '' });
  const [emailData, setEmailData] = useState({ email: '', subject: '', body: '' });
  const [whatsappData, setWhatsappData] = useState({ number: '', message: '' });
  const [phoneData, setPhoneData] = useState({ number: '' });
  const [smsData, setSmsData] = useState({ number: '', message: '' });
  const [paymentData, setPaymentData] = useState({ method: 'mpesa', number: '', amount: '' });

  // Dynamic Settings (SaaS Features)
  const [isDynamic, setIsDynamic] = useState(true);
  const [password, setPassword] = useState('');
  const [expiration, setExpiration] = useState('');
  const [scanLimit, setScanLimit] = useState('');

  const [color, setColor] = useState('#000000');
  const [frame, setFrame] = useState('none');
  const [frameLabel, setFrameLabel] = useState('Scan Me');
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  
  // Logo Customization State
  const [logoSize, setLogoSize] = useState(0.2); // 0.2 = 20% of QR size
  const [logoBg, setLogoBg] = useState(true);

  // Background Customization State
  const [bgType, setBgType] = useState<'solid' | 'gradient'>('solid');
  const [bgColor1, setBgColor1] = useState('#ffffff');
  const [bgColor2, setBgColor2] = useState('#f8fafc');

  // Template Library State
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Effect: Sync Smart Forms to InputValue
  useEffect(() => {
    // Only auto-update if we are NOT in template mode (or if user is editing template values)
    if (selectedType === 'wifi') {
      const { ssid, password, encryption } = wifiData;
      setInputValue(`WIFI:S:${ssid};T:${encryption};P:${password};;`);
    } else if (selectedType === 'vcard') {
      const { firstName, lastName, phone, email, org, url } = vCardData;
      setInputValue(`BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName}\nFN:${firstName} ${lastName}\nORG:${org}\nTEL:${phone}\nEMAIL:${email}\nURL:${url}\nEND:VCARD`);
    } else if (selectedType === 'email') {
        const { email, subject, body } = emailData;
        setInputValue(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } else if (selectedType === 'whatsapp') {
        // WhatsApp format
        const cleanNumber = whatsappData.number.replace(/\D/g, '');
        setInputValue(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappData.message)}`);
    } else if (selectedType === 'phone') {
        setInputValue(`tel:${phoneData.number}`);
    } else if (selectedType === 'sms') {
        setInputValue(`smsto:${smsData.number}:${smsData.message}`);
    } else if (selectedType === 'payment') {
        // For generic payments, we just store the data. Real SaaS would generate a payment link.
        setInputValue(`Payment Request: ${paymentData.method.toUpperCase()} - ${paymentData.number} - Amount: ${paymentData.amount}`);
    }
  }, [wifiData, vCardData, emailData, whatsappData, phoneData, smsData, paymentData, selectedType]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Please upload an image smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoSize(0.2);
    setLogoBg(true);
  };

  // Helper to Construct the Complex SVG with Frame
  const constructFinalSvg = (
    qrPathData: string, 
    frameId: string, 
    label: string, 
    qrColor: string, 
    logoData: string | null,
    lSize: number,
    lBg: boolean
  ) => {
    const frameColor = '#1e293b'; // Slate-800
    const labelColor = '#ffffff';
    let width = 500;
    let height = 500;
    let qrTransform = 'translate(25, 25) scale(0.9)'; // Default scaling for 500x500 box
    let content = '';

    // Define Frame Geometries
    switch(frameId) {
      case 'scan_me':
        width = 500;
        height = 600;
        qrTransform = 'translate(50, 40) scale(0.8)';
        content = `
          <rect x="10" y="10" width="480" height="580" rx="20" fill="none" stroke="${frameColor}" stroke-width="20" />
          <path d="M 10 480 L 490 480 L 490 570 Q 490 590 470 590 L 30 590 Q 10 590 10 570 Z" fill="${frameColor}" />
          <text x="250" y="555" font-family="sans-serif" font-size="40" font-weight="bold" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">${label.toUpperCase()}</text>
        `;
        break;
      
      case 'bubble':
        width = 500;
        height = 650;
        qrTransform = 'translate(50, 150) scale(0.8)';
        content = `
          <!-- Speech Bubble Top -->
          <path d="M 40 40 L 460 40 Q 480 40 480 60 L 480 120 Q 480 140 460 140 L 290 140 L 250 180 L 210 140 L 40 140 Q 20 140 20 120 L 20 60 Q 20 40 40 40 Z" fill="${frameColor}" />
          <text x="250" y="105" font-family="sans-serif" font-size="36" font-weight="bold" fill="${labelColor}" text-anchor="middle">${label.toUpperCase()}</text>
        `;
        break;

      case 'phone':
        width = 460;
        height = 800;
        qrTransform = 'translate(30, 100) scale(0.8)';
        content = `
          <rect x="10" y="10" width="440" height="780" rx="40" fill="none" stroke="${frameColor}" stroke-width="20" />
          <path d="M 180 50 L 280 50" stroke="${frameColor}" stroke-width="8" stroke-linecap="round" />
          <text x="230" y="740" font-family="sans-serif" font-size="28" font-weight="bold" fill="${frameColor}" text-anchor="middle" letter-spacing="2">${label.toUpperCase()}</text>
        `;
        break;

      case 'ticket_stub':
        width = 500;
        height = 600;
        qrTransform = 'translate(50, 80) scale(0.8)';
        content = `
          <rect x="20" y="60" width="460" height="520" rx="10" fill="none" stroke="${frameColor}" stroke-width="8" stroke-dasharray="10,10" />
          <rect x="120" y="10" width="260" height="40" rx="4" fill="${frameColor}" />
          <text x="250" y="38" font-family="sans-serif" font-size="20" font-weight="bold" fill="${labelColor}" text-anchor="middle">${label.toUpperCase()}</text>
          <circle cx="20" cy="300" r="15" fill="white" stroke="${frameColor}" stroke-width="4" />
          <circle cx="480" cy="300" r="15" fill="white" stroke="${frameColor}" stroke-width="4" />
        `;
        break;

      case 'marker':
        width = 500;
        height = 650;
        qrTransform = 'translate(75, 75) scale(0.7)';
        content = `
          <!-- Pin Shape -->
          <path d="M 250 630 C 250 630 450 400 450 250 A 200 200 0 1 0 50 250 C 50 400 250 630 250 630 Z" fill="none" stroke="${frameColor}" stroke-width="20" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="${frameColor}" stroke-width="5" />
          <rect x="150" y="-30" width="200" height="40" rx="20" fill="${frameColor}" />
          <text x="250" y="-5" font-family="sans-serif" font-size="20" font-weight="bold" fill="${labelColor}" text-anchor="middle">${label.toUpperCase()}</text>
        `;
        break;

      case 'polaroid':
        width = 500;
        height = 620;
        qrTransform = 'translate(25, 25) scale(0.9)';
        content = `
          <rect x="2" y="2" width="496" height="616" fill="#ffffff" stroke="${frameColor}" stroke-width="2" rx="4" />
          <rect x="25" y="25" width="450" height="450" fill="none" stroke="#e2e8f0" stroke-width="1" />
          <text x="250" y="560" font-family="sans-serif" font-size="36" font-weight="bold" fill="${frameColor}" text-anchor="middle">${label}</text>
        `;
        break;

      case 'ribbon':
        width = 500;
        height = 600;
        qrTransform = 'translate(25, 25) scale(0.9)';
        content = `
          <rect x="10" y="10" width="480" height="520" rx="10" fill="none" stroke="${frameColor}" stroke-width="10" />
          <path d="M 40 500 L 460 500 L 460 560 L 250 590 L 40 560 Z" fill="${frameColor}" />
          <text x="250" y="550" font-family="sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">${label.toUpperCase()}</text>
        `;
        break;

      case 'browser':
        width = 500;
        height = 620;
        qrTransform = 'translate(25, 70) scale(0.9)';
        content = `
          <rect x="0" y="0" width="500" height="620" rx="15" fill="#ffffff" stroke="${frameColor}" stroke-width="2" />
          <rect x="0" y="0" width="500" height="50" rx="15" fill="${frameColor}" />
          <rect x="0" y="25" width="500" height="25" fill="${frameColor}" />
          <circle cx="30" cy="25" r="8" fill="#ff5f56" />
          <circle cx="60" cy="25" r="8" fill="#ffbd2e" />
          <circle cx="90" cy="25" r="8" fill="#27c93f" />
          <text x="250" y="32" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
        `;
        break;

      case 'badge':
        width = 400;
        height = 650;
        qrTransform = 'translate(0, 100) scale(0.8)';
        content = `
          <rect x="20" y="20" width="360" height="610" rx="20" fill="#ffffff" stroke="${frameColor}" stroke-width="5" />
          <rect x="140" y="5" width="120" height="15" rx="5" fill="${frameColor}" />
          <rect x="20" y="550" width="360" height="80" fill="${frameColor}" />
          <text x="200" y="600" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">${label.toUpperCase()}</text>
        `;
        break;

      default:
        // None
        width = 500;
        height = 500;
        qrTransform = 'translate(25, 25) scale(0.9)'; // Simple center with margin
        content = ``; 
    }

    // Logo Calculations
    const qrInnerSize = 1000;
    const logoPx = qrInnerSize * lSize;
    const logoX = (qrInnerSize - logoPx) / 2;
    const logoY = (qrInnerSize - logoPx) / 2;
    // Padding for background rect
    const bgPadding = logoPx * 0.1; 
    const bgSize = logoPx + bgPadding * 2;
    const bgX = logoX - bgPadding;
    const bgY = logoY - bgPadding;
    const bgRx = bgSize * 0.15; // Rounded corners

    // Background Defs
    let bgRect = `<rect width="100%" height="100%" fill="${bgColor1}" />`;
    let bgDefs = '';
    
    if (bgType === 'gradient') {
      bgDefs = `
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${bgColor2};stop-opacity:1" />
        </linearGradient>
      `;
      bgRect = `<rect width="100%" height="100%" fill="url(#grad)" />`;
    }

    // Process QR Path - Remove API default white background rect if present
    let cleanQrPath = qrPathData.replace(/<rect width="100%" height="100%" fill="#ffffff"\s*\/>/i, '');
    cleanQrPath = cleanQrPath.replace(/<rect width="100%" height="100%" fill="white"\s*\/>/i, '');

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .qr-code-path { fill: ${qrColor}; }
    </style>
    ${bgDefs}
  </defs>
  
  ${bgRect}
  
  <!-- Frame Content -->
  ${content}

  <!-- QR Code Inner -->
  <g transform="${qrTransform}">
     <svg viewBox="0 0 1000 1000" width="500" height="500">
       ${cleanQrPath}
       ${logoData ? `
       <!-- Logo Group -->
       <g>
         ${lBg ? `<rect x="${bgX}" y="${bgY}" width="${bgSize}" height="${bgSize}" rx="${bgRx}" fill="#ffffff" />` : ''}
         <image href="${logoData}" x="${logoX}" y="${logoY}" width="${logoPx}" height="${logoPx}" preserveAspectRatio="xMidYMid meet" />
       </g>
       ` : ''}
     </svg>
  </g>
</svg>`;
  };

  const handleDownload = async (format: 'png' | 'svg') => {
    setLoading(true);
    try {
      // 1. Fetch Scannable QR Vector Data
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&format=svg&data=${encodeURIComponent(inputValue)}&color=${color.replace('#', '')}&qzone=1&ecc=H`;
      const response = await fetch(qrApiUrl);
      if (!response.ok) throw new Error('Failed to fetch QR code');
      const svgText = await response.text();
      
      const innerSvg = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] || '';

      // 2. Construct the Composite SVG with Frame and Logo
      const finalSvgString = constructFinalSvg(innerSvg, frame, frameLabel, color, logo, logoSize, logoBg);

      // 3. Process Download
      if (format === 'svg') {
        const blob = new Blob([finalSvgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qrflex-${selectedType}-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        const img = new Image();
        const svgBlob = new Blob([finalSvgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const parser = new DOMParser();
          const doc = parser.parseFromString(finalSvgString, 'image/svg+xml');
          const svgEl = doc.querySelector('svg');
          canvas.width = parseInt(svgEl?.getAttribute('width') || '500');
          canvas.height = parseInt(svgEl?.getAttribute('height') || '500');
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');
            
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `qrflex-${selectedType}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          URL.revokeObjectURL(url);
          setLoading(false);
        };
        img.src = url;
        return; 
      }

    } catch (e) {
      console.error("Download failed:", e);
      alert("Failed to generate high-res download. Please try again.");
    }
    setLoading(false);
  };

  const applyTemplate = (template: QrTemplate) => {
    setSelectedTemplateId(template.id);
    setSelectedType(template.config.type);
    setInputValue(template.config.content);
    setColor(template.config.color);
    setFrame(template.config.frame);
    setFrameLabel(template.config.label);
    
    // Reset visuals
    setLogo(null);
    setLogoSize(0.2);
    setLogoBg(true);
    setBgType('solid');
    setBgColor1('#ffffff');
    
    // Note: We don't populate the smart fields from template string parsing 
    // for simplicity in this demo, but user can edit the raw string or switch type.
  };

  const filteredTemplates = qrTemplates.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(inputValue)}&color=${color.replace('#', '')}&qzone=1&ecc=H`;

  // Render Smart Inputs based on type
  const renderSmartInputs = () => {
    switch(selectedType) {
      case 'wifi':
        return (
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
             <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Network Name (SSID)</label>
               <input 
                 type="text" 
                 className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="MyHomeWifi"
                 value={wifiData.ssid}
                 onChange={(e) => setWifiData({...wifiData, ssid: e.target.value})}
               />
             </div>
             <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
               <input 
                 type="text" 
                 className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="Password123"
                 value={wifiData.password}
                 onChange={(e) => setWifiData({...wifiData, password: e.target.value})}
               />
             </div>
             <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Encryption</label>
               <select 
                 className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                 value={wifiData.encryption}
                 onChange={(e) => setWifiData({...wifiData, encryption: e.target.value})}
               >
                 <option value="WPA">WPA/WPA2 (Most Common)</option>
                 <option value="WEP">WEP</option>
                 <option value="nopass">No Password</option>
               </select>
             </div>
          </div>
        );
      
      case 'whatsapp':
        return (
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
               <input type="tel" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+351 912 345 678" value={whatsappData.number} onChange={(e) => setWhatsappData({...whatsappData, number: e.target.value})} />
               <p className="text-[10px] text-slate-400 mt-1">Include country code.</p>
            </div>
            <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Pre-filled Message</label>
               <textarea rows={3} className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Hello, I would like to order..." value={whatsappData.message} onChange={(e) => setWhatsappData({...whatsappData, message: e.target.value})} />
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
               <input type="text" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John" value={vCardData.firstName} onChange={(e) => setVCardData({...vCardData, firstName: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
               <input type="text" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" value={vCardData.lastName} onChange={(e) => setVCardData({...vCardData, lastName: e.target.value})} />
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
               <input type="tel" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+1 555 000 0000" value={vCardData.phone} onChange={(e) => setVCardData({...vCardData, phone: e.target.value})} />
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
               <input type="email" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@company.com" value={vCardData.email} onChange={(e) => setVCardData({...vCardData, email: e.target.value})} />
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
               <input type="text" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Company Inc" value={vCardData.org} onChange={(e) => setVCardData({...vCardData, org: e.target.value})} />
            </div>
             <div className="col-span-1">
               <label className="block text-xs font-semibold text-slate-700 mb-1">Website</label>
               <input type="url" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://" value={vCardData.url} onChange={(e) => setVCardData({...vCardData, url: e.target.value})} />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
               <input type="email" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="recipient@example.com" value={emailData.email} onChange={(e) => setEmailData({...emailData, email: e.target.value})} />
             </div>
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
               <input type="text" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Inquiry about..." value={emailData.subject} onChange={(e) => setEmailData({...emailData, subject: e.target.value})} />
             </div>
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Body</label>
               <textarea rows={3} className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Hello..." value={emailData.body} onChange={(e) => setEmailData({...emailData, body: e.target.value})} />
             </div>
          </div>
        );
      
      case 'phone':
        return (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
             <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
             <input type="tel" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+1 555 123 4567" value={phoneData.number} onChange={(e) => setPhoneData({...phoneData, number: e.target.value})} />
          </div>
        );

      case 'sms':
        return (
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
               <input type="tel" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+1 555 123 4567" value={smsData.number} onChange={(e) => setSmsData({...smsData, number: e.target.value})} />
             </div>
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
               <textarea rows={3} className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Text message content..." value={smsData.message} onChange={(e) => setSmsData({...smsData, message: e.target.value})} />
             </div>
          </div>
        );

      case 'payment':
        return (
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
             <div className="flex gap-2 mb-2">
                <button onClick={() => setPaymentData({...paymentData, method: 'mpesa'})} className={`flex-1 py-2 text-xs font-bold rounded border ${paymentData.method === 'mpesa' ? 'bg-red-50 border-red-500 text-red-600' : 'bg-white border-slate-200'}`}>M-Pesa</button>
                <button onClick={() => setPaymentData({...paymentData, method: 'emola'})} className={`flex-1 py-2 text-xs font-bold rounded border ${paymentData.method === 'emola' ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-white border-slate-200'}`}>e-Mola</button>
                <button onClick={() => setPaymentData({...paymentData, method: 'stripe'})} className={`flex-1 py-2 text-xs font-bold rounded border ${paymentData.method === 'stripe' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-slate-200'}`}>Stripe</button>
             </div>
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Number / ID</label>
               <input type="text" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="84 123 4567" value={paymentData.number} onChange={(e) => setPaymentData({...paymentData, number: e.target.value})} />
             </div>
             <div>
               <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (Optional)</label>
               <input type="number" className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="500" value={paymentData.amount} onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})} />
             </div>
          </div>
        );

      default:
        // Text, Link, Location fallback to simple input
        return (
          <div className="relative">
            {selectedType === 'link' && <div className="absolute left-3 top-2.5 text-slate-400 pointer-events-none"><Link size={16} /></div>}
            {selectedType === 'localizacao' && <div className="absolute left-3 top-2.5 text-slate-400 pointer-events-none"><MapPin size={16} /></div>}
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`w-full ${selectedType !== 'text' ? 'pl-9' : 'pl-3'} pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow`}
              placeholder={selectedType === 'link' ? 'https://example.com' : 'Enter data content'}
            />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[calc(100vh-140px)]">
      {/* Editor Panel */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 pb-12 custom-scrollbar">
        
        {/* Templates Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-100">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg shadow-sm border border-indigo-200">
                  <LayoutTemplate size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Template Library</h2>
                  <p className="text-xs text-slate-500 font-medium">Choose a use case to start</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                {/* Search Input */}
                <div className="relative group w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                  />
                </div>

                {/* Category Tabs */}
                <div 
                  className="bg-slate-100/80 p-1 rounded-lg flex overflow-x-auto max-w-full gap-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {CATEGORY_TABS.map(tab => {
                    const count = tab.id === 'All' ? qrTemplates.length : qrTemplates.filter(t => t.category === tab.id).length;
                    const isActive = activeCategory === tab.id;
                    const Icon = tab.icon;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCategory(tab.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                          isActive 
                            ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' 
                            : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                        }`}
                      >
                        <Icon size={14} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                        {tab.label}
                        <span className={`text-[10px] py-0.5 px-1.5 rounded-full transition-colors ${
                          isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200/50 text-slate-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50/30">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x custom-scrollbar">
              {filteredTemplates.length > 0 ? filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className={`snap-start min-w-[240px] w-[240px] flex-shrink-0 relative flex flex-col text-left rounded-xl border transition-all duration-300 group overflow-hidden ${
                    selectedTemplateId === template.id
                      ? 'ring-2 ring-offset-2 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 bg-white'
                  }`}
                  style={{
                    borderColor: selectedTemplateId === template.id ? template.config.color : undefined,
                    '--tw-ring-color': template.config.color
                  } as React.CSSProperties}
                >
                  {/* Card Header with Color Splash */}
                  <div 
                    className="h-24 w-full flex items-center justify-center relative overflow-hidden"
                    style={{backgroundColor: `${template.config.color}15`}} 
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                      style={{backgroundColor: template.config.color}}
                    >
                      <template.icon size={24} />
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '12px 12px', color: template.config.color}}>
                    </div>
                  </div>

                  {selectedTemplateId === template.id && (
                    <div className="absolute top-2 right-2 bg-white text-slate-900 p-1 rounded-full shadow-sm z-20 border border-slate-100">
                      <Check size={14} strokeWidth={3} style={{color: template.config.color}} />
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-1 bg-white">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {template.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug mb-3 flex-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </button>
              )) : (
                <div className="w-full py-8 text-center text-slate-400">
                   <p className="text-sm">No templates found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          {selectedTemplateId && (
            <div className="bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg text-sm flex items-start sm:items-center gap-3 mb-6 border border-indigo-100 animate-in fade-in slide-in-from-top-2">
              <Sparkles size={18} className="mt-0.5 sm:mt-0 flex-shrink-0" />
              <span>
                Template <strong>{qrTemplates.find(t => t.id === selectedTemplateId)?.name}</strong> active. Settings have been pre-filled.
              </span>
              <button 
                onClick={() => setSelectedTemplateId(null)}
                className="ml-auto text-xs font-bold underline hover:text-indigo-900 whitespace-nowrap"
              >
                Clear
              </button>
            </div>
          )}

          <h2 className="text-lg font-bold text-slate-800 mb-4">1. Content Type</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {QR_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => { setSelectedType(type.id); setSelectedTemplateId(null); }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <type.icon size={24} className="mb-2" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
          <h2 className="text-lg font-bold text-slate-800 mb-4">2. Data & Configuration</h2>
          <div className="space-y-4">
            
            {/* Dynamic Form Content */}
            {renderSmartInputs()}
            
            {/* Raw Data Preview (Debug) or Manual Override for Experts */}
            {['wifi', 'vcard', 'email'].includes(selectedType) && (
              <details className="text-xs text-slate-500">
                <summary className="cursor-pointer hover:text-blue-600 mb-2">Show raw QR data (Advanced)</summary>
                <textarea 
                   readOnly 
                   className="w-full bg-slate-50 border border-slate-200 rounded p-2 font-mono text-[10px]" 
                   rows={3}
                   value={inputValue}
                />
              </details>
            )}

            {selectedType === 'link' && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-sm text-slate-800 font-bold">
                     <Settings2 size={16} className="text-blue-600" />
                     Dynamic Configuration
                     <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200 ml-2">PRO FEATURE</span>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={isDynamic} onChange={() => setIsDynamic(!isDynamic)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                </div>

                {isDynamic && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-in fade-in slide-in-from-top-1">
                     <div>
                       <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                         <Lock size={12} /> Password Protection
                       </label>
                       <input 
                         type="password" 
                         placeholder="Optional pass code"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                       />
                     </div>
                     <div>
                       <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                         <Clock size={12} /> Expiration Date
                       </label>
                       <input 
                         type="date" 
                         value={expiration}
                         onChange={(e) => setExpiration(e.target.value)}
                         className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                       />
                     </div>
                     <div>
                       <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                         <AlertTriangle size={12} /> Scan Limit
                       </label>
                       <input 
                         type="number" 
                         placeholder="Max scans (e.g. 100)"
                         value={scanLimit}
                         onChange={(e) => setScanLimit(e.target.value)}
                         className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                       />
                     </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Palette size={20} className="text-purple-500" />
            3. Design Customization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Color Customization */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
                
                {/* Preset Colors */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setColor(preset.color)}
                      title={preset.name}
                      className={`w-6 h-6 rounded-full border border-slate-200 shadow-sm hover:scale-110 transition-transform ${color === preset.color ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
                      style={{backgroundColor: preset.color}}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-12 rounded cursor-pointer border border-slate-200 p-1 bg-white" 
                  />
                  <div className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm font-mono text-slate-600">
                    {color}
                  </div>
                </div>
              </div>

               {/* Background Customization */}
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Background</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setBgType('solid')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded ${bgType === 'solid' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                    >
                      Solid
                    </button>
                    <button 
                      onClick={() => setBgType('gradient')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded ${bgType === 'gradient' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/50'}`}
                    >
                      Gradient
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={bgColor1}
                      onChange={(e) => setBgColor1(e.target.value)}
                      className="h-8 w-10 rounded cursor-pointer border border-slate-200 p-0.5 bg-white" 
                    />
                    {bgType === 'gradient' && (
                      <>
                        <span className="text-slate-400 text-xs">to</span>
                        <input 
                          type="color" 
                          value={bgColor2}
                          onChange={(e) => setBgColor2(e.target.value)}
                          className="h-8 w-10 rounded cursor-pointer border border-slate-200 p-0.5 bg-white" 
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Logo Upload Section */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Logo Overlay</label>
              {!logo ? (
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-lg group-hover:border-blue-400 group-hover:bg-blue-50 transition-colors h-32">
                    <Upload size={20} className="text-slate-400 mb-2 group-hover:text-blue-500" />
                    <span className="text-xs text-slate-500 font-medium">Click to upload logo</span>
                    <span className="text-[10px] text-slate-400">(JPG, PNG, SVG)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 border border-slate-200 rounded-lg bg-slate-50">
                    <div className="w-10 h-10 bg-white rounded border border-slate-200 p-1 flex items-center justify-center">
                      <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">Logo Uploaded</p>
                      <p className="text-[10px] text-slate-400">Centered on QR</p>
                    </div>
                    <button onClick={removeLogo} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* Logo Customization Controls */}
                  <div className="bg-slate-50 rounded-lg border border-slate-100 p-3 text-xs">
                     <div className="flex items-center gap-2 mb-2 text-slate-600 font-semibold">
                       <Settings2 size={12} /> Logo Settings
                     </div>
                     <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1 text-slate-500">
                            <span>Size</span>
                            <span>{Math.round(logoSize * 100)}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="35" 
                            step="1"
                            value={Math.round(logoSize * 100)} 
                            onChange={(e) => setLogoSize(parseInt(e.target.value) / 100)}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-slate-500">White Background</span>
                          <button
                            onClick={() => setLogoBg(!logoBg)}
                            className={`w-9 h-5 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none ${logoBg ? 'bg-blue-600' : 'bg-slate-200'}`}
                            title="Toggle white background for better scannability"
                          >
                            <span
                              className={`absolute left-[2px] top-[2px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${logoBg ? 'translate-x-4' : 'translate-x-0'}`}
                            />
                          </button>
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Frame Style</label>
              <div className="flex flex-wrap gap-2">
                {FRAME_OPTIONS.map((opt) => (
                  <button 
                   key={opt.id}
                   onClick={() => setFrame(opt.id)}
                   className={`px-3 py-1.5 rounded text-sm border transition-colors ${frame === opt.id ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                  >
                   {opt.label}
                 </button>
                ))}
              </div>
              
              {frame !== 'none' && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Frame Text (Call to Action)</label>
                  <input
                    type="text"
                    value={frameLabel}
                    onChange={(e) => setFrameLabel(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="Ex: Scan Me"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Panel - Sticky */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-800">Live Preview</h2>
            <div className="px-2 py-1 bg-slate-100 rounded text-xs font-mono text-slate-500">250x250px</div>
          </div>
          
          <div className="relative mb-6 flex justify-center">
            <div 
              className={`relative rounded-xl shadow-sm border border-slate-100 p-4 transition-all duration-300 
                ${frame !== 'none' && frame !== 'bubble' ? 'pt-8 pb-12' : ''} 
                ${frame === 'bubble' ? 'pt-20 pb-4' : ''}
                ${frame === 'phone' ? 'px-8 pt-12 pb-12 border-4 border-slate-800 rounded-[2rem]' : ''} 
                ${frame === 'polaroid' ? 'pb-16 px-4 border border-slate-200 shadow-xl' : ''}`}
              style={{
                background: bgType === 'solid' ? bgColor1 : `linear-gradient(to bottom right, ${bgColor1}, ${bgColor2})`
              }}
            >
              
              {/* Fake Frame Rendering */}
              {frame === 'scan_me' && (
                <div className="absolute inset-0 border-[10px] border-slate-900 rounded-xl pointer-events-none z-10 flex flex-col items-center justify-end pb-0">
                   <div className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-t-md -mb-[2px] translate-y-full">
                     {frameLabel}
                   </div>
                </div>
              )}
              {frame === 'ticket_stub' && (
                <div className="absolute -top-4 left-0 w-full flex justify-center z-10">
                   <div className="bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-6 py-1.5 rounded-sm shadow-sm">
                      {frameLabel || 'ADMIT ONE'}
                   </div>
                </div>
              )}
              {frame === 'bubble' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[90%] z-10 flex flex-col items-center">
                   <div className="bg-slate-900 text-white w-full py-3 rounded-xl shadow-lg flex items-center justify-center relative">
                      <span className="font-bold text-lg uppercase tracking-wide">{frameLabel || 'SCAN ME'}</span>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-slate-900"></div>
                   </div>
                </div>
              )}
              {frame === 'phone' && (
                <>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-b-lg z-10"></div>
                  <div className="absolute bottom-2 left-0 w-full text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{frameLabel || 'CONTACT'}</span>
                  </div>
                </>
              )}
              {frame === 'marker' && (
                 <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-start -mt-8">
                    <div className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md mb-1">{frameLabel || 'LOCATION'}</div>
                    <MapPin className="text-slate-900 fill-slate-900/10" size={40} />
                 </div>
              )}
              {frame === 'polaroid' && (
                <div className="absolute bottom-4 left-0 w-full text-center z-10">
                   <span className="font-handwriting text-slate-800 text-lg font-bold">{frameLabel || 'Memories'}</span>
                </div>
              )}
              {frame === 'ribbon' && (
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[90%] z-10 flex justify-center">
                   <div 
                     className="bg-slate-900 text-white w-full py-3 shadow-lg flex items-center justify-center"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)', paddingBottom: '1rem' }}
                   >
                      <span className="text-sm font-bold uppercase tracking-widest mt-[-5px]">{frameLabel || 'SPECIAL'}</span>
                   </div>
                </div>
              )}
              {frame === 'browser' && (
                <div className="absolute top-0 left-0 w-full z-10">
                   <div className="h-8 bg-slate-900 rounded-t-lg flex items-center px-3 gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      <div className="flex-1 text-center text-[10px] font-mono text-slate-400">{frameLabel || 'qrflex.com'}</div>
                   </div>
                </div>
              )}
              {frame === 'badge' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[60%] z-10 flex flex-col items-center">
                   <div className="w-16 h-3 bg-slate-900 rounded-full mb-1"></div>
                   <div className="absolute bottom-[-220px] left-0 w-full text-center pointer-events-none">
                      <div className="bg-slate-900 text-white py-2 rounded-lg shadow-md font-bold uppercase tracking-widest text-xs">
                        {frameLabel || 'STAFF'}
                      </div>
                   </div>
                </div>
              )}

              {loading ? (
                <div className="w-[200px] h-[200px] flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="relative w-[200px] h-[200px]">
                  <img src={qrImageUrl} alt="QR Preview" className="w-full h-full object-contain mix-blend-multiply" />
                  {logo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       {logoBg && (
                          <div 
                             className="absolute bg-white shadow-sm border border-slate-100"
                             style={{
                                width: `${logoSize * 120}%`,
                                height: `${logoSize * 120}%`,
                                borderRadius: '12%',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                             }}
                          />
                       )}
                       <img 
                          src={logo} 
                          alt="Logo" 
                          className="absolute object-contain z-10"
                          style={{
                             width: `${logoSize * 100}%`,
                             height: `${logoSize * 100}%`,
                             left: '50%',
                             top: '50%',
                             transform: 'translate(-50%, -50%)'
                          }}
                       />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
               <button 
                onClick={() => handleDownload('png')}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 font-bold">
                   <Download size={18} /> PNG
                </div>
                <span className="text-[10px] text-blue-100 opacity-80 font-medium">High Resolution (4K)</span>
              </button>
              <button 
                onClick={() => handleDownload('svg')}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-1 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white py-3 rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 font-bold">
                   <FileCode size={18} /> SVG
                </div>
                <span className="text-[10px] text-slate-300 opacity-80 font-medium">Vector Format</span>
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors">
               <Share2 size={18} /> Share Link
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Secure generation powered by QRFlex Engine.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
