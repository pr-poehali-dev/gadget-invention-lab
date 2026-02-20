import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import API_URLS from "@backend/func2url.json";

interface Barbershop {
  id: number;
  name: string;
  city: string;
  address: string;
  rating: number;
  reviews_count: number;
  services: string[];
  masters_count: number;
  image_url: string;
}

export default function Barbershops() {
  const [activeCity, setActiveCity] = useState("Все города");
  const [shops, setShops] = useState<Barbershop[]>([]);
  const [cities, setCities] = useState<string[]>(["Все города"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URLS.barbershops)
      .then((res) => res.json())
      .then((data: Barbershop[]) => {
        setShops(data);
        const uniqueCities = [...new Set(data.map((s) => s.city))];
        setCities(["Все города", ...uniqueCities]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCity === "Все города"
    ? shops
    : shops.filter((b) => b.city === activeCity);

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

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Загружаем барбершопы...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">Барбершопы не найдены</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((shop) => (
              <div
                key={shop.id}
                className="bg-white group cursor-pointer overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={shop.image_url}
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
                      <span className="text-neutral-400">({shop.reviews_count})</span>
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
                      {shop.masters_count} {shop.masters_count >= 5 ? "мастеров" : "мастера"}
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
        )}
      </div>
    </section>
  );
}
