
CREATE TABLE barbershops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL,
    rating NUMERIC(2,1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    services TEXT[] DEFAULT '{}',
    masters_count INTEGER DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO barbershops (name, city, address, rating, reviews_count, services, masters_count, image_url) VALUES
('TOPGUN', 'Москва', 'Москва, ул. Тверская, 18', 4.9, 324, ARRAY['Стрижка', 'Борода', 'Камуфляж седины'], 8, 'https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/2f71b7e4-eaab-4613-963c-43b1cf4aebb3.jpg'),
('CHOP-CHOP', 'Санкт-Петербург', 'Санкт-Петербург, Невский пр., 42', 4.8, 256, ARRAY['Стрижка', 'Королевское бритьё', 'Укладка'], 6, 'https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/8be299c8-d02d-478c-aa7d-1c5deebe710f.jpg'),
('BRITVA', 'Казань', 'Казань, ул. Баумана, 15', 4.7, 189, ARRAY['Стрижка', 'Борода', 'Детская стрижка'], 5, 'https://cdn.poehali.dev/projects/e19ddc13-f3c7-47ba-a46d-bba0c6f7049a/files/b58a7628-df12-45af-bcac-78139091e4b2.jpg');
