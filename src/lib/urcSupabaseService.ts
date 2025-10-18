import { supabase } from './supabase';

// Types matching the URC data structure
export interface URCFixture {
  matchId: string;
  round: string;
  date: string;
  time: string;
  venue: string;
  home: {
    team: string;
    teamId: string;
    abbreviation: string;
  };
  away: {
    team: string;
    teamId: string;
    abbreviation: string;
  };
  hasLineup: boolean;
}

export interface URCLineupPlayer {
  name: string;
  number: number;
  position: string;
}

export interface URCLineup {
  matchId: string;
  home: {
    team: string;
    teamId: string;
    starting: URCLineupPlayer[];
    bench: URCLineupPlayer[];
  };
  away: {
    team: string;
    teamId: string;
    starting: URCLineupPlayer[];
    bench: URCLineupPlayer[];
  };
}

// Fixtures API Functions

export const saveFixtures = async (fixtures: URCFixture[]): Promise<boolean> => {
  if (!supabase) {
    console.error('⚠️ Supabase not connected');
    return false;
  }

  try {
    // Transform to database format
    const dbFixtures = fixtures.map(f => ({
      match_id: f.matchId,
      round: f.round,
      date: f.date,
      time: f.time,
      venue: f.venue,
      home_team: f.home.team,
      home_team_id: f.home.teamId,
      home_abbreviation: f.home.abbreviation,
      away_team: f.away.team,
      away_team_id: f.away.teamId,
      away_abbreviation: f.away.abbreviation,
      has_lineup: f.hasLineup
    }));

    const { error } = await supabase
      .from('urc_fixtures')
      .upsert(dbFixtures, { 
        onConflict: 'match_id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('❌ Error saving fixtures:', error);
      return false;
    }

    console.log(`✅ Saved ${fixtures.length} fixtures to Supabase`);
    return true;
  } catch (err) {
    console.error('❌ Exception saving fixtures:', err);
    return false;
  }
};

export const getFixtures = async (): Promise<URCFixture[]> => {
  if (!supabase) {
    console.error('⚠️ Supabase not connected');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('urc_fixtures')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('❌ Error fetching fixtures:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log('📭 No fixtures in database yet');
      return [];
    }

    // Transform from database format
    const fixtures: URCFixture[] = data.map(f => ({
      matchId: f.match_id,
      round: f.round,
      date: f.date,
      time: f.time,
      venue: f.venue,
      home: {
        team: f.home_team,
        teamId: f.home_team_id,
        abbreviation: f.home_abbreviation
      },
      away: {
        team: f.away_team,
        teamId: f.away_team_id,
        abbreviation: f.away_abbreviation
      },
      hasLineup: f.has_lineup
    }));

    console.log(`✅ Fetched ${fixtures.length} fixtures from Supabase`);
    return fixtures;
  } catch (err) {
    console.error('❌ Exception fetching fixtures:', err);
    return [];
  }
};

// Lineup API Functions

export const saveLineup = async (lineup: URCLineup): Promise<boolean> => {
  if (!supabase) {
    console.error('⚠️ Supabase not connected');
    return false;
  }

  try {
    // Save lineup
    const { error: lineupError } = await supabase
      .from('urc_lineups')
      .upsert({
        match_id: lineup.matchId,
        home_team: lineup.home.team,
        home_team_id: lineup.home.teamId,
        home_starting: lineup.home.starting,
        home_bench: lineup.home.bench,
        away_team: lineup.away.team,
        away_team_id: lineup.away.teamId,
        away_starting: lineup.away.starting,
        away_bench: lineup.away.bench
      }, {
        onConflict: 'match_id',
        ignoreDuplicates: false
      });

    if (lineupError) {
      console.error('❌ Error saving lineup:', lineupError);
      return false;
    }

    // Update fixture to mark hasLineup = true
    const { error: fixtureError } = await supabase
      .from('urc_fixtures')
      .update({ has_lineup: true })
      .eq('match_id', lineup.matchId);

    if (fixtureError) {
      console.error('❌ Error updating fixture:', fixtureError);
      return false;
    }

    console.log(`✅ Saved lineup for match ${lineup.matchId} to Supabase`);
    return true;
  } catch (err) {
    console.error('❌ Exception saving lineup:', err);
    return false;
  }
};

export const getLineup = async (matchId: string): Promise<URCLineup | null> => {
  if (!supabase) {
    console.error('⚠️ Supabase not connected');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('urc_lineups')
      .select('*')
      .eq('match_id', matchId)
      .single();

    if (error) {
      console.error(`❌ Error fetching lineup for match ${matchId}:`, error);
      return null;
    }

    if (!data) {
      console.log(`📭 No lineup found for match ${matchId}`);
      return null;
    }

    // Transform from database format
    const lineup: URCLineup = {
      matchId: data.match_id,
      home: {
        team: data.home_team,
        teamId: data.home_team_id,
        starting: data.home_starting,
        bench: data.home_bench
      },
      away: {
        team: data.away_team,
        teamId: data.away_team_id,
        starting: data.away_starting,
        bench: data.away_bench
      }
    };

    console.log(`✅ Fetched lineup for match ${matchId} from Supabase`);
    return lineup;
  } catch (err) {
    console.error(`❌ Exception fetching lineup for match ${matchId}:`, err);
    return null;
  }
};

