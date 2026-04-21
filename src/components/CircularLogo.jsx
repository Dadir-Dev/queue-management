export default function CircularLogo({
  className = "",
  label = "QueueFlow Pro logo",
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`group relative inline-flex aspect-square h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16 md:h-25 md:w-25 lg:h-30 lg:w-30 animate-spin motion-safe:animate-[spin_10s_linear_infinite] motion-reduce:animate-none ${className}`}
    >
      <img src="/src/assets/logo.png" alt="Logo" className="h-full w-full" />
    </div>
  );
}
