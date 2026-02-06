
import React, { useState, useRef } from 'react';
import { SaveTheDateData } from '../../types';
import { SAVE_THE_DATE_TEMPLATES, DEFAULT_SAVE_THE_DATE } from '../../constants';
import { ImagePlus, Download, Share2, Facebook, Twitter, Instagram, MessageCircle, Link, X, Loader2, Check, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';

// ─── Date formatting helper ────────────────────────────────────────
const formatDate = (dateStr: string, style: 'long' | 'numeric' | 'filipino' = 'long'): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');

  if (style === 'numeric') {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  if (style === 'filipino') {
    const months = ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// ─── Template 1: Classic Elegant ───────────────────────────────────
const ClassicElegantCard: React.FC<{ data: SaveTheDateData }> = ({ data }) => {
  const bride = data.brideName || 'Bride';
  const groom = data.groomName || 'Groom';

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#FDF8F0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Double border frame */}
      <div style={{ position: 'absolute', inset: '12px', border: '1px solid #C5A572', borderRadius: '4px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '18px', border: '0.5px solid #C5A572', borderRadius: '2px', pointerEvents: 'none', opacity: 0.5 }} />

      {/* Corner flourishes */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => {
        const isTop = pos.includes('top');
        const isLeft = pos.includes('left');
        return (
          <div key={pos} style={{
            position: 'absolute',
            [isTop ? 'top' : 'bottom']: '24px',
            [isLeft ? 'left' : 'right']: '24px',
            width: '20px', height: '20px',
            borderTop: isTop ? '1.5px solid #C5A572' : 'none',
            borderBottom: !isTop ? '1.5px solid #C5A572' : 'none',
            borderLeft: isLeft ? '1.5px solid #C5A572' : 'none',
            borderRight: !isLeft ? '1.5px solid #C5A572' : 'none',
          }} />
        );
      })}

      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C5A572', fontWeight: 700, marginBottom: '20px' }}>
        Save the Date
      </p>

      {/* Photo or monogram */}
      {data.photoUrl ? (
        <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #C5A572', marginBottom: '20px', flexShrink: 0 }}>
          <img src={data.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1.5px solid #C5A572', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#C5A572', fontStyle: 'italic' }}>
            {bride[0]}&{groom[0]}
          </span>
        </div>
      )}

      {/* Gold divider */}
      <div style={{ width: '60px', height: '1px', backgroundColor: '#C5A572', marginBottom: '16px', opacity: 0.6 }} />

      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontStyle: 'italic', fontWeight: 600, color: '#4A3520', textAlign: 'center', lineHeight: 1.2, marginBottom: '16px' }}>
        {bride} & {groom}
      </p>

      {/* Gold divider */}
      <div style={{ width: '60px', height: '1px', backgroundColor: '#C5A572', marginBottom: '16px', opacity: 0.6 }} />

      {data.weddingDate && (
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A572', fontWeight: 600, marginBottom: '8px' }}>
          {formatDate(data.weddingDate, 'long')}
        </p>
      )}

      {(data.venue || data.location) && (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', fontStyle: 'italic', color: '#8B7355', textAlign: 'center' }}>
          {[data.venue, data.location].filter(Boolean).join(', ')}
        </p>
      )}

      {data.customMessage && (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', fontStyle: 'italic', color: '#B8A080', marginTop: '14px', textAlign: 'center' }}>
          {data.customMessage}
        </p>
      )}
    </div>
  );
};

// ─── Template 2: Modern Minimal ────────────────────────────────────
const ModernMinimalCard: React.FC<{ data: SaveTheDateData }> = ({ data }) => {
  const bride = data.brideName || 'Bride';
  const groom = data.groomName || 'Groom';

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#1C3347', fontWeight: 700, marginBottom: '24px' }}>
        Save the Date
      </p>

      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
        {/* Photo area */}
        {data.photoUrl ? (
          <div style={{ width: '45%', flexShrink: 0, overflow: 'hidden' }}>
            <img src={data.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{ width: '45%', flexShrink: 0, backgroundColor: '#F5F8F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '40px', fontWeight: 700, color: '#D5E4ED' }}>
              {bride[0]}{groom[0]}
            </span>
          </div>
        )}

        {/* Text area */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1 }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '32px', fontWeight: 600, color: '#1C3347', lineHeight: 1.0 }}>
            {bride}
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 300, color: '#6B96AD', margin: '4px 0' }}>
            &
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '32px', fontWeight: 600, color: '#1C3347', lineHeight: 1.0 }}>
            {groom}
          </p>
        </div>
      </div>

      {/* Divider line */}
      <div style={{ width: '100%', height: '1px', backgroundColor: '#D5E4ED', margin: '20px 0 16px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          {data.weddingDate && (
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1C3347', letterSpacing: '0.05em' }}>
              {formatDate(data.weddingDate, 'numeric')}
            </p>
          )}
          {(data.venue || data.location) && (
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#6B96AD', fontWeight: 400, marginTop: '4px' }}>
              {[data.venue, data.location].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
        {data.customMessage && (
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '8px', color: '#9DC0D3', textAlign: 'right', maxWidth: '120px', letterSpacing: '0.05em' }}>
            {data.customMessage}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Template 3: Filipiniana ───────────────────────────────────────
const FilipinianaCard: React.FC<{ data: SaveTheDateData }> = ({ data }) => {
  const bride = data.brideName || 'Bride';
  const groom = data.groomName || 'Groom';

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#F5EDE0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', position: 'relative', overflow: 'hidden' }}>
      {/* Woven border pattern */}
      <div style={{
        position: 'absolute', inset: '10px',
        border: '3px solid transparent',
        borderImage: 'repeating-linear-gradient(45deg, #8B6914 0px, #8B6914 4px, transparent 4px, transparent 8px, #C5A572 8px, #C5A572 12px, transparent 12px, transparent 16px) 8',
        pointerEvents: 'none',
      }} />

      {/* Inner frame */}
      <div style={{ position: 'absolute', inset: '20px', border: '0.5px solid #C5A57266', pointerEvents: 'none' }} />

      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B6914', fontWeight: 600, marginBottom: '4px' }}>
        Ipagsama ang Petsa
      </p>
      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A08050', fontWeight: 500, marginBottom: '16px' }}>
        Save the Date
      </p>

      {/* Ornament */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '24px', height: '1px', backgroundColor: '#8B6914' }} />
        <span style={{ color: '#8B6914', fontSize: '12px' }}>&#10022;</span>
        <div style={{ width: '24px', height: '1px', backgroundColor: '#8B6914' }} />
      </div>

      {/* Photo */}
      {data.photoUrl ? (
        <div style={{ width: '160px', height: '120px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', flexShrink: 0, border: '2px solid #C5A572' }}>
          <img src={data.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.15) saturate(0.9)' }} />
        </div>
      ) : (
        <div style={{ width: '120px', height: '80px', borderRadius: '12px', backgroundColor: '#EDE0CC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', flexShrink: 0, border: '1px solid #C5A572' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: '#8B6914', fontStyle: 'italic' }}>
            {bride[0]} & {groom[0]}
          </span>
        </div>
      )}

      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontStyle: 'italic', fontWeight: 600, color: '#4A1E0A', textAlign: 'center', lineHeight: 1.2, marginBottom: '12px' }}>
        {bride} & {groom}
      </p>

      {data.weddingDate && (
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B6914', fontWeight: 600, marginBottom: '6px' }}>
          {formatDate(data.weddingDate, 'filipino')}
        </p>
      )}

      {(data.venue || data.location) && (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', fontStyle: 'italic', color: '#6B4E20', textAlign: 'center' }}>
          {[data.venue, data.location].filter(Boolean).join(', ')}
        </p>
      )}

      {data.customMessage && (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '10px', fontStyle: 'italic', color: '#A08050', marginTop: '12px', textAlign: 'center' }}>
          {data.customMessage}
        </p>
      )}
    </div>
  );
};

