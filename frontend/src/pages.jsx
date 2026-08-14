import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { User, Lock, Eye, EyeOff, Users, FileText, TrendingUp, Trophy, BarChart4, LayoutDashboard, ClipboardList, LogOut,GraduationCap} from "lucide-react";

// ================= LOGIN =================

// export function Login() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const login = async () => {
//     try {
//       const res = await api.post("/login", {
//         username,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       if (res.data.role === "student") {
//   localStorage.setItem("studentName", res.data.student.name);
//   localStorage.setItem("rollNo", res.data.student.rollNo);
//   localStorage.setItem("studentCode", res.data.student.studentCode);
// }

//       if (res.data.role === "admin" || res.data.role === "teacher") {
//   navigate("/admin");
// } else {
//   navigate("/student");
// }
//     } catch (err) {
//   console.log(err.response?.data);
//   console.log(err);
//   alert(err.response?.data?.message || "Login Failed");
// }
//   };
// return (
//   <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b1020] px-4 py-8">

//     <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.28),transparent_32%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.26),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.22),transparent_32%),linear-gradient(135deg,#0f172a_0%,#111827_35%,#1e1b4b_70%,#0f172a_100%)]" />

//     {/* Animated Neon Grid */}
//     <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-70" />

//     {/* Moving Glow Orbs */}
//     <div className="absolute -top-24 -left-20 h-[26rem] w-[26rem] rounded-full bg-cyan-400/40 blur-[140px] animate-pulse" />
//     <div className="absolute top-8 right-[-4rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/40 blur-[150px] animate-pulse" />
//     <div className="absolute bottom-[-6rem] left-1/4 h-[22rem] w-[22rem] rounded-full bg-violet-500/35 blur-[140px] animate-pulse" />
//     <div className="absolute bottom-10 right-1/4 h-[18rem] w-[18rem] rounded-full bg-blue-400/30 blur-[120px] animate-pulse" />

//     {/* Center Ambient Glow */}
//     <div className="absolute inset-x-0 top-1/2 mx-auto h-56 w-[80%] rounded-full bg-gradient-to-r from-cyan-400/15 via-fuchsia-400/15 to-violet-400/15 blur-[120px]" />

//     <div className="relative z-10 w-full max-w-sm sm:max-w-md">
//       <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-slate-900/45 p-6 sm:p-8 shadow-[0_0_30px_rgba(34,211,238,0.28),0_0_90px_rgba(168,85,247,0.22),0_0_120px_rgba(217,70,239,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(34,211,238,0.10),transparent_30%,rgba(217,70,239,0.10))] before:pointer-events-none after:absolute after:-inset-px after:rounded-[2rem] after:border after:border-white/8 after:pointer-events-none">
//         <div className="mb-6 flex justify-center">
//           <div className="rounded-full border border-cyan-400/40 bg-cyan-500/15 p-4 shadow-[0_0_30px_rgba(34,211,238,0.45),0_0_60px_rgba(217,70,239,0.22)] backdrop-blur-xl">
//             <GraduationCap size={42} className="text-cyan-300" />
//           </div>
//         </div>

//         <h1 className="text-center text-2xl sm:text-3xl font-black uppercase tracking-[0.18em] bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.9)] leading-tight break-words">
//           PRAYAS CHARITABLE TRUST
//         </h1>

//         <p className="mt-3 text-center text-sm sm:text-base text-slate-300">
//           WELCOME TO PRAYAS STUDENT PORTAL CLASS 10th
//         </p>

//         {/* Username */}
//         <div className="relative mt-8 mb-5">
//           <User
//             size={20}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300/90"
//           />

//           <input
//             type="text"
//             placeholder="Username / Student Code"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full rounded-2xl border border-cyan-400/25 bg-slate-900/55 pl-12 pr-4 py-3 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-cyan-300 focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-400/25 focus:shadow-[0_0_30px_rgba(34,211,238,0.28)]"
//           />
//         </div>

//         {/* Password */}
//         <div className="relative mb-6">
//   <Lock
//     size={20}
//     className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
//   />

//   <input
//     type={showPassword ? "text" : "password"}
//     placeholder="Password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     className="w-full rounded-2xl border border-cyan-400/20 bg-slate-900/70 py-3 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-xl"
//   />

//   <button
//     type="button"
//     onClick={(e) => {
//       e.preventDefault();
//       setShowPassword((prev) => !prev);
//     }}
//     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors duration-300"
//   >
//     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//   </button>
// </div>

//         <button
//           onClick={login}
//           className="group relative w-full overflow-hidden rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 py-3 text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_30px_rgba(34,211,238,0.45),0_0_70px_rgba(217,70,239,0.28)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.6),0_0_90px_rgba(217,70,239,0.4)] active:scale-[0.99]"
//         >
//           <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.28),transparent_60%)]" />

//           <span className="relative flex items-center justify-center gap-2">
//             ⚡ Login
//           </span>
//         </button>
//       </div>
//     </div>
//   </div>
// );


