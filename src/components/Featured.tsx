import Icon from "@/components/ui/icon";

export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/8be299c8-d02d-478c-aa7d-1c5deebe710f.jpg"
          alt="Мастер за работой"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Всё для твоего стиля</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Лучшие барберы России — теперь в твоём телефоне. Выбирай мастера по рейтингу и отзывам,
          подбирай услуги и записывайся в пару касаний.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Icon name="Scissors" size={20} />
            <span className="text-neutral-700">Каталог услуг и цен</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Star" size={20} />
            <span className="text-neutral-700">Рейтинги и отзывы мастеров</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="CalendarCheck" size={20} />
            <span className="text-neutral-700">Онлайн-запись в один клик</span>
          </div>
        </div>

        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Скачать приложение
        </button>
      </div>
    </div>
  );
}
