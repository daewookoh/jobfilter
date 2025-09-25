import { LatestPost } from "~/app/_components/post";
import { UserMenu } from "~/app/_components/auth/UserMenu";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {/* Header */}
        <header className="w-full px-4 py-6">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">스튜디오 초비</h1>
            <UserMenu />
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              스튜디오 <span className="text-[hsl(280,100%,70%)]">초비</span>
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
                <h3 className="text-2xl font-bold">직업 필터링</h3>
                <div className="text-lg">
                  원하는 조건에 맞는 직업을 찾아보세요. 다양한 필터 옵션을
                  제공합니다.
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
                <h3 className="text-2xl font-bold">맞춤 추천</h3>
                <div className="text-lg">
                  개인 취향과 경험을 바탕으로 최적의 직업을 추천해드립니다.
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-white">
                {hello ? hello.greeting : "Loading tRPC query..."}
              </p>
            </div>

            <LatestPost />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
