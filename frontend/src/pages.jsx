import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { User, Lock, Eye, EyeOff, Users, FileText, TrendingUp, Trophy, BarChart4, LayoutDashboard, ClipboardList, LogOut,GraduationCap,Calendar} from "lucide-react";

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

  const login = async () => {
    try {
      const res = await api.post("/login", {
  username,
  password,
  role, // "student", "admin", or "teacher"
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

  /*
   * Cyberpunk background particles.
   * These are generated once so React does not recreate them
   * every time the component renders.
   */

  const cyberParticles = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 61) % 100}%`,
    size: i % 9 === 0 ? 4 : i % 4 === 0 ? 3 : 2,
    color:
      i % 3 === 0
        ? "cyan"
        : i % 3 === 1
        ? "violet"
        : "pink",
    duration: `${5 + (i % 8)}s`,
    delay: `${-(i % 10)}s`,
  }));

  /*
   * Falling cyber snow / digital particles.
   */

  const cyberSnow = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left: `${(i * 29) % 100}%`,
    size: i % 7 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
    duration: `${7 + (i % 9)}s`,
    delay: `${-(i % 12)}s`,
    drift: `${-80 + ((i * 47) % 160)}px`,
    color:
      i % 4 === 0
        ? "cyan"
        : i % 4 === 1
        ? "violet"
        : i % 4 === 2
        ? "pink"
        : "blue",
  }));

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#081321] px-4 py-8">

      {/* =========================================================
          DEEP CYBERPUNK NIGHT SKY
         ========================================================= */}

      <div className="absolute inset-0 bg-[linear-gradient(135deg,#07111f_0%,#0a1627_35%,#11152c_65%,#07111f_100%)]" />

      {/* =========================================================
          MOVING NEBULA
         ========================================================= */}

      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.15] blur-[130px] animate-[nebulaOne_12s_ease-in-out_infinite]" />

      <div className="absolute -right-40 -top-20 h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.14] blur-[140px] animate-[nebulaTwo_15s_ease-in-out_infinite]" />

      <div className="absolute -bottom-44 left-[5%] h-[32rem] w-[32rem] rounded-full bg-blue-500/[0.13] blur-[145px] animate-[nebulaThree_17s_ease-in-out_infinite]" />

      <div className="absolute -bottom-44 right-[4%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/[0.11] blur-[145px] animate-[nebulaFour_14s_ease-in-out_infinite]" />

      {/* =========================================================
          CENTER AURA
         ========================================================= */}

      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.045] blur-[130px] animate-pulse" />

      {/* =========================================================
          CYBER GRID
         ========================================================= */}

      <div
        className="absolute inset-[-100px] opacity-30 animate-[gridMove_22s_linear_infinite]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* =========================================================
          STARFIELD
         ========================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {cyberParticles.map((particle) => (
          <span
            key={particle.id}
            className={`absolute rounded-full animate-[starFloat_var(--duration)_ease-in-out_var(--delay)_infinite] ${
              particle.color === "cyan"
                ? "bg-cyan-300 shadow-[0_0_12px_3px_rgba(34,211,238,0.75)]"
                : particle.color === "violet"
                ? "bg-violet-300 shadow-[0_0_12px_3px_rgba(139,92,246,0.75)]"
                : "bg-fuchsia-300 shadow-[0_0_12px_3px_rgba(217,70,239,0.70)]"
            }`}
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              "--duration": particle.duration,
              "--delay": particle.delay,
            }}
          />
        ))}

      </div>

      {/* =========================================================
          CYBER SNOW
         ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {cyberSnow.map((flake) => (
          <span
            key={flake.id}
            className={`absolute top-[-20px] rounded-full animate-[snowfall_var(--duration)_linear_var(--delay)_infinite] ${
              flake.color === "cyan"
                ? "bg-cyan-200 shadow-[0_0_10px_3px_rgba(34,211,238,0.7)]"
                : flake.color === "violet"
                ? "bg-violet-200 shadow-[0_0_10px_3px_rgba(139,92,246,0.7)]"
                : flake.color === "pink"
                ? "bg-pink-200 shadow-[0_0_10px_3px_rgba(236,72,153,0.7)]"
                : "bg-blue-200 shadow-[0_0_10px_3px_rgba(59,130,246,0.7)]"
            }`}
            style={{
              left: flake.left,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              "--duration": flake.duration,
              "--delay": flake.delay,
              "--drift": flake.drift,
            }}
          />
        ))}

      </div>

      {/* =========================================================
          DIAGONAL DIGITAL LIGHT
         ========================================================= */}

      <div className="absolute left-[-30%] top-[-30%] h-[160%] w-[18%] rotate-[20deg] bg-gradient-to-r from-transparent via-cyan-300/[0.035] to-transparent blur-2xl animate-[lightSweep_14s_linear_infinite]" />

      <div className="absolute right-[-30%] top-[-30%] h-[160%] w-[15%] rotate-[-20deg] bg-gradient-to-r from-transparent via-fuchsia-300/[0.03] to-transparent blur-2xl animate-[lightSweepReverse_18s_linear_infinite]" />

      {/* =========================================================
          SCANLINES
         ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "100% 6px",
        }}
      />

      {/* =========================================================
          LOGIN AREA
         ========================================================= */}

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">

        {/* =======================================================
            CARD OUTER AURA
           ======================================================= */}

        <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-cyan-400/[0.13] via-violet-500/[0.09] to-fuchsia-500/[0.12] blur-2xl" />

        {/* =======================================================
            ANIMATED BORDER
           ======================================================= */}

        <div className="absolute -inset-[2px] overflow-hidden rounded-[2rem]">

          <div className="absolute inset-[-100%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_220deg,#22d3ee_255deg,#8b5cf6_290deg,#ec4899_320deg,transparent_355deg)]" />

        </div>

        {/* =======================================================
            LOGIN CARD
           ======================================================= */}

        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.13] bg-[#0d1a2b]/[0.94] p-6 shadow-[0_25px_100px_rgba(0,0,0,0.45),0_0_35px_rgba(34,211,238,0.13),0_0_70px_rgba(139,92,246,0.10)] backdrop-blur-2xl sm:p-8">

          {/* Card inner glow */}

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_35%)]" />

          {/* =====================================================
              CORNER DETAILS
             ===================================================== */}

          <div className="absolute left-5 top-5 h-6 w-6 border-l border-t border-cyan-300/50" />

          <div className="absolute right-5 top-5 h-6 w-6 border-r border-t border-violet-300/50" />

          <div className="absolute bottom-5 left-5 h-6 w-6 border-b border-l border-violet-300/40" />

          <div className="absolute bottom-5 right-5 h-6 w-6 border-b border-r border-cyan-300/50" />

          {/* =====================================================
              TOP LIGHT
             ===================================================== */}

          <div className="absolute left-[12%] right-[12%] top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)]" />

          {/* =====================================================
              LOGO
             ===================================================== */}

          <div className="relative mb-6 flex justify-center">

            <div className="absolute h-28 w-28 rounded-full bg-cyan-400/[0.10] blur-2xl animate-pulse" />

            <div className="absolute h-24 w-24 rounded-full bg-violet-500/[0.09] blur-xl" />

            <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-cyan-300/40 bg-[#0b1b2e]/95 shadow-[0_0_25px_rgba(34,211,238,0.30),0_0_55px_rgba(34,211,238,0.12),inset_0_0_25px_rgba(34,211,238,0.07)]">

              <div className="absolute inset-[6px] rounded-full border border-violet-400/20" />

              <div className="absolute inset-[12px] rounded-full border border-cyan-400/10" />

              <GraduationCap
                size={42}
                className="relative text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
              />

            </div>
          </div>

          {/* =====================================================
              TITLE
             ===================================================== */}

          <h1 className="relative text-center text-2xl font-black uppercase tracking-[0.18em] leading-[1.25] break-words bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.45)] sm:text-3xl">

            PRAYAS CHARITABLE TRUST

          </h1>

          {/* =====================================================
              SUBTITLE
             ===================================================== */}

          <p className="relative mt-4 text-center text-sm text-slate-300 sm:text-base">

            WELCOME TO PRAYAS STUDENT PORTAL CLASS 10th

          </p>

          {/* =====================================================
              USERNAME
             ===================================================== */}

          <div className="relative mt-8 mb-5">

            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/40 via-blue-400/20 to-violet-500/30 opacity-0 blur-sm transition-all duration-300 focus-within:opacity-100" />

            <div className="relative">

              <User
                size={20}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-cyan-300 drop-shadow-[0_0_7px_rgba(34,211,238,0.9)]"
              />

              <input
                type="text"
                placeholder="Username / Student Code"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-cyan-300/20 bg-[#081524]/90 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 hover:border-cyan-300/40 focus:border-cyan-300/60 focus:bg-[#0a1929] focus:ring-2 focus:ring-cyan-400/[0.10] focus:shadow-[0_0_25px_rgba(34,211,238,0.18),inset_0_0_20px_rgba(34,211,238,0.04)]"
              />

            </div>
          </div>

          {/* =====================================================
              PASSWORD
             ===================================================== */}

          <div className="relative mb-6">

            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-400/30 to-fuchsia-500/30 opacity-0 blur-sm transition-all duration-300 focus-within:opacity-100" />

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-violet-300 drop-shadow-[0_0_7px_rgba(139,92,246,0.9)]"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-violet-300/20 bg-[#081524]/90 py-3.5 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition-all duration-300 hover:border-violet-300/40 focus:border-violet-300/60 focus:bg-[#0a1929] focus:ring-2 focus:ring-violet-400/[0.10] focus:shadow-[0_0_25px_rgba(139,92,246,0.18),inset_0_0_20px_rgba(139,92,246,0.04)]"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* =====================================================
              LOGIN BUTTON
             ===================================================== */}

          <button
            onClick={login}
            className="group relative w-full overflow-hidden rounded-2xl border border-cyan-300/40 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_25px_rgba(34,211,238,0.35),0_0_55px_rgba(99,102,241,0.18)] transition-all duration-300 hover:scale-[1.015] hover:border-cyan-200/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.55),0_0_70px_rgba(139,92,246,0.30)] active:scale-[0.99] sm:text-base"
          >

            {/* Shine */}

            <div className="absolute inset-y-0 left-[-100%] w-1/2 skew-x-[-20deg] bg-white/25 blur-md transition-all duration-700 group-hover:left-[130%]" />

            {/* Hover glow */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative flex items-center justify-center gap-3">

              <span className="text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                ⚡
              </span>

              <span>
                Login
              </span>

            </span>

          </button>

          {/* =====================================================
              BOTTOM DECORATION
             ===================================================== */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <span className="h-[2px] w-10 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

            <span className="h-[2px] w-10 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.9)]" />

            <span className="h-[2px] w-10 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />

          </div>

        </div>
      </div>

      {/* =========================================================
          ANIMATION DEFINITIONS
         ========================================================= */}

      <style>
        {`
          @keyframes gridMove {
            0% {
              transform: translate3d(0, 0, 0);
            }

            100% {
              transform: translate3d(45px, 45px, 0);
            }
          }

          @keyframes starFloat {
            0%, 100% {
              opacity: 0.15;
              transform: scale(0.7) translateY(0);
            }

            50% {
              opacity: 1;
              transform: scale(1.5) translateY(-8px);
            }
          }

          @keyframes snowfall {
            0% {
              transform: translate3d(0, -30px, 0) rotate(0deg);
              opacity: 0;
            }

            10% {
              opacity: 0.9;
            }

            50% {
              transform: translate3d(
                var(--drift),
                50vh,
                0
              ) rotate(180deg);
              opacity: 0.65;
            }

            90% {
              opacity: 0.8;
            }

            100% {
              transform: translate3d(
                calc(var(--drift) * -0.4),
                110vh,
                0
              ) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes nebulaOne {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(80px, 60px, 0) scale(1.1);
            }
          }

          @keyframes nebulaTwo {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(-70px, 70px, 0) scale(1.08);
            }
          }

          @keyframes nebulaThree {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(90px, -60px, 0);
            }
          }

          @keyframes nebulaFour {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(-80px, -60px, 0);
            }
          }

          @keyframes lightSweep {
            0% {
              transform: translateX(-120%) rotate(20deg);
            }

            100% {
              transform: translateX(650%) rotate(20deg);
            }
          }

          @keyframes lightSweepReverse {
            0% {
              transform: translateX(120%) rotate(-20deg);
            }

            100% {
              transform: translateX(-650%) rotate(-20deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>

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
      { id: "quizzes", title: "Quizzes", icon: <ClipboardList size={20} />},
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
          {role !== "teacher" && page === "quizzes" && <QuizzesPage />}
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

<div className="p-4 lg:p-6 flex flex-col h-full">
  {/* Everything currently inside the sidebar */}

    {/* Sidebar */}
    <aside className="relative z-10 w-full lg:w-64 shrink-0 bg-slate-950/80 backdrop-blur-3xl border-b lg:border-b-0 lg:border-r border-cyan-400/20 shadow-[0_0_60px_rgba(34,211,238,0.12)] flex flex-col">
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

  <p className="mt-1 text-lg sm:text-xl lg:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] break-words leading-tight">
    {localStorage.getItem("studentName")}
  </p>

</div>


    <div className="rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(34,211,238,0.25)]">

      <p className="text-sm uppercase tracking-wider text-cyan-200">
        Roll Number
      </p>

      <p className="mt-1 text-lg sm:text-xl lg:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] break-words">
        {localStorage.getItem("rollNo")}
      </p>

    </div>


    <div className="rounded-2xl border border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(168,85,247,0.25)]">

      <p className="text-sm uppercase tracking-wider text-violet-200">
        Student Code
      </p>

      <p className="mt-1 text-lg sm:text-xl lg:text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] break-words">
        {localStorage.getItem("studentCode")}
      </p>

    </div>

  </div>

</div>
      {/* Navigation */}
      <ul className="space-y-3 flex-1">
        {
          [ "dashboard","quizzes","results","performance"].map((item) => {
            const icons = {
            dashboard: "🏠",
            quizzes: "🧠",
            results: "📊",
            performance: "📈",
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
    </aside>
    </div>

    {/* Main */}
    <main className="relative flex-1 overflow-y-auto bg-[#02030a] p-4 sm:p-6 lg:p-8 touch-pan-y">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full overflow-x-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-cyan-400/10 bg-slate-950/45 p-4 sm:p-6 lg:p-8 shadow-[0_0_60px_rgba(0,0,0,0.45)] touch-pan-y">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">


        </div>

        {page === "dashboard" && <StudentHome />}
        {page === "quizzes" && <StudentQuizHome />}
        {page === "results" && <StudentResults />}
        {page === "performance" && <StudentPerformance />}
        
      </div>

      {/* Neon Glow Effects */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/20 blur-[180px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[170px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-violet-500/20 blur-[150px] animate-pulse" />
    </main>
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

  <div className="w-full overflow-x-auto touch-auto">

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

function StudentQuizHome() {
const [quizzes, setQuizzes] = useState([]);
const [activeQuiz, setActiveQuiz] = useState(null);
const [questions, setQuestions] = useState([]);
const [answers, setAnswers] = useState({});
const [timeLeft, setTimeLeft] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [attemptId, setAttemptId] = useState(null);
const [result, setResult] = useState(null);
const [submitting, setSubmitting] = useState(false);

useEffect(() => {
  if (!activeQuiz) return;

  // Push a new history state
  window.history.pushState(null, "", window.location.href);

  const handleBack = () => {
    window.history.pushState(null, "", window.location.href);
    alert("You cannot leave the quiz until it is submitted.");
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, [activeQuiz]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await api.get("/student/quizzes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setQuizzes(res.data);
    } catch {
      alert("Failed to load quizzes");
    }
  };

const grouped = quizzes.reduce((acc, quiz) => {
  if (!acc[quiz.subject]) acc[quiz.subject] = [];

  acc[quiz.subject].push(quiz);

  // Sort chapters within each subject
  acc[quiz.subject].sort((a, b) =>
    a.chapter.localeCompare(b.chapter, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  return acc;
}, {});

  const startQuiz = async (quiz) => {
  try {
    const res = await api.get(`/student/quizzes/${quiz._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setActiveQuiz(quiz);
    setQuestions(res.data.questions);
    setTimeLeft(res.data.remainingTime);
    setCurrentQuestion(0);
    setAttemptId(res.data.attempt._id);

const restoredAnswers = {};

(res.data.attempt.answers || []).forEach((a, index) => {
  restoredAnswers[index] = a.selectedAnswer;
});

setAnswers(restoredAnswers);
  } catch {
    alert("Failed to start quiz");
  }
};

useEffect(() => {
  if (!activeQuiz || timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        submitQuiz();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [activeQuiz]);

const submitQuiz = async () => {
  if (submitting) return;

  setSubmitting(true);

  try {
    const res = await api.post(
  `/student/quizzes/${activeQuiz._id}/submit`,
  {
    attemptId,
    answers,
  },
  {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }
);

    setResult(res.data);
    setActiveQuiz(null);
    setAttemptId(null);
  } catch {
    alert("Failed to submit quiz");
  } finally {
    setSubmitting(false);
  }
};


  if (result) {
  return (
    <div className="min-h-screen bg-[#02030a] p-6 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-[2rem] border border-cyan-400/20 bg-[#0B1220]/90 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,.12)]">

          <div className="text-center">

            <div className="text-6xl mb-4">🏆</div>

            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              Quiz Completed
            </h1>

            <p className="mt-3 text-slate-400">
              Here's your performance.
            </p>

          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="rounded-2xl bg-cyan-500/10 p-5 text-center">
              <p className="text-3xl font-black text-cyan-300">
                {result.score}
              </p>
              <p className="text-slate-400">
                Score
              </p>
            </div>

            <div className="rounded-2xl bg-violet-500/10 p-5 text-center">
              <p className="text-3xl font-black text-violet-300">
                {result.totalMarks}
              </p>
              <p className="text-slate-400">
                Total
              </p>
            </div>

            <div className="rounded-2xl bg-pink-500/10 p-5 text-center">
              <p className="text-3xl font-black text-pink-300">
                {result.percentage.toFixed(1)}%
              </p>
              <p className="text-slate-400">
                Percentage
              </p>
            </div>

          </div>

          <div className="mt-10 space-y-4">

            {result.analysis.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-5 ${
                  item.correct
                    ? "border-emerald-400/20 bg-emerald-500/10"
                    : "border-rose-400/20 bg-rose-500/10"
                }`}
              >

                <div className="mb-3 flex items-center justify-between">

                  <span className="font-bold">
                    Question {index + 1}
                  </span>

                  <span>
                    {item.correct ? "✅ Correct" : "❌ Wrong"}
                  </span>

                </div>

                <p className="text-white">
                  {item.question}
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  Marks: {item.marks}
                </p>

              </div>
            ))}

          </div>

          <button
            onClick={() => {
              setResult(null);
              loadQuizzes();
            }}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 py-4 text-lg font-bold text-white"
          >
            Back to Quizzes
          </button>

        </div>
      </div>
    </div>
  );
}

if (activeQuiz) {
  const q = questions[currentQuestion];

  return (
    <div className="fixed inset-0 z-[100] bg-[#02030a] text-white overflow-hidden">
      <div className="flex h-screen">

        {/* Desktop Question Palette */}
        <div className="hidden lg:flex w-28 flex-col border-r border-cyan-400/10 bg-slate-950/80 p-4">
          <div className="mb-4 text-center text-cyan-300 font-bold">
            Questions
          </div>

          <div className="grid grid-cols-2 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`h-10 rounded-xl text-sm font-bold transition ${
                  currentQuestion === i
                    ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-black"
                    : answers[i] !== undefined
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Header */}
          <div className="border-b border-cyan-400/10 bg-[#0B1220]/90 px-4 py-4 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
                  {activeQuiz.quizName}
                </h1>

                <p className="text-slate-400">{activeQuiz.chapter}</p>
              </div>

              <div
                className={`rounded-2xl border px-5 py-3 text-center ${
                  timeLeft <= 60
                    ? "border-red-500/40 bg-red-500/20 animate-pulse"
                    : timeLeft <= 300
                    ? "border-orange-400/40 bg-orange-500/15"
                    : "border-cyan-400/30 bg-cyan-500/10"
                }`}
              >
                <div className="text-xs text-slate-400">
                  Answered {Object.keys(answers).length}/{questions.length}
                </div>

                <div className="text-2xl font-black text-rose-300">
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </div>

                <div className="text-xs text-slate-400">Time Left</div>
              </div>
            </div>
          </div>

          {/* Mobile Palette */}
          <div className="lg:hidden border-b border-cyan-400/10 bg-[#0B1220]/70 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`h-10 min-w-10 rounded-xl text-sm font-bold ${
                    currentQuestion === i
                      ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-black"
                      : answers[i] !== undefined
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="border-b border-cyan-400/10 bg-[#0B1220]/60 px-6 py-3">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Progress</span>
              <span>{Object.keys(answers).length}/{questions.length}</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all"
                style={{
                  width: `${
                    questions.length
                      ? (Object.keys(answers).length / questions.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Question Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-12">
            {q && (
              <div className="mx-auto w-full max-w-5xl">
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-xl bg-cyan-500/10 px-3 py-2 text-cyan-300">
                    Question {currentQuestion + 1}/{questions.length}
                  </span>

                  <span className="rounded-xl bg-violet-500/10 px-3 py-2 text-violet-300">
                    {q.marks} Marks
                  </span>
                </div>

                <div className="rounded-[2rem] border border-cyan-400/15 bg-[#0B1220]/90 p-6 sm:p-8 shadow-[0_0_35px_rgba(34,211,238,.12)]">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-relaxed text-white">
                    {q.questionText}
                  </h2>

                  <div className="mt-8 space-y-4">
                    {q.options.map((option, i) => {
                      const selected =
                        q.type === "MCQ"
                          ? answers[currentQuestion] === i
                          : (answers[currentQuestion] || []).includes(i);

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (q.type === "MCQ") {
                              setAnswers({
                                ...answers,
                                [currentQuestion]: i,
                              });
                            } else {
                              const current =
                                answers[currentQuestion] || [];

                              const updated = current.includes(i)
                                ? current.filter((x) => x !== i)
                                : [...current, i];

                              setAnswers({
                                ...answers,
                                [currentQuestion]: updated,
                              });
                            }
                          }}
                          className={`w-full rounded-2xl border p-5 text-left transition ${
                            selected
                              ? "border-cyan-400 bg-cyan-500/15"
                              : "border-slate-700 bg-slate-800/60 hover:border-cyan-400/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                                selected
                                  ? "border-cyan-400 bg-cyan-400 text-black"
                                  : "border-slate-500 text-slate-400"
                              }`}
                            >
                              {q.type === "MCQ"
                                ? selected
                                  ? "◉"
                                  : "○"
                                : selected
                                ? "✓"
                                : "☐"}
                            </div>

                            <span>
                              <span className="mr-2 font-bold">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-cyan-400/10 bg-[#0B1220]/80 px-6 py-4">
            <div className="flex justify-between">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((p) => p - 1)}
                className="rounded-xl border border-cyan-400/20 px-5 py-3 text-cyan-300 disabled:opacity-40"
              >
                ← Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={submitQuiz}
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 font-bold text-white"
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion((p) => p + 1)}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 px-8 py-3 font-bold text-white"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
          🧠 Quiz Center
        </h1>

        <p className="mt-3 text-slate-400">
          Choose a subject and start practicing.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([subject, subjectQuizzes]) => (
          <div key={subject}>
            <h2 className="mb-4 text-2xl font-bold text-white">
              {subject}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {subjectQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-[#0B1220]/95 via-[#081224]/95 to-[#140824]/95 p-5 shadow-[0_0_30px_rgba(34,211,238,.08)] transition hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(34,211,238,.15)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      Class {quiz.className}
                    </span>

                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
                      {quiz.timeLimit} min
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {quiz.quizName}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {quiz.chapter}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-slate-900/60 p-3">
                      <p className="text-lg font-black text-cyan-300">
                        {quiz.totalQuestions}
                      </p>
                      <p className="text-xs text-slate-400">
                        Questions
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-900/60 p-3">
                      <p className="text-lg font-black text-violet-300">
                        {quiz.marksPerQuestion}
                      </p>
                      <p className="text-xs text-slate-400">
                        Marks
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-900/60 p-3">
                      <p className="text-lg font-black text-emerald-300">
                        {quiz.totalQuestions * quiz.marksPerQuestion}
                      </p>
                      <p className="text-xs text-slate-400">
                        Total
                      </p>
                    </div>
                  </div>

                  <button
  onClick={() => startQuiz(quiz)}
  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 py-3 font-bold text-white shadow-[0_0_25px_rgba(34,211,238,.35)] transition hover:scale-[1.02]"
>
  🚀 Start Quiz
</button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {quizzes.length === 0 && (
          <div className="rounded-3xl border border-cyan-400/15 bg-[#0B1220]/80 p-10 text-center backdrop-blur-xl">
            <div className="text-5xl mb-3">📚</div>
            <h3 className="text-2xl font-bold text-white">
              No Quizzes Available
            </h3>
            <p className="mt-2 text-slate-400">
              Your teacher hasn't published any quizzes yet.
            </p>
          </div>
        )}
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

      const sortedResults = [...res.data].sort(
  (a, b) => new Date(b.testId?.date) - new Date(a.testId?.date)
);

setResults(sortedResults);
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

  <div className="w-full overflow-x-auto touch-auto">

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

  <div className="w-full overflow-x-auto touch-auto">

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
        placeholder={editingId ? "New Password (leave blank to keep current)" : "Password"}
        type="password"
        className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
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
  <div className="w-full overflow-x-auto touch-auto">
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

    // Sort by latest date first
    const sortedTests = [...res.data].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setTests(sortedTests);

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

  <div className="w-full overflow-x-auto touch-auto">

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

function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [managingQuiz, setManagingQuiz] = useState(null);
const [attempts, setAttempts] = useState([]);
const [selectedQuiz, setSelectedQuiz] = useState(null);
const [loadingAttempts, setLoadingAttempts] = useState(false);

  const [form, setForm] = useState({
    quizName: "",
    className: "",
    subject: "",
    chapter: "",
    totalQuestions: "",
    timeLimit: "",
    marksPerQuestion: "",
  });

const loadAttempts = async (quiz) => {
  try {
    setLoadingAttempts(true);

    const res = await api.get(`/quizzes/${quiz._id}/attempts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setAttempts(res.data);
    setSelectedQuiz(quiz);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to load results");
  } finally {
    setLoadingAttempts(false);
  }
};

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await api.get("/quizzes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setQuizzes(res.data);
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to load quizzes"
      );
    }
  };

  const createQuiz = async () => {
    try {
      if (
        !form.quizName ||
        !form.className ||
        !form.subject ||
        !form.chapter ||
        !form.totalQuestions ||
        !form.timeLimit ||
        !form.marksPerQuestion
      ) {
        alert("Please fill all fields");
        return;
      }

      await api.post("/quizzes", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      alert("Quiz created successfully");

      setShowForm(false);

      setForm({
        quizName: "",
        className: "",
        subject: "",
        chapter: "",
        totalQuestions: "",
        timeLimit: "",
        marksPerQuestion: "",
      });

      loadQuizzes();
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to create quiz"
      );
    }
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;

    try {
      await api.delete(`/quizzes/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      loadQuizzes();
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete quiz"
      );
    }
  };
  

  const publishQuiz = async (id) => {
    try {
      await api.put(
        `/quizzes/${id}/publish`,
        {},
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Quiz published successfully");

      loadQuizzes();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Quiz cannot be published"
      );
    }
  };

  

  return (
    <>
      {/* Header */}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent leading-tight">
          🧠 Quiz Management
        </h1>

        <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm sm:text-base text-slate-400">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

          <span>
            Create and manage online quizzes
          </span>
        </p>
      </div>

      {/* Create Button */}

      <div className="mb-6 flex justify-center sm:justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,.35)] transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105"
        >
          ➕ Create Quiz
        </button>
      </div>

      {/* Create Quiz Modal */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#0B1220]/95 p-5 sm:p-7 shadow-[0_0_60px_rgba(34,211,238,.15)]">

            <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-white text-center">
              Create New Quiz
            </h2>

            <div className="space-y-4 max-h-[55vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/30 p-4">

              <input
                placeholder="Quiz Name"
                value={form.quizName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quizName: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

              <input
                placeholder="Class"
                value={form.className}
                onChange={(e) =>
                  setForm({
                    ...form,
                    className: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

              <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subject: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

              <input
                placeholder="Chapter"
                value={form.chapter}
                onChange={(e) =>
                  setForm({
                    ...form,
                    chapter: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

              <input
                type="number"
                min="1"
                placeholder="Questions required for quiz"
                value={form.totalQuestions}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalQuestions: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

              <input
                type="number"
                min="1"
                placeholder="Time Limit (minutes)"
                value={form.timeLimit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    timeLimit: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

              <input
                type="number"
                min="1"
                placeholder="Marks per Question"
                value={form.marksPerQuestion}
                onChange={(e) =>
                  setForm({
                    ...form,
                    marksPerQuestion: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />

            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">

              <button
                onClick={() => setShowForm(false)}
                className="w-full sm:w-auto rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={createQuiz}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02]"
              >
                Create Quiz
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Quiz Table */}

      <div className="space-y-6">
  {quizzes.length === 0 ? (
    <div className="rounded-3xl border border-cyan-400/15 bg-[#0B1220]/80 p-10 text-center backdrop-blur-xl">
      <div className="text-5xl mb-3">🧠</div>
      <h3 className="text-2xl font-bold text-white">No Quizzes Yet</h3>
      <p className="mt-2 text-slate-400">
        Create your first quiz to get started.
      </p>
    </div>
  ) : (
    quizzes.map((quiz) => (
      <div
        key={quiz._id}
        className="group rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-[#0B1220]/95 via-[#081224]/95 to-[#140824]/95 p-6 backdrop-blur-2xl shadow-[0_0_35px_rgba(34,211,238,.10)] transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_50px_rgba(168,85,247,.18)]"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {quiz.quizName}
            </h2>

            <p className="mt-1 text-slate-400">
              {quiz.subject} • Class {quiz.className} • {quiz.chapter}
            </p>
          </div>

          <span
            className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold uppercase ${
              quiz.status === "published"
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                : "border-yellow-400/30 bg-yellow-500/10 text-yellow-300"
            }`}
          >
            {quiz.status}
          </span>

{quiz.publishedAt && (
  <div className="mt-3 flex items-center gap-2 text-sm text-cyan-300">
    <Calendar size={16} className="text-cyan-300" />
    <span>
      Published:{" "}
      {new Date(quiz.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </span>
  </div>
)}

        </div>
        
        
              

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-slate-900/70 to-slate-950/90 p-6 shadow-[0_0_20px_rgba(34,211,238,.08)] transition hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,.18)]">
            <p className="text-2xl">📚</p>
            <p className="mt-2 text-2xl font-black text-cyan-300">
              {quiz.totalQuestions}
            </p>
            <p className="text-xs text-slate-400 uppercase">
              Questions
            </p>
          </div>

          <div className="rounded-2xl border border-violet-400/10 bg-violet-500/5 p-4 text-center">
            <p className="text-2xl">⏱</p>
            <p className="mt-2 text-2xl font-black text-violet-300">
              {quiz.timeLimit}
            </p>
            <p className="text-xs text-slate-400 uppercase">
              Minutes
            </p>
          </div>

          <div className="rounded-2xl border border-pink-400/10 bg-pink-500/5 p-4 text-center">
            <p className="text-2xl">⭐</p>
            <p className="mt-2 text-2xl font-black text-pink-300">
              {quiz.marksPerQuestion}
            </p>
            <p className="text-xs text-slate-400 uppercase">
              Marks/Q
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/5 p-4 text-center">
            <p className="text-2xl">🏆</p>
            <p className="mt-2 text-2xl font-black text-emerald-300">
              {quiz.totalQuestions * quiz.marksPerQuestion}
            </p>
            <p className="text-xs text-slate-400 uppercase">
              Total Marks
            </p>
          </div>

        </div>

        {/* Action Buttons */}
<div className="mt-6 flex flex-wrap justify-end gap-3">
  {/* Manage Questions */}
  <button
    onClick={() => setManagingQuiz(quiz)}
    className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,.45)] hover:-translate-y-0.5"
  >
    ✏ Manage Questions
  </button>

  {/* Publish */}
  {quiz.status !== "published" && (
    <button
      onClick={() => publishQuiz(quiz._id)}
      className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-500/20 hover:shadow-[0_0_25px_rgba(16,185,129,.45)] hover:-translate-y-0.5"
    >
      🚀 Publish
    </button>
  )}

  {/* Delete */}
  <button
    onClick={() => deleteQuiz(quiz._id)}
    className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-300 transition-all duration-300 hover:border-rose-300 hover:bg-rose-500/20 hover:shadow-[0_0_25px_rgba(244,63,94,.45)] hover:-translate-y-0.5"
  >
    🗑 Delete
  </button>

  {/* View Results */}
  <button
    onClick={() => loadAttempts(quiz)}
    className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-300 transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/20 hover:shadow-[0_0_25px_rgba(168,85,247,.45)] hover:-translate-y-0.5"
  >
    📊 View Results
  </button>
</div>

      </div>
    ))
  )}
</div>
{managingQuiz && (
  <QuestionManager
    quiz={managingQuiz}
    onClose={() => {
      setManagingQuiz(null);
      loadQuizzes();
    }}
  />

  
)}
{selectedQuiz && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3">
    <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#0B1220]/95 shadow-[0_0_60px_rgba(34,211,238,.18)]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-400/10 px-6 py-5">
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
            {selectedQuiz.quizName}
          </h2>

          <p className="text-slate-400">
            {selectedQuiz.subject} • {selectedQuiz.chapter}
          </p>
        </div>

        <button
          onClick={() => setSelectedQuiz(null)}
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-300 hover:bg-red-500/20"
        >
          ✕ Close
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 border-b border-cyan-400/10 px-6 py-5 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900/50 p-4 text-center">
          <div className="text-2xl font-black text-cyan-300">
            {attempts.length}
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Attempts
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/50 p-4 text-center">
          <div className="text-2xl font-black text-violet-300">
            {selectedQuiz.totalQuestions}
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Questions
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/50 p-4 text-center">
          <div className="text-2xl font-black text-pink-300">
            {selectedQuiz.marksPerQuestion}
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Marks/Q
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/50 p-4 text-center">
          <div className="text-2xl font-black text-emerald-300">
            {selectedQuiz.totalQuestions * selectedQuiz.marksPerQuestion}
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Total Marks
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="max-h-[60vh] overflow-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">

          <thead className="sticky top-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white">
            <tr>
              <th className="px-4 py-3 text-center">Rank</th>
              <th className="px-4 py-3 text-center">Roll</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-center">Student Code</th>
              <th className="px-4 py-3 text-center">Score</th>
              <th className="px-4 py-3 text-center">Percentage</th>
              <th className="px-4 py-3 text-center">Submitted</th>
            </tr>
          </thead>

          <tbody>
            {attempts.map((a, index) => {
              const total =
                selectedQuiz.totalQuestions *
                selectedQuiz.marksPerQuestion;

              const percentage =
                total > 0
                  ? ((a.obtainedMarks / total) * 100).toFixed(1)
                  : "0.0";

              return (
                <tr
                  key={a._id}
                  className={`border-b border-slate-800 hover:bg-cyan-500/5 ${
                    index % 2 === 0
                      ? "bg-slate-900/40"
                      : "bg-slate-800/20"
                  }`}
                >
                  <td className="px-4 py-3 text-center font-bold text-cyan-300">
                    #{index + 1}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {a.studentId?.rollNo}
                  </td>

                  <td className="px-4 py-3 font-semibold text-white">
                    {a.studentId?.name}
                  </td>

                  <td className="px-4 py-3 text-center font-mono text-cyan-300">
                    {a.studentId?.studentCode}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="rounded-lg bg-cyan-500/10 px-3 py-1 font-bold text-cyan-300">
                      {a.obtainedMarks}/{total}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-lg px-3 py-1 font-bold ${
                        percentage >= 75
                          ? "bg-emerald-500/15 text-emerald-300"
                          : percentage >= 40
                          ? "bg-yellow-500/15 text-yellow-300"
                          : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      {a.percentage.toFixed(1)}%
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center text-slate-400">
                    {new Date(a.submittedAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

        {!loadingAttempts && attempts.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            <div className="mb-3 text-5xl">📭</div>
            <p className="text-lg">No student has submitted this quiz yet.</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
    </>
  );
}

function QuestionManager({ quiz, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    questionText: "",
    type: "MCQ",
    options: ["", "", "", ""],
    correctAnswers: [],
    marks: quiz.marksPerQuestion,
  });

useEffect(() => {
  loadQuestions();
}, [quiz._id]);

  const loadQuestions = async () => {
    try {
      const res = await api.get(`/quizzes/${quiz._id}/questions`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setQuestions(res.data);
    } catch {
      alert("Failed to load questions");
    }
  };

const saveQuestion = async () => {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    if (!editingId && questions.length >= quiz.totalQuestions) {
  return alert(`Maximum ${quiz.totalQuestions} questions allowed.`);
}

    if (editingId) {
      await api.put(`/questions/${editingId}`, form, { headers });

      alert("Question updated successfully");
    } else {
      await api.post(`/quizzes/${quiz._id}/questions`, form, {
        headers,
      });

      alert("Question added successfully");
    }

setEditingId(null);

setForm({
  questionText: "",
  type: "MCQ",
  options: ["", "", "", ""],
  correctAnswers: [],
  marks: quiz.marksPerQuestion,
});

    loadQuestions();
  } catch (err) {
    alert(err.response?.data?.message || "Failed");
  }
};

const deleteQuestion = async (id) => {
  if (!window.confirm("Delete this question?")) return;

  try {
    await api.delete(`/questions/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    loadQuestions();
  } catch {
    alert("Failed to delete question");
  }
};

const editQuestion = (question) => {
  setEditingId(question._id);

  setForm({
    questionText: question.questionText,
    type: question.type,
    options: [...question.options],
    correctAnswers: [...question.correctAnswers],
    marks: question.marks,
  });

  // Smooth scroll to editor
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

return (
  <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md p-2 sm:p-4">

    <div className="mx-auto flex h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#0B1220]/95 shadow-[0_0_70px_rgba(34,211,238,.15)]">

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0B1220]/95 px-6 py-5 backdrop-blur-xl">

        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            {quiz.quizName}
          </h2>

          <p className="mt-1 text-slate-400">
            {quiz.subject} • Class {quiz.className} • {quiz.chapter}
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          ✕
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">

    {/* Left - Editor */}
    <div className="rounded-3xl border border-cyan-400/10 bg-slate-900/40 p-5 backdrop-blur-xl">

      {/* Progress */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h3 className="text-2xl font-bold text-white">
            Question Editor
          </h3>

          <p className="text-slate-400">
            Create MCQ or MSQ questions
          </p>
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.25)]">
          <div className="text-center">
            <div className="text-xl font-black">
              {questions.length}
            </div>
            <div className="text-[10px] uppercase">
              Added
            </div>
          </div>
        </div>

      </div>

      {/* Question */}

      <textarea
        placeholder="Enter your question..."
        rows={3}
        value={form.questionText}
        onChange={(e) =>
          setForm({
            ...form,
            questionText: e.target.value,
          })
        }
        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
      />

      {/* MCQ MSQ Pills */}

      <div className="my-5 flex gap-3">

        {["MCQ", "MSQ"].map((type) => (

          <button
            key={type}
            onClick={() =>
              setForm({
                ...form,
                type,
                correctAnswers: [],
              })
            }
            className={`rounded-full px-5 py-2 font-semibold transition ${
              form.type === type
                ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-[0_0_20px_rgba(34,211,238,.35)]"
                : "border border-slate-700 text-slate-300 hover:border-cyan-400"
            }`}
          >
            {type}
          </button>

        ))}

      </div>

      {/* Options */}

      <div className="space-y-3">

        {form.options.map((option, index) => (

          <div key={index} className="flex items-center gap-3">

            {form.type === "MCQ" ? (

              <input
                type="radio"
                checked={form.correctAnswers[0] === index}
                onChange={() =>
                  setForm({
                    ...form,
                    correctAnswers: [index],
                  })
                }
                className="h-5 w-5 accent-cyan-400"
              />

            ) : (

              <input
                type="checkbox"
                checked={form.correctAnswers.includes(index)}
                onChange={(e) => {
                  let answers = [...form.correctAnswers];

                  if (e.target.checked) answers.push(index);
                  else answers = answers.filter((a) => a !== index);

                  setForm({
                    ...form,
                    correctAnswers: answers,
                  });
                }}
                className="h-5 w-5 accent-cyan-400"
              />

            )}

            <input
              value={option}
              placeholder={`Option ${index + 1}`}
              onChange={(e) => {
                const temp = [...form.options];

                temp[index] = e.target.value;

                setForm({
                  ...form,
                  options: temp,
                });
              }}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

        ))}

      </div>

      <button
  onClick={saveQuestion}
  disabled={!editingId && questions.length >= quiz.totalQuestions}
  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 py-3 text-lg font-bold text-white shadow-[0_0_30px_rgba(168,85,247,.35)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
>
  {editingId
    ? "💾 Update Question"
    : questions.length >= quiz.totalQuestions
    ? "🚫 Question Limit Reached"
    : "➕ Add Question"}
</button>

    </div>

    {/* Right - Question Bank */}

    <div className="rounded-3xl border border-violet-400/10 bg-slate-900/40 p-5 backdrop-blur-xl">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h3 className="text-2xl font-bold text-white">
            Question Bank
          </h3>

          <p className="text-slate-400">
            {questions.length}/{quiz.totalQuestions} required
          </p>
        </div>

        <span className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">
          {Math.max(quiz.totalQuestions - questions.length, 0)} Left
        </span>

      </div>

      <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">

        {questions.map((q, index) => (

          <div
            key={q._id}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/90 p-4 hover:border-cyan-400/20 transition"
          >

            <div className="mb-3 flex items-center justify-between">

              <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-xs font-bold text-cyan-300">
                Q{index + 1}
              </span>

              <div className="flex items-center gap-2">

  <button
    onClick={() => editQuestion(q)}
    className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
  >
    ✏ Edit
  </button>

  <button
    onClick={() => deleteQuestion(q._id)}
    className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
  >
    🗑 Delete
  </button>

</div>

            </div>

            <p className="font-semibold text-white">
              {q.questionText}
            </p>

            <div className="mt-3 space-y-2">

              {q.options.map((option, i) => (

                <div
                  key={i}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    q.correctAnswers.includes(i)
                      ? "border border-emerald-400/30 bg-emerald-500/15 text-emerald-300"
                      : "bg-slate-800/70 text-slate-300"
                  }`}
                >
                  {q.correctAnswers.includes(i) ? "✓ " : ""}
                  {option}
                </div>

              ))}

            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>{q.type}</span>
              <span>{q.marks} marks</span>
            </div>

          </div>

        ))}

        {questions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-500">
            No questions yet.
          </div>
        )}

      </div>

    </div>

  </div>
</div>
  </div>
</div>
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
    loadStudents();
  }, []);

  const loadTests = async () => {
    try {
      const res = await api.get("/tests", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Sort by latest date first
      const sortedTests = [...res.data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTests(sortedTests);
    } catch (err) {
      console.error(err);
      alert("Failed to load tests");
    }
  };

  const loadStudents = async () => {
    try {
      const res = await api.get("/students", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setStudents(res.data);
    } catch (err) {
      console.error(err);
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
  <div className="w-full overflow-x-auto touch-auto">
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
  QuizzesPage,
};