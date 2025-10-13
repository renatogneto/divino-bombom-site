import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-chocolate text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <h3 className="font-playfair text-3xl font-bold mb-2">Divino Bombom</h3>
            <p className="font-inter text-cream/80">
              Bombons artesanais feitos com amor
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/divino_bombom/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-cream/10 hover:bg-cream/20 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-inter">@divino_bombom</span>
            </a>
          </div>

          <div className="text-center text-cream/60 font-inter text-sm">
            <p>© {new Date().getFullYear()} Divino Bombom. Todos os direitos reservados.</p>
            <p className="mt-2">Feito com carinho por mãos dedicadas</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
