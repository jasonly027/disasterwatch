import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://auamllgackrdjjsptmgp.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as unknown as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface PinData {
  description: string;
  image: string;
  resolved: boolean;
  upvote: number;
  longitude: number;
  latitude: number;
  danger_level: string;
}

export async function addData(pin: PinData) {
  await supabase.from("pins").insert(pin);
}

export async function getData() {
  return await supabase.from("pins").select();
}

export async function uploadImage(file: File): Promise<string | null> {
  const path = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("images").upload(path, file);
  if (error) {
    console.error("Upload error", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(path);

  return publicUrl;
}

export async function reportPin(id: number, upvote: number) {
  await supabase.from("pins").update({ upvote }).eq("id", id);
}
