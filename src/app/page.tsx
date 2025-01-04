import { Layout } from '@/components/web3/layout'
import { TokenEditorSection } from '@/components/web3/token-editor-section'
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Bridge</h1>
        <TokenEditorSection />
      </div>
    </Layout>
  );
}
