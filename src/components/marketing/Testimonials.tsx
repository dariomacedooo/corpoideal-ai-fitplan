
export function Testimonials() {
  const testimonials = [
    {
      name: "Ana Paula",
      text: "Nunca imaginei que um app pudesse transformar tanto minha rotina de treino! As avaliações são incríveis e os planos realmente funcionam.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Carlos Eduardo",
      text: "O CorpoIdeal AI me ajudou a alcançar resultados em 3 meses que eu não consegui em 2 anos sozinho. Recomendo demais!",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      name: "Talita Silva",
      text: "Experiência premium em todos os detalhes! A inteligência por trás dos planos faz toda diferença.",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
    },
  ];

  return (
    <section className="bg-white py-12 px-4 md:px-0">
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-corpoideal-purple text-center mb-8">
        O que nossos usuários dizem
      </h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="rounded-xl shadow-modern bg-purple-light p-6 flex flex-col items-center">
            <img src={t.image} alt={t.name} className="h-16 w-16 rounded-full mb-3 border-4 border-corpoideal-purple shadow-lg" />
            <p className="text-md text-corpoideal-dark text-center mb-3 leading-relaxed">“{t.text}”</p>
            <span className="font-semibold text-corpoideal-purple">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
