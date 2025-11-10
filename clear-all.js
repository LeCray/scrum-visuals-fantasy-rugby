// Clear ALL data from Supabase properly
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xvrelebmkoldyhgtvshu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cmVsZWJta29sZHloZ3R2c2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NzQ2MjIsImV4cCI6MjA3NjA1MDYyMn0.96lvUMUe-o9Dve_oEPhfchnVP2G7nieIwU-JtPSPd9U'

const supabase = createClient(supabaseUrl, supabaseKey)

async function clearAllData() {
  console.log('🗑️  Deleting ALL records from social_stats table...\n')

  // First, get all records
  const { data: allRecords } = await supabase
    .from('social_stats')
    .select('id, platform')
  
  console.log(`Found ${allRecords?.length || 0} records to delete`)

  if (allRecords && allRecords.length > 0) {
    // Delete each record by ID
    for (const record of allRecords) {
      console.log(`Deleting ${record.platform} (${record.id})...`)
      const { error } = await supabase
        .from('social_stats')
        .delete()
        .eq('id', record.id)
      
      if (error) {
        console.error(`❌ Error deleting ${record.platform}:`, error.message)
      } else {
        console.log(`✅ Deleted ${record.platform}`)
      }
    }
  }

  // Verify deletion
  const { data: remaining } = await supabase
    .from('social_stats')
    .select('*')
  
  console.log(`\n✅ Deletion complete!`)
  console.log(`📊 Remaining records: ${remaining?.length || 0}`)
  
  if (remaining && remaining.length === 0) {
    console.log(`\n🎉 All data successfully cleared!`)
  }
}

clearAllData()