export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Independence Day theme ONLY on 15 August
  const today = new Date();
  const isIndependenceDay =
    today.getDate() === 15 && today.getMonth() === 7;

  const login = async () => {
    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "student") {
        localStorage.setItem("studentName", res.data.student.name);
        localStorage.setItem("rollNo", res.data.student.rollNo);
        localStorage.setItem("studentCode", res.data.student.studentCode);
      }

      if (res.data.role === "admin" || res.data.role === "teacher") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      console.log(err.response?.data);
      console.log(err);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 ${
        isIndependenceDay
          ? "bg-[#020806]"
          : "bg-[#0b1020]"
      }`}
    >
      {/* =========================================================
          INDEPENDENCE DAY BACKGROUND
         ========================================================= */}

      <div
        className={`absolute inset-0 ${
          isIndependenceDay
            ? "bg-[radial-gradient(circle_at_0%_50%,rgba(255,153,51,0.20),transparent_32%),radial-gradient(circle_at_100%_50%,rgba(19,136,8,0.20),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.035),transparent_35%),linear-gradient(135deg,#050a07_0%,#07100b_45%,#020705_100%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.28),transparent_32%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.26),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.22),transparent_32%),linear-gradient(135deg,#0f172a_0%,#111827_35%,#1e1b4b_70%,#0f172a_100%)]"
        }`}
      />

      {/* =========================================================
          PREMIUM GRID
         ========================================================= */}

      <div
        className={`absolute inset-0 ${
          isIndependenceDay
            ? "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]"
            : "bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-70"
        }`}
      />

      {/* =========================================================
          TRICOLOR LIGHT BARS
         ========================================================= */}

      {isIndependenceDay && (
        <>
          <div className="absolute left-0 top-0 h-full w-[20%] bg-gradient-to-r from-orange-500/[0.06] to-transparent blur-3xl" />

          <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-green-600/[0.06] to-transparent blur-3xl" />

          <div className="absolute left-1/2 top-0 h-[1px] w-[55%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="absolute bottom-0 left-1/2 h-[1px] w-[55%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </>
      )}

      {/* =========================================================
          AMBIENT GLOW
         ========================================================= */}

      <div
        className={`absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full blur-[160px] animate-pulse ${
          isIndependenceDay
            ? "bg-orange-500/20"
            : "bg-cyan-400/40"
        }`}
      />

      <div
        className={`absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full blur-[160px] animate-pulse ${
          isIndependenceDay
            ? "bg-green-600/20"
            : "bg-fuchsia-500/40"
        }`}
      />

      <div
        className={`absolute bottom-[-12rem] left-1/2 h-[30rem] w-[45rem] -translate-x-1/2 rounded-full blur-[160px] ${
          isIndependenceDay
            ? "bg-white/[0.025]"
            : "bg-violet-500/20"
        }`}
      />

      {/* =========================================================
          DECORATIVE PARTICLES
         ========================================================= */}

      {isIndependenceDay && (
        <>
          <div className="absolute left-[18%] top-[22%] h-1 w-1 rounded-full bg-orange-400 shadow-[0_0_12px_4px_rgba(255,153,51,0.5)] animate-pulse" />

          <div className="absolute right-[18%] top-[28%] h-1 w-1 rounded-full bg-green-400 shadow-[0_0_12px_4px_rgba(19,136,8,0.5)] animate-pulse" />

          <div className="absolute left-[12%] bottom-[25%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] animate-pulse" />

          <div className="absolute right-[13%] bottom-[20%] h-1 w-1 rounded-full bg-green-400 shadow-[0_0_12px_4px_rgba(19,136,8,0.4)] animate-pulse" />
        </>
      )}

      {/* =========================================================
          LOGIN CONTAINER
         ========================================================= */}

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">

        {/* Tricolor outer glow */}
        {isIndependenceDay && (
          <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-b from-orange-500/50 via-white/20 to-green-600/50 opacity-70 blur-[3px]" />
        )}

        <div
          className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-8 backdrop-blur-2xl ${
            isIndependenceDay
              ? "border border-white/[0.16] bg-[#07100b]/85 shadow-[0_20px_80px_rgba(0,0,0,0.55),0_0_45px_rgba(255,153,51,0.10),0_0_80px_rgba(19,136,8,0.10)]"
              : "border border-cyan-400/30 bg-slate-900/45 shadow-[0_0_30px_rgba(34,211,238,0.28),0_0_90px_rgba(168,85,247,0.22),0_0_120px_rgba(217,70,239,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]"
          }`}
        >

          {/* =====================================================
              TOP TRICOLOR LINE
             ===================================================== */}

          {isIndependenceDay && (
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-[0_0_15px_rgba(255,255,255,0.18)]" />
          )}

          {/* =====================================================
              SUBTLE ASHOKA CHAKRA
             ===================================================== */}

          {isIndependenceDay && (
            <div className="pointer-events-none absolute -right-20 -top-20 opacity-[0.035]">
              <div className="flex h-56 w-56 items-center justify-center rounded-full border-[14px] border-white">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white">
                  <span className="text-7xl text-white">☸</span>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              LOGO
             ===================================================== */}

          <div className="relative mb-6 flex justify-center">

            {isIndependenceDay && (
              <div className="absolute h-24 w-24 rounded-full bg-gradient-to-r from-orange-500/20 via-white/10 to-green-500/20 blur-xl" />
            )}

            <div
              className={`relative flex h-[88px] w-[88px] items-center justify-center rounded-full backdrop-blur-xl ${
                isIndependenceDay
                  ? "border border-white/25 bg-white/[0.045] shadow-[0_0_30px_rgba(255,153,51,0.15),0_0_60px_rgba(19,136,8,0.12)]"
                  : "border border-cyan-400/40 bg-cyan-500/15 shadow-[0_0_30px_rgba(34,211,238,0.45),0_0_60px_rgba(217,70,239,0.22)]"
              }`}
            >
              <GraduationCap
                size={42}
                className={
                  isIndependenceDay
                    ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)]"
                    : "text-cyan-300"
                }
              />
            </div>
          </div>

          {/* =====================================================
              TITLE
             ===================================================== */}

          <h1
            className={`relative text-center text-2xl sm:text-3xl font-black uppercase tracking-[0.20em] leading-[1.25] break-words bg-clip-text text-transparent ${
              isIndependenceDay
                ? "bg-gradient-to-r from-orange-400 via-white to-green-400 drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                : "bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.9)]"
            }`}
          >
            PRAYAS CHARITABLE TRUST
          </h1>

          {/* =====================================================
              INDEPENDENCE DAY MESSAGE
             ===================================================== */}

          {isIndependenceDay && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400/70" />

              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/85">
                🇮🇳 Happy Independence Day
              </p>

              <span className="h-px w-8 bg-gradient-to-l from-transparent to-green-400/70" />
            </div>
          )}

          <p
            className={`mt-4 text-center text-sm sm:text-base ${
              isIndependenceDay
                ? "text-white/60"
                : "text-slate-300"
            }`}
          >
            WELCOME TO PRAYAS STUDENT PORTAL CLASS 10th
          </p>

          {/* =====================================================
              USERNAME
             ===================================================== */}

          <div className="relative mt-8 mb-5">

            <User
              size={20}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                isIndependenceDay
                  ? "text-orange-400"
                  : "text-cyan-300/90"
              }`}
            />

            <input
              type="text"
              placeholder="Username / Student Code"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 ${
                isIndependenceDay
                  ? "border border-white/[0.12] bg-black/30 text-white placeholder:text-white/35 hover:border-orange-400/30 focus:border-orange-400/60 focus:bg-black/40 focus:ring-2 focus:ring-orange-400/10 focus:shadow-[0_0_25px_rgba(255,153,51,0.15)]"
                  : "border border-cyan-400/25 bg-slate-900/55 text-white placeholder:text-slate-400 focus:border-cyan-300 focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-400/25 focus:shadow-[0_0_30px_rgba(34,211,238,0.28)]"
              }`}
            />
          </div>

          {/* =====================================================
              PASSWORD
             ===================================================== */}

          <div className="relative mb-6">

            <Lock
              size={20}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                isIndependenceDay
                  ? "text-green-400"
                  : "text-cyan-300"
              }`}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-2xl py-3.5 pl-12 pr-12 outline-none transition-all duration-300 ${
                isIndependenceDay
                  ? "border border-white/[0.12] bg-black/30 text-white placeholder:text-white/35 hover:border-green-400/30 focus:border-green-400/60 focus:bg-black/40 focus:ring-2 focus:ring-green-400/10 focus:shadow-[0_0_25px_rgba(19,136,8,0.15)]"
                  : "border border-cyan-400/20 bg-slate-900/70 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
              }`}
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword((prev) => !prev);
              }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                isIndependenceDay
                  ? "text-white/40 hover:text-white"
                  : "text-slate-400 hover:text-cyan-300"
              }`}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* =====================================================
              PREMIUM TRICOLOR LOGIN BUTTON
             ===================================================== */}

          <button
            onClick={login}
            className={`group relative w-full overflow-hidden rounded-2xl py-3.5 text-sm sm:text-base font-black uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] ${
              isIndependenceDay
                ? "border border-white/20 bg-gradient-to-r from-orange-500 via-white via-[52%] to-green-600 text-black shadow-[0_0_30px_rgba(255,153,51,0.22),0_0_50px_rgba(19,136,8,0.16)] hover:shadow-[0_0_40px_rgba(255,153,51,0.30),0_0_70px_rgba(19,136,8,0.25)]"
                : "border border-cyan-400/40 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_0_30px_rgba(34,211,238,0.45),0_0_70px_rgba(217,70,239,0.28)] hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.6),0_0_90px_rgba(217,70,239,0.4)]"
            }`}
          >
            {/* Shine */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Hover glow */}
            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                isIndependenceDay
                  ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_65%)]"
                  : "bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.28),transparent_60%)]"
              }`}
            />

            <span className="relative flex items-center justify-center gap-3">
              <span className="text-base">⚡</span>
              <span>Login</span>
            </span>
          </button>

          {/* =====================================================
              BOTTOM DECORATION
             ===================================================== */}

          {isIndependenceDay && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-orange-500/60" />
              <span className="h-[2px] w-10 rounded-full bg-white/70" />
              <span className="h-[2px] w-10 rounded-full bg-green-500/60" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


// ================= ADMIN =================

export function AdminDashboard() {
  const role = localStorage.getItem("role");
  const [page, setPage] = useState(role === "teacher" ? "students" : "dashboard");
  const [search, setSearch] = useState("");

const menus = role === "teacher"
  ? [
      { id: "dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
      { id: "students", title: "Students", icon: <Users size={20} /> },
      { id: "results", title: "Results", icon: <FileText size={20} /> },
    ]
  : [
      { id: "dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
      { id: "students", title: "Students", icon: <Users size={20} /> },
      { id: "tests", title: "Tests", icon: <ClipboardList size={20} /> },
      { id: "results", title: "Results", icon: <FileText size={20} /> },
    ];

  return (
    <div className="min-h-screen bg-[#02030a] text-white flex flex-col lg:flex-row overflow-y-auto touch-pan-y">


      {/* Background Glow */}

      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-violet-500/20 blur-[170px] pointer-events-none" />

    <div className="fixed top-20 right-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[170px] pointer-events-none" />

    <div className="fixed bottom-10 left-1/3 h-72 w-72 rounded-full bg-pink-500/15 blur-[170px] pointer-events-none" />

    <div className="fixed bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-green-500/10 blur-[180px] pointer-events-none" />

    <div className="fixed top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[180px] pointer-events-none" />

    {/* Sidebar */}
    <aside className="relative z-10 w-full lg:w-64 shrink-0 bg-slate-950/70 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-white/10 shadow-[0_0_80px_rgba(139,92,246,.15)] flex flex-col">

        {/* Logo */}

        <div className="px-5 py-5 lg:px-8 lg:py-8 border-b border-slate-700">

          <div className="flex items-center gap-3 lg:gap-4">

            <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,.55)]">

              <GraduationCap size={30} className="text-white"/>

            </div>

            <div>

              <h1 className="text-lg lg:text-xl font-bold text-white tracking-wide">
                TEST MANAGER
              </h1>

              <p className="text-slate-400 text-sm">
                ADMIN CONTROL
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}

        <nav className="flex-1 px-3 py-3 lg:px-5 lg:py-8 overflow-x-auto">

<div className="flex gap-3 lg:block">
          {menus.map((item) => (

            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`group relative flex min-w-[140px] lg:min-w-0 items-center gap-3 lg:gap-4 w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl mb-0 lg:mb-4 transition-all duration-300

              ${
                page === item.id
  ? "bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-500/20 border border-fuchsia-500/40 text-white shadow-[0_0_35px_rgba(168,85,247,.35)]"
  : "border border-transparent text-slate-400 hover:border-fuchsia-500/30 hover:bg-white/5 hover:text-white"
              }
              `}
            >

              {page === item.id && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_20px_#a855f7]" />
              )}

              <div className="group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">

                {item.icon}

              </div>

              <span className="font-medium tracking-wide">

                {item.title}

              </span>

            </button>

          ))}
          </div>

        </nav>

        {/* Logout */}

        <div className="p-5 border-t border-slate-700">

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >

            <LogOut size={20}/>

            Logout

          </button>

        </div>

      </aside>

      {/* Main */}

       <div className="flex-1 flex flex-col min-h-screen overflow-y-auto touch-pan-y">


        {/* Navbar */}

        <header className="bg-[#0B1220]/80 backdrop-blur-xl border-b border-blue-500/20 px-4 py-4 sm:px-6 lg:px-10">

  <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">

    <div className="min-w-0 flex-1">
      <h1 className="text-center lg:text-left text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight break-words">
        PRAYAS CHARITABLE TRUST
      </h1>

      <p className="mt-2 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base text-slate-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
        <span>
          {role === "teacher"
            ? "Teacher access · View-only portal"
            : "Administration portal · Manage students, tests, and results"}
        </span>
      </p>
    </div>

    <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:w-auto lg:justify-end lg:gap-4">
      <div className="relative flex-1 lg:flex-none">
        <input
  placeholder="Search students, tests, results..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full rounded-xl border border-blue-500/20 bg-slate-900/80 px-4 py-3 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 sm:w-72 lg:w-80"
