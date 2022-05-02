export function MainContainer() {
  return (
    <main className="flex-grow">
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
          lx:grid-cols-12
          gap-4
          p-5
        "
      ></div>
    </main>
  );
}
