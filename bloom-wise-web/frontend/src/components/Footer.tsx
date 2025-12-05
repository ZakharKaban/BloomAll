import { Facebook, Instagram } from "lucide-react";
import { LeafDecoration } from "@/components/LeafDecoration";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto relative">
      <LeafDecoration position="bottom-right" className="opacity-20" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Promo Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Получайте
            </h3>
            <p className="text-muted-foreground max-w-2xl">
              советы по уходу за растениями, эксклюзивные предложения и скидку 10% на первый заказ!
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook size={32} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={32} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.718-1.032-1.001-1.488-1.138-1.745-1.138-.356 0-.459.102-.459.596v1.568c0 .424-.135.682-1.251.682-1.846 0-3.896-1.12-5.335-3.202-2.16-3.051-2.749-5.352-2.749-5.819 0-.257.102-.5.597-.5h1.745c.444 0 .612.204.784.678.869 2.526 2.327 4.738 2.93 4.738.227 0 .331-.104.331-.673V9.584c-.067-1.14-.663-1.235-.663-1.644 0-.204.17-.408.443-.408h2.741c.372 0 .507.203.507.643v3.468c0 .372.168.507.271.507.227 0 .407-.135.814-.542 1.249-1.406 2.142-3.579 2.142-3.579.119-.257.321-.5.765-.5h1.744c.524 0 .639.27.524.643-.204.946-2.043 3.706-2.043 3.706-.186.305-.254.44 0 .78.186.254.795.779 1.203 1.25.74.847 1.302 1.554 1.457 2.047.153.492-.104.744-.593.744z" />
              </svg>
            </a>
          </div>

          {/* Contact Section */}
          <div className="border-t border-border pt-8">
            <h4 className="text-xl font-semibold text-foreground mb-4">Контакты</h4>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-lg">8 (999) 987-76-21</p>
              <p className="text-lg">8 (812) 345-09-09</p>
            </div>
          </div>

          {/* Logo */}
          <div className="mt-8 text-center">
            <h2 className="logo-font text-4xl text-primary opacity-60">Подоконник</h2>
          </div>
        </div>
      </div>
    </footer>
  );
};
