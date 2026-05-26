interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-white to-white/0 dark:from-black dark:to-black/0">
      <div className="max-w-md mx-auto px-6 py-5 grid grid-cols-3 items-center">
        <span className="flex">{left}</span>
        {center ?? (
          <h1 className="text-2xl text-center font-bold text-black dark:text-white">Filmder</h1>
        )}
        <span className="flex justify-end">{right}</span>
      </div>
    </header>
  );
};

export default Header;
