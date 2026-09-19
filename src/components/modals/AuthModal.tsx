import React, { useState } from 'react';
import { X, Lock, LogIn, UserPlus, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRentix } from '../../context/RentixContext';

const bangladeshDistricts = [
  'Dhanmondi, Dhaka',
  'Gulshan 1 & 2, Dhaka',
  'Banani, Dhaka',
  'Uttara (Sector 7), Dhaka',
  'Bashundhara R/A, Dhaka',
  'Mirpur 10, Dhaka',
  'Mohammadpur, Dhaka',
  'Shahbagh, Dhaka',
  'Motijheel, Dhaka',
  'Puran Dhaka (Lalbagh)',
  'GEC Circle, Chittagong',
  'Agrabad C/A, Chittagong',
  'Zindabazar, Sylhet',
  'Cox\'s Bazar (Laboni)',
  'Rajshahi City Center',
  'Khulna Sadar'
];

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    authModalReason,
    loginUser,
    registerUser
  } = useRentix();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('+880 ');
  const [regDistrict, setRegDistrict] = useState(bangladeshDistricts[0]);
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const res = loginUser(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message || 'Login failed. Please check your username and password.');
    } else {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    const res = registerUser({
      name: regName,
      username: regUsername,
      email: regEmail,
      phone: regPhone,
      district: regDistrict,
      password: regPassword
    });

    if (!res.success) {
      setRegError(res.message || 'Registration failed.');
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0C2B35] border border-[#4A7071] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 text-[#CBD6D3]">

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#09121D]/60 hover:bg-[#09121D] text-[#CBD6D3] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#83B2A8]/10 text-[#83B2A8] text-xs font-semibold mb-2 border border-[#83B2A8]/30">
            <Lock className="w-3.5 h-3.5" /> SECURE AUTHENTICATION
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {authModalTab === 'login' ? 'Sign in to Rentix' : 'Create Rentix Account'}
          </h3>
          <p className="text-xs text-[#CBD6D3]/70 mt-1 max-w-xs mx-auto">
            {authModalReason || 'Access your neighborhood rental dashboard, messages, and listings.'}
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex bg-[#09121D] p-1 rounded-xl mb-6 border border-[#4A7071]/40">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab('login');
              setLoginError('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${authModalTab === 'login'
              ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
              : 'text-[#CBD6D3] hover:text-white'
              }`}
          >
            <LogIn className="w-3.5 h-3.5" /> Log In
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthModalTab('register');
              setRegError('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${authModalTab === 'register'
              ? 'bg-[#83B2A8] text-[#09121D] shadow-md'
              : 'text-[#CBD6D3] hover:text-white'
              }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Register
          </button>
        </div>

        {/* TAB 1: LOGIN */}
        {authModalTab === 'login' && (
          <div className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Username or Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. admin or user1"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-3 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-xs shadow-md shadow-[#83B2A8]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In to Account
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: REGISTER */}
        {authModalTab === 'register' && (
          <div>
            {regError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahir Rahman"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. mahir_bd"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Phone (+880) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+880 17..."
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="mahir@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  District / City *
                </label>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white focus:border-[#83B2A8] focus:outline-none"
                >
                  {bangladeshDistricts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-[#09121D] border border-[#4A7071]/60 rounded-xl p-2.5 text-xs text-white placeholder-[#CBD6D3]/40 focus:border-[#83B2A8] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#83B2A8] to-[#6da197] hover:from-[#97c7bd] hover:to-[#83B2A8] text-[#09121D] font-bold text-xs shadow-md shadow-[#83B2A8]/20 transition-all hover:scale-[1.02]"
                >
                  Create & Save Account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Footer Note */}
        <div className="mt-5 pt-3 border-t border-[#4A7071]/30 text-center text-[11px] text-[#CBD6D3]/50 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Rentix</span>
        </div>

      </div>
    </div>
  );
};
