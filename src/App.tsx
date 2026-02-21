import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Cpu, 
  GraduationCap, 
  Users, 
  Trophy, 
  Zap, 
  BrainCircuit, 
  Eye,
  Github,
  Mail,
  ExternalLink,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { translations, Language } from './translations';
import { Chess } from 'chess.js';
import photo1 from '../img/photo_1_2026-02-19_20-24-14.jpg';
import photo2 from '../img/photo_2_2026-02-19_20-24-14.jpg';
import photo3 from '../img/photo_3_2026-02-19_20-24-14.jpg';
import photo4 from '../img/photo_4_2026-02-19_20-24-14.jpg';
import photo5 from '../img/photo_5_2026-02-19_20-24-14.jpg';
import photo6 from '../img/photo_6_2026-02-19_20-24-14.jpg';
import photo7 from '../img/photo_7_2026-02-19_20-24-14.jpg';
import photo8 from '../img/photo_8_2026-02-19_20-24-14.jpg';
import photo9 from '../img/photo_9_2026-02-19_20-24-14.jpg';
import photo10 from '../img/photo_10_2026-02-19_20-24-14.jpg';
import photo11 from '../img/photo_11_2026-02-19_20-24-14.jpg';
import photo12 from '../img/photo_12_2026-02-19_20-24-14.jpg';
import photo13 from '../img/photo_13_2026-02-19_20-24-14.jpg';
import photo14 from '../img/photo_14_2026-02-19_20-24-14.jpg';
import photo15 from '../img/photo_15_2026-02-19_20-24-14.jpg';

// --- Types ---
type Page = 'home' | 'details' | 'developers' | 'play';
type ChatMessage = { role: 'user' | 'assistant'; text: string };

const projectPhotoUrls = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
];

const images = {
  hero: projectPhotoUrls[0] ?? '/img/chess-hero.svg',
  setup: projectPhotoUrls[1] ?? '/img/chess-setup.svg',
  detail: projectPhotoUrls[2] ?? '/img/chess-detail.svg',
  teaching: projectPhotoUrls[3] ?? '/img/chess-teaching.svg',
  captain: projectPhotoUrls[4] ?? '/img/dev-aktan.svg',
  ai: projectPhotoUrls[5] ?? '/img/dev-islam.svg',
  hardware: projectPhotoUrls[6] ?? '/img/dev-nurel.svg',
};

// --- Components ---

