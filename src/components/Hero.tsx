import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bombons.jpg";

const Hero = () => {
  const scrollToOrder = () => {
    const orderSection = document.getElementById('pedido');
    orderSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Sabor que encanta,
          <span className="block text-primary mt-2">feito à mão</span>
        </h1>
        
        <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Bombons artesanais de sequilho com recheios divinos de brigadeiro, caramelo salgado e doce de leite
        </p>
        
        <Button 
          onClick={scrollToOrder}
          size="lg" 
          className="font-inter text-lg px-8 py-6 bg-gradient-primary hover:shadow-elegant transition-all duration-300 hover:scale-105"
        >
          Faça seu Pedido
        </Button>
      </div>
    </section>
  );
};

export default Hero;
