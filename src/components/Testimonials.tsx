import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    text: "Simplesmente divinos! Os bombons de brigadeiro são perfeitos, derretem na boca. Já virei cliente fiel!",
    rating: 5
  },
  {
    name: "João Santos",
    text: "O caramelo salgado é incrível, a combinação perfeita de doce e salgado. Sempre peço para presentear.",
    rating: 5
  },
  {
    name: "Ana Paula",
    text: "Produto artesanal de altíssima qualidade. O doce de leite é espetacular, feito com muito carinho!",
    rating: 5
  },
  {
    name: "Carlos Mendes",
    text: "Comprei para o aniversário da minha esposa e foi um sucesso! Todos adoraram a apresentação e o sabor.",
    rating: 5
  },
  {
    name: "Juliana Costa",
    text: "O melhor bombom artesanal que já provei. A base de sequilho é crocante e os recheios são cremosos. Perfeito!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            O que dizem nossos clientes
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Depoimentos de quem já provou nossos bombons artesanais
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-accent/20 bg-gradient-soft hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="font-inter text-muted-foreground mb-6 flex-grow leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <p className="font-playfair font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
