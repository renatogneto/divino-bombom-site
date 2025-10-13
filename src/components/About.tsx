import { Heart } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
          
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Nossa História
          </h2>
          
          <div className="font-inter text-lg text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Divino Bombom nasceu do amor e da dedicação de duas mulheres extraordinárias: 
              mãe e tia que transformaram suas cozinhas em verdadeiros ateliês de sabor.
            </p>
            
            <p>
              Cada bombom é preparado artesanalmente, com ingredientes selecionados e muito carinho. 
              A base crocante de sequilho abraça recheios cremosos que derretem na boca, 
              criando uma experiência única e inesquecível.
            </p>
            
            <p className="text-primary font-medium">
              Mais do que doces, são pequenos pedaços de felicidade feitos à mão para você.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
