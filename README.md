# Welcome to Wrongful Foreclosure Law Axion Workbench

## Project info

**URL**: https://lovable.dev/projects/b172ea01-ee73-4879-b528-3bb6930be2f1


## Technologies  used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-50 p-6">
      <h1 className="text-5xl font-extrabold text-indigo-700">
        Lawgic Axiom Workbench
      </h1>
      <p className="mt-4 max-w-xl text-center text-lg text-slate-700">
        Explainable legal-reasoning UI powered by s(CASP). Model rules,
        explore every stable model, and read justifications in plain English.
      </p>
      <Link
        to="/dashboard"
        className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition hover:bg-indigo-700"
      >
        Open Dashboard
      </Link>
    </main>
  );
}


