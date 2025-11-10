-- TikTok Tables - REMOVE AUTHENTICATION REQUIREMENT
-- Run this since your app has NO authentication system

-- ============================================================================
-- REMOVE OLD POLICIES THAT REQUIRE AUTHENTICATION
-- ============================================================================

DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_overview;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_content;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_viewers;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_followers;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_demographics_gender;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_demographics_territory;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_active_hours;

-- ============================================================================
-- CREATE PUBLIC POLICIES (NO LOGIN REQUIRED)
-- ============================================================================

-- Allow EVERYONE to do EVERYTHING (no authentication needed)
CREATE POLICY "Public access" ON tiktok_overview FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON tiktok_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON tiktok_viewers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON tiktok_followers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON tiktok_demographics_gender FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON tiktok_demographics_territory FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON tiktok_active_hours FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- DONE! TikTok tables now accessible without authentication
-- ============================================================================