/>
      </div>

      <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-[0_0_30px_rgba(34,211,238,.35)] sm:mx-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
        {role === "teacher" ? "T" : "A"}
      </div>
    </div>

  </div>

</header>

        {/* Content */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-visible">

          {page === "dashboard" && <DashboardPage />}
{page === "students" && <StudentsPage search={search} />}
{role !== "teacher" && page === "tests" && <TestsPage search={search} />}
{page === "results" && <ResultsPage search={search} />}

    </main>
    </div>
    </div>
  );
}

function DashboardPage() {
  const [data, setData] = useState({
    totalStudents: 0,
    totalTests: 0,
    averageMarks: 0,
    highestMarks: 0,
    lowestMarks: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setData(res.data);
    } catch {
      alert("Failed to load dashboard");
    }
  };

  const cards = [
    {
      title: "Students",
      value: data.totalStudents,
      icon: <Users size={28} />,
      color: "from-blue-500 to-cyan-400",
      glow: "shadow-blue-500/30",
      border: "border-blue-500/20",
    },
    {
      title: "Tests",
      value: data.totalTests,
      icon: <FileText size={28} />,
      color: "from-violet-500 to-fuchsia-500",
      glow: "shadow-violet-500/30",
      border: "border-violet-500/20",
    },
    {
      title: "Average",
      value: data.averageMarks,
      icon: <TrendingUp size={28} />,
      color: "from-green-500 to-emerald-400",
      glow: "shadow-green-500/30",
      border: "border-green-500/20",
    },
    {
      title: "Highest",
      value: data.highestMarks,
      icon: <Trophy size={28} />,
      color: "from-orange-500 to-yellow-400",
      glow: "shadow-orange-500/30",
      border: "border-orange-500/20",
    },
    {
      title: "Lowest",
      value: data.lowestMarks,
      icon: <BarChart4 size={28} />,
      color: "from-red-500 to-pink-500",
      glow: "shadow-red-500/30",
      border: "border-red-500/20",
    },
  ];

  return (
    <div>

      <div className="mb-6 sm:mb-8 lg:mb-10 w-full overflow-x-hidden touch-pan-y">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
    Dashboard
  </h1>

  <p className="text-sm sm:text-base text-slate-400 mt-2">
    System Overview
  </p>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6">

        {cards.map((card) => (

          <div
  key={card.title}
  className={`
    group
    bg-[#111827]
    border
    ${card.border}
    rounded-2xl
    p-4 sm:p-5 lg:p-6
    transition-all
    duration-300
    lg:hover:-translate-y-2
    lg:hover:scale-[1.03]
    lg:hover:shadow-2xl
    ${card.glow}
    touch-pan-y
  `}
>

            <div className="flex justify-between items-start">

              <div>

                <p className="text-slate-400 text-xs sm:text-sm tracking-wide uppercase">
                  {card.title}
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-3">
                  {card.value}
                </h2>

              </div>

              <div
                className={`
  h-12 w-12 sm:h-14 sm:w-14
  rounded-2xl
  bg-gradient-to-br
  ${card.color}
  flex
  items-center
  justify-center
  text-white
  shadow-lg
  lg:group-hover:rotate-6
  lg:group-hover:scale-110
  transition-all
  duration-300
`}
              >
                {card.icon}
              </div>

            </div>

            <div className="mt-6 h-1 rounded-full bg-slate-700 overflow-hidden">

              <div
                className={`
                h-full
                w-3/4
                bg-gradient-to-r
                ${card.color}
                `}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-10">

        {/* Activity */}

        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-4 sm:p-6">

          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
            Recent Activity
          </h3>

          <div className="space-y-3 sm:space-y-4 min-w-0">

            <div className="flex items-center justify-between gap-3 text-sm sm:text-base">

              <span className="text-slate-400">
                Students Registered
              </span>

              <span className="text-cyan-400">
                {data.totalStudents}
              </span>

            </div>

            <div className="flex items-center justify-between gap-3 text-sm sm:text-base">

              <span className="text-slate-400">
                Tests Conducted
              </span>

              <span className="text-green-400">
                {data.totalTests}
              </span>

            </div>

            <div className="flex items-center justify-between gap-3 text-sm sm:text-base">

              <span className="text-slate-400">
                Average Score
              </span>

              <span className="text-yellow-400">
                {data.averageMarks}
              </span>

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="bg-slate-900/70 border border-blue-500/20 rounded-2xl p-4 sm:p-6">

          <h3 className="text-xl font-semibold text-white mb-6">
            System Status
          </h3>

          <div className="space-y-4 sm:space-y-5">

            <div className="flex items-center justify-between gap-3 text-sm sm:text-base">

              <span className="text-slate-400">
                Database
              </span>

              <span className="text-green-400">
                ● Online
              </span>

            </div>

            <div className="flex items-center justify-between gap-3 text-sm sm:text-base">

              <span className="text-slate-400">
                API
              </span>

              <span className="text-green-400">
                ● Running
              </span>

            </div>

            <div className="flex items-center justify-between gap-3 text-sm sm:text-base">

              <span className="text-slate-400">
                Server
              </span>

              <span className="text-green-400">
                ● Healthy
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export function StudentDashboard() {
  const [page, setPage] = useState("dashboard");

return (
   <div className="min-h-screen bg-[#02030a] text-white flex flex-col lg:flex-row overflow-y-auto touch-pan-y">

<div className="rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(34,211,238,0.25)]">

    {/* Sidebar */}
    <div className="relative z-10 w-full lg:w-72 shrink-0 bg-slate-950/80 backdrop-blur-3xl border-b lg:border-b-0 lg:border-r border-cyan-400/20 shadow-[0_0_60px_rgba(34,211,238,0.12)] p-4 lg:p-6 flex flex-col">
      {/* Logo */}
      

{/* Student Profile */}

<div className="w-full px-3 sm:px-4 lg:px-6 mb-4 sm:mb-6">
  <div
    className="
      w-full
      rounded-2xl
      sm:rounded-3xl
      border
      border-cyan-400/30
      bg-slate-950/70
      backdrop-blur-md
      px-4
      py-4
      sm:px-6
      sm:py-5
      lg:px-8
      lg:py-6
      shadow-[0_0_20px_rgba(34,211,238,0.25),0_0_50px_rgba(139,92,246,0.15)]
      hover:shadow-[0_0_30px_rgba(34,211,238,0.4),0_0_70px_rgba(236,72,153,0.2)]
      transition-all
      duration-300
    "
  >
    <h1
      className="
        w-full
        text-center
        text-base
        sm:text-2xl
        md:text-3xl
        lg:text-4xl
        xl:text-[42px]
        font-black
        uppercase
        tracking-[0.08em]
        sm:tracking-[0.12em]
        md:tracking-[0.16em]
        lg:tracking-[0.2em]
        xl:tracking-[0.25em]
        leading-tight
        break-words
        whitespace-normal
        bg-gradient-to-r
        from-cyan-400
        via-violet-400
        to-pink-500
        bg-clip-text
        text-transparent
        drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]
      "
    >
      PRAYAS CHARITABLE TRUST
    </h1>
  </div>
</div>


<div className="mb-8 rounded-3xl border border-cyan-400/30 bg-slate-900/70 p-6 shadow-[0_0_40px_rgba(34,211,238,0.25)] backdrop-blur-xl">

  <p className="text-lg font-black uppercase tracking-[3px] text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
    STUDENT DETAILS
  </p>

  <div className="mt-5 space-y-4">


<div className="rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(16,185,129,0.25)]">

  <p className="text-sm uppercase tracking-wider text-emerald-200">
    Student Name
  </p>

  <p className="mt-1 text-xl sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] break-words leading-tight">
    {localStorage.getItem("studentName")}
  </p>

</div>


    <div className="rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(34,211,238,0.25)]">

      <p className="text-sm uppercase tracking-wider text-cyan-200">
        Roll Number
      </p>

      <p className="mt-1 text-xl sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] break-all">
        {localStorage.getItem("rollNo")}
      </p>

    </div>


    <div className="rounded-2xl border border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(168,85,247,0.25)]">

      <p className="text-sm uppercase tracking-wider text-violet-200">
        Student Code
      </p>

      <p className="mt-1 text-xl sm:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] break-all">
        {localStorage.getItem("studentCode")}
      </p>

    </div>

  </div>

</div>
      {/* Navigation */}
      <ul className="space-y-3 flex-1">
        {
          ["dashboard", "results", "performance"].map((item) => {
            const icons = {
              dashboard: "📊",
              results: "📄",
              performance: "📈"
            };

            return (
              <li
                key={item}
                onClick={() => setPage(item)}
                className={`group relative overflow-hidden flex items-center gap-3 rounded-2xl px-3 sm:px-4 py-3 transition-all duration-300 whitespace-nowrap shrink-0 lg:w-full hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] ${
  page === item.id
    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_35px_rgba(168,85,247,.45)]"
    : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.15),transparent_60%)]" />

                <div className="relative flex items-center gap-3">
                  <span className="text-lg">{icons[item]}</span>
                  <span className="capitalize truncate max-w-[120px] sm:max-w-none">{item}</span>
                </div>
              </li>
            );
          })
        }
      </ul>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="group relative overflow-hidden mt-4 sm:mt-6 w-full rounded-2xl border border-red-500/30 bg-red-500/10 px-4 sm:px-5 py-4 text-left font-medium text-red-300 transition-all duration-300 hover:scale-[1.02] hover:border-red-400/50 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]"
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_left,rgba(248,113,113,0.22),transparent_60%)]" />
        <div className="relative flex items-center gap-3">
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </div>
      </button>
    </div>

    {/* Main */}
    <div className="relative flex-1 min-h-screen overflow-y-auto overflow-x-hidden bg-[#02030a] p-4 sm:p-6 lg:p-10 touch-pan-y">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full overflow-x-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-cyan-400/10 bg-slate-950/45 p-4 sm:p-6 lg:p-8 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl touch-pan-y">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">


        </div>

        {page === "dashboard" && <StudentHome />}
        {page === "results" && <StudentResults />}
        {page === "performance" && <StudentPerformance />}
      </div>

      {/* Neon Glow Effects */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/20 blur-[180px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[170px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-violet-500/20 blur-[150px] animate-pulse" />
    </div>
    </div>
  </div>
);
}



function StudentHome() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const res = await api.get("/student/results", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setResults(res.data);

    } catch (err) {
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const validResults = results.filter(
  (r) => !isNaN(Number(r.marks))
);

const totalTests = results.length;

const totalMarks = validResults.reduce(
  (sum, r) => sum + Number(r.marks),
  0
);

const averageMarks =
  validResults.length > 0
    ? (totalMarks / validResults.length).toFixed(1)
    : 0;

const averagePercentage =
  validResults.length > 0
    ? (
        validResults.reduce((sum, r) => {
          const marks = Number(r.marks || 0);
          const total = Number(r.testId?.totalMarks || 0);
          return sum + (total > 0 ? (marks / total) * 100 : 0);
        }, 0) / validResults.length
      ).toFixed(1)
    : 0;

const highestMarks =
  validResults.length > 0
    ? Math.max(...validResults.map((r) => Number(r.marks)))
    : 0;

  const latestTests = [...results]
    .sort(
      (a, b) =>
        new Date(b.testId?.date) - new Date(a.testId?.date)
    )
    .slice(0, 5);

  return (
    <>
      <div className="mb-10">
  <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
    🎓 WELCOME
  </h1>

  <h2 className="truncate text-2xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
    {localStorage.getItem("studentName")}
</h2>

  <p className="mt-3 flex items-center gap-2 text-lg text-slate-400">
    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
    Check your latest performance and recent results.
  </p>
</div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">

        <div className="rounded-3xl border border-cyan-500/30 bg-white/5 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
  <p className="text-slate-400 uppercase tracking-[3px] text-xs">
    Total Tests
  </p>

  <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-400 break-all leading-none drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
    {loading ? "--" : totalTests}
  </h2>
</div>

<div className="rounded-3xl border border-pink-500/30 bg-white/5 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(236,72,153,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]">
  <p className="text-slate-400 uppercase tracking-[3px] text-xs">
    Average Marks
  </p>

  <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-pink-400 break-all leading-none drop-shadow-[0_0_12px_rgba(244,114,182,0.7)]">
    {loading ? "--" : averageMarks}
  </h2>
</div>

<div className="rounded-3xl border border-violet-500/30 bg-white/5 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]">
  <p className="text-slate-400 uppercase tracking-[3px] text-xs">
    Average Percentage
  </p>

  <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-violet-400 break-all leading-none drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
    {loading ? "--" : `${averagePercentage}%`}
  </h2>
</div>

<div className="rounded-3xl border border-emerald-500/30 bg-white/5 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]">
  <p className="text-slate-400 uppercase tracking-[3px] text-xs">
    Highest Score
  </p>

  <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 break-all leading-none drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]">
    {loading ? "--" : highestMarks}
  </h2>
</div>

      </div>

      <div className="mt-6 sm:mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,.12)] overflow-hidden">

        <div className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 px-4 sm:px-6 py-3 sm:py-4">

          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white break-words">
            📚 Recent Results
          </h2>

        </div>
        <div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,0.10)]">

  <div className="w-full overflow-x-auto touch-pan-x">

    <table className="min-w-[820px] w-full border-collapse text-sm text-slate-200">
      

          <thead>

  <tr className="border-b border-white/10">

    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-slate-300 whitespace-nowrap">
      Test
    </th>

    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 whitespace-nowrap">
      Date
    </th>

    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 whitespace-nowrap">
      Marks
    </th>

  </tr>

</thead>

<tbody>

  {latestTests.map((r, index) => (

    <tr
      key={r._id}
      className={`border-b border-white/5 hover:bg-white/5 transition ${
        index % 2 === 0
          ? "bg-slate-900/30"
          : "bg-slate-600/20"
      }`}
    >

      <td className="px-3 sm:px-6 py-3 sm:py-4 text-cyan-300 font-semibold break-words min-w-[180px]">
        {r.testId?.testName}
      </td>

      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 whitespace-nowrap">
        {new Date(r.testId?.date).toLocaleDateString()}
      </td>

      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">

        {isNaN(Number(r.marks)) ? (

  <span className="inline-flex items-center rounded-xl border border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300 shadow-lg backdrop-blur-xl">
    Absent
  </span>

) : (

  <span className="inline-flex items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 shadow-lg backdrop-blur-xl">
    {r.marks}
  </span>

)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        </div>
        </div>
      </div>
    </>
  );
}

function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const res = await api.get("/student/results", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setResults(res.data);
    } catch (err) {
      alert("Failed to load results");
    }

    const totalTests = results.length;

const average = totalTests > 0
    ? (
        results.reduce((sum, r) => sum + Number(r.marks || 0), 0) /
        totalTests
      ).toFixed(1)
    : 0;

const highest = totalTests > 0
    ? Math.max(...results.map(r => Number(r.marks || 0)))
    : 0;
  };

  return (
    <>
      <div className="mb-10 flex items-center justify-between">

  <div>

    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg break-words leading-tight text-center sm:text-left">

      📊 My Results

    </h1>

    <p className="mt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-center sm:text-left text-sm sm:text-base text-slate-400">

      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>

      View your latest test performance and progress.

    </p>

  </div>

</div>

      <div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,0.10)]">

  <div className="w-full overflow-x-auto touch-pan-x">

    <table className="min-w-[820px] w-full border-collapse text-sm text-slate-200">
      

        <thead className="sticky top-0 z-10 bg-[#111827]/95 backdrop-blur-xl border-b border-cyan-400/20 shadow-[0_4px_20px_rgba(34,211,238,0.08)]">
  <tr>
    <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
      🎓 Roll
    </th>

    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
      👤 Student
    </th>

    <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
      📝 Marks
    </th>

    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
      💬 Remarks
    </th>
  </tr>
</thead>

    <tbody>

      {results.map((r, index) => (

        <tr
          key={r._id}
          className={`
  group relative transition-all duration-300
  ${index % 2 === 0
    ? "bg-slate-900/45"
    : "bg-slate-800/30"}
  hover:bg-slate-800/60
  hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]
  hover:-translate-y-[1px]
`}
        >

          <td className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">

  <div className="flex items-center gap-2 sm:gap-3 min-w-[200px]">
  <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-base sm:text-lg shadow-lg shrink-0">
    📝
  </div>

  <div className="min-w-0">
    <p className="font-semibold text-white break-words leading-tight">
      {r.testId?.testName}
    </p>

    <p className="text-xs sm:text-sm text-slate-400">
      Examination
    </p>
  </div>
</div>

</td>

          <td className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-center text-slate-300 whitespace-nowrap">
            {new Date(r.testId?.date).toLocaleDateString("en-IN")}
          </td>

          <td className="px-8 py-5 text-center">

           {isNaN(Number(r.marks)) ? (

  <span className="inline-flex items-center rounded-xl border px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-xl whitespace-nowrap">
    Absent
  </span>

) : (() => {

  const marks = Number(r.marks);
  const total = Number(r.testId?.totalMarks || 0);
  const percentage = total > 0 ? (marks / total) * 100 : 0;

  return (

    <span
      className={`inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-xl ${
        percentage >= 75
          ? "border-emerald-400/30 bg-gradient-to-r from-emerald-500 to-green-600"
          : percentage >= 50
          ? "border-cyan-400/30 bg-gradient-to-r from-cyan-500 to-blue-600"
          : percentage >= 35
          ? "border-orange-400/30 bg-gradient-to-r from-orange-500 to-amber-500"
          : "border-rose-400/30 bg-gradient-to-r from-rose-500 to-pink-600"
      }`}
    >
      {marks}/{total}
    </span>

  );

})()}

          </td>

          <td className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-center whitespace-nowrap">

  <span
    className={`font-semibold ${
      r.remarks === "Excellent"
        ? "text-emerald-400"
        : r.remarks === "Very Good"
        ? "text-cyan-400"
        : r.remarks === "Good"
        ? "text-yellow-400"
        : r.remarks === "Fail"
        ? "text-red-400"
        : "text-slate-300"
    }`}
  >
    {r.remarks || "-"}
  </span>

</td>

        </tr>

      ))}

    </tbody>

  </table>
  </div>
      </div>
    </>
  );
}




function StudentPerformance() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const res = await api.get("/student/results", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setResults(res.data);

    } catch (err) {
      alert("Failed to load performance");
    }
  };

 const excellent = results.filter((r) => {
  const percentage =
    (Number(r.marks) / Number(r.testId?.totalMarks || 1)) * 100;
  return percentage >= 90;
}).length;

const good = results.filter((r) => {
  const percentage =
    (Number(r.marks) / Number(r.testId?.totalMarks || 1)) * 100;
  return percentage >= 75 && percentage < 90;
}).length;

const average = results.filter((r) => {
  const percentage =
    (Number(r.marks) / Number(r.testId?.totalMarks || 1)) * 100;
  return percentage >= 60 && percentage < 75;
}).length;

const poor = results.filter((r) => {
  const percentage =
    (Number(r.marks) / Number(r.testId?.totalMarks || 1)) * 100;
  return percentage < 60;
}).length;

const presentTests = results.filter(
  (r) => !isNaN(Number(r.marks))
).length;

const absentTests = results.length - presentTests;

  return (
    <>

      <div className="mb-10">

        <h2 className="text-xl sm:text-2xl lg:text-[36px] font-black uppercase tracking-[0.12em] sm:tracking-[0.18em] bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.9)] text-center sm:text-left leading-tight break-words">
  Performance Analytics
</h2>

        <p className="mt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-center sm:text-left text-sm sm:text-base text-slate-400">

          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>

          Track your academic progress over time.

        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">

        <div className="rounded-3xl border border-violet-500/20 bg-white/5 p-6 backdrop-blur-xl">

  <p className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-slate-400 break-words leading-tight">
    📝 Test Attendance
  </p>

  <h2 className="mt-4 text-5xl font-black text-violet-400">
    {presentTests}/{results.length}
  </h2>

  <p className="mt-2 text-sm text-slate-400">
    Present in {presentTests} out of {results.length} tests
  </p>

</div>

        <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-4 sm:p-6 backdrop-blur-xl">

          <p className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-slate-400 break-words leading-tight">

            🌟 Excellent

          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400 break-all leading-none">

            {excellent}

          </h2>

        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-4 sm:p-6 backdrop-blur-xl">

          <p className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-slate-400 break-words leading-tight">

            ✅ Very Good

          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-400 break-all leading-none">

            {good}

          </h2>

        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-4 sm:p-6 backdrop-blur-xl">

          <p className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-slate-400 break-words leading-tight">

            👍 Good

          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 break-all leading-none">

            {average}

          </h2>

        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-4 sm:p-6 backdrop-blur-xl">

          <p className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-slate-400 break-words leading-tight">

            ❌ Needs Improvement

          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-red-400 break-all leading-none">

            {poor}

          </h2>

        </div>

      </div>

      <div className="mt-6 sm:mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,.15)]">

  <div className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-4 sm:px-6 py-3 sm:py-4">

    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white break-words">
      🏆 Performance History
    </h2>

  </div>

  <div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,0.10)]">

  <div className="w-full overflow-x-auto touch-pan-x">

    <table className="min-w-[820px] w-full border-collapse text-sm text-slate-200">
      
      <thead>

            <tr className="border-b border-white/10">

              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-slate-300 whitespace-nowrap text-xs sm:text-sm">
                Test
              </th>

              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 whitespace-nowrap text-xs sm:text-sm">
                Marks
              </th>

              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 whitespace-nowrap text-xs sm:text-sm">
  Percentage
</th>

            </tr>

          </thead>

          <tbody>

            {results.map((r, index) => {

              const marks = isNaN(Number(r.marks)) ? 0 : Number(r.marks);
const total = Number(r.testId?.totalMarks || 0);

const percentage =
  total > 0 ? ((marks / total) * 100).toFixed(1) : 0;

let color = "text-red-400";

if (percentage >= 90) {
  color = "text-emerald-400";
} else if (percentage >= 75) {
  color = "text-cyan-400";
} else if (percentage >= 60) {
  color = "text-yellow-400";
} else if (percentage >= 40) {
  color = "text-orange-400";
}

              return (

                <tr
                  key={r._id}
                  className={`border-b border-white/5 hover:bg-white/5 transition ${
                    index % 2 === 0
                      ? "bg-slate-900/30"
                      : "bg-slate-800/20"
                  }`}
                >

                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-cyan-300 font-semibold break-words min-w-[180px] leading-tight">

                    {r.testId?.testName}

                  </td>

                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">

  {isNaN(Number(r.marks)) ? (

    <span className="inline-flex items-center rounded-2xl border px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-xl whitespace-nowrap">
      Absent
    </span>

  ) : (

    <span
      className={`inline-flex items-center rounded-2xl border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl ${
        percentage >= 90
          ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-300"
          : percentage >= 75
          ? "border-cyan-400/30 bg-cyan-500/15 text-cyan-300"
          : percentage >= 60
          ? "border-amber-400/30 bg-amber-500/15 text-amber-300"
          : percentage >= 40
          ? "border-orange-400/30 bg-orange-500/15 text-orange-300"
          : "border-rose-400/30 bg-rose-500/15 text-rose-300"
      }`}
    >
      {marks}/{total}
    </span>

  )}

</td>

                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">

  <span
    className={`rounded-xl px-4 py-2 font-bold shadow-lg ${
      percentage >= 90
        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
        : percentage >= 75
        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
        : percentage >= 60
        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
        : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
    }`}
  >
    {percentage}%
  </span>

</td>

                </tr>

              );

            })}

                </tbody>
    </table>
  </div>
  </div>
</div>

</>
  );
}

function StudentsPage({ search }) {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const role = localStorage.getItem("role");
  const isReadOnly = role === "teacher"; 

const [form, setForm] = useState({
  rollNo: "",
  name: "",
  studentCode: "",
  password: "",
});

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("/students-with-performance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setStudents(res.data);
    } catch (err) {
      alert("Failed to load students");
    }
  };

 const addStudent = async () => {
  try {
    if (editingId) {
      // Update Student
      await api.put(`/students/${editingId}`, form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } else {
      // Add Student
      await api.post("/students", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    }

    setShowForm(false);
    setEditingId(null);

    setForm({
      rollNo: "",
      name: "",
      studentCode: "",
      password: "",
    });

    loadStudents();

  } catch (err) {
    alert(err.response?.data?.message || "Error");
  }
};

const deleteStudent = async (id) => {
  if (!window.confirm("Delete this student?")) return;

  try {
    await api.delete(`/students/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    loadStudents();

  } catch (err) {
    alert(err.response?.data?.message || "Delete Failed");
  }
};

const editStudent = (student) => {
  setEditingId(student._id);

  setForm({
    rollNo: student.rollNo,
    name: student.name,
    studentCode: student.studentCode,
    password: "",
  });

  setShowForm(true);
};

const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase()) ||
  student.rollNo.toString().includes(search) ||
  student.studentCode.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

  <div className="min-w-0 flex-1">
    <h1 className="text-center sm:text-left text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight">
      👨‍🎓 Student Management
    </h1>

    <p className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left text-sm sm:text-base text-slate-400">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
      <span>
        Welcome back,
        <span className="font-semibold text-white ml-1">Administrator</span>
      </span>
      <span className="text-xl shrink-0">👋</span>
    </p>
  </div>

  {!isReadOnly && (
    <div className="flex justify-center sm:justify-end">
      <button
        onClick={() => {
          setEditingId(null);
          setForm({
            rollNo: "",
            name: "",
            studentCode: "",
            password: "",
          });
          setShowForm(true);
        }}
        className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-[0_0_25px_rgba(34,197,94,.35)] transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,.6)] whitespace-nowrap"
      >
        <span className="text-lg transition-transform duration-300 group-hover:rotate-90">+</span>
        <span>Add Student</span>
      </button>
    </div>
  )}

</div>

{showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">

    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/95 p-5 sm:p-6 lg:p-8 shadow-[0_0_50px_rgba(168,85,247,.25)] backdrop-blur-2xl">

      <h2 className="mb-5 text-center sm:text-left text-2xl sm:text-3xl font-bold text-white">
        {editingId ? "✏ Edit Student" : "➕ Add Student"}
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Roll No"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
        />

        <input
          placeholder="Student Name"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Student Code"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          value={form.studentCode}
          onChange={(e) => setForm({ ...form, studentCode: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          onClick={() => setShowForm(false)}
          className="w-full sm:w-auto rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600 transition"
        >
          Cancel
        </button>

        <button
          onClick={addStudent}
          className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300"
        >
          {editingId ? "Update Student" : "Save Student"}
        </button>
      </div>

    </div>
  </div>
)}
      <div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,0.10)]">
  <div className="w-full overflow-x-auto touch-pan-x">
    <table className="min-w-[820px] w-full border-collapse text-sm text-slate-200">
      

    <thead className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500">
  <tr>
    <th className="w-20 px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[2px] text-white">
      🎓 Roll
    </th>

    <th className="w-64 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[2px] text-white">
      👤 Student
    </th>

    <th className="w-44 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[2px] text-white">
      🆔 Student Code
    </th>

    <th className="w-28 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[2px] text-white">
      📊 Avg %
    </th>

    {!isReadOnly && (
      <th className="w-44 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[2px] text-white">
        ⚙ Actions
      </th>
    )}
  </tr>
</thead>

    <tbody>

      {filteredStudents.map((student, index) => (

        <tr
  key={student._id}
  className={`
  border-b border-white/5
  transition-colors duration-200
  hover:bg-cyan-500/5
  hover:border-cyan-400/20
  ${index % 2 === 0 ? "bg-slate-900/40" : "bg-slate-800/25"}
`}
>

  <td className="px-3 py-3 text-center font-semibold text-cyan-300 align-middle">
    #{student.rollNo}
  </td>

  <td className="px-5 py-4 align-middle">
  <div className="flex items-center gap-3">

    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-sm font-black text-white shadow-[0_0_20px_rgba(34,211,238,0.35)]">
      {student.name?.charAt(0).toUpperCase()}
    </div>

    <div className="min-w-0">
      <p className="truncate font-semibold text-white" title={student.name}>
        {student.name}
      </p>

      <p className="text-xs text-slate-400">
        Academic Record
      </p>
    </div>

  </div>
</td>

  <td className="px-4 py-3 text-center align-middle">
    <span className="inline-flex max-w-[150px] items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-sm text-cyan-300 truncate" title={student.studentCode}>
      {student.studentCode}
    </span>
  </td>

  <td className="px-4 py-3 text-center align-middle">
    <span className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-bold text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
      {student.averagePercentage ?? "0.0"}%
    </span>
  </td>

  {!isReadOnly && (
    <td className="px-4 py-3 align-middle">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => editStudent(student)}
          className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => deleteStudent(student._id)}
          className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          🗑 Delete
        </button>
      </div>
    </td>
  )}

</tr>

      ))}

    </tbody>

  </table>
  </div>
</div></>
    
  );
}

function TestsPage({ search = "" }) {
  const [tests, setTests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    testName: "",
    date: "",
    totalMarks: "",
  });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const res = await api.get("/tests", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setTests(res.data);

    } catch (err) {
      alert("Failed to load tests");
    }
  };

  const addTest = async () => {
    try {
      await api.post("/tests", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });


      setShowForm(false);

      setForm({
        testName: "",
        date: "",
        totalMarks: "",
      });

      loadTests();

    } catch (err) {
      alert("Error");
    }
  };

  const filteredTests = tests.filter((test) =>
  test.testName.toLowerCase().includes(search.toLowerCase()) ||
  new Date(test.date)
    .toLocaleDateString("en-IN")
    .includes(search) ||
  test.totalMarks.toString().includes(search)
);

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

  <div className="min-w-0 flex-1">
    <h1 className="text-center sm:text-left text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight break-words">
      📝 Test Management
    </h1>

    <p className="mt-2 flex items-center justify-center gap-2 text-center text-sm sm:text-base text-slate-400 w-full">
  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>

  <span className="break-words">
    Create and manage examination schedules
  </span>
