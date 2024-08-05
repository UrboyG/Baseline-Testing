CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insert users only if they do not already exist
INSERT INTO users (username, password) VALUES
('JohnDoe', 'JohnDoe1')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password) VALUES
('MarryJane', 'MarryJane2')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password) VALUES
('DickBennington', 'DickBennington3')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password) VALUES
('HarryPotter', 'HarryPotter4')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password) VALUES
('SarahTylenol', 'SarahTylenol5')
ON CONFLICT (username) DO NOTHING;