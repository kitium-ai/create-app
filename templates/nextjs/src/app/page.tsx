export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to {{PROJECT_NAME_PASCAL}}</h1>
        <p className="text-lg mb-4">Next.js + TypeScript + KitiumAI</p>
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            Get started by editing <code className="font-mono">src/app/page.tsx</code>
          </p>
        </div>
      </div>
    </main>
  );
}

