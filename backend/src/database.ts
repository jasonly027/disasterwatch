import { createClient } from '@supabase/supabase-js'
import { pinSchema } from './v1/add_pin.js';

const supabaseUrl = 'https://auamllgackrdjjsptmgp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as unknown as string;
const supabase = createClient(supabaseUrl, supabaseKey)

export async function addData(pin:pinSchema) {
    await supabase
  .from('pins')
  .insert(pin)
}

export async function getData() {
return await supabase
.from('pins')
.select()
}