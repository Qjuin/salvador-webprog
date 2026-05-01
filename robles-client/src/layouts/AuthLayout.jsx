import { Outlet } from 'react-router-dom';
import heroImage from '../assets/hero.png';

const AuthLayout = () => {
  return (
    <section className="h-screen overflow-hidden text-[var(--ink)] [background:radial-gradient(circle_at_12%_18%,rgba(88,166,255,0.18),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(188,140,255,0.16),transparent_35%),linear-gradient(155deg,var(--bg-0),var(--bg-1))]">
      <div className="grid h-full w-full md:grid-cols-2">
        <aside className="relative hidden min-w-0 overflow-hidden border-r border-[var(--line)] md:block">
          <img
            src={heroImage}
            alt="Illustration"
            className="block h-full w-full max-h-full max-w-full object-cover object-center"
            loading="lazy"
          />
        </aside>

        <main className="flex h-full min-w-0 items-center justify-center overflow-y-auto px-6 py-6 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