</p>
  </div>

  <div className="flex justify-center sm:justify-end">
    <button
      onClick={() => setShowForm(true)}
      className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-5 sm:px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-[0_0_30px_rgba(16,185,129,.35)] transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_45px_rgba(16,185,129,.55)] whitespace-nowrap"
    >
      <span className="text-base sm:text-lg">📝</span>
      <span>Create New Test</span>
    </button>
  </div>

</div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/95 p-4 sm:p-6 lg:p-8 shadow-[0_0_50px_rgba(168,85,247,.25)] backdrop-blur-2xl">

            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-white break-words">
              Add Test
            </h2>

            <input
              placeholder="Test Name"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 mb-4 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              value={form.testName}
              onChange={(e) =>
                setForm({ ...form, testName: e.target.value })
              }
            />

            <input
              type="date"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              placeholder="Total Marks"
              type="number"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              value={form.totalMarks}
              onChange={(e) =>
                setForm({ ...form, totalMarks: e.target.value })
              }
            />

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

              <button
                onClick={() => setShowForm(false)}
                className="w-full sm:w-auto rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={addTest}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300"              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,0.10)]">

  <div className="w-full overflow-x-auto touch-pan-x">

    <table className="min-w-[820px] w-full border-collapse text-sm text-slate-200">
      

    <thead className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500">

      <tr>

        <th className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-left text-[10px] sm:text-xs font-bold uppercase tracking-[2px] sm:tracking-[3px] text-white whitespace-nowrap">
          📖 Test Name
        </th>

        <th className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-[2px] sm:tracking-[3px] text-white whitespace-nowrap">
          📅 Date
        </th>

        <th className="px-8 py-5 text-center text-xs font-bold uppercase tracking-[3px] text-white">
          🎯 Total Marks
        </th>

      </tr>

    </thead>

    <tbody>

      {filteredTests.map((test, index) => (

        <tr
          key={test._id}
          className={`
  group relative transition-all duration-300
  ${index % 2 === 0
    ? "bg-slate-900/45"
    : "bg-slate-800/30"}
  hover:bg-slate-800/60
  hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]
  hover:-translate-y-[1px]
`}
        >

          <td className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">

            <div className="flex items-center gap-2 sm:gap-3 min-w-[220px]">
  <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-base sm:text-lg shadow-lg shrink-0">
    📋
  </div>

  <div className="min-w-0">
    <p className="font-semibold text-white break-words leading-tight">
      {test.testName}
    </p>

    <p className="text-xs sm:text-sm text-slate-400">
      Academic Test
    </p>
  </div>
</div>

          </td>

          <td className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-center text-slate-300 whitespace-nowrap">
            {new Date(test.date).toLocaleDateString("en-IN")}
          </td>

          <td className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-center whitespace-nowrap">

            <span className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-lg whitespace-nowrap">
              {test.totalMarks}
            </span>

          </td>

        </tr>

      ))}

    </tbody>
      </table>
      </div>
      </div>
    </>
  );
}

