import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";

const OrderForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }

    const whatsappMessage = `*Novo Pedido - Divino Bombom*%0A%0A*Nome:* ${formData.name}%0A*Telefone:* ${formData.phone}%0A*E-mail:* ${formData.email}%0A%0A*Pedido:*%0A${formData.message}`;
    
    const whatsappNumber = "5511999999999";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para o WhatsApp",
      description: "Você será direcionado para finalizar seu pedido.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="pedido" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Faça seu Pedido
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Preencha o formulário abaixo e entraremos em contato via WhatsApp
            </p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="bg-card rounded-2xl p-8 shadow-elegant animate-scale-in"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-inter text-foreground">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 font-inter"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-inter text-foreground">
                  Telefone (com DDD) *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 font-inter"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-inter text-foreground">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 font-inter"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-inter text-foreground">
                  Seu Pedido *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Descreva seu pedido: sabores, quantidade, data de entrega, etc."
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 font-inter min-h-32"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full font-inter text-lg py-6 bg-gradient-primary hover:shadow-elegant transition-all duration-300 hover:scale-105"
              >
                Enviar Pedido via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
