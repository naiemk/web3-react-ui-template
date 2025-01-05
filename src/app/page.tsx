import { Layout } from '@/components/example/layout'
import { TokenEditorSection } from '@/components/example/token-editor-section'

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
