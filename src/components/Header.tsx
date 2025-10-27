import Link from "next/link";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <header className="header absolute left-0 right-0 top-0 z-50 h-32 py-4 md:py-6 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center">
        <Link href="/" className="justify-self-start">
          <Logo className="text-brand-purple h-12 lg:20" />
        </Link>

        <nav aria-label="nav" className="hidden md:block">
          <ul className="flex items-center justify-center gap-6">
            <li>
              <Link href="/boards">Boards</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          <ButtonLink
            href="/shop"
            color="purple"
            size="md"
            icon="cart"
            aria-label="Cart - (1)"
          >
            <span className="hidden md:inline">Cart</span>
            (1)
          </ButtonLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
