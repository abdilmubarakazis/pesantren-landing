"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const smooth =
  "transition-all duration-700 [transition-timing-function:cubic-bezier(.16,1,.3,1)]";
const smoothTransform =
  "transition-transform duration-700 [transition-timing-function:cubic-bezier(.16,1,.3,1)]";
const smoothOpacity =
  "transition-opacity duration-700 [transition-timing-function:cubic-bezier(.16,1,.3,1)]";

// ===== VALIDATION HELPERS =====
const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const hasLetter = (s: string) => /[A-Za-z]/.test(s);
const hasNumber = (s: string) => /\d/.test(s);
const hasSymbol = (s: string) => /[^A-Za-z0-9]/.test(s);

const passwordStrength = (pw: string) => {
  const len = pw.length;
  let score = 0;

  if (len >= 8) score += 1;
  if (len >= 12) score += 1;
  if (hasLetter(pw)) score += 1;
  if (hasNumber(pw)) score += 1;
  if (hasSymbol(pw)) score += 1;

  if (score <= 2) return { label: "Weak", value: 33 };
  if (score <= 4) return { label: "Medium", value: 66 };
  return { label: "Strong", value: 100 };
};

const isValidPassword = (pw: string) => {
  // minimal: 8 char, ada huruf & angka
  return pw.length >= 8 && hasLetter(pw) && hasNumber(pw);
};

type LoginForm = { email: string; password: string };
type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Toast = {
  open: boolean;
  type: "success" | "error";
  title: string;
  message?: string;
};

