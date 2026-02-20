import { useState } from "react";
import Icon from "@/components/ui/icon";

const barbershops = [
  {
    id: 1,
    name: "TOPGUN",
    address: "Москва, ул. Тверская, 18",
    rating: 4.9,
    reviews: 324,
    image: "https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/2f71b7e4-eaab-4613-963c-43b1cf4aebb3.jpg",
    services: ["Стрижка", "Борода", "Камуфляж седины"],
    masters: 8,
  },
  {
    id: 2,
    name: "CHOP-CHOP",
    address: "Санкт-Петербург, Невский пр., 42",
    rating: 4.8,
    reviews: 256,
    image: "https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/8be299c8-d02d-478c-aa7d-1c5deebe710f.jpg",
    services: ["Стрижка", "Королевское бритьё", "Укладка"],
    masters: 6,
  },
  {
    id: 3,
    name: "BRITVA",
    address: "Казань, ул. Баумана, 15",
    rating: 4.7,
    reviews: 189,
    image: "https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/b58a7628-df12-45af-bcac-78139091e4b2.jpg",
    services: ["Стрижка", "Борода", "Детская стрижка"],
    masters: 5,
  },
];

const cities = ["Все города", "Москва", "Санкт-Петербург", "Казань"];

export default function Barbershops() {
  const [activeCity, setActiveCity] = useState("Все города");

  const filtered = activeCity === "Все города"
    ? barbershops
    : barbershops.filter((b) => b.address.startsWith(activeCity));

  return (
    <section className="bg-neutral-50 py-16 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h3 className="uppercase mb-3 text-sm tracking-wide text-neutral-500">Выбери свой</h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8">
            Барбершоп рядом
          </h2>

          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 text-sm uppercase tracking-wide border transition-all duration-300 cursor-pointer ${
                  activeCity === city
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((shop) => (
            <div
              key={shop.id}
              className="bg-white group cursor-pointer overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-neutral-900">{shop.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Icon name="Star" size={14} />
                    <span className="font-semibold">{shop.rating}</span>
                    <span className="text-neutral-400">({shop.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-4">
                  <Icon name="MapPin" size={14} />
                  <span>{shop.address}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {shop.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 uppercase tracking-wide"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                  <span className="text-sm text-neutral-500">
                    {shop.masters} {shop.masters >= 5 ? "мастеров" : "мастера"}
                  </span>
                  <button className="text-sm font-semibold text-black uppercase tracking-wide hover:text-neutral-600 transition-colors flex items-center gap-1">
                    Записаться
                    <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
