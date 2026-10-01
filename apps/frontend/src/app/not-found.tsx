import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 text-on-surface text-center">
      <h1 className="font-headline-lg text-4xl font-bold text-primary mb-2">404</h1>
      <h2 className="font-headline-md text-xl font-semibold mb-4">Página Não Encontrada</h2>
      <p className="font-body text-sm text-outline max-w-md mb-6">
        A fornada que você procurava não foi encontrada. Retorne ao cardápio para conferir nossas pizzas artesanais.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-label text-xs uppercase tracking-wider font-bold hover:bg-secondary-container transition-all"
      >
        Voltar ao Cardápio
      </Link>
    </div>
  );
}