export default function AuthStack() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const isLogin = mode === "login";

  // ===== FORM STATE =====
  const [login, setLogin] = useState<LoginForm>({ email: "", password: "" });
  const [register, setRegister] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ===== ERROR STATE =====
  const [loginErr, setLoginErr] = useState<Partial<LoginForm>>({});
  const [regErr, setRegErr] = useState<Partial<RegisterForm>>({});

  // ===== LOADING =====
  const [loading, setLoading] = useState(false);

  // ===== SHOW/HIDE PASSWORD =====
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegConfirmPw, setShowRegConfirmPw] = useState(false);

  // ===== TOAST =====
  const [toast, setToast] = useState<Toast>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (t: Omit<Toast, "open">) => {
    setToast({ ...t, open: true });
    setTimeout(() => setToast((p) => ({ ...p, open: false })), 3200);
  };

  // ===== PASSWORD STRENGTH =====
  const strength = useMemo(
    () => passwordStrength(register.password),
    [register.password]
  );

  // ===== SIMULATE REQUEST =====
  const fakeRequest = async () => {
    await new Promise((r) => setTimeout(r, 1200));
  };

  // ===== VALIDATION =====
  const validateLogin = () => {
    const e: Partial<LoginForm> = {};
    if (!isValidEmail(login.email)) e.email = "Email tidak valid.";
    if (!login.password.trim()) e.password = "Password wajib diisi.";
    setLoginErr(e);
    return Object.keys(e).length === 0;
  };

  const validateRegister = () => {
    const e: Partial<RegisterForm> = {};
    if (!isValidEmail(register.email)) e.email = "Email tidak valid.";
    if (!isValidPassword(register.password))
      e.password = "Password min 8 karakter, harus ada huruf & angka.";
    if (register.confirmPassword !== register.password)
      e.confirmPassword = "Konfirmasi password tidak sama.";
    setRegErr(e);
    return Object.keys(e).length === 0;
  };

  // ===== SUBMIT =====
  const onSubmitLogin = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (loading) return;

    const normalized = normalizeEmail(login.email);
    setLogin((p) => ({ ...p, email: normalized }));

    if (!validateLogin()) {
      showToast({
        type: "error",
        title: "Login gagal",
        message: "Periksa kembali email & password kamu.",
      });
      return;
    }

    try {
      setLoading(true);
      await fakeRequest();
      showToast({
        type: "success",
        title: "Login sukses ✅",
        message: "Selamat datang kembali!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitRegister = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (loading) return;

    const normalized = normalizeEmail(register.email);
    setRegister((p) => ({ ...p, email: normalized }));

    if (!validateRegister()) {
      showToast({
        type: "error",
        title: "Register gagal",
        message: "Periksa kembali input yang kamu isi.",
      });
      return;
    }

    try {
      setLoading(true);
      await fakeRequest();
      showToast({
        type: "success",
        title: "Register sukses ✅",
        message: "Silakan login untuk melanjutkan.",
      });

      setMode("login");
      setRegister({ email: "", password: "", confirmPassword: "" });
      setRegErr({});
    } finally {
      setLoading(false);
    }
  };

  // ===== Input helpers =====
  const onLoginEmailChange = (v: string) => {
    const normalized = normalizeEmail(v);
    setLogin((p) => ({ ...p, email: normalized }));
    setLoginErr((p) => ({ ...p, email: "" }));
  };

  const onRegisterEmailChange = (v: string) => {
    const normalized = normalizeEmail(v);
    setRegister((p) => ({ ...p, email: normalized }));
    setRegErr((p) => ({ ...p, email: "" }));
  };

  // ✅ input style agar konsisten dan lebar
  const inputBase =
    "w-full rounded-2xl bg-slate-100 border pl-12 pr-4 py-3.5 text-[15px] outline-none transition";
  const inputPwBase =
    "w-full rounded-2xl bg-slate-100 border pl-12 pr-12 py-3.5 text-[15px] outline-none transition";

  return (
    <div className="w-full">
      {/* =================== TOAST =================== */}
      <div
        className={[
          "fixed top-5 right-5 z-[9999] w-[320px] max-w-[90vw]",
          smooth,
          toast.open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "rounded-2xl border bg-white shadow-xl p-4 flex gap-3",
            toast.type === "success" ? "border-emerald-200" : "border-rose-200",
          ].join(" ")}
        >
          <div className="mt-0.5">
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <XCircle className="h-5 w-5 text-rose-600" />
            )}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-slate-900 text-sm">
              {toast.title}
            </div>
            {toast.message ? (
              <div className="text-xs text-slate-600 mt-0.5">
                {toast.message}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* =================== MAIN =================== */}
      <div className="w-full max-w-none">
        <div className="relative h-[740px] md:h-[600px]">
          {/* ===================== LOGIN CARD ===================== */}
          <div
            className={[
              "absolute left-0 right-0 mx-auto w-full max-w-5xl",
              "rounded-3xl bg-white border overflow-hidden",
              "shadow-[0_12px_40px_rgba(15,23,42,0.12)]",
              smooth,
              isLogin
                ? "top-0 z-20 opacity-100 scale-100"
                : "top-0 z-10 opacity-0 scale-[0.98] pointer-events-none",
            ].join(" ")}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* WELCOME PANEL */}
              <div
                className={[
                  "bg-emerald-900 text-white",
                  "flex flex-col items-center justify-center text-center px-10 py-14 md:py-0",
                  "md:col-span-5",
                  smoothTransform,
                  smoothOpacity,
                  isLogin
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0",
                  "md:translate-x-0 md:opacity-100",
                ].join(" ")}
              >
                <h2 className="text-3xl font-extrabold">Hello, Welcome!</h2>
                <p className="mt-2 text-white/80 text-sm">
                  Don’t have an account?
                </p>
                <button
                  onClick={() => setMode("register")}
                  disabled={loading}
                  className={[
                    "mt-5 rounded-full border border-white px-10 py-2 text-sm font-semibold transition",
                    loading
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-white hover:text-emerald-900",
                  ].join(" ")}
                >
                  Register
                </button>
              </div>

              {/* LOGIN FORM */}
              <div className="flex flex-col justify-center px-10 sm:px-12 py-12 md:col-span-7">
                <h3 className="text-2xl font-bold text-slate-900 text-center">
                  Login
                </h3>

                <form onSubmit={onSubmitLogin} className="mt-6 space-y-4">
                  {/* EMAIL */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        value={login.email}
                        onChange={(e) => onLoginEmailChange(e.target.value)}
                        disabled={loading}
                        type="email"
                        placeholder="Email"
                        className={[
                          inputBase,
                          loginErr.email
                            ? "border-rose-300 focus:ring-2 focus:ring-rose-400"
                            : "border-slate-200 focus:ring-2 focus:ring-emerald-500",
                          loading ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                      />
                    </div>
                    {loginErr.email ? (
                      <p className="mt-1 text-xs font-medium text-rose-600">
                        {loginErr.email}
                      </p>
                    ) : null}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        value={login.password}
                        onChange={(e) => {
                          setLogin((p) => ({ ...p, password: e.target.value }));
                          setLoginErr((p) => ({ ...p, password: "" }));
                        }}
                        disabled={loading}
                        type={showLoginPw ? "text" : "password"}
                        placeholder="Password"
                        className={[
                          inputPwBase,
                          loginErr.password
                            ? "border-rose-300 focus:ring-2 focus:ring-rose-400"
                            : "border-slate-200 focus:ring-2 focus:ring-emerald-500",
                          loading ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                      />

                      <button
                        type="button"
                        onClick={() => setShowLoginPw((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                        aria-label="Toggle password visibility"
                        disabled={loading}
                      >
                        {showLoginPw ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {loginErr.password ? (
                      <p className="mt-1 text-xs font-medium text-rose-600">
                        {loginErr.password}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    className="w-full text-[12px] text-slate-500 hover:text-emerald-700 transition disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={[
                      "w-full rounded-full bg-emerald-900 text-white py-3.5 text-[15px] font-bold transition flex items-center justify-center gap-2",
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-emerald-950",
                    ].join(" ")}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ===================== REGISTER CARD ===================== */}
          <div
            className={[
              "absolute left-0 right-0 mx-auto w-full max-w-5xl",
              "rounded-3xl bg-white border overflow-hidden",
              "shadow-[0_12px_40px_rgba(15,23,42,0.12)]",
              smooth,
              isLogin
                ? "top-0 z-10 opacity-0 scale-[0.98] pointer-events-none"
                : "top-0 z-20 opacity-100 scale-100",
            ].join(" ")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* REGISTER FORM */}
              <div className="flex flex-col justify-center px-8 sm:px-10 py-10 order-2 md:order-1">
                <h3 className="text-2xl font-bold text-slate-900 text-center">
                  Register
                </h3>

                <form onSubmit={onSubmitRegister} className="mt-6 space-y-4">
                  {/* EMAIL */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        value={register.email}
                        onChange={(e) => onRegisterEmailChange(e.target.value)}
                        disabled={loading}
                        type="email"
                        placeholder="Email"
                        className={[
                          inputBase,
                          regErr.email
                            ? "border-rose-300 focus:ring-2 focus:ring-rose-400"
                            : "border-slate-200 focus:ring-2 focus:ring-emerald-500",
                          loading ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                      />
                    </div>
                    {regErr.email ? (
                      <p className="mt-1 text-xs font-medium text-rose-600">
                        {regErr.email}
                      </p>
                    ) : null}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        value={register.password}
                        onChange={(e) => {
                          setRegister((p) => ({
                            ...p,
                            password: e.target.value,
                          }));
                          setRegErr((p) => ({ ...p, password: "" }));
                        }}
                        disabled={loading}
                        type={showRegPw ? "text" : "password"}
                        placeholder="Password"
                        className={[
                          inputPwBase,
                          regErr.password
                            ? "border-rose-300 focus:ring-2 focus:ring-rose-400"
                            : "border-slate-200 focus:ring-2 focus:ring-emerald-500",
                          loading ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPw((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                        aria-label="Toggle password visibility"
                        disabled={loading}
                      >
                        {showRegPw ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Strength */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Strength</span>
                        <span
                          className={[
                            "font-semibold",
                            strength.label === "Weak" && "text-rose-600",
                            strength.label === "Medium" && "text-amber-600",
                            strength.label === "Strong" && "text-emerald-600",
                          ].join(" ")}
                        >
                          {strength.label}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={[
                            "h-full rounded-full transition-all duration-500",
                            strength.label === "Weak" && "bg-rose-500",
                            strength.label === "Medium" && "bg-amber-500",
                            strength.label === "Strong" && "bg-emerald-500",
                          ].join(" ")}
                          style={{ width: `${strength.value}%` }}
                        />
                      </div>
                    </div>

                    {regErr.password ? (
                      <p className="mt-2 text-xs font-medium text-rose-600">
                        {regErr.password}
                      </p>
                    ) : (
                      <p className="mt-2 text-[11px] text-slate-500">
                        Minimal 8 karakter, harus ada huruf & angka.
                      </p>
                    )}
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        value={register.confirmPassword}
                        onChange={(e) => {
                          setRegister((p) => ({
                            ...p,
                            confirmPassword: e.target.value,
                          }));
                          setRegErr((p) => ({ ...p, confirmPassword: "" }));
                        }}
                        disabled={loading}
                        type={showRegConfirmPw ? "text" : "password"}
                        placeholder="Confirm Password"
                        className={[
                          inputPwBase,
                          regErr.confirmPassword
                            ? "border-rose-300 focus:ring-2 focus:ring-rose-400"
                            : "border-slate-200 focus:ring-2 focus:ring-emerald-500",
                          loading ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPw((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                        aria-label="Toggle password visibility"
                        disabled={loading}
                      >
                        {showRegConfirmPw ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {regErr.confirmPassword ? (
                      <p className="mt-1 text-xs font-medium text-rose-600">
                        {regErr.confirmPassword}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={[
                      "w-full rounded-full bg-emerald-900 text-white py-3.5 text-[15px] font-bold transition flex items-center justify-center gap-2",
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-emerald-950",
                    ].join(" ")}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              </div>

              {/* WELCOME PANEL */}
              <div
                className={[
                  "bg-emerald-900 text-white",
                  "flex flex-col items-center justify-center text-center px-8 py-14 md:py-0 order-1 md:order-2",
                  smoothTransform,
                  smoothOpacity,
                  isLogin
                    ? "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100",
                  "md:translate-x-0 md:opacity-100",
                ].join(" ")}
              >
                <h2 className="text-3xl font-extrabold">Hello, Welcome!</h2>
                <p className="mt-2 text-white/80 text-sm">
                  Already have an account?
                </p>
                <button
                  onClick={() => setMode("login")}
                  disabled={loading}
                  className={[
                    "mt-5 rounded-full border border-white px-10 py-2 text-sm font-semibold transition",
                    loading
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-white hover:text-emerald-900",
                  ].join(" ")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