const Navbar = ({ 
  currentPage, 
  setPage, 
  lang, 
  setLang 
}: { 
  currentPage: Page, 
  setPage: (p: Page) => void,
  lang: Language,
  setLang: (l: Language) => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Page }[] = [
    { label: t.home, id: 'home' },
    { label: t.details, id: 'details' },
    { label: t.developers, id: 'developers' },
    { label: t.play, id: 'play' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setPage('home')}
        >
          <div className="w-10 h-10 bg-chess-dark rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter uppercase">ChessBot <span className="text-chess-gold">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-chess-gold ${currentPage === item.id ? 'text-chess-gold border-b-2 border-chess-gold' : 'text-chess-dark/70'}`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-chess-dark/5 p-1 rounded-full border border-chess-dark/10">
            <button 
              onClick={() => setLang('ru')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ru' ? 'bg-chess-dark text-white' : 'text-chess-dark/40 hover:text-chess-dark'}`}
            >
              RU
            </button>
            <button 
              onClick={() => setLang('ky')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ky' ? 'bg-chess-dark text-white' : 'text-chess-dark/40 hover:text-chess-dark'}`}
            >
              KY
            </button>
          </div>

          <button className="bg-chess-dark text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-chess-gold transition-colors">
            {t.contact}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <button 
            onClick={() => setLang(lang === 'ru' ? 'ky' : 'ru')}
            className="p-2 rounded-full bg-chess-dark/5 text-chess-dark"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-display font-semibold ${currentPage === item.id ? 'text-chess-gold' : 'text-chess-dark'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onExplore, lang }: { onExplore: () => void, lang: Language }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden chess-grid">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-chess-gold/10 border border-chess-gold/20 rounded-full text-chess-gold text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3" /> {t.badge}
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] mb-6 uppercase">
            {t.title1} <br />
            {t.title2} <br />
            <span className="text-chess-gold">{t.title3}</span>
          </h1>
          <p className="text-xl text-chess-dark/60 max-w-lg mb-10 leading-relaxed">
            {t.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onExplore}
              className="bg-chess-dark text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-chess-gold transition-all hover:scale-105"
            >
              {t.btnMore} <ChevronRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-chess-dark px-8 py-4 rounded-full font-bold hover:bg-chess-dark hover:text-white transition-all">
              {t.btnDemo}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img
              src={images.hero}
              alt="ChessBot AI in action" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chess-dark/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-sm font-mono opacity-80 mb-1">{t.status}</p>
                <h3 className="text-2xl font-bold">{t.model}</h3>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-chess-gold/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-chess-dark/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const Features = ({ lang }: { lang: Language }) => {
  const t = translations[lang].features;
  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: t.f1_title,
      desc: t.f1_desc
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: t.f2_title,
      desc: t.f2_desc
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: t.f3_title,
      desc: t.f3_desc
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: t.f4_title,
      desc: t.f4_desc
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 uppercase">{t.title}</h2>
          <p className="text-chess-dark/50 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-chess-light border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-chess-dark text-white rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-chess-dark/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DetailsPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang].details;
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-8">{t.title}</h1>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-chess-dark/70">
                <p>{t.desc1}</p>
                <h3 className="text-2xl font-bold text-chess-dark mt-8 mb-4">{t.how_title}</h3>
                <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chess-gold flex items-center justify-center text-white font-bold text-xs">1</div>
                    <span><strong>{t.step1_title}</strong> {t.step1_desc}</span>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chess-gold flex items-center justify-center text-white font-bold text-xs">2</div>
                    <span><strong>{t.step2_title}</strong> {t.step2_desc}</span>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chess-gold flex items-center justify-center text-white font-bold text-xs">3</div>
                    <span><strong>{t.step3_title}</strong> {t.step3_desc}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={images.setup} className="rounded-2xl shadow-lg h-64 w-full object-cover" alt="Robot setup" referrerPolicy="no-referrer" />
              <img src={images.detail} className="rounded-2xl shadow-lg h-64 w-full object-cover mt-8" alt="Robot detail" referrerPolicy="no-referrer" />
            </div>
          </div>
        </motion.div>

        <div className="bg-chess-dark text-white rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-black text-chess-gold mb-2">99.9%</div>
              <div className="text-sm uppercase tracking-widest opacity-60">{t.stat1}</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-chess-gold mb-2">&lt;0.5с</div>
              <div className="text-sm uppercase tracking-widest opacity-60">{t.stat2}</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-chess-gold mb-2">2800+</div>
              <div className="text-sm uppercase tracking-widest opacity-60">{t.stat3}</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-chess-gold/10 blur-[120px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const DevelopersPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang].developers;
  const team = [
    {
      name: "Тойматов Актан",
      role: t.role_captain,
      desc: t.desc_aktan,
      image: images.captain
    },
    {
      name: "Таалайбеков Ислам",
      role: t.role_ai,
      desc: t.desc_islam,
      image: images.ai
    },
    {
      name: "Жолдошалиев Нурель",
      role: t.role_hardware,
      desc: t.desc_nurel,
      image: images.hardware
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">{t.title}</h1>
          <p className="text-chess-dark/50 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-square">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-chess-dark/20 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-chess-gold font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-chess-dark/60 leading-relaxed">{member.desc}</p>
              <div className="flex gap-4 mt-6">
                <button className="p-2 rounded-full border border-gray-200 hover:bg-chess-dark hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full border border-gray-200 hover:bg-chess-dark hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const pieceToGlyph: Record<string, string> = {
  pw: '♙',
  pb: '♟',
  rw: '♖',
  rb: '♜',
  nw: '♘',
  nb: '♞',
  bw: '♗',
  bb: '♝',
  qw: '♕',
  qb: '♛',
  kw: '♔',
  kb: '♚',
};

const PlayPage = ({ lang }: { lang: Language }) => {
  const t = translations[lang].play;
  const [game, setGame] = useState(() => new Chess());
  const [moveInput, setMoveInput] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [statusText, setStatusText] = useState(t.your_turn);
  const [dragFrom, setDragFrom] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStatusText(t.your_turn);
  }, [lang, t.your_turn]);

  useEffect(() => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chat, isThinking]);

  const resetGame = () => {
    setGame(new Chess());
    setMoveInput('');
    setChat([]);
    setIsThinking(false);
    setDragFrom(null);
    setStatusText(t.your_turn);
  };

  const requestBotMove = async (position: Chess, lastPlayerMoveSan: string) => {
    const apiKey = (process.env.OPENAI_API_KEY as string | undefined) ?? '';
    if (!apiKey) {
      setStatusText(t.key_error);
      return;
    }

    const legalMoves = position
      .moves({ verbose: true })
      .map((m) => `${m.from}${m.to}${m.promotion ?? ''}`);

    if (legalMoves.length === 0) return;

    setIsThinking(true);
    setStatusText(t.thinking);

    try {
      const coachLanguage = lang === 'ky' ? 'Kyrgyz' : 'Russian';
      const fallbackCoachText =
        lang === 'ky'
          ? 'Жакшы жүрүш. Борборду көзөмөлдөп, фигуралардын активдүүлүгүн жогорулатыңыз.'
          : 'Хороший ход. Контролируйте центр и повышайте активность фигур.';
      const fallbackPlayerCoachText =
        lang === 'ky'
          ? 'Сиздин жүрүшүңүз жакшы көрүнөт. Борборду көзөмөлдөөнү жана фигуралардын өнүгүшүн улантыңыз.'
          : 'Ваш ход выглядит неплохо. Продолжайте контролировать центр и развивать фигуры.';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                `You are a chess coach bot. Always return compact JSON with keys "move", "coach", and "player_coach". The move must be in UCI format (e2e4 or e7e8q) and must be selected from legal_moves only. "coach" is feedback for your own move. "player_coach" is feedback for the player's last move. Keep both explanations under 50 words, educational, and concise. Write both "coach" and "player_coach" strictly in ${coachLanguage}.`,
            },
            {
              role: 'user',
              content: `Response language: ${coachLanguage}. Player last move SAN: ${lastPlayerMoveSan}. FEN: ${position.fen()}. legal_moves: ${legalMoves.join(', ')}.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        setStatusText(t.api_error);
        return;
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content ?? '{}') as {
        move?: string;
        coach?: string;
        player_coach?: string;
      };
      const botMoveRaw = (parsed.move ?? '').trim().toLowerCase();
      const botMove = legalMoves.includes(botMoveRaw) ? botMoveRaw : legalMoves[0];
      const explanation = parsed.coach?.trim() || fallbackCoachText;
      const playerExplanation = parsed.player_coach?.trim() || fallbackPlayerCoachText;

      const botPosition = new Chess(position.fen());
      const moveResult = botPosition.move({
        from: botMove.slice(0, 2),
        to: botMove.slice(2, 4),
        promotion: botMove.slice(4, 5) || undefined,
      });

      if (!moveResult) {
        setStatusText(t.api_error);
        return;
      }

      setGame(botPosition);
      setChat((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `${t.your_move}: ${lastPlayerMoveSan} — ${playerExplanation}`,
        },
        { role: 'assistant', text: `${moveResult.san} — ${explanation}` },
      ]);

      if (botPosition.isCheckmate()) {
        setStatusText(t.checkmate);
      } else if (botPosition.isDraw()) {
        setStatusText(t.draw);
      } else {
        setStatusText(t.your_turn);
      }
    } catch {
      setStatusText(t.api_error);
    } finally {
      setIsThinking(false);
    }
  };

  const tryPlayerMove = async (uciMove: string) => {
    const next = new Chess(game.fen());
    const move = next.move(
      uciMove.length > 4
        ? {
            from: uciMove.slice(0, 2),
            to: uciMove.slice(2, 4),
            promotion: uciMove.slice(4, 5) || undefined,
          }
        : {
            from: uciMove.slice(0, 2),
            to: uciMove.slice(2, 4),
          },
    );

    if (!move) {
      setStatusText(t.move_error);
      return false;
    }

    setGame(next);
    setChat((prev) => [...prev, { role: 'user', text: move.san }]);

    if (next.isCheckmate()) {
      setStatusText(t.checkmate);
      return true;
    }
    if (next.isDraw()) {
      setStatusText(t.draw);
      return true;
    }

    await requestBotMove(next, move.san);
    return true;
  };

  const onPlayerMove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isThinking) return;

    const clean = moveInput.trim().toLowerCase();
    const valid = /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(clean);
    if (!valid) {
      setStatusText(t.move_error);
      return;
    }

    const ok = await tryPlayerMove(clean);
    if (ok) setMoveInput('');
  };

  const boardRows = game.board();
  const files = 'abcdefgh';

  const squareName = (row: number, col: number) => `${files[col]}${8 - row}`;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">{t.title}</h1>
          <p className="text-chess-dark/60 max-w-3xl">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <div className="grid grid-cols-8 rounded-2xl overflow-hidden border border-gray-200">
              {boardRows.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const dark = (rIdx + cIdx) % 2 === 1;
                  const key = `${rIdx}-${cIdx}`;
                  const glyph = cell ? pieceToGlyph[`${cell.type}${cell.color}`] : '';
                  const square = squareName(rIdx, cIdx);
                  const canDrag = Boolean(
                    cell && cell.color === 'w' && game.turn() === 'w' && !isThinking,
                  );
                  return (
                    <div
                      key={key}
                      className={`aspect-square flex items-center justify-center text-5xl sm:text-6xl select-none ${
                        dark ? 'bg-amber-700/80 text-white' : 'bg-amber-100 text-chess-dark'
                      }`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={async (e) => {
                        e.preventDefault();
                        if (!dragFrom || isThinking) return;
                        setDragFrom(null);
                        const promotion = (dragFrom[1] === '7' && square[1] === '8') ? 'q' : '';
                        await tryPlayerMove(`${dragFrom}${square}${promotion}`);
                      }}
                    >
                      {glyph && (
                        <span
                          draggable={canDrag}
                          onDragStart={() => setDragFrom(square)}
                          onDragEnd={() => setDragFrom(null)}
                          className={canDrag ? 'cursor-grab active:cursor-grabbing' : ''}
                        >
                          {glyph}
                        </span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>

            <form onSubmit={onPlayerMove} className="mt-5 flex flex-col sm:flex-row gap-3">
              <input
                value={moveInput}
                onChange={(e) => setMoveInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-chess-gold"
                disabled={isThinking}
              />
              <button
                type="submit"
                className="bg-chess-dark text-white px-6 py-3 rounded-xl font-semibold hover:bg-chess-gold transition-colors disabled:opacity-50"
                disabled={isThinking}
              >
                {t.send}
              </button>
              <button
                type="button"
                className="border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                onClick={resetGame}
              >
                {t.restart}
              </button>
            </form>

            <p className="mt-4 text-sm text-chess-dark/70">
              <strong>{t.status}:</strong> {statusText}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 h-[640px] flex flex-col">
            <h3 className="text-xl font-bold mb-4">{t.bot}</h3>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
              {chat.length === 0 && (
                <div className="text-sm text-chess-dark/50">{t.your_move}: {t.placeholder}</div>
              )}
              {chat.map((m, idx) => (
                <div
                  key={`${m.role}-${idx}`}
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    m.role === 'user'
                      ? 'bg-chess-dark text-white ml-10'
                      : 'bg-amber-50 text-chess-dark mr-10 border border-amber-100'
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-widest opacity-70 mb-1">
                    {m.role === 'user' ? t.you : t.bot}
                  </div>
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  return (
    <footer className="bg-chess-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <BrainCircuit className="text-chess-gold w-8 h-8" />
              <span className="text-2xl font-display font-bold tracking-tighter uppercase">ChessBot <span className="text-chess-gold">AI</span></span>
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed">
              {t.desc}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-chess-gold">{t.nav_title}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.home}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.details}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.developers}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.play}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-chess-gold">{t.contact_title}</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@chessbot.ai</li>
              <li>{t.location}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs uppercase tracking-[0.2em]">
          <p>© 2024 ChessBot AI Team. {t.rights}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [lang, setLang] = useState<Language>('ru');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const tExtra = translations[lang].home_extra;

  return (
    <div className="min-h-screen">
      <Navbar currentPage={page} setPage={setPage} lang={lang} setLang={setLang} />
      
      <main>
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onExplore={() => setPage('details')} lang={lang} />
              <Features lang={lang} />
              {/* Extra landing section */}
              <section className="py-24 bg-chess-light">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                  <div className="order-2 md:order-1">
                    <img src={images.teaching} className="rounded-3xl shadow-2xl w-full h-96 object-cover" alt="Teaching mode" referrerPolicy="no-referrer" />
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-4xl font-black uppercase mb-6">{tExtra.title}</h2>
                    <p className="text-chess-dark/60 mb-8 leading-relaxed">
                      {tExtra.desc}
                    </p>
                    <button 
                      onClick={() => setPage('details')}
                      className="text-chess-dark font-bold flex items-center gap-2 group"
                    >
                      {tExtra.btn} <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Project Gallery */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-4xl font-black uppercase mb-12 text-center">{tExtra.gallery}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(projectPhotoUrls.length > 0
                      ? projectPhotoUrls
                      : [images.setup, images.captain, images.detail, images.hardware]
                    ).map((src, idx) => (
                      <img
                        key={src}
                        src={src}
                        className="rounded-2xl h-64 w-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        alt={`Gallery ${idx + 1}`}
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {page === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DetailsPage lang={lang} />
            </motion.div>
          )}

          {page === 'developers' && (
            <motion.div
              key="developers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DevelopersPage lang={lang} />
            </motion.div>
          )}

          {page === 'play' && (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PlayPage lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
