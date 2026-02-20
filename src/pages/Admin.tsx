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

const emptyShop: Omit<Barbershop, "id"> = {
  name: "",
  city: "",
  address: "",
  rating: 0,
  reviews_count: 0,
  services: [],
  masters_count: 0,
  image_url: "",
};

export default function Admin() {
  const [shops, setShops] = useState<Barbershop[]>([]);
  const [editing, setEditing] = useState<Barbershop | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Barbershop, "id"> & { id?: number }>(emptyShop);
  const [servicesInput, setServicesInput] = useState("");
  const [loading, setLoading] = useState(true);

  const loadShops = () => {
    fetch(API_URLS.barbershops)
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        setLoading(false);
      });
  };

  useEffect(() => { loadShops(); }, []);

  const startEdit = (shop: Barbershop) => {
    setEditing(shop);
    setCreating(false);
    setForm(shop);
    setServicesInput(shop.services.join(", "));
  };

  const startCreate = () => {
    setEditing(null);
    setCreating(true);
    setForm(emptyShop);
    setServicesInput("");
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
  };

  const save = async () => {
    const payload = {
      ...form,
      services: servicesInput.split(",").map((s) => s.trim()).filter(Boolean),
      rating: Number(form.rating),
      reviews_count: Number(form.reviews_count),
      masters_count: Number(form.masters_count),
    };

    const method = creating ? "POST" : "PUT";
    await fetch(API_URLS.barbershops, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    cancel();
    loadShops();
  };

  const remove = async (id: number) => {
    await fetch(`${API_URLS.barbershops}?id=${id}`, { method: "DELETE" });
    loadShops();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Управление барбершопами</h1>
            <a href="/" className="text-sm text-neutral-500 hover:text-black transition-colors">
              ← На главную
            </a>
          </div>
          <button
            onClick={startCreate}
            className="bg-black text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>

        {(creating || editing) && (
          <div className="bg-white border border-neutral-200 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">
              {creating ? "Новый барбершоп" : "Редактирование"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Название"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                placeholder="Город"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                placeholder="Адрес"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black md:col-span-2"
              />
              <input
                placeholder="Услуги (через запятую)"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black md:col-span-2"
              />
              <input
                placeholder="Кол-во мастеров"
                type="number"
                value={form.masters_count}
                onChange={(e) => setForm({ ...form, masters_count: Number(e.target.value) })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                placeholder="Рейтинг (0-5)"
                type="number"
                step="0.1"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                placeholder="Кол-во отзывов"
                type="number"
                value={form.reviews_count}
                onChange={(e) => setForm({ ...form, reviews_count: Number(e.target.value) })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                placeholder="URL изображения"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={save}
                className="bg-black text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Сохранить
              </button>
              <button
                onClick={cancel}
                className="border border-neutral-300 px-4 py-2 text-sm uppercase tracking-wide hover:border-black transition-colors cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Загрузка...</div>
        ) : shops.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">Нет барбершопов</div>
        ) : (
          <div className="flex flex-col gap-3">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white border border-neutral-200 p-4 flex items-center gap-4"
              >
                {shop.image_url && (
                  <img
                    src={shop.image_url}
                    alt={shop.name}
                    className="w-16 h-16 object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-neutral-900">{shop.name}</div>
                  <div className="text-sm text-neutral-500">{shop.address}</div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {shop.services.join(" · ")} · {shop.masters_count} мастеров · ★ {shop.rating}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(shop)}
                    className="p-2 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <Icon name="Pencil" size={16} />
                  </button>
                  <button
                    onClick={() => remove(shop.id)}
                    className="p-2 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
