import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Coffee,
  LogOut,
  Flame,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MojoUser {
  name: string;
  email: string;
  phone?: string;
  memberId: string;
  points: number;
  perk: string;
}

export interface AuthSwitchProps {
  className?: string;
  title?: string;
  initialMode?: "signup" | "login";
  onAuthSuccess?: (user: MojoUser) => void;
}

export const AuthSwitch: React.FC<AuthSwitchProps> = ({
  className,
  title: _title,
  initialMode = "login",
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const isSignUp = mode === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<MojoUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State Sign Up
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Form State Sign In
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Cargar usuario persistido en localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mojo_club_user");
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!signupName.trim()) {
      setFeedback({ type: "error", message: "Please enter your username." });
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setFeedback({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (signupPassword.length < 6) {
      setFeedback({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newUser: MojoUser = {
        name: signupName.trim(),
        email: signupEmail.trim().toLowerCase(),
        phone: "(305) 555-0100",
        memberId: `MOJO-${Math.floor(10000 + Math.random() * 90000)}`,
        points: 100,
        perk: "1 Cafecito Cubano de bienvenida al momento",
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mojo_club_user", JSON.stringify(newUser));
        } catch {
          // ignore
        }
      }

      setUser(newUser);
      setIsSubmitting(false);
      setFeedback({
        type: "success",
        message: "¡Cuenta creada con éxito! Se sumaron 100 puntos y tu cafecito de bienvenida.",
      });

      if (onAuthSuccess) {
        onAuthSuccess(newUser);
      }
    }, 450);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!loginEmail.trim() || !loginEmail.includes("@")) {
      setFeedback({ type: "error", message: "Please enter your registered email." });
      return;
    }
    if (!loginPassword) {
      setFeedback({ type: "error", message: "Please enter your password." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let existingUser: MojoUser | null = null;
      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("mojo_club_user");
          if (saved) {
            existingUser = JSON.parse(saved);
          }
        } catch {
          // ignore
        }
      }

      const loggedUser: MojoUser = existingUser || {
        name: loginEmail.split("@")[0]?.toUpperCase() || "CARLOS HERNÁNDEZ",
        email: loginEmail.trim().toLowerCase(),
        phone: "(305) 555-0199",
        memberId: "MOJO-30588",
        points: 250,
        perk: "1 Cafecito Cubano de bienvenida al momento",
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mojo_club_user", JSON.stringify(loggedUser));
        } catch {
          // ignore
        }
      }

      setUser(loggedUser);
      setIsSubmitting(false);
      setFeedback({
        type: "success",
        message: `¡Bienvenido de vuelta, ${loggedUser.name}!`,
      });

      if (onAuthSuccess) {
        onAuthSuccess(loggedUser);
      }
    }, 400);
  };

  const handleSocialAuth = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const names: Record<string, string> = {
        google: "Carlos Hernández",
        facebook: "Sofia Perez",
        twitter: "Marco Diaz",
        linkedin: "Elena Gomez",
      };
      const socialUser: MojoUser = {
        name: names[provider] || "Mojo VIP Club Member",
        email: `${provider}.member@miami.com`,
        phone: "(305) 555-0128",
        memberId: `MOJO-${Math.floor(20000 + Math.random() * 70000)}`,
        points: 150,
        perk: "1 Cafecito Cubano de bienvenida al momento",
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("mojo_club_user", JSON.stringify(socialUser));
        } catch {
          // ignore
        }
      }
      setUser(socialUser);
      setIsSubmitting(false);
      if (onAuthSuccess) onAuthSuccess(socialUser);
    }, 380);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("mojo_club_user");
      } catch {
        // ignore
      }
    }
    setUser(null);
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setLoginEmail("");
    setLoginPassword("");
    setFeedback(null);
  };

  const fillDemoData = (target: "signup" | "login") => {
    if (target === "signup") {
      setSignupName("Carlos Hernández");
      setSignupEmail("carlos.cubano@miami.com");
      setSignupPassword("Mojo2026!");
    } else {
      setLoginEmail("carlos.cubano@miami.com");
      setLoginPassword("Mojo2026!");
    }
  };

  // ESTADO 1: SOCIO IDENTIFICADO (PASAPORTE VIP)
  if (user) {
    return (
      <div
        className={cn(
          "relative flex flex-col bg-surface border border-brass/25 text-linen p-8 sm:p-12 animate-in fade-in duration-300",
          className
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brass flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-amber fill-current" />
            CLUB ANDANTE PALERMO
          </span>
          <span className="font-mono text-xs font-bold text-brass bg-canvas px-3 py-1 border border-brass/30 rounded-full">
            {user.memberId}
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-linen leading-tight">
          {user.name}
        </h2>
        <p className="font-sans text-xs text-mist mt-1">
          {user.email} {user.phone && `· ${user.phone}`}
        </p>

        <div className="grid grid-cols-2 gap-6 pt-6 my-4 border-t border-brass/20">
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-mist block">
              PUNTOS ANDANTE
            </span>
            <span className="font-display text-4xl sm:text-5xl font-black text-brass leading-none block mt-1">
              {user.points} <span className="font-sans text-xs font-bold text-mist">PTS</span>
            </span>
          </div>
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-mist block">
              BENEFICIO ACTIVO
            </span>
            <div className="flex items-center gap-2 text-brass mt-2 font-sans text-sm font-bold uppercase tracking-tight">
              <Coffee className="h-5 w-5 shrink-0 stroke-[2.5] text-amber" />
              <span className="text-linen">Cafecito de Especialidad</span>
            </div>
          </div>
        </div>

        <p className="font-sans text-xs text-mist mb-6">
          Sumás puntos en Salón Azul, Patio Interior y Cava Privada de Palermo Hollywood.
        </p>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-mist hover:text-brass transition-colors cursor-pointer select-none"
          >
            <LogOut className="h-4 w-4 stroke-[2]" />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </div>
    );
  }

  // Componente de Botones Sociales
  const SocialButtons = ({ label }: { label: string }) => (
    <div className="mt-5 flex flex-col items-center">
      <p className="font-sans text-xs text-mist font-medium mb-3">
        {label}
      </p>
      <div className="flex items-center justify-center gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialAuth("google")}
          aria-label="Sign in with Google"
          className="h-10 w-10 rounded-full bg-canvas border border-brass/30 hover:border-brass hover:bg-surface transition-colors flex items-center justify-center cursor-pointer group"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleSocialAuth("facebook")}
          aria-label="Sign in with Facebook"
          className="h-10 w-10 rounded-full bg-canvas border border-brass/30 text-brass hover:bg-brass hover:text-canvas transition-colors flex items-center justify-center cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Twitter / X */}
        <button
          type="button"
          onClick={() => handleSocialAuth("twitter")}
          aria-label="Sign in with X"
          className="h-10 w-10 rounded-full bg-canvas border border-brass/30 text-brass hover:bg-brass hover:text-canvas transition-colors flex items-center justify-center cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => handleSocialAuth("linkedin")}
          aria-label="Sign in with LinkedIn"
          className="h-10 w-10 rounded-full bg-canvas border border-brass/30 text-brass hover:bg-brass hover:text-canvas transition-colors flex items-center justify-center cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "mojo-auth-container relative w-full bg-surface border border-brass/25 text-linen overflow-hidden select-none min-h-[620px] md:min-h-[580px]",
        isSignUp ? "sign-up-mode" : "",
        className
      )}
    >
      <style>{`
        /* ESTILOS DE TRANSICIÓN AUTÉNTICA DEL SLIDING AUTH COMPONENT */
        .mojo-auth-container .circle-layer {
          position: absolute;
          height: 1900px;
          width: 1900px;
          top: -12%;
          right: 48%;
          transform: translateY(-50%);
          background: var(--color-leaf-green, #14402A);
          transition: 1.1s cubic-bezier(0.77, 0, 0.175, 1);
          border-radius: 50%;
          z-index: 6;
          pointer-events: none;
        }

        .mojo-auth-container.sign-up-mode .circle-layer {
          transform: translate(100%, -50%);
          right: 52%;
        }

        .mojo-auth-container .forms-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .mojo-auth-container .signin-signup-group {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 75%;
          width: 50%;
          transition: 1s 0.25s cubic-bezier(0.77, 0, 0.175, 1);
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        .mojo-auth-container.sign-up-mode .signin-signup-group {
          left: 25%;
        }

        .mojo-auth-container .form-view {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 2rem;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          transition: opacity 0.25s 0.3s ease-in-out, transform 0.25s 0.3s ease-in-out;
        }

        .mojo-auth-container .form-view.sign-up-form {
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        }

        .mojo-auth-container .form-view.sign-in-form {
          opacity: 1;
          pointer-events: all;
          z-index: 2;
        }

        .mojo-auth-container.sign-up-mode .form-view.sign-up-form {
          opacity: 1;
          pointer-events: all;
          z-index: 2;
        }

        .mojo-auth-container.sign-up-mode .form-view.sign-in-form {
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        }

        .mojo-auth-container .panels-group {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          z-index: 7;
          pointer-events: none;
        }

        .mojo-auth-container .panel-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem 2.5rem;
        }

        .mojo-auth-container .panel-box.left-panel {
          pointer-events: all;
        }

        .mojo-auth-container .panel-box.right-panel {
          pointer-events: none;
        }

        .mojo-auth-container.sign-up-mode .panel-box.left-panel {
          pointer-events: none;
        }

        .mojo-auth-container.sign-up-mode .panel-box.right-panel {
          pointer-events: all;
        }

        .mojo-auth-container .panel-box .panel-text {
          color: #F2ECE1;
          transition: transform 0.9s 0.25s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s 0.25s;
        }

        .mojo-auth-container .right-panel .panel-text {
          transform: translateX(800px);
          opacity: 0;
        }

        .mojo-auth-container.sign-up-mode .left-panel .panel-text {
          transform: translateX(-800px);
          opacity: 0;
        }

        .mojo-auth-container.sign-up-mode .right-panel .panel-text {
          transform: translateX(0%);
          opacity: 1;
        }

        /* ADAPTACIÓN MÓVIL (< 768px) */
        @media (max-width: 767px) {
          .mojo-auth-container .circle-layer {
            width: 1350px;
            height: 1350px;
            transform: translateX(-50%);
            left: 50%;
            top: initial;
            bottom: 64%;
            right: initial;
            transition: 1.1s cubic-bezier(0.77, 0, 0.175, 1);
          }

          .mojo-auth-container.sign-up-mode .circle-layer {
            transform: translate(-50%, 100%);
            bottom: 36%;
            right: initial;
          }

          .mojo-auth-container .signin-signup-group {
            width: 100%;
            top: 92%;
            transform: translate(-50%, -100%);
            left: 50%;
            transition: 1s 0.25s cubic-bezier(0.77, 0, 0.175, 1);
          }

          .mojo-auth-container.sign-up-mode .signin-signup-group {
            top: 8%;
            transform: translate(-50%, 0);
            left: 50%;
          }

          .mojo-auth-container .panels-group {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
          }

          .mojo-auth-container .panel-box {
            padding: 1.5rem 1rem;
            grid-column: 1 / 2;
          }

          .mojo-auth-container .left-panel {
            grid-row: 1 / 2;
          }

          .mojo-auth-container .right-panel {
            grid-row: 3 / 4;
          }

          .mojo-auth-container .left-panel .panel-text {
            transform: translateY(0);
          }

          .mojo-auth-container.sign-up-mode .left-panel .panel-text {
            transform: translateY(-300px);
          }

          .mojo-auth-container .right-panel .panel-text {
            transform: translateY(300px);
          }

          .mojo-auth-container.sign-up-mode .right-panel .panel-text {
            transform: translateY(0);
          }
        }
      `}</style>

      {/* 1. Capa del Círculo Deslizante con Borde Curvo Dark Luxury */}
      <div className="circle-layer">
        {/* Glow interior sutil */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brass/10 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. Capa de Formularios (Sign in a la derecha, Sign up a la izquierda al alternar) */}
      <div className="forms-layer">
        <div className="signin-signup-group">
          {/* ================================================================= */}
          {/* FORMULARIO: SIGN IN                                               */}
          {/* ================================================================= */}
          <div className="form-view sign-in-form w-full max-w-xs mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-linen text-center mb-6">
              Sign in
            </h2>

            <form onSubmit={handleLogin} className="w-full space-y-3.5">
              {/* Email Pill Input */}
              <div className="relative flex items-center rounded-full bg-canvas/90 px-4 py-3.5 border border-brass/25 focus-within:border-brass/70 focus-within:ring-2 focus-within:ring-brass/20 transition-all">
                <Mail className="h-4 w-4 text-brass/70 ml-1 mr-3 shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-linen placeholder:text-mist/50 outline-none"
                  required
                />
              </div>

              {/* Password Pill Input */}
              <div className="relative flex items-center rounded-full bg-canvas/90 px-4 py-3.5 border border-brass/25 focus-within:border-brass/70 focus-within:ring-2 focus-within:ring-brass/20 transition-all">
                <Lock className="h-4 w-4 text-brass/70 ml-1 mr-3 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-linen placeholder:text-mist/50 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="text-mist hover:text-brass p-1 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Feedback Message */}
              {feedback && (
                <div
                  className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    feedback.type === "error"
                      ? "text-amber bg-amber/20 border border-amber/30"
                      : "text-brass bg-brass/20 border border-brass/30"
                  }`}
                >
                  {feedback.type === "error" ? (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brass" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Solid Brass Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brass hover:bg-linen text-canvas font-sans font-bold text-xs uppercase tracking-wider py-3.5 transition-colors active:scale-[0.99] cursor-pointer mt-2 shadow-lg"
              >
                {isSubmitting ? "LOGGING IN..." : "LOGIN"}
              </button>
            </form>

            <SocialButtons label="Or sign in with social platforms" />

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => fillDemoData("login")}
                className="text-[11px] font-sans font-bold text-mist hover:text-brass transition-colors underline cursor-pointer"
              >
                Autocompletar demo
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* FORMULARIO: SIGN UP                                               */}
          {/* ================================================================= */}
          <div className="form-view sign-up-form w-full max-w-xs mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-linen text-center mb-6">
              Sign up
            </h2>

            <form onSubmit={handleRegister} className="w-full space-y-3.5">
              {/* Username Pill Input */}
              <div className="relative flex items-center rounded-full bg-canvas/90 px-4 py-3.5 border border-brass/25 focus-within:border-brass/70 focus-within:ring-2 focus-within:ring-brass/20 transition-all">
                <User className="h-4 w-4 text-brass/70 ml-1 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Username"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-linen placeholder:text-mist/50 outline-none"
                  required
                />
              </div>

              {/* Email Pill Input */}
              <div className="relative flex items-center rounded-full bg-canvas/90 px-4 py-3.5 border border-brass/25 focus-within:border-brass/70 focus-within:ring-2 focus-within:ring-brass/20 transition-all">
                <Mail className="h-4 w-4 text-brass/70 ml-1 mr-3 shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-linen placeholder:text-mist/50 outline-none"
                  required
                />
              </div>

              {/* Password Pill Input */}
              <div className="relative flex items-center rounded-full bg-canvas/90 px-4 py-3.5 border border-brass/25 focus-within:border-brass/70 focus-within:ring-2 focus-within:ring-brass/20 transition-all">
                <Lock className="h-4 w-4 text-brass/70 ml-1 mr-3 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-sans text-linen placeholder:text-mist/50 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="text-mist hover:text-brass p-1 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Feedback Message */}
              {feedback && (
                <div
                  className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    feedback.type === "error"
                      ? "text-amber bg-amber/20 border border-amber/30"
                      : "text-brass bg-brass/20 border border-brass/30"
                  }`}
                >
                  {feedback.type === "error" ? (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brass" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Solid Brass Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brass hover:bg-linen text-canvas font-sans font-bold text-xs uppercase tracking-wider py-3.5 transition-colors active:scale-[0.99] cursor-pointer mt-2 shadow-lg"
              >
                {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
              </button>
            </form>

            <SocialButtons label="Or sign up with social platforms" />

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => fillDemoData("signup")}
                className="text-[11px] font-sans font-bold text-mist hover:text-brass transition-colors underline cursor-pointer"
              >
                Autocompletar demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Capa de Paneles con Copy Editorial & Botones de Conmutación */}
      <div className="panels-group">
        {/* PANEL IZQUIERDO: "New here?" (Visible cuando mode === 'login') */}
        <div className="panel-box left-panel">
          <div className="panel-text flex flex-col items-center justify-center max-w-xs mx-auto">
            <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-linen mb-3">
              New here?
            </h3>
            <p className="font-sans text-xs lg:text-sm text-linen/85 leading-relaxed mb-8">
              Sumate al Club Andante y descubrí maridajes exclusivos, beneficios en catas y sobremesas inolvidables.
            </p>

            <button
              type="button"
              onClick={() => {
                setFeedback(null);
                setMode("signup");
              }}
              className="rounded-full border-2 border-brass text-brass hover:bg-brass hover:text-canvas font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 transition-colors cursor-pointer active:scale-95"
            >
              SIGN UP
            </button>

            <div className="mt-8 flex items-center gap-2 text-brass text-[11px] font-sans font-bold uppercase tracking-widest">
              <Coffee className="h-4 w-4 text-amber" />
              <span>Cafecito de Especialidad de Bienvenida</span>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: "One of us?" (Visible cuando mode === 'signup') */}
        <div className="panel-box right-panel">
          <div className="panel-text flex flex-col items-center justify-center max-w-xs mx-auto">
            <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-linen mb-3">
              One of us?
            </h3>
            <p className="font-sans text-xs lg:text-sm text-linen/85 leading-relaxed mb-8">
              Bienvenido de vuelta al compás pausado de Andante en Palermo Hollywood.
            </p>

            <button
              type="button"
              onClick={() => {
                setFeedback(null);
                setMode("login");
              }}
              className="rounded-full border-2 border-brass text-brass hover:bg-brass hover:text-canvas font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 transition-colors cursor-pointer active:scale-95"
            >
              SIGN IN
            </button>

            <div className="mt-8 flex items-center gap-2 text-brass text-[11px] font-sans font-bold uppercase tracking-widest">
              <Flame className="h-4 w-4 text-amber fill-current" />
              <span>Alta Gastronomía &amp; Jazz en Vivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Component = AuthSwitch;
export default AuthSwitch;