function ResultsPage({ search }) {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [students, setStudents] = useState([]);
  const role = localStorage.getItem("role");
  const isReadOnly = role === "teacher";

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const res = await api.get("/tests", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setTests(res.data);
    } catch (err) {
      alert("Failed to load tests");
    }
  };

  const loadStudents = async (testId) => {
  try {
    const res = await api.get(`/results/${testId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setStudents(res.data);

  } catch (err) {
    alert("Failed to load students");
  }
};

const saveResults = async () => {
  try {
    await api.post(`/results/${selectedTest}`, students, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    alert("Results Saved Successfully");

  } catch (err) {
    alert("Failed to Save Results");
  }
};

const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase()) ||
  student.rollNo.toString().includes(search) ||
  (student.remarks || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  student.marks.toString().includes(search)
);

  return (
  <>
      <div className="mb-6 sm:mb-8 flex flex-col items-center text-center">

  <h1 className="w-full text-center text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg leading-tight break-words">
    📄 Result Management
  </h1>

  <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm sm:text-base text-slate-400 max-w-2xl w-full">
    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]"></span>

    <span className="break-words">
      Enter marks and publish student results
    </span>
  </p>

</div>

      <div className="mb-6 sm:mb-8 w-full max-w-md">

 <label className="mb-2 block text-sm font-medium text-slate-300 text-center sm:text-left">
  Select Test
</label>

<select
  value={selectedTest}
  onChange={(e) => {
    setSelectedTest(e.target.value);

    if (e.target.value) {
      loadStudents(e.target.value);
    }
  }}
  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
>
        <option value="">Select Test</option>

        {tests.map((test) => (
          <option key={test._id} value={test._id}>
            {test.testName}
          </option>
        ))}
      </select>
      </div>
     {students.length > 0 && (
  <>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg sm:text-xl font-semibold text-white">
        📋 Student Results
      </h2>

      <div className="text-sm text-slate-400">
        Total Students: <span className="font-semibold text-white">{filteredStudents.length}</span>
      </div>
    </div>

    <div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,0.10)]">
  <div className="w-full overflow-x-auto touch-pan-x">
    <table className="min-w-[820px] w-full border-collapse text-sm text-slate-200">
      

          <thead className="sticky top-0 z-10 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white shadow-[0_8px_30px_rgba(34,211,238,0.18)]">
  <tr>
    <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-[0.22em]">
      🎓 Roll
    </th>

    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.22em]">
      👤 Student
    </th>

    <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-[0.22em]">
      📝 Marks
    </th>

    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-[0.22em]">
      💬 Remarks
    </th>
  </tr>
</thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student.studentId}
                className={`
  border-b border-white/5
  transition-colors duration-200
  hover:bg-cyan-500/5
  hover:border-cyan-400/20
  ${index % 2 === 0 ? "bg-slate-900/40" : "bg-slate-800/25"}
`}
              >

                <td className="px-3 py-3 text-center font-semibold text-cyan-300 align-middle">
                  #{student.rollNo}
                </td>

                <td className="px-4 py-3 align-middle">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white" title={student.name}>
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-400">Student</p>
                  </div>
                </td>

                <td className="px-3 py-3 text-center align-middle">
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={student.marks}
                    onChange={(e) => {
                      const temp = [...students];
                      temp[index].marks = e.target.value;
                      setStudents(temp);
                    }}
                    className="h-10 w-24 rounded-xl border border-cyan-400/20 bg-slate-950/80 px-3 text-center text-sm font-semibold text-white outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </td>

                <td className="px-4 py-3 align-middle">
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={student.remarks}
                    onChange={(e) => {
                      const temp = [...students];
                      temp[index].remarks = e.target.value;
                      setStudents(temp);
                    }}
                    className="h-10 w-full min-w-[200px] rounded-xl border border-violet-400/15 bg-slate-950/80 px-4 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

    {!isReadOnly && (
      <div className="mt-5 flex justify-center sm:justify-end">
        {isReadOnly && (<button
          onClick={saveResults}
          className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 px-5 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_0_30px_rgba(236,72,153,.35)] transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_45px_rgba(236,72,153,.55)] whitespace-nowrap"
        >
          💾 Save Results
        </button>)}
      </div>
    )}
  </>
)}
    </>
  );
}

export {
  StudentsPage,
  TestsPage,
  ResultsPage,
  DashboardPage,
};