"use client";

import { useState } from "react";
import { useAuth } from "~/lib/auth/useAuth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    } catch {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">스튜디오 초비</h1>
          <p className="text-white/70">로그인하여 서비스를 이용하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/20 p-3">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            계정이 없으신가요?{" "}
            <span className="cursor-pointer text-purple-300 hover:text-purple-200">
              관리자에게 문의하세요
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