// ─── Template 4: Tropical / Beach ──────────────────────────────────
const TropicalBeachCard: React.FC<{ data: SaveTheDateData }> = ({ data }) => {
  const bride = data.brideName || 'Bride';
  const groom = data.groomName || 'Groom';

  const LeafSvg = ({ style }: { style: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 55C5 55 10 30 30 15C50 0 55 5 55 5C55 5 50 15 35 30C20 45 5 55 5 55Z" stroke="#9DC0D3" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M5 55C5 55 20 35 40 25" stroke="#9DC0D3" strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #D5E4ED 0%, #EDF3F7 40%, #F5F8F8 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
      {/* Corner leaves */}
      <LeafSvg style={{ position: 'absolute', top: '8px', left: '8px', width: '50px', height: '50px' }} />
      <LeafSvg style={{ position: 'absolute', top: '8px', right: '8px', width: '50px', height: '50px', transform: 'scaleX(-1)' }} />
      <LeafSvg style={{ position: 'absolute', bottom: '8px', left: '8px', width: '50px', height: '50px', transform: 'scaleY(-1)' }} />
      <LeafSvg style={{ position: 'absolute', bottom: '8px', right: '8px', width: '50px', height: '50px', transform: 'scale(-1, -1)' }} />

      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#6B96AD', fontWeight: 700, marginBottom: '20px' }}>
        Save the Date
      </p>

      {/* Photo */}
      {data.photoUrl ? (
        <div style={{ width: '180px', height: '130px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', flexShrink: 0, boxShadow: '0 8px 30px rgba(107, 150, 173, 0.2)' }}>
          <img src={data.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ width: '140px', height: '100px', borderRadius: '16px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', flexShrink: 0, boxShadow: '0 4px 20px rgba(107, 150, 173, 0.15)' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 500, color: '#9DC0D3', fontStyle: 'italic' }}>
            {bride[0]} & {groom[0]}
          </span>
        </div>
      )}

      {/* Wave divider */}
      <svg viewBox="0 0 200 20" style={{ width: '120px', height: '12px', marginBottom: '14px' }}>
        <path d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10" stroke="#9DC0D3" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>

      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontStyle: 'italic', fontWeight: 500, color: '#1C3347', textAlign: 'center', lineHeight: 1.2, marginBottom: '14px' }}>
        {bride} & {groom}
      </p>

      {data.weddingDate && (
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B96AD', fontWeight: 600, marginBottom: '6px' }}>
          {formatDate(data.weddingDate, 'long')}
        </p>
      )}

      {(data.venue || data.location) && (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', fontStyle: 'italic', color: '#6B96AD', textAlign: 'center' }}>
          {[data.venue, data.location].filter(Boolean).join(', ')}
        </p>
      )}

      {data.customMessage && (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '10px', fontStyle: 'italic', color: '#9DC0D3', marginTop: '12px', textAlign: 'center' }}>
          {data.customMessage}
        </p>
      )}
    </div>
  );
};

