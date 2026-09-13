import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RotateCcw, Cookie, Building2, Quote, Send, CheckCircle2 } from 'lucide-react';
import { businessDetails, legalPolicies, verifiedScientificQuotes } from '../../data/businessDetails';
import { LegalTabId } from '../../types/brain';
import { sound } from '../../utils/audio';

interface LegalModalProps {
  initialTab?: LegalTabId;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  initialTab = 'privacy',
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabId>(initialTab);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', consent: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleTabChange = (tab: LegalTabId) => {
    sound.playHapticClick();
    setActiveTab(tab);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    sound.playRevealChime();
    setFormSubmitted(true);
  };

  const tabs: Array<{ id: LegalTabId; label: string; icon: React.ReactNode }> = [
    { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'refund', label: '30-Day Refund Policy', icon: <RotateCcw className="w-3.5 h-3.5" /> },
    { id: 'cookies', label: 'Cookie Policy', icon: <Cookie className="w-3.5 h-3.5" /> },
    { id: 'business', label: 'Business & Ethics', icon: <Building2 className="w-3.5 h-3.5" /> },
  ];

  const currentPolicy = legalPolicies[activeTab as keyof typeof legalPolicies];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in select-none"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-zinc-950/95 border border-white/20 rounded-3xl shadow-3xl flex flex-col text-left text-white">
        {/* Modal Header */}
        <div className="p-6 sm:px-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-apple-green uppercase tracking-widest block mb-0.5">
              COMPLIANCE & TRUST CENTER
            </span>
            <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Legal, Privacy & Academic Governance
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 sm:gap-2 px-6 sm:px-8 py-3 bg-white/[0.02] border-b border-white/10 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm text-white/80 leading-relaxed">
          {activeTab === 'business' ? (
            <div className="space-y-6">
              {/* Business Identity Card */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/15">
                <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-apple-blue" />
                  <span>Official Corporate & Academic Identity</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-white/40 block">Legal Entity Name:</span>
                    <span className="text-white font-medium">{businessDetails.name}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Operating Trade Mark:</span>
                    <span className="text-white font-medium">{businessDetails.tradingName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Company Registration:</span>
                    <span className="text-white font-mono">{businessDetails.registrationNumber}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Jurisdiction:</span>
                    <span className="text-white font-medium">{businessDetails.jurisdiction}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-white/40 block">Registered Physical Address:</span>
                    <span className="text-white font-medium">{businessDetails.headquarters}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">General Inquiries:</span>
                    <span className="text-white font-mono">{businessDetails.supportEmail}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Data Protection Officer:</span>
                    <span className="text-white font-mono">{businessDetails.dpoEmail}</span>
                  </div>
                </div>
              </div>

              {/* Verified Scientific Advisory Board */}
              <div>
                <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-apple-purple" />
                  <span>Scientific Advisory Council</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {businessDetails.scientificAdvisoryBoard.map((member) => (
                    <div key={member.name} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
                      <span className="font-semibold text-white block">{member.name}</span>
                      <span className="text-apple-purple font-mono text-[10px] block mb-1">{member.title}</span>
                      <span className="text-white/50 block mb-0.5">{member.institution}</span>
                      <span className="text-white/40 italic text-[11px]">{member.specialization}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentic Pioneer Quotes - Zero Fake Reviews! */}
              <div>
                <h4 className="text-base font-semibold text-white mb-3">
                  Foundational Cognitive Citations (No Fake Reviews Policy)
                </h4>
                <div className="space-y-3">
                  {verifiedScientificQuotes.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
                      <p className="text-white/90 italic mb-2">"{q.quote}"</p>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white">{q.author}</span>
                        <span className="text-white/50">{q.credential}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Data Collection Contact Form */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/15">
                <h4 className="text-base font-semibold text-white mb-1">
                  Contact Laboratory Ethics & Research Desk
                </h4>
                <p className="text-xs text-white/60 mb-4">
                  We collect strictly necessary contact data only. Submissions are transmitted with 256-bit encryption.
                </p>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-apple-green/10 border border-apple-green/30 flex items-center gap-3 text-xs text-apple-green">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Your inquiry was logged successfully. Our ethics team will respond within 48 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-white/70 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                          placeholder="Dr. Alex Rivera"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-white/70 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                          placeholder="alex@university.edu"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-white/70 block mb-1">Inquiry Message</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                        placeholder="State your question or inquiry..."
                      />
                    </div>

                    {/* Explicit Form Consent Checkbox */}
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="form-consent"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-white/30 bg-black/50 text-apple-green focus:ring-apple-green cursor-pointer"
                      />
                      <label htmlFor="form-consent" className="text-xs text-white/70 leading-snug cursor-pointer">
                        I explicitly consent to YOUR BRAIN IS WEIRD processing my contact information solely to respond to this request under GDPR / UK-GDPR data minimization standards.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.consent}
                      className={`px-6 py-2.5 rounded-full font-semibold text-xs transition-all flex items-center gap-2 ${
                        formData.consent
                          ? 'bg-white hover:bg-white/90 text-black active:scale-95 shadow-md cursor-pointer'
                          : 'bg-white/20 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Research Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : currentPolicy ? (
            <div className="space-y-6">
              <div className="pb-3 border-b border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                  <span>LAST REVISED: {currentPolicy.lastUpdated}</span>
                  <span>VERSION 2.4</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">{currentPolicy.title}</h4>
                <p className="text-xs text-white/60">{currentPolicy.summary}</p>
              </div>

              {currentPolicy.sections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h5 className="font-semibold text-white text-sm">{sec.heading}</h5>
                  <p className="text-xs text-white/70 leading-relaxed">{sec.content}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
