-- URC Fixtures and Lineups Database Schema

-- Create urc_fixtures table
CREATE TABLE IF NOT EXISTS urc_fixtures (
  match_id TEXT PRIMARY KEY,
  round TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  home_team TEXT NOT NULL,
  home_team_id TEXT NOT NULL,
  home_abbreviation TEXT NOT NULL,
  away_team TEXT NOT NULL,
  away_team_id TEXT NOT NULL,
  away_abbreviation TEXT NOT NULL,
  has_lineup BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create urc_lineups table
CREATE TABLE IF NOT EXISTS urc_lineups (
  match_id TEXT PRIMARY KEY REFERENCES urc_fixtures(match_id) ON DELETE CASCADE,
  home_team TEXT NOT NULL,
  home_team_id TEXT NOT NULL,
  home_starting JSONB NOT NULL,
  home_bench JSONB NOT NULL,
  away_team TEXT NOT NULL,
  away_team_id TEXT NOT NULL,
  away_starting JSONB NOT NULL,
  away_bench JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE urc_fixtures ENABLE ROW LEVEL SECURITY;
ALTER TABLE urc_lineups ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON urc_fixtures
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON urc_fixtures
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON urc_fixtures
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON urc_fixtures
  FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON urc_lineups
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON urc_lineups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON urc_lineups
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON urc_lineups
  FOR DELETE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_urc_fixtures_round ON urc_fixtures(round);
CREATE INDEX IF NOT EXISTS idx_urc_fixtures_date ON urc_fixtures(date);
CREATE INDEX IF NOT EXISTS idx_urc_fixtures_has_lineup ON urc_fixtures(has_lineup);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_urc_fixtures_updated_at
  BEFORE UPDATE ON urc_fixtures
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_urc_lineups_updated_at
  BEFORE UPDATE ON urc_lineups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