// ─── Template map ──────────────────────────────────────────────────
const TEMPLATE_COMPONENTS: Record<string, React.FC<{ data: SaveTheDateData }>> = {
  'classic-elegant': ClassicElegantCard,
  'modern-minimal': ModernMinimalCard,
  'filipiniana': FilipinianaCard,
  'tropical-beach': TropicalBeachCard,
};

// ─── Main SaveTheDate Component ────────────────────────────────────
const SaveTheDate: React.FC = () => {
  const [formData, setFormData] = useState<SaveTheDateData>({ ...DEFAULT_SAVE_THE_DATE });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof SaveTheDateData, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ── Photo handling ──
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      update('photoUrl', event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    update('photoUrl', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Download ──
  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      const safeBride = (formData.brideName || 'bride').replace(/\s+/g, '-').toLowerCase();
      const safeGroom = (formData.groomName || 'groom').replace(/\s+/g, '-').toLowerCase();
      link.download = `save-the-date-${safeBride}-${safeGroom}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Sharing ──
  const shareMessage = `Save the Date! ${formData.brideName || 'Bride'} & ${formData.groomName || 'Groom'}${formData.weddingDate ? ` are getting married on ${formatDate(formData.weddingDate, 'long')}` : ''}${formData.venue || formData.location ? ` at ${[formData.venue, formData.location].filter(Boolean).join(', ')}` : ''}!`;

  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    try {
      await document.fonts.ready;
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(b => resolve(b), 'image/png'));
      if (blob && navigator.canShare) {
        const file = new File([blob], 'save-the-date.png', { type: 'image/png' });
        await navigator.share({ title: 'Save the Date', text: shareMessage, files: [file] });
      }
    } catch {}
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const TemplateComponent = TEMPLATE_COMPONENTS[formData.templateId] || ClassicElegantCard;

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 hairline-border">
      {/* Header */}
      <div className="mb-16">
        <h3 className="text-4xl font-normal mb-4 text-ever-midnight">Save the Date</h3>
        <p className="text-ever-cove serif italic text-xl">Design a beautiful announcement for your forever.</p>
      </div>

      {/* Template Selector */}
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-cove mb-6">Choose a Template</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SAVE_THE_DATE_TEMPLATES.map(template => (
            <button
              key={template.id}
              onClick={() => update('templateId', template.id)}
              className={`p-5 rounded-2xl text-left transition-all ${
                formData.templateId === template.id
                  ? 'bg-ever-midnight text-white shadow-xl scale-[1.02]'
                  : 'bg-white border border-ever-frost hover:border-ever-cove'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mb-3"
                style={{ backgroundColor: template.accentColor }}
              />
              <p className={`text-sm font-bold ${formData.templateId === template.id ? 'text-white' : 'text-ever-midnight'}`}>
                {template.name}
              </p>
              <p className={`text-[10px] mt-1 leading-snug ${formData.templateId === template.id ? 'text-ever-frost' : 'text-ever-cove'}`}>
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Two-column: Form + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT: Form */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-cove mb-2">Your Details</p>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Bride's Name</label>
            <input
              type="text"
              value={formData.brideName}
              onChange={e => update('brideName', e.target.value)}
              placeholder="e.g. Sarah"
              className="w-full px-6 py-4 bg-ever-pearl border border-ever-frost rounded-2xl outline-none focus:border-ever-midnight transition-all text-ever-midnight font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Groom's Name</label>
            <input
              type="text"
              value={formData.groomName}
              onChange={e => update('groomName', e.target.value)}
              placeholder="e.g. Mark"
              className="w-full px-6 py-4 bg-ever-pearl border border-ever-frost rounded-2xl outline-none focus:border-ever-midnight transition-all text-ever-midnight font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Wedding Date</label>
            <input
              type="date"
              value={formData.weddingDate}
              onChange={e => update('weddingDate', e.target.value)}
              className="w-full px-6 py-4 bg-ever-pearl border border-ever-frost rounded-2xl outline-none focus:border-ever-midnight transition-all text-ever-midnight font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Venue</label>
            <input
              type="text"
              value={formData.venue}
              onChange={e => update('venue', e.target.value)}
              placeholder="e.g. The Hills"
              className="w-full px-6 py-4 bg-ever-pearl border border-ever-frost rounded-2xl outline-none focus:border-ever-midnight transition-all text-ever-midnight font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => update('location', e.target.value)}
              placeholder="e.g. Tagaytay"
              className="w-full px-6 py-4 bg-ever-pearl border border-ever-frost rounded-2xl outline-none focus:border-ever-midnight transition-all text-ever-midnight font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Custom Message</label>
            <input
              type="text"
              value={formData.customMessage || ''}
              onChange={e => update('customMessage', e.target.value)}
              placeholder="e.g. We're getting married!"
              className="w-full px-6 py-4 bg-ever-pearl border border-ever-frost rounded-2xl outline-none focus:border-ever-midnight transition-all text-ever-midnight font-medium"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-ever-cove mb-2 block">Engagement Photo</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            {formData.photoUrl ? (
              <div className="relative inline-block">
                <img
                  src={formData.photoUrl}
                  alt="Uploaded"
                  className="w-24 h-24 rounded-2xl object-cover border border-ever-frost"
                />
                <button
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-ever-midnight text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-ever-frost rounded-2xl flex flex-col items-center gap-3 text-ever-cove hover:border-ever-cove hover:text-ever-midnight transition-all"
              >
                <ImagePlus size={28} />
                <span className="text-xs font-medium">Upload your photo</span>
                <span className="text-[10px] text-ever-horizon">JPG, PNG up to 5MB</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Preview + Actions */}
        <div className="lg:col-span-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-cove mb-6">Live Preview</p>

          {/* Card preview */}
          <div className="bg-ever-pearl rounded-3xl p-8 flex items-center justify-center mb-8">
            <div
              ref={cardRef}
              className="relative overflow-hidden shadow-2xl"
              style={{ width: '360px', aspectRatio: '5/7', borderRadius: '4px' }}
            >
              <TemplateComponent data={formData} />
            </div>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-3 bg-ever-midnight text-white px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ever-cove transition-all shadow-lg disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download size={16} />
                Download as PNG
              </>
            )}
          </button>

          {/* Share buttons */}
          <div className="mt-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ever-cove mb-4">Share your announcement</p>
            <div className="flex gap-3 flex-wrap">
              {typeof navigator !== 'undefined' && navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="w-12 h-12 bg-ever-pearl rounded-2xl flex items-center justify-center text-ever-cove border border-ever-frost hover:bg-ever-midnight hover:text-white transition-all"
                  title="Share"
                >
                  <Share2 size={16} />
                </button>
              )}
              <button
                onClick={handleFacebookShare}
                className="w-12 h-12 bg-ever-pearl rounded-2xl flex items-center justify-center text-ever-cove border border-ever-frost hover:bg-ever-midnight hover:text-white transition-all"
                title="Facebook"
              >
                <Facebook size={16} />
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="w-12 h-12 bg-ever-pearl rounded-2xl flex items-center justify-center text-ever-cove border border-ever-frost hover:bg-ever-midnight hover:text-white transition-all"
                title="WhatsApp"
              >
                <MessageCircle size={16} />
              </button>
              <button
                onClick={handleTwitterShare}
                className="w-12 h-12 bg-ever-pearl rounded-2xl flex items-center justify-center text-ever-cove border border-ever-frost hover:bg-ever-midnight hover:text-white transition-all"
                title="X / Twitter"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={handleCopyText}
                className="w-12 h-12 bg-ever-pearl rounded-2xl flex items-center justify-center text-ever-cove border border-ever-frost hover:bg-ever-midnight hover:text-white transition-all"
                title={copySuccess ? 'Copied!' : 'Copy text'}
              >
                {copySuccess ? <Check size={16} /> : <Link size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveTheDate;
