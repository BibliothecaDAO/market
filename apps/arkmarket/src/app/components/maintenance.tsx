export function Maintenance() {
  return (
    <main className="flex h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] items-center justify-center">
      <h1 className="text-6xl font-semibold">
        Under active maintenance
        <small className="block text-sm text-muted-foreground font-mono">Team is working hard, you can reach us out on discord</small>
      </h1>
    </main>
  )
}
