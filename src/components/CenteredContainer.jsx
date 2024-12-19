export function CenteredContainer({ children, className = "" }) {
  return (
<div className={`flex justify-center ${className}`}>
<div className="w-full sm:w-1/2 lg:w-1/2 sm:ml-10 sm:mr-6">
        {children}
</div>
</div>
  );
}