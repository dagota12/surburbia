import Link from "next/link";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

const Header = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <header className="header absolute left-0 right-0 top-0 z-50 h-32 py-4 md:py-6 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center">
        <Link href="/" className="justify-self-start">
          <Logo className="text-brand-purple h-12 lg:20" />
        </Link>

        <nav aria-label="nav" className="hidden md:block">
          <ul className="flex items-center justify-center gap-6">
            {settings.data.navigation.map((item) => (
              <li key={item.link.text}>
                <PrismicNextLink
                  field={item.link}
                  className="text-lg md:text-xl"
                />
              </li>
            ))}
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
