export default function UserMenu() {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-white">Admin</p>
        <p className="text-xs text-zinc-400">admin@baazarify.com</p>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 font-semibold text-emerald-400">
        A
      </div>
    </div>
  );
}
